import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/inquiries")({
  head: () => ({
    meta: [
      { title: "Business Inquiries | Carroll Floral Design, Southlake" },
      {
        name: "description",
        content:
          "Commission event florals, homecoming mums, weekly arrangements, and sponsorships from the Carroll High School student floral studio in Southlake, TX.",
      },
      {
        property: "og:title",
        content: "Business Inquiries | Carroll Floral Design",
      },
      {
        property: "og:description",
        content:
          "Request a quote from the Carroll High School student floral studio — events, mums, weekly arrangements, and sponsorships.",
      },
    ],
  }),
  component: Inquiries,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  organization: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(30).optional(),
  service: z.string().trim().min(1, "Choose a service"),
  date: z.string().trim().max(30).optional(),
  budget: z.string().trim().max(40).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (10+ characters)")
    .max(1000, "Keep it under 1000 characters"),
});

const services = [
  {
    title: "Event & banquet florals",
    body: "Centerpieces, entry arrangements, and stage pieces for booster banquets, galas, and corporate events in Southlake.",
    lead: "3 weeks notice",
  },
  {
    title: "Homecoming mums & garters",
    body: "Custom Dragon mums built to order each fall, from single-ribbon to full triple designs.",
    lead: "Orders open Aug 15",
  },
  {
    title: "Weekly business arrangements",
    body: "Standing lobby or reception arrangements delivered on a recurring schedule during the school year.",
    lead: "Semester contracts",
  },
  {
    title: "Sponsorships & donations",
    body: "Support product costs, competition travel, and TSFA exam fees. Sponsors are recognized at showcase events.",
    lead: "Year-round",
  },
];

const faqs = [
  [
    "Who makes the arrangements?",
    "Level II and certification students, supervised by the program instructor. Every order doubles as classroom instruction.",
  ],
  [
    "How is pricing set?",
    "At cost of goods plus a small program margin that funds supplies and competition travel — typically well below retail.",
  ],
  [
    "Do you deliver?",
    "Pickup is at Carroll High School. Local delivery within Southlake, Grapevine, and Colleyville can be arranged for larger orders.",
  ],
  [
    "What is the lead time?",
    "Two to three weeks for event work. Mum season fills quickly, so order early in the fall.",
  ],
];

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-1.5 text-xs text-destructive">{error}</p> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring";

function Inquiries() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        next[String(issue.path[0])] = issue.message;
      }
      setErrors(next);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setErrors({});
    setSent(true);
    toast.success("Inquiry received — we'll reply within two school days.");
    e.currentTarget.reset();
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Toaster />

      <main>
        <section className="canopy relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 top-0 size-80 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-6 py-20">
            <span className="text-xs uppercase tracking-[0.2em] text-petal/70">
              Carroll Floral Design Studio
            </span>
            <h1 className="text-display mt-4 max-w-2xl text-5xl md:text-6xl">
              Business inquiries & <span className="text-gold">commissions.</span>
            </h1>
            <p className="mt-5 max-w-xl text-petal/75">
              Hire the student studio for event florals, mums, and recurring
              arrangements — or sponsor a design bench. Every dollar goes straight
              back into the program.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-display text-3xl md:text-4xl">What we take on</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 [perspective:1200px]">
            {services.map((s) => (
              <article
                key={s.title}
                className="float-3d rounded-3xl border border-border bg-card p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-display text-xl text-card-foreground">
                    {s.title}
                  </h3>
                  <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
                    {s.lead}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-secondary/50 py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="glass-card rounded-[2rem] p-8 md:p-10">
              <h2 className="text-display text-3xl">Tell us about your project</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                We reply within two school days during the academic year.
              </p>

              {sent ? (
                <div className="mt-8 rounded-2xl border border-leaf/40 bg-accent/40 p-6">
                  <p className="text-display text-xl text-foreground">
                    Thanks — your inquiry is in.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A program instructor will follow up by email.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-5 rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" error={errors["name"]}>
                      <input name="name" className={inputClass} placeholder="Jordan Reed" />
                    </Field>
                    <Field label="Organization" error={errors["organization"]}>
                      <input
                        name="organization"
                        className={inputClass}
                        placeholder="Southlake Chamber"
                      />
                    </Field>
                    <Field label="Email" error={errors["email"]}>
                      <input
                        name="email"
                        type="email"
                        className={inputClass}
                        placeholder="you@company.com"
                      />
                    </Field>
                    <Field label="Phone" error={errors["phone"]}>
                      <input name="phone" className={inputClass} placeholder="(817) 555-0134" />
                    </Field>
                    <Field label="Service" error={errors["service"]}>
                      <select name="service" defaultValue="" className={inputClass}>
                        <option value="" disabled>
                          Select one
                        </option>
                        {services.map((s) => (
                          <option key={s.title} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Event date" error={errors["date"]}>
                      <input name="date" type="date" className={inputClass} />
                    </Field>
                  </div>
                  <Field label="Budget range" error={errors["budget"]}>
                    <input
                      name="budget"
                      className={inputClass}
                      placeholder="$300 – $800"
                    />
                  </Field>
                  <Field label="Details" error={errors["message"]}>
                    <textarea
                      name="message"
                      rows={5}
                      maxLength={1000}
                      className={inputClass}
                      placeholder="Twelve low centerpieces in green and white for a booster banquet on the 14th…"
                    />
                  </Field>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
                  >
                    Send inquiry
                  </button>
                </form>
              )}
            </div>

            <aside className="space-y-8">
              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="text-display text-xl">Studio details</h3>
                <dl className="mt-5 space-y-4 text-sm">
                  {[
                    ["Location", "Carroll High School, 1501 W Southlake Blvd, Southlake, TX 76092"],
                    ["Email", "floral@southlakecarroll.edu"],
                    ["Studio hours", "Mon–Fri, 8:30 AM – 3:45 PM (school days)"],
                    ["Lead time", "2–3 weeks for event work"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                        {k}
                      </dt>
                      <dd className="mt-1 text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="text-display text-xl">Common questions</h3>
                <div className="mt-5 space-y-5">
                  {faqs.map(([q, a]) => (
                    <div key={q}>
                      <p className="text-sm font-semibold text-foreground">{q}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
