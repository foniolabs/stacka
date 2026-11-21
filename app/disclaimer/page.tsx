import ResearchHeader from "@/components/research/ResearchHeader";
import ResearchFooter from "@/components/research/ResearchFooter";

export const metadata = {
  title: "Disclaimer | Stacka",
  description: "Stacka publishes research, models and tools for information only. This is not investment, legal or tax advice.",
};

const SECTIONS = [
  {
    title: "Not advice",
    body: "Stacka publishes research, models and tools for educational and informational purposes only. Nothing on this site is investment, legal, tax or accounting advice, or an offer or solicitation to buy or sell any security, fund or digital asset.",
  },
  {
    title: "No guarantee of accuracy",
    body: "We work from primary sources where we can and label what is not yet verified. Rules, markets and prices change, so information may be out of date by the time you read it. Check the primary source and take professional advice before you act on anything here.",
  },
  {
    title: "Risk",
    body: "Tokenized and digital assets carry risks, including loss of capital, custody and counterparty risk, limited or unavailable redemption, legal and regulatory change, and technology failure. Past performance does not guarantee future results.",
  },
  {
    title: "Trackers and models",
    body: "The Nigeria rules tracker and any model or tool we publish are research aids. They are not legal opinions, valuations or recommendations. Entries marked Draft or Unconfirmed may change or turn out to be wrong.",
  },
  {
    title: "Interests",
    body: "Fonio Labs and its authors may have professional or financial interests in topics we cover. Where relevant, they are disclosed on the specific report.",
  },
  {
    title: "Contact",
    body: "Questions or corrections: admin@stacka.xyz.",
  },
];

export default function DisclaimerPage() {
  return (
    <div className="research min-h-screen">
      <ResearchHeader />
      <main>
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <h1 className="r-display text-4xl sm:text-5xl">Disclaimer</h1>
          <p className="r-mono mt-4 text-[var(--r-ink-3)]">Last updated: November 2026</p>
          <div className="mt-12 space-y-8">
            {SECTIONS.map((s) => (
              <section key={s.title} className="border-t border-[var(--r-ink)] pt-5">
                <h2 className="r-display text-2xl">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-[var(--r-ink-2)]">{s.body}</p>
              </section>
            ))}
          </div>
        </section>
      </main>
      <ResearchFooter />
    </div>
  );
}
