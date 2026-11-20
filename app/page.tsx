import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ResearchHeader from "@/components/research/ResearchHeader";
import ResearchFooter from "@/components/research/ResearchFooter";
import ReportViewer from "@/components/research/ReportViewer";
import Newsletter from "@/components/research/Newsletter";
import { GridThumb, HourglassArt, IllusPanel } from "@/components/research/Illustrations";

type Audience = {
  id: string;
  label: string;
  title: string;
  body: string;
  variant: "diamond" | "circles" | "capsules";
  tiles?: string[];
  links?: { label: string; href: string }[];
  href: string;
};

const AUDIENCES: Audience[] = [
  {
    id: "regulators",
    label: "Regulators",
    title: "Clear analysis for policymakers and regulators",
    body: "How tokenized securities and funds fit within CBN and securities rules in Nigeria, and where the gaps are, mapped rule by rule.",
    variant: "diamond",
    tiles: ["CBN", "SEC Nigeria", "Stablecoins"],
    href: "/#nigeria",
  },
  {
    id: "banks",
    label: "Banks & fintechs",
    title: "Evidence for institutions entering tokenized markets",
    body: "On-ramps, custody and settlement: how incumbent banks and new financial institutions can work with tokenized assets, and what it costs.",
    variant: "circles",
    tiles: ["Custody", "On-ramps", "Settlement"],
    href: "/#coverage",
  },
  {
    id: "investors",
    label: "Investors",
    title: "Know exactly what you hold onchain",
    body: "Structure, pricing, redemption and risk for tokenized equities, ETFs and money market funds, explained from primary sources.",
    variant: "capsules",
    links: [
      { label: "Tokenized equities", href: "/#coverage" },
      { label: "Tokenized ETFs", href: "/#coverage" },
      { label: "Money market funds", href: "/#coverage" },
      { label: "Risk", href: "/#agenda" },
    ],
    href: "/#agenda",
  },
];

const TOOLS = [
  {
    title: "Nigeria rules tracker",
    status: "Preview",
    href: "/tracker",
    companion: "Companion to report 03",
    body: "A dated, structured record of CBN and SEC Nigeria rules on tokenized securities, funds and stablecoins, with a primary-source link for every entry.",
    points: [
      "Status for each rule: draft, in force or superseded",
      "Mapped to activities: issue, hold, offer, transfer",
      "Every entry links to the primary document",
    ],
    method: "Built from primary documents. Where sources disagree, the conflict is flagged, not smoothed over.",
  },
  {
    title: "NAV and premium/discount monitor",
    status: "Planned",
    companion: "Companion to report 02",
    body: "An open tracker of how tokenized money market funds, ETFs and equities trade against their net asset value, with the method and data sources published.",
    points: [
      "Premium and discount versus NAV over time",
      "Effect of redemption windows and mint and redeem schedules",
      "Method, assumptions and data sources documented",
    ],
    method: "Open method. Assets that rarely trade are shown against NAV only, with no invented price.",
  },
];

const NIGERIA = [
  { title: "Regulators", body: "How monetary and securities rules shape what can be issued, held and offered." },
  { title: "Traditional banks", body: "Incumbent banks as on- and off-ramps, custodians and settlement partners." },
  { title: "Crypto-native banks", body: "How new institutions and dollar stablecoins already move value." },
];

const METHOD = [
  { title: "Primary sources", body: "Filings, regulation and onchain data" },
  { title: "Open models and code", body: "Methods published, code shared where we can" },
  { title: "Disclosed interests", body: "No paid placements, ever" },
];

function Discover({ href, children = "Discover" }: { href: string; children?: React.ReactNode }) {
  return (
    <Link href={href} className="m-discover">
      {children}
      <span className="m-dot"><ArrowRight className="h-4 w-4" aria-hidden /></span>
    </Link>
  );
}

