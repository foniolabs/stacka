"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/#regulators", label: "Regulators" },
  { href: "/#banks", label: "Banks & fintechs" },
  { href: "/#investors", label: "Investors" },
  { href: "/#coverage", label: "Research" },
  { href: "/#engineering", label: "Engineering" },
  { href: "/about", label: "About" },
];

export default function ResearchHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur" style={{ backgroundColor: "rgba(236,235,230,0.88)" }}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Stacka home">
          <img src="/brand/stacka-lockup-light.svg" alt="Stacka" className="h-10 w-auto" />
          <span className="r-mono hidden border-l border-[var(--r-line)] pl-3 text-[var(--r-ink-3)] lg:inline">Research &amp; Engineering</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex lg:gap-8" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-[0.9375rem] text-[var(--r-ink-3)] transition-colors hover:text-[var(--r-ink)]">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/waitlist" className="r-btn r-btn-primary">Get research <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </div>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-[var(--r-line)] bg-[var(--r-canvas)] px-4 py-4 md:hidden" aria-label="Mobile">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-3 text-lg">
              {n.label}
            </Link>
          ))}
          <Link href="/waitlist" className="r-btn r-btn-primary mt-3 w-full justify-center">Get research</Link>
        </nav>
      )}
    </header>
  );
}
