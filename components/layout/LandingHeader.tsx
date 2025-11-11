"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-accent-blue/10 to-transparent backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Stacka Logo" className="h-40 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/features"
              className="text-text-secondary hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="/how-it-works"
              className="text-text-secondary hover:text-white transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="/about"
              className="text-text-secondary hover:text-white transition-colors"
            >
              About
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/whitepaper.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost">White Paper</Button>
            </a>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-white hover:bg-background-hover transition-all"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/features"
              className="block py-2 text-text-secondary hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/how-it-works"
              className="block py-2 text-text-secondary hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link
              href="/about"
              className="block py-2 text-text-secondary hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <a
                href="/whitepaper.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" className="w-full">
                  White Paper
                </Button>
              </a>
              <Link href="/login">
                <Button variant="ghost" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
