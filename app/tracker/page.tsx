import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ResearchHeader from "@/components/research/ResearchHeader";
import ResearchFooter from "@/components/research/ResearchFooter";
import RulesTracker from "@/components/research/RulesTracker";
import { AS_OF_LABEL, RULES, UNRESOLVED } from "@/lib/research/nigeriaRules";

export const metadata = {
  title: "Nigeria rules tracker | Stacka",
  description:
    "A dated, sourced record of CBN and SEC Nigeria rules on tokenized securities, funds and stablecoins, with status and verification shown for every entry.",
};

const count = (s: string) => RULES.filter((r) => r.status === s).length;

const LEGEND = [
  { term: "In force", body: "Issued and stated to be effective. Shown only where a primary document says so." },
  { term: "Draft", body: "Published but not adopted. Draft entries may change before they take effect." },
  { term: "Unconfirmed", body: "Reported, but not yet checked against a primary document. Treat as a lead, not a fact." },
];

export default function TrackerPage() {
  const stats = [
    { value: RULES.length, label: "Entries" },
    { value: count("in-force"), label: "In force" },
    { value: count("draft"), label: "Draft" },
    { value: count("unconfirmed"), label: "Unconfirmed" },
  ];

  return (
    <div className="research min-h-screen">
      <ResearchHeader />
      <main>
        <section className="border-b border-[var(--r-line)]">
          <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 md:pb-20 md:pt-24 lg:px-8">
            <span className="m-label">Engineering · Preview</span>
            <h1 className="r-display mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">Nigeria rules tracker</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--r-ink-2)]">
              A dated record of CBN and SEC Nigeria rules on tokenized securities, funds and stablecoins. Every entry shows its status, the section it comes from, how well it is verified and a link to the source.
            </p>
            <p className="r-mono mt-6 text-[var(--r-ink-3)]">As of {AS_OF_LABEL}</p>

            <dl className="mt-10 grid grid-cols-2 divide-x divide-y divide-[var(--r-line)] border border-[var(--r-line)] sm:grid-cols-4 sm:divide-y-0">
              {stats.map((s) => (
                <div key={s.label} className="p-5">
                  <dd className="r-display text-4xl">{s.value}</dd>
                  <dt className="r-mono mt-1 text-[var(--r-ink-3)]">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <RulesTracker />
          </div>
        </section>

        <section className="border-t border-[var(--r-line)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
            <div>
              <span className="m-label">Reading the tracker</span>
              <h2 className="r-display mt-5 text-3xl sm:text-4xl">What the labels mean</h2>
              <dl className="mt-8 space-y-5">
                {LEGEND.map((l) => (
                  <div key={l.term} className="border-t border-[var(--r-ink)] pt-4">
                    <dt className="r-display text-xl">{l.term}</dt>
                    <dd className="mt-1 leading-relaxed text-[var(--r-ink-3)]">{l.body}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 text-sm leading-relaxed text-[var(--r-ink-3)]">
                This is a research aid, not legal advice. Check the primary document before relying on any entry, and take advice for any decision that depends on it.
              </p>
            </div>
            <div>
              <span className="m-label">Open questions</span>
              <h2 className="r-display mt-5 text-3xl sm:text-4xl">Still to verify</h2>
              <ol className="mt-8 space-y-4">
                {UNRESOLVED.map((u, i) => (
                  <li key={u} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-[var(--r-line)] pt-4 leading-relaxed text-[var(--r-ink-2)]">
                    <span className="r-mono text-[var(--r-ink-3)]">{String(i + 1).padStart(2, "0")}</span>
                    <span>{u}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--r-line)]">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
            <h2 className="r-display text-3xl sm:text-4xl">Get updates as the rules change</h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--r-ink-3)]">We update the tracker when a rule is adopted, amended or confirmed.</p>
            <div className="mt-8 flex justify-center">
              <Link href="/waitlist" className="r-btn r-btn-primary">Get research <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            </div>
          </div>
        </section>
      </main>
      <ResearchFooter />
    </div>
  );
}
