import Link from "next/link";
import ResearchHeader from "@/components/research/ResearchHeader";
import ResearchFooter from "@/components/research/ResearchFooter";

export const metadata = {
  title: "About | Stacka Research",
  description:
    "Stacka is an independent research and engineering project under Fonio Labs, studying tokenized assets and TradFi–DeFi convergence in emerging markets, starting with Nigeria.",
};

const PRINCIPLES = [
  { title: "Emerging markets first", body: "Most tokenization analysis is written for US and European markets. We ask what it means for Nigeria and comparable economies." },
  { title: "Financial engineering, applied", body: "Pricing, risk and market-structure methods are used to test claims about tokenized assets, not just describe them, and turn the results into models and tools others can check." },
  { title: "Independent and disclosed", body: "No paid placements. Affiliations and positions are disclosed on every report." },
];

export default function AboutPage() {
  return (
    <div className="research min-h-screen">
      <ResearchHeader />
      <main>
        <section className="border-b border-[var(--r-line)]">
          <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <span className="m-label">About</span>
            <h1 className="r-display mt-4 text-4xl sm:text-5xl md:text-6xl">Research and engineering for how real-world finance moves onchain</h1>
            <p className="mt-8 text-xl leading-relaxed text-[var(--r-ink-2)]">
              Stacka is an independent research and engineering project under Fonio Labs. It studies and models tokenized stocks, ETFs and money market funds, and how traditional finance and DeFi connect, starting with Nigeria and its regulators, banks and crypto-native institutions.
            </p>
          </div>
        </section>

        <section className="border-b border-[var(--r-line)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.6fr] md:py-28 lg:px-8">
            <span className="m-label self-start justify-self-start">Why we exist</span>
            <div className="space-y-5 text-lg leading-relaxed text-[var(--r-ink-2)]">
              <p>
                Tokenization is turning securities and funds into programmable assets. Whether that expands access in emerging markets depends on details: legal structure, custody, redemption, regulation and the banking rails that connect people to the system.
              </p>
              <p>
                The work is led by someone building tokenized-finance products who is also completing a master&apos;s degree in financial engineering. The aim is to connect rigorous academic methods to how the financial sector actually works, through research, models and working tools.
              </p>
              <p>
                Stacka began as an investing app. It is now a research and engineering project: we study the market properly, then build models and tools on what we find.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--r-line)]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <span className="m-label">Principles</span>
            <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
              {PRINCIPLES.map((p) => (
                <article key={p.title} className="border-t border-[var(--r-ink)] pt-5">
                  <h2 className="r-display text-xl">{p.title}</h2>
                  <p className="mt-4 leading-relaxed text-[var(--r-ink-3)]">{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
            <h2 className="r-display text-3xl sm:text-4xl">Get in touch or follow along</h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--r-ink-2)]">
              Researchers, regulators, banks and builders working on tokenized assets in emerging markets: we want to hear from you.
            </p>
            <Link href="/waitlist" className="r-btn r-btn-primary mt-10">Get new research</Link>
          </div>
        </section>
      </main>
      <ResearchFooter />
    </div>
  );
}
