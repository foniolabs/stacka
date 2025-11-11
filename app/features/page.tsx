"use client";

import { useEffect, useRef } from "react";
import LandingHeader from "@/components/layout/LandingHeader";
import LandingFooter from "@/components/layout/LandingFooter";
import {
  Coins,
  Zap,
  Globe,
  BarChart3,
} from "lucide-react";

export default function FeaturesPage() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-up");
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <LandingHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div ref={addToRefs} className="opacity-0 mb-20">
          <div className="border-l-4 border-primary pl-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Features
            </h1>
            <p className="text-lg text-text-secondary">
              Unifying stocks, crypto and DeFi into a single experience
            </p>
          </div>
        </div>

        {/* Key Differentiators */}
        <div ref={addToRefs} className="opacity-0 mb-20">
          <div className="flex gap-6">
            <div className="w-1 bg-primary rounded-full" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-8">
                Key Differentiators
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 border border-border-primary rounded-lg hover:border-primary transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Coins className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">Stablecoin Settlement</h3>
                      <p className="text-sm text-text-secondary">
                        USDC-based transactions — global, fast and cheap
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-border-primary rounded-lg hover:border-primary transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">Instant Wallet Creation</h3>
                      <p className="text-sm text-text-secondary">
                        Progressive KYC only when needed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-border-primary rounded-lg hover:border-primary transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">Fractional Assets</h3>
                      <p className="text-sm text-text-secondary">
                        Start investing from just $10
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-border-primary rounded-lg hover:border-primary transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <Globe className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">Unified Portfolio</h3>
                      <p className="text-sm text-text-secondary">
                        One dashboard across all asset classes
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-border-primary rounded-lg hover:border-primary transition-all md:col-span-2">
                  <div className="flex items-start gap-3 mb-2">
                    <Coins className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">DeFi Yield Integration</h3>
                      <p className="text-sm text-text-secondary">
                        Target 4–8% APY on idle funds
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trading & Execution */}
        <div ref={addToRefs} className="opacity-0 mb-20">
          <div className="flex gap-6">
            <div className="w-1 bg-primary rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Trading & Execution
              </h2>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                  <p className="text-text-secondary">
                    Broker integrations for Nigerian and US equities (fractional shares)
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                  <p className="text-text-secondary">
                    DEX aggregation for best crypto execution
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                  <p className="text-text-secondary">
                    Advanced order types coming (limit, stop-loss)
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security & Compliance */}
        <div ref={addToRefs} className="opacity-0 mb-20">
          <div className="flex gap-6">
            <div className="w-1 bg-primary rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Security & Compliance
              </h2>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                  <p className="text-text-secondary">
                    JWT auth, 2FA, biometric options
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                  <p className="text-text-secondary">
                    Audited smart contracts, time-locked admin functions
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                  <p className="text-text-secondary">
                    Custodial partners and insurance coverage
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Whitepaper Link */}
        <div ref={addToRefs} className="opacity-0">
          <div className="p-6 border border-border-primary rounded-lg hover:border-primary hover:bg-background-elevated transition-all">
            <p className="text-text-secondary">
              For the full technical and business description see the{" "}
              <a href="/whitepaper" className="text-primary hover:underline font-medium">
                whitepaper
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      <LandingFooter />

      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
