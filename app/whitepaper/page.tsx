"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Button from "@/components/ui/Button";

export default function WhitepaperPage() {
  const [md, setMd] = useState<string>("");

  useEffect(() => {
    fetch("/whitepaper.md")
      .then((res) => res.text())
      .then((text) => setMd(text))
      .catch(() => setMd("# STACKA WHITEPAPER\n\nContent not available."));
  }, []);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background p-8 text-text-primary">
      <div className="max-w-4xl mx-auto bg-background-card rounded-2xl shadow-lg overflow-hidden">
        {/* Cover Image */}
        <div className="w-full">
          <img
            src="/Stacka-cover.png"
            alt="STACKA Whitepaper Cover"
            className="w-full h-auto object-cover"
          />
        </div>
        {/* Header */}
        <div className="w-full p-6 flex items-center gap-4">
          <img src="/stacka-logo.svg" alt="STACKA" className="h-12 w-auto" />
          <div>
            <h1 className="text-2xl font-bold">STACKA WHITEPAPER</h1>
            <p className="text-sm text-text-secondary">
              Version 1.0 | November 2025
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" onClick={() => window.open("/", "_blank")}>
              Open Site
            </Button>
            <Button variant="primary" onClick={handleDownload}>
              Download PDF
            </Button>
          </div>
        </div>

        <div className="p-8 prose prose-invert max-w-none">
          {md ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {md}
            </ReactMarkdown>
          ) : (
            <p>Loading...</p>
          )}

          <hr />

          <p className="text-sm">Copyright © 2025 STACKA Technologies Ltd.</p>
        </div>
      </div>
    </div>
  );
}
