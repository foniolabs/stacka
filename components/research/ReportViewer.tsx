"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Folder } from "lucide-react";

type Report = { id: string; title: string; question: string; method: string; sources: string; status: string };

const REPORTS: Report[] = [
  { id: "01", title: "Tokenized treasuries and money market funds as a dollar-savings substitute in Nigeria", question: "Can tokenized money market funds work as a credible dollar-savings option for Nigerian savers?", method: "Net return and cost comparison; redemption, custody and access analysis", sources: "Fund documents, regulation, onchain data", status: "In progress" },
  { id: "02", title: "Pricing and NAV mechanics of tokenized ETFs: a financial-engineering view", question: "How closely do tokenized ETF prices track NAV, and what drives the gap?", method: "Premium and discount analysis; creation and redemption mechanics", sources: "Issuer documents, market and onchain data", status: "In progress" },
  { id: "03", title: "Regulatory map: CBN, SEC Nigeria and the treatment of tokenized securities", question: "How do Nigerian regulators treat tokenized securities and funds today?", method: "Rule-by-rule mapping and gap analysis", sources: "Regulation, circulars, official statements", status: "Planned" },
  { id: "04", title: "Bank and fintech on-ramps: access routes for tokenized assets", question: "By what routes can Nigerians reach tokenized assets, and what do they cost?", method: "Route comparison on cost, speed, custody and compliance", sources: "Provider terms, fee schedules", status: "Planned" },
  { id: "05", title: "Risk decomposition of tokenized equities", question: "What risks sit between a tokenized share and the underlying equity?", method: "Risk tree across custody, oracle and redemption", sources: "Issuer documents, audits, onchain data", status: "Planned" },
];

export default function ReportViewer() {
  const [active, setActive] = useState(0);
  const r = REPORTS[active];
  const lines: [string, string][] = [
    ["comment", `// Report ${r.id} · draft outline · scope may change`],
    ["", ""],
    ["Title", r.title],
    ["Question", r.question],
    ["Method", r.method],
    ["Sources", r.sources],
    ["Status", r.status],
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <div role="tablist" aria-label="Research agenda" className="flex gap-1.5 overflow-x-auto pl-2">
        {REPORTS.map((x, i) => (
          <button
            key={x.id}
            role="tab"
            aria-label={`Report ${x.id}`}
            id={`tab-${x.id}`}
            aria-selected={i === active}
            aria-controls="report-panel"
            onClick={() => setActive(i)}
            className={`r-mono inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-t-lg border border-b-0 border-[var(--r-line)] px-2.5 transition-colors sm:gap-2 sm:px-3.5 ${i === active ? "bg-white text-[var(--r-ink)]" : "bg-white/40 text-[var(--r-ink-3)] hover:bg-white/70"}`}
          >
            <Folder className="h-3.5 w-3.5" aria-hidden /> <span className="hidden sm:inline">Report&nbsp;</span>{x.id}
          </button>
        ))}
      </div>
      <div id="report-panel" role="tabpanel" aria-labelledby={`tab-${r.id}`} className="rounded-xl border border-[var(--r-line)] bg-white p-5 shadow-[0_24px_48px_-32px_rgba(17,17,17,0.3)] sm:p-7">
        <ol className="min-h-[15rem] space-y-1.5 font-[family-name:var(--font-mono-r)] text-[13px] leading-6">
          {lines.map(([k, v], i) => (
            <li key={i} className="grid grid-cols-[1.75rem_1fr] gap-3">
              <span className="select-none text-right text-[var(--r-ink-3)]/70">{i + 1}</span>
              {k === "comment" ? (
                <span className="italic text-[var(--r-ink-3)]">{v}</span>
              ) : k ? (
                <span><span className="font-medium text-[var(--r-ink)]">{k}:</span>{" "}<span className="text-[var(--r-ink-2)]">{v}</span></span>
              ) : <span />}
            </li>
          ))}
        </ol>
        <div className="mt-4 flex justify-end">
          <Link href="/waitlist" className="r-mono inline-flex items-center gap-1.5 text-[var(--r-ink-3)] transition-colors hover:text-[var(--r-ink)]">
            Get notified <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
