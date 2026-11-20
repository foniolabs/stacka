import Link from "next/link";

const COLS: { head: string; links: { label: string; href: string }[] }[] = [
  { head: "Audiences", links: [{ label: "Regulators", href: "/#regulators" }, { label: "Banks & fintechs", href: "/#banks" }, { label: "Investors", href: "/#investors" }] },
  { head: "Research", links: [{ label: "Coverage", href: "/#coverage" }, { label: "Engineering", href: "/#engineering" }, { label: "Rules tracker", href: "/tracker" }, { label: "Nigeria", href: "/#nigeria" }, { label: "Agenda", href: "/#agenda" }, { label: "Method", href: "/#method" }] },
  { head: "Company", links: [{ label: "About", href: "/about" }, { label: "Get research", href: "/waitlist" }, { label: "Archive: product whitepaper", href: "/whitepaper" }] },
  { head: "Legal", links: [{ label: "Disclaimer", href: "/disclaimer" }, { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }] },
];

export default function ResearchFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--r-line)]">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {COLS.map((c) => (
            <div key={c.head}>
              <p className="r-mono text-[var(--r-ink)]">{c.head}</p>
              <ul className="mt-5 space-y-3 text-[0.9375rem] text-[var(--r-ink-3)]">
                {c.links.map((l) => (
                  <li key={l.label}><Link href={l.href} className="transition-colors hover:text-[var(--r-ink)]">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--r-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img src="/brand/stacka-symbol-light.svg" alt="" className="h-6 w-auto" />
            <span className="text-sm text-[var(--r-ink-3)]">Open research and engineering on tokenized finance. A Fonio Labs project.</span>
          </div>
          <p className="text-sm text-[var(--r-ink-3)]">© {new Date().getFullYear()} Fonio Labs</p>
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-[var(--r-ink-3)]">
          Stacka publishes research, models and tools for educational and informational purposes only. Nothing here is investment, legal or tax advice, or an offer to buy or sell any security or digital asset.
        </p>
      </div>
      <p aria-hidden className="m-watermark pointer-events-none -mb-[0.12em] text-center text-[22vw] md:text-[19vw]">STACKA</p>
    </footer>
  );
}
