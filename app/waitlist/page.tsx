"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import ResearchHeader from "@/components/research/ResearchHeader";
import ResearchFooter from "@/components/research/ResearchFooter";

const WANTS = [
  "New reports on tokenized stocks, ETFs and money market funds",
  "Analysis of CBN and bank developments affecting tokenized assets in Nigeria",
  "Occasional notes on the research agenda and methods",
];

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Web3Forms (no backend needed)
      const formData = new FormData(e.target as HTMLFormElement);
      formData.append("access_key", "1403a1ee-9636-48fa-b7f8-af582678c03b");
      formData.append("subject", "New Stacka Research subscriber");
      formData.append("from_name", "Stacka Research");

      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setEmail("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Could not subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="research min-h-screen">
      <ResearchHeader />
      <main className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <span className="m-label">Subscribe</span>
            <h1 className="r-display mt-4 text-4xl sm:text-5xl">Get new research</h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--r-ink-2)]">
              Reports, models and tools on tokenized assets and the meeting of TradFi and DeFi in emerging markets, delivered when they are published.
            </p>
            <ul className="mt-8 space-y-4">
              {WANTS.map((w) => (
                <li key={w} className="flex items-start gap-3 text-[var(--r-ink-2)]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--r-brand)]" aria-hidden strokeWidth={1.5} />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="self-start r-card p-8 md:p-10">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="r-mono text-[var(--r-ink-3)]">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-describedby={error ? "form-error" : undefined}
                    className="mt-2 min-h-[48px] w-full rounded-lg border border-[var(--r-line)] bg-[#222220] px-4 text-base text-[var(--r-ink)] placeholder:text-[var(--r-ink-3)] focus:border-[var(--r-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--r-brand)]"
                  />
                </div>
                {error && <p id="form-error" role="alert" className="text-sm text-red-300">{error}</p>}
                <button type="submit" disabled={loading} className="r-btn r-btn-primary w-full justify-center disabled:opacity-60">
                  {loading ? (<><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Subscribing…</>) : "Subscribe"}
                </button>
                <p className="text-sm text-[var(--r-ink-3)]">
                  Research updates only. No investment tips, no sharing of your address. See our <Link className="r-link" href="/privacy">privacy policy</Link>.
                </p>
              </form>
            ) : (
              <div role="status" className="text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--r-brand)]" aria-hidden strokeWidth={1.5} />
                <h2 className="r-display mt-5 text-2xl">You&apos;re subscribed</h2>
                <p className="mt-3 text-[var(--r-ink-3)]">Thank you. We&apos;ll email you when new research is published.</p>
                <Link href="/" className="r-btn r-btn-ghost mt-6">Back to home</Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <ResearchFooter />
    </div>
  );
}
