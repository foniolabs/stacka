"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ResearchHeader from "@/components/research/ResearchHeader";
import ResearchFooter from "@/components/research/ResearchFooter";
import { whitepaperContent } from "@/lib/whitepaper";

export default function WhitepaperPage() {
  return (
    <div className="research min-h-screen">
      <ResearchHeader />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <span className="m-label">Archive</span>
        <h1 className="r-display mt-4 text-4xl sm:text-5xl">Stacka product whitepaper</h1>
        <p className="mt-4 text-sm text-[var(--r-ink-3)]">Version 1.0 · November 2025</p>

        <div role="note" className="mt-8 border border-[var(--r-line)] bg-[var(--r-canvas-2)] p-5 text-[var(--r-ink-2)]">
          <p className="leading-relaxed">
            This document describes Stacka&apos;s earlier plan to build an investing app. Stacka is now an independent research and engineering project under Fonio Labs, so this paper is kept for reference only and does not describe a current product or offer.
          </p>
          <button type="button" onClick={() => window.print()} className="r-btn r-btn-ghost mt-4">Print or save as PDF</button>
        </div>

        <article className="prose max-w-none pt-10 prose-headings:font-medium prose-a:text-[#111] prose-table:text-sm min-w-0 [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_pre]:overflow-x-auto [&_code]:break-words [&_p]:break-words [&_li]:break-words">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {whitepaperContent}
          </ReactMarkdown>
          <hr />
          <p className="text-sm">Copyright © 2025 STACKA Technologies Ltd.</p>
        </article>
      </main>
      <ResearchFooter />
    </div>
  );
}