function Trio({ items, linkHref }: { items: { title: string; body: string }[]; linkHref: string }) {
  return (
    <div className="mt-14 grid divide-y divide-[var(--r-line)] border-y border-[var(--r-line)] md:grid-cols-3 md:divide-x md:divide-y-0">
      {items.map((it) => (
        <div key={it.title} className="px-6 py-10 text-center">
          <h3 className="r-display text-2xl">{it.title}</h3>
          <p className="mx-auto mt-3 max-w-[16rem] text-[0.9375rem] leading-relaxed text-[var(--r-ink-3)]">{it.body}</p>
          <Link href={linkHref} className="m-more mt-6">Read more <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="research min-h-screen">
      <ResearchHeader />

      <main>
        {/* Hero: framed blueprint grid with converging line art */}
        <section>
          <div className="m-frame mx-auto">
            <div className="m-grid" />
            <HourglassArt />
            <div className="relative mx-auto grid min-h-[30rem] max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28 lg:px-8">
              <div>
                <h1 className="r-display r-reveal max-w-xl text-5xl sm:text-6xl lg:text-[4.25rem]">Open research and engineering for tokenized finance</h1>
                <p className="r-reveal mt-7 max-w-md text-lg leading-relaxed text-[var(--r-ink-2)]" style={{ animationDelay: ".08s" }}>
                  Independent research, models and tooling for tokenized stocks, ETFs and money market funds, and how TradFi and DeFi connect in emerging markets, starting with Nigeria.
                </p>
              </div>
              <dl className="r-reveal flex flex-row flex-wrap gap-x-10 gap-y-6 md:flex-col md:items-end md:gap-9" style={{ animationDelay: ".16s" }}>
                <div className="md:text-right">
                  <dt className="r-mono text-[var(--r-ink-3)]">Reports on the agenda</dt>
                  <dd className="r-display mt-2 text-4xl md:text-5xl">5</dd>
                </div>
                <div className="md:text-right">
                  <dt className="r-mono text-[var(--r-ink-3)]">Coverage areas</dt>
                  <dd className="r-display mt-2 text-4xl md:text-5xl">4</dd>
                </div>
                <div className="md:text-right">
                  <dt className="r-mono text-[var(--r-ink-3)]">Tools in development</dt>
                  <dd className="r-display mt-2 text-4xl md:text-5xl">{TOOLS.length}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Three audiences */}
        {AUDIENCES.map((a) => (
          <section key={a.id} id={a.id} className="scroll-mt-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-16 md:py-24 lg:px-8">
              <div>
                <span className="m-label">{a.label}</span>
                <h2 className="r-display mt-5 max-w-md text-3xl sm:text-4xl">{a.title}</h2>
                <p className="mt-5 max-w-md leading-relaxed text-[var(--r-ink-3)]">{a.body}</p>
                <div className="mt-7"><Discover href={a.href} /></div>
                {a.tiles && (
                  <div className="mt-10 flex flex-wrap gap-2">
                    {a.tiles.map((t) => <span key={t} className="m-tile">{t}</span>)}
                  </div>
                )}
                {a.links && (
                  <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[0.9375rem]">
                    {a.links.map((l) => (
                      <li key={l.label}><Link href={l.href} className="m-more">{l.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></Link></li>
                    ))}
                  </ul>
                )}
              </div>
              <IllusPanel variant={a.variant} />
            </div>
          </section>
        ))}

        {/* Coverage: foundations tree */}
        <section id="coverage" className="scroll-mt-20 border-t border-[var(--r-line)]">
          <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
            <span className="m-label">Coverage</span>
            <h2 className="r-display mt-5 text-3xl sm:text-4xl md:text-5xl">The assets and markets we study</h2>
            <div className="mx-auto mt-14 max-w-2xl text-left">
              <article className="m-node mx-auto max-w-xs">
                <GridThumb shape="square-circle" />
                <div className="m-node-foot"><span>Tokenized equities</span><ArrowUpRight className="h-4 w-4 opacity-60" aria-hidden /></div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--r-ink-3)]">What holders own versus a synthetic price exposure.</p>
              </article>
              <div className="m-conn-stem hidden sm:block" aria-hidden />
              <div className="m-conn mx-auto hidden w-1/2 sm:block" aria-hidden />
              <div className="mt-4 grid gap-4 sm:mt-0 sm:grid-cols-2">
                <article className="m-node m-node-dark">
                  <GridThumb shape="double-circle" tone="dark" />
                  <div className="m-node-foot"><span>Tokenized ETFs</span><ArrowUpRight className="h-4 w-4 opacity-60" aria-hidden /></div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--r-ink-3)]">NAV integrity, creation and redemption, secondary liquidity.</p>
                </article>
                <article className="m-node m-node-dark">
                  <GridThumb shape="circle" tone="dark" />
                  <div className="m-node-foot"><span>Money market funds</span><ArrowUpRight className="h-4 w-4 opacity-60" aria-hidden /></div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--r-ink-3)]">Tokenized treasuries as collateral, yield and settlement asset.</p>
                </article>
              </div>
            </div>
            <p className="mx-auto mt-10 max-w-md text-sm leading-relaxed text-[var(--r-ink-3)]">
              Across all three we study and model market structure: custody, oracles, compliance layers and settlement.
            </p>
          </div>
        </section>

        {/* Engineering */}
        <section id="engineering" className="scroll-mt-20 border-t border-[var(--r-line)]">
          <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
            <span className="m-label">Engineering</span>
            <h2 className="r-display mt-5 text-3xl sm:text-4xl md:text-5xl">Models and tools, built in the open</h2>
            <p className="mx-auto mt-5 max-w-xl text-[var(--r-ink-3)]">
              Alongside each report we build the model or tool behind it, so the results can be checked and reused.
            </p>
            <div className="mt-14 grid gap-4 text-left md:grid-cols-2">
              {TOOLS.map((t, i) => {
                const dark = i === 1;
                return (
                  <article key={t.title} className={`m-node ${dark ? "m-node-dark" : ""} !p-8`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className={`m-label ${dark ? "!border-white/25 !bg-white/5 !text-[#cdccc6]" : ""}`}>{t.status}</span>
                      <span className="r-mono text-right opacity-60">{t.companion}</span>
                    </div>
                    <h3 className="r-display mt-8 text-2xl">{t.title}</h3>
                    <p className="mt-3 leading-relaxed opacity-75">{t.body}</p>
                    <ul className={`mt-6 space-y-2.5 border-t pt-5 text-[0.9375rem] ${dark ? "border-white/20" : "border-black/15"}`}>
                      {t.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-sm opacity-60">{t.method}</p>
                    {t.href && (
                      <Link href={t.href} className="m-more mt-5">Open the tracker <ArrowRight className="h-4 w-4" aria-hidden /></Link>
                    )}
                  </article>
                );
              })}
            </div>
            <div className="mt-10 flex justify-center"><Discover href="/waitlist">Follow progress</Discover></div>
          </div>
        </section>

        {/* Nigeria */}
        <section id="nigeria" className="scroll-mt-20 border-t border-[var(--r-line)]">
          <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
            <span className="m-label">Starting in Nigeria</span>
            <h2 className="r-display mt-5 text-3xl sm:text-4xl md:text-5xl">Where the CBN, banks and crypto meet</h2>
            <p className="mx-auto mt-5 max-w-xl text-[var(--r-ink-3)]">
              Tokenized assets matter in emerging markets only if regulators, banks and new institutions can work with them.
            </p>
            <Trio items={NIGERIA} linkHref="/#agenda" />
          </div>
        </section>

        {/* Open by default: tabbed report viewer + three columns */}
        <section id="method" className="scroll-mt-20 border-t border-[var(--r-line)]">
          <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
            <h2 className="r-display text-3xl sm:text-4xl md:text-5xl">Open by default, rigorous by design</h2>
            <p className="mx-auto mt-5 max-w-xl text-[var(--r-ink-3)]">Every claim is sourced, every model is inspectable, every interest is disclosed.</p>
            <div id="agenda" className="mt-14 scroll-mt-24 text-left">
              <ReportViewer />
            </div>
            <Trio items={METHOD} linkHref="/about" />
          </div>
        </section>

        {/* Newsletter */}
        <section className="border-t border-[var(--r-line)]">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
            <h2 className="r-display text-3xl sm:text-4xl">Stay in the loop.<br />Get the latest from Stacka Research.</h2>
            <div className="md:justify-self-end"><Newsletter /></div>
          </div>
        </section>
      </main>

      <ResearchFooter />
    </div>
  );
}
