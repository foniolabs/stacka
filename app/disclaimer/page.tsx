import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";
import LandingHeader from "@/components/layout/LandingHeader";
import LandingFooter from "@/components/layout/LandingFooter";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-black">
      <LandingHeader />

      <div className="flex items-center justify-center min-h-[80vh] px-4 pt-24">
        <div className="max-w-2xl w-full text-center">
          <div className="w-24 h-24 bg-accent-orange/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertTriangle className="w-12 h-12 text-accent-orange" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Coming Soon
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary mb-4">
            Risk Disclaimer
          </p>

          <p className="text-text-secondary mb-12 max-w-xl mx-auto">
            Our comprehensive risk disclosure documentation is being finalized. All investments carry risk, and past performance does not guarantee future results. Please invest responsibly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary" className="gap-2">
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>
            <Link href="/waitlist">
              <Button variant="ghost">Join Waitlist</Button>
            </Link>
          </div>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}
