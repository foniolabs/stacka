import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import LandingHeader from "@/components/layout/LandingHeader";
import LandingFooter from "@/components/layout/LandingFooter";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black">
      <LandingHeader />

      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <Link href="/">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-text-secondary mb-8">
            Last Updated: November 2025
          </p>

          <div className="bg-background-card border border-border-primary rounded-xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-text-secondary">
                By accessing or using STACKA's platform and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Services</h2>
              <p className="text-text-secondary mb-4">
                STACKA provides a unified investment platform that allows users to:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Invest in Nigerian stocks, US equities, and cryptocurrencies</li>
                <li>Access DeFi protocols and earn yields on stablecoins</li>
                <li>Manage digital assets through a USDC wallet</li>
                <li>Track portfolio performance across multiple asset classes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Eligibility</h2>
              <p className="text-text-secondary">
                You must be at least 18 years old and have the legal capacity to enter into these Terms. By using STACKA, you represent and warrant that you meet these requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Account Registration</h2>
              <p className="text-text-secondary mb-4">
                To use certain features of STACKA, you must register for an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Provide accurate and complete information during registration</li>
                <li>Keep your account credentials secure and confidential</li>
                <li>Notify us immediately of any unauthorized access to your account</li>
                <li>Be responsible for all activities conducted through your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Investment Risks</h2>
              <p className="text-text-secondary mb-4">
                You acknowledge and understand that:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>All investments carry risk, including the potential loss of principal</li>
                <li>Past performance does not guarantee future results</li>
                <li>Cryptocurrency and DeFi investments are highly volatile</li>
                <li>You should only invest what you can afford to lose</li>
                <li>STACKA does not provide financial, investment, or tax advice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Fees and Charges</h2>
              <p className="text-text-secondary">
                STACKA charges fees for certain services, including trading fees, subscription fees, and other transaction-related charges. All applicable fees will be clearly disclosed before you complete a transaction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Prohibited Activities</h2>
              <p className="text-text-secondary mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Use the platform for any illegal or unauthorized purpose</li>
                <li>Engage in market manipulation or fraudulent activities</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Create multiple accounts to circumvent restrictions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Intellectual Property</h2>
              <p className="text-text-secondary">
                All content, trademarks, logos, and intellectual property on the STACKA platform are owned by FONIO LABS Ltd. or our licensors. You may not use, reproduce, or distribute any content without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
              <p className="text-text-secondary">
                To the maximum extent permitted by law, STACKA and FONIO LABS Ltd. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
              <p className="text-text-secondary">
                We reserve the right to suspend or terminate your account at any time, with or without notice, for violation of these Terms or for any other reason we deem appropriate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Terms</h2>
              <p className="text-text-secondary">
                We may modify these Terms at any time. We will notify you of material changes via email or through the platform. Your continued use of STACKA after such modifications constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law</h2>
              <p className="text-text-secondary">
                These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Nigeria.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
              <p className="text-text-secondary">
                For questions about these Terms, please contact us at:
              </p>
              <p className="text-text-secondary mt-4">
                <strong className="text-white">FONIO LABS Ltd.</strong><br />
                Jos, Nigeria<br />
                Email: admin@stacka.xyz
              </p>
            </section>
          </div>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}
