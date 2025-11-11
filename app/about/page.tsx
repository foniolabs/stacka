"use client";

import { useEffect, useRef } from "react";
import LandingHeader from "@/components/layout/LandingHeader";
import LandingFooter from "@/components/layout/LandingFooter";
import { Target, Users, Mail, Globe } from "lucide-react";

export default function AboutPage() {
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
              About STACKA
            </h1>
            <p className="text-lg text-text-secondary">
              Building the operating system for wealth creation in emerging markets
            </p>
          </div>

          <p className="text-xl text-text-primary leading-relaxed">
            STACKA is building the operating system for wealth creation in
            emerging markets by unifying stocks, crypto and DeFi on stablecoin
            rails. Our mission is to democratize access to global investable
            assets with a mobile-first, low-cost experience.
          </p>
        </div>

        {/* Vision Section */}
        <div ref={addToRefs} className="opacity-0 mb-20">
          <div className="flex gap-6 mb-6">
            <div className="w-1 bg-primary rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                By 2030 we aim to reach <strong className="text-white">5M users</strong> and{" "}
                <strong className="text-white">$5B AUM</strong>. We measure success by real outcomes:
              </p>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-text-secondary">Students investing $10/month who retire comfortably</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-text-secondary">Single mothers building college funds</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-text-secondary">Diaspora supporting families back home</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div ref={addToRefs} className="opacity-0 mb-20">
          <div className="flex gap-6">
            <div className="w-1 bg-primary rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Team</h2>
              <p className="text-text-secondary leading-relaxed">
                Founded by <strong className="text-white">Emmanuel Doji</strong> (Founder & CEO, based in Jos),
                STACKA combines product, engineering and blockchain expertise to deliver an
                approachable platform for users across Africa and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div ref={addToRefs} className="opacity-0">
          <div className="flex gap-6">
            <div className="w-1 bg-primary rounded-full" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-6">Contact</h2>

              <div className="space-y-4">
                <a
                  href="mailto:admin@stacka.xyz"
                  className="flex items-center gap-4 p-4 border border-border-primary rounded-lg hover:border-primary hover:bg-background-elevated transition-all group"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-xs text-text-secondary mb-1">Email</div>
                    <div className="text-white group-hover:text-primary transition-colors">
                      admin@stacka.xyz
                    </div>
                  </div>
                </a>

                <a
                  href="https://stacka.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-border-primary rounded-lg hover:border-primary hover:bg-background-elevated transition-all group"
                >
                  <Globe className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-xs text-text-secondary mb-1">Website</div>
                    <div className="text-white group-hover:text-primary transition-colors">
                      stacka.xyz
                    </div>
                  </div>
                </a>
              </div>
            </div>
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
