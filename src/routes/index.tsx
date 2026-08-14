import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero3D } from "@/components/Hero3D";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import classWork from "@/assets/class-work.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Floral Design at Carroll High School | Southlake Carroll ISD" },
      {
        name: "description",
        content:
          "Floral Design at Carroll High School in Southlake Carroll ISD — hands-on design labs, TSFA certification, competition team, and student-run event work.",
      },
      {
        property: "og:title",
        content: "Floral Design at Carroll High School | Southlake",
      },
      {
        property: "og:description",
        content:
          "Hands-on floral design labs, certification, competition, and student-run event work at Carroll High School.",
      },
    ],
  }),
  component: Index,
});

const courses = [
  {
    tag: "Level I",
    title: "Principles of Floral Design",
    body: "Color theory, mechanics, and the six principles of design taught through weekly hands-on builds you take home.",
  },
  {
    tag: "Level II",
    title: "Advanced Design & Business",
    body: "Wedding work, sympathy tributes, pricing, and shop operations — built around a live student studio.",
  },
  {
    tag: "Certification",
    title: "TSFA Knowledge-Based Exam",
    body: "Seniors sit the Texas State Florists' Association exam and graduate with an industry credential.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="top">
        <section className="canopy relative overflow-hidden">
          <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-leaf/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 size-96 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-2 md:py-28">
            <div className="rise">
              <span className="inline-flex items-center gap-2 rounded-full border border-petal/25 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-petal/85">
                Carroll High School · Dragons
              </span>
              <h1 className="text-display mt-6 text-5xl md:text-6xl lg:text-7xl">
                Where students learn to
                <span className="block text-gold"> build with flowers.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-petal/75">
                A working design studio inside Carroll ISD. Every class period ends
                with something real in your hands — a bouquet, a corsage, a
                centerpiece for a Southlake event.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/inquiries"
                  className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-gold-foreground shadow-float transition-transform hover:-translate-y-0.5"
                >
                  Business inquiries
                </Link>
                <a
                  href="#program"
                  className="rounded-full border border-petal/30 px-7 py-3 text-sm font-semibold text-petal transition-colors hover:bg-petal/10"
                >
                  Explore the program
                </a>
              </div>
              <dl className="mt-14 grid max-w-sm grid-cols-3 gap-6">
                {[
                  ["180+", "students / yr"],
                  ["3", "course levels"],
                  ["TSFA", "certified"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <dt className="text-display text-3xl text-petal">{n}</dt>
                    <dd className="mt-1 text-xs uppercase tracking-wider text-petal/60">
                      {l}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <Hero3D />
              <p className="mt-2 text-center text-xs uppercase tracking-[0.2em] text-petal/50">
                Drag to rotate · live 3D
              </p>
            </div>
          </div>
        </section>

        <section id="program" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-display max-w-xl text-4xl md:text-5xl">
            Three levels, one working studio.
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Floral Design is a CTE pathway course — it counts for a fine arts
            credit and stacks toward an industry certification.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3 [perspective:1200px]">
            {courses.map((c) => (
              <article
                key={c.title}
                className="float-3d rounded-3xl border border-border bg-card p-8"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf">
                  {c.tag}
                </span>
                <h3 className="text-display mt-4 text-2xl text-card-foreground">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="studio" className="bg-secondary/50 py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
            <img
              src={classWork}
              alt="Carroll student arranging a white and green centerpiece in the design lab"
              loading="lazy"
              width={1024}
              height={768}
              className="w-full rounded-[2rem] shadow-soft"
            />
            <div>
              <h2 className="text-display text-4xl md:text-5xl">
                The lab runs like a real shop.
              </h2>
              <ul className="mt-8 space-y-5">
                {[
                  [
                    "Cooler-to-counter workflow",
                    "Students process, condition, and store fresh product every morning.",
                  ],
                  [
                    "Homecoming mum season",
                    "The studio produces hundreds of mums and garters each fall for Dragon families.",
                  ],
                  [
                    "Competition team",
                    "FFA and TSFA contests, plus district showcase events across Southlake.",
                  ],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-4">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-leaf" />
                    <div>
                      <p className="font-semibold text-foreground">{t}</p>
                      <p className="text-sm text-muted-foreground">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="canopy relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center md:px-16">
            <div className="pointer-events-none absolute -top-20 left-1/2 size-80 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
            <h2 className="text-display relative text-4xl md:text-5xl">
              Working with the studio.
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-petal/75">
              Local businesses, PTO groups, and Southlake families can commission
              arrangements, mums, and event florals from our student designers.
            </p>
            <Link
              to="/inquiries"
              className="relative mt-9 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-gold-foreground shadow-float transition-transform hover:-translate-y-0.5"
            >
              Start an inquiry
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
