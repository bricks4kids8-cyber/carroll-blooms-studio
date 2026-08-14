import { createFileRoute } from "@tanstack/react-router";
import heroBouquet from "@/assets/hero-bouquet.jpg";
import classWork from "@/assets/class-work.jpg";
import mum from "@/assets/mum.jpg";
import vase from "@/assets/vase.jpg";

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

const gallery = [
  { src: mum, alt: "Homecoming mum corsage in green and white ribbons" },
  { src: vase, alt: "Single white orchid stem in a glass vase" },
  { src: classWork, alt: "Student arranging a white and green centerpiece" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              CF
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-semibold text-foreground">
                Carroll Floral Design
              </span>
              <span className="block text-xs text-muted-foreground">
                Southlake Carroll ISD
              </span>
            </span>
          </a>
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#program">
              Program
            </a>
            <a className="transition-colors hover:text-foreground" href="#studio">
              Studio
            </a>
            <a className="transition-colors hover:text-foreground" href="#gallery">
              Gallery
            </a>
          </div>
          <a
            href="#enroll"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Enroll
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="canopy relative overflow-hidden">
          <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-leaf/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 size-96 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-2 md:py-32">
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
                <a
                  href="#enroll"
                  className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-gold-foreground shadow-float transition-transform hover:-translate-y-0.5"
                >
                  Join the program
                </a>
                <a
                  href="#gallery"
                  className="rounded-full border border-petal/30 px-7 py-3 text-sm font-semibold text-petal transition-colors hover:bg-petal/10"
                >
                  See student work
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

            <div className="relative [perspective:1400px]">
              <div className="drift">
                <img
                  src={heroBouquet}
                  alt="White peony and eucalyptus arrangement in a glossy ceramic vase"
                  width={1280}
                  height={1280}
                  className="w-full rounded-[2.5rem] shadow-float"
                />
              </div>
              <div className="glass-card absolute -bottom-6 -left-6 hidden rounded-3xl px-5 py-4 sm:block">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  This week's lab
                </p>
                <p className="text-display text-lg text-foreground">
                  Garden-style vase work
                </p>
              </div>
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

        <section id="gallery" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-display text-4xl md:text-5xl">Student work</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3 [perspective:1200px]">
            {gallery.map((g) => (
              <figure
                key={g.alt}
                className="float-3d overflow-hidden rounded-3xl border border-border bg-card"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="aspect-4/3 w-full object-cover"
                />
              </figure>
            ))}
          </div>
        </section>

        <section id="enroll" className="mx-auto max-w-6xl px-6 pb-24">
          <div className="canopy relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center md:px-16">
            <div className="pointer-events-none absolute -top-20 left-1/2 size-80 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
            <h2 className="text-display relative text-4xl md:text-5xl">
              Add Floral Design to your schedule.
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-petal/75">
              Talk to your counselor during course selection, or stop by the design
              lab at Carroll High School — 1501 W Southlake Blvd, Southlake, TX.
            </p>
            <a
              href="mailto:floral@southlakecarroll.edu"
              className="relative mt-9 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-gold-foreground shadow-float transition-transform hover:-translate-y-0.5"
            >
              Email the program
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted-foreground sm:flex-row">
          <p>Carroll High School Floral Design · Carroll ISD, Southlake TX</p>
          <p>Go Dragons.</p>
        </div>
      </footer>
    </div>
  );
}
