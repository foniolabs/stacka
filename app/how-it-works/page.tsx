"use client";

import { useEffect, useRef } from "react";
import LandingHeader from "@/components/layout/LandingHeader";
import LandingFooter from "@/components/layout/LandingFooter";

export default function HowItWorksPage() {
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
              How it Works
            </h1>
            <p className="text-lg text-text-secondary">
              Abstracting blockchains and brokers for seamless investing
            </p>
          </div>

          <p className="text-xl text-text-primary leading-relaxed">
            STACKA abstracts blockchains and brokers so users can invest across
            asset classes using a single USDC wallet. Below are example flows.
          </p>
        </div>

        {/* Nigerian Stock Flow */}
        <div ref={addToRefs} className="opacity-0 mb-20">
          <div className="flex gap-6">
            <div className="w-1 bg-primary rounded-full" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-6">
                Buying Nigerian Stock (MTN)
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                    1
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-text-secondary">
                      User selects amount to buy (e.g. <span className="text-white font-medium">$50</span>)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-text-secondary">
                      STACKA validates balance and routes order to a broker API
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-text-secondary">
                      Broker executes; STACKA mints a tokenized receipt to the user's wallet
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                    4
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-text-secondary">
                      The custodian holds the underlying shares on behalf of users
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Crypto Flow */}
        <div ref={addToRefs} className="opacity-0 mb-20">
          <div className="flex gap-6">
            <div className="w-1 bg-primary rounded-full" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-6">
                Buying Crypto (ETH)
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                    1
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-text-secondary">
                      STACKA routes the swap to a DEX aggregator (1inch/0x)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-text-secondary">
                      Best execution across liquidity sources is chosen
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-text-secondary">
                      Smart contract swaps <span className="text-white font-medium">USDC → ETH</span> and delivers ETH to the user's wallet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DeFi Flow */}
        <div ref={addToRefs} className="opacity-0 mb-20">
          <div className="flex gap-6">
            <div className="w-1 bg-primary rounded-full" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-6">
                DeFi Staking (Aave example)
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                    1
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-text-secondary">
                      User deposits USDC
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-text-secondary">
                      STACKA deploys funds to an audited contract that interacts with Aave
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-text-secondary">
                      User earns APY and can withdraw anytime
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div ref={addToRefs} className="opacity-0 mb-20">
          <div className="p-6 border border-border-primary rounded-lg">
            <p className="text-text-secondary">
              <strong className="text-white">Security:</strong> contracts are audited, admin functions are time-locked, and multi-sig controls protect funds.
            </p>
          </div>
        </div>

        {/* Whitepaper Link */}
        <div ref={addToRefs} className="opacity-0">
          <div className="p-6 border border-border-primary rounded-lg hover:border-primary hover:bg-background-elevated transition-all">
            <p className="text-text-secondary">
              See{" "}
              <a href="/whitepaper" className="text-primary hover:underline font-medium">
                the whitepaper
              </a>
              {" "}for detailed diagrams and the full technical architecture.
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
