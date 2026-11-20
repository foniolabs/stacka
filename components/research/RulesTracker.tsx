"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Check, CircleDashed, Newspaper } from "lucide-react";
import { RULES, type Activity, type Regulator, type Rule, type Status, type Verification } from "@/lib/research/nigeriaRules";

type RegFilter = "all" | "CBN" | "SEC";
type StatusFilter = "all" | Status;
type ActFilter = "all" | Activity;

const STATUS_LABEL: Record<Status, string> = { "in-force": "In force", draft: "Draft", unconfirmed: "Unconfirmed" };
const ACT_LABEL: Record<Activity, string> = { issue: "Issue", hold: "Hold", offer: "Offer", transfer: "Transfer" };
const VERIF: Record<Verification, { label: string; Icon: typeof Check }> = {
  primary: { label: "Confirmed in the primary document", Icon: Check },
  partial: { label: "Partly confirmed", Icon: CircleDashed },
  reported: { label: "Reported by press or a law firm, not yet checked in a primary document", Icon: Newspaper },
};

function statusClass(s: Status) {
  if (s === "in-force") return "border-[#151514] bg-[#151514] text-[#ecebe6]";
  if (s === "draft") return "border-[var(--r-ink)] text-[var(--r-ink)]";
  return "border-dashed border-[var(--r-ink-3)] text-[var(--r-ink-3)]";
}

function Group<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string; count: number }[] }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="r-mono mr-1 text-[var(--r-ink-3)]">{label}</span>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={`r-mono min-h-[36px] cursor-pointer rounded-full border px-3.5 transition-colors ${on ? "border-[#151514] bg-[#151514] text-[#ecebe6]" : "border-[var(--r-line)] bg-white/50 text-[var(--r-ink-2)] hover:border-[var(--r-ink)]"}`}
          >
            {o.label} <span className={on ? "opacity-70" : "opacity-50"}>{o.count}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function RulesTracker() {
  const [reg, setReg] = useState<RegFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [act, setAct] = useState<ActFilter>("all");

  const matchReg = (r: Rule, f: RegFilter) => f === "all" || r.regulator === f || r.regulator === ("CBN + SEC" as Regulator);
  const matches = (r: Rule, f: { reg: RegFilter; status: StatusFilter; act: ActFilter }) =>
    matchReg(r, f.reg) && (f.status === "all" || r.status === f.status) && (f.act === "all" || r.activities.includes(f.act));

  const visible = useMemo(() => RULES.filter((r) => matches(r, { reg, status, act })), [reg, status, act]);

  const countFor = (patch: Partial<{ reg: RegFilter; status: StatusFilter; act: ActFilter }>) =>
    RULES.filter((r) => matches(r, { reg, status, act, ...patch })).length;

  return (
    <div>
      <div className="space-y-3">
        <Group<RegFilter> label="Regulator" value={reg} onChange={setReg} options={[
          { value: "all", label: "All", count: countFor({ reg: "all" }) },
          { value: "CBN", label: "CBN", count: countFor({ reg: "CBN" }) },
          { value: "SEC", label: "SEC", count: countFor({ reg: "SEC" }) },
        ]} />
        <Group<StatusFilter> label="Status" value={status} onChange={setStatus} options={[
          { value: "all", label: "All", count: countFor({ status: "all" }) },
          { value: "in-force", label: "In force", count: countFor({ status: "in-force" }) },
          { value: "draft", label: "Draft", count: countFor({ status: "draft" }) },
          { value: "unconfirmed", label: "Unconfirmed", count: countFor({ status: "unconfirmed" }) },
        ]} />
        <Group<ActFilter> label="Activity" value={act} onChange={setAct} options={[
          { value: "all", label: "All", count: countFor({ act: "all" }) },
          ...(["issue", "hold", "offer", "transfer"] as Activity[]).map((a) => ({ value: a, label: ACT_LABEL[a], count: countFor({ act: a }) })),
        ]} />
      </div>

      <p role="status" aria-live="polite" className="r-mono mt-6 text-[var(--r-ink-3)]">
        Showing {visible.length} of {RULES.length} entries
      </p>

      <ul className="mt-4 space-y-3">
        {visible.map((r) => {
          const V = VERIF[r.verification];
          return (
            <li key={r.id}>
              <article className="rounded-xl border border-[var(--r-line)] bg-white/55 p-5 shadow-[0_24px_48px_-36px_rgba(17,17,17,0.35)] sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`r-mono rounded-full border px-2.5 py-0.5 ${statusClass(r.status)}`}>{STATUS_LABEL[r.status]}</span>
                  <span className="m-label">{r.regulator}</span>
                  <span className="r-mono ml-auto text-[var(--r-ink-3)]">{r.ref}</span>
                </div>
                <h3 className="r-display mt-4 text-xl sm:text-2xl">{r.title}</h3>
                <p className="r-mono mt-1 text-[var(--r-ink-3)]">{r.instrument}</p>
                <p className="mt-3 max-w-3xl leading-relaxed text-[var(--r-ink-2)]">{r.summary}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--r-line)] pt-4 text-sm text-[var(--r-ink-3)]">
                  <span className="inline-flex items-center gap-1.5"><V.Icon className="h-4 w-4 shrink-0" aria-hidden />{V.label}</span>
                  <span className="r-mono">Applies to: {r.activities.map((a) => ACT_LABEL[a]).join(", ")}</span>
                  <span className="ml-auto flex flex-wrap gap-x-4 gap-y-1">
                    {r.sources.map((s) => (
                      <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="m-more">
                        {s.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    ))}
                  </span>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {visible.length === 0 && (
        <p className="mt-6 rounded-xl border border-dashed border-[var(--r-line)] p-8 text-center text-[var(--r-ink-3)]">
          No entries match these filters. Try widening one.
        </p>
      )}
    </div>
  );
}
