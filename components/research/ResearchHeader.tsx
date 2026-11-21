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
    <header className="sticky top-0 z-50 backdrop-blur" style={{ backgroundColor: "rgba(236,235,230,0.9)" }}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Stacka home">
          <img src="/brand/stacka-lockup-light.svg" alt="Stacka" className="h-10 w-auto" />
        </Link>

        {/* Full navigation from 1024px up. Below that the menu button takes over. */}
        <nav className="hidden min-w-0 items-center gap-6 lg:flex xl:gap-8" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="whitespace-nowrap text-[0.9375rem] text-[var(--r-ink-3)] transition-colors hover:text-[var(--r-ink)]">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Link href="/waitlist" className="r-btn r-btn-primary whitespace-nowrap">Get research <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </div>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[var(--r-line)] bg-[var(--r-canvas)] px-4 py-4 sm:px-6 lg:hidden"
          aria-label="Mobile"
        >
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-[var(--r-line)] py-3.5 text-lg">
              {n.label}
            </Link>
          ))}
          <Link href="/waitlist" onClick={() => setOpen(false)} className="r-btn r-btn-primary mt-5 w-full justify-center">Get research</Link>
        </nav>
      )}
    </header>
  );
}
