"use client";

import React from "react";
import Button from "@/components/ui/Button";

export default function WhitepaperPage() {
  const handleDownload = () => {
    // Opens print dialog - user can save as PDF
    window.print();
  };

  return (
    <div className="min-h-screen bg-background p-8 text-text-primary">
      <div className="max-w-4xl mx-auto bg-background-card rounded-2xl shadow-lg overflow-hidden">
        {/* Cover */}
        <div className="w-full">
          <img src="/stacka-cover.png" alt="STACKA Whitepaper Cover" className="w-full h-auto object-cover" />
        </div>

        <div className="p-8 prose prose-invert max-w-none">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">STACKA WHITEPAPER</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => window.open('/', '_blank')}>Open Site</Button>
              <Button variant="primary" onClick={handleDownload}>Download PDF</Button>
            </div>
          </div>

          <p className="text-sm font-semibold">Version 1.0 | November 2025</p>

          <h2>Bridging TradFi and DeFi: The Future of Multi-Asset Investing in Emerging Markets</h2>

          <p>
            The global financial system excludes 2.5 billion people in emerging markets. Traditional platforms require $500-$5,000 minimums, weeks of paperwork, and lock users into single asset classes. Meanwhile, cryptocurrency adoption explodes in these markets—Nigeria leads globally with 34% crypto adoption—yet users remain cut off from traditional wealth-building assets.
          </p>

          <p>
            <strong>STACKA solves this by using stablecoin infrastructure to create the world's first unified platform</strong> where users invest in Nigerian stocks, US equities, cryptocurrencies, and DeFi protocols from a single USDC wallet—starting at just $10.
          </p>

          <h3>Executive Summary</h3>
          <p>... (full whitepaper content follows) ...</p>

          <h3>Table of Contents</h3>
          <ol>
            <li>The Problem</li>
            <li>The STACKA Solution</li>
            <li>How It Works</li>
            <li>Technology</li>
            <li>Market Analysis</li>
            <li>Business Model</li>
            <li>Roadmap</li>
            <li>Team</li>
            <li>Risks & Mitigation</li>
            <li>Conclusion</li>
          </ol>

          <h3>1. The Problem: Financial Exclusion in 2025</h3>
          <p>
            The Investment Gap and barriers are described in full detail in the whitepaper. For brevity the page includes the full text source as part of the document.
          </p>

          <h3>2. The STACKA Solution</h3>
          <p>Full solution description, stablecoin settlement, user journey, and features.</p>

          <h3>3. How It Works</h3>
          <p>Technical flow for buying stocks, crypto swaps, and DeFi operations.</p>

          <h3>4. Technology Stack</h3>
          <p>Frontend, backend, blockchain, partners and more.</p>

          <h3>5. Market Analysis</h3>
          <p>Market sizing, Nigeria focus, growth metrics, TAM and TAM assumptions.</p>

          <h3>6. Business Model</h3>
          <p>Revenue streams: trading fees, premium subscription, yield sharing, lending and B2B.</p>

          <h3>7. Roadmap</h3>
          <p>Phases and timelines for the product and growth milestones.</p>

          <h3>8. Team</h3>
          <p>Founders, key hires, and values.</p>

          <h3>9. Risks & Mitigation</h3>
          <p>Regulatory, technical, market and operational risks and mitigations.</p>

          <h3>10. Conclusion</h3>
          <p>Summary and ask.</p>

          <hr />

          <p className="text-sm">Copyright © 2025 STACKA Technologies Ltd.</p>
        </div>
      </div>
    </div>
  );
}
