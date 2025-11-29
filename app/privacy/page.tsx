import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import LandingHeader from "@/components/layout/LandingHeader";
import LandingFooter from "@/components/layout/LandingFooter";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-text-secondary mb-8">
            Last Updated: November 2025
          </p>

          <div className="bg-background-card border border-border-primary rounded-xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="text-text-secondary">
                FONIO LABS Ltd. ("STACKA," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Personal Information</h3>
              <p className="text-text-secondary mb-4">
                We may collect the following personal information:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Name, email address, and contact information</li>
                <li>Date of birth and identification documents (for KYC compliance)</li>
                <li>Financial information (bank account details, transaction history)</li>
                <li>Wallet addresses and cryptocurrency holdings</li>
                <li>Device information and IP addresses</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Automatically Collected Information</h3>
              <p className="text-text-secondary mb-4">
                We automatically collect:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Usage data (pages visited, features used, time spent)</li>
                <li>Device information (browser type, operating system)</li>
                <li>Location data (approximate location based on IP address)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-text-secondary mb-4">
                We use your information to:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and manage your account</li>
                <li>Comply with legal and regulatory requirements (KYC/AML)</li>
                <li>Prevent fraud and enhance security</li>
                <li>Communicate with you about updates, promotions, and support</li>
                <li>Analyze usage patterns and optimize user experience</li>
                <li>Personalize content and recommendations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-text-secondary mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li><strong className="text-white">Service Providers:</strong> Third-party vendors who perform services on our behalf (payment processing, KYC verification, cloud hosting)</li>
                <li><strong className="text-white">Regulatory Authorities:</strong> Government agencies, law enforcement, or regulatory bodies when required by law</li>
                <li><strong className="text-white">Business Partners:</strong> Licensed brokers and custodians who facilitate trading and asset custody</li>
                <li><strong className="text-white">Legal Compliance:</strong> To comply with subpoenas, court orders, or other legal processes</li>
              </ul>
              <p className="text-text-secondary mt-4">
                We do not sell your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
              <p className="text-text-secondary mb-4">
                We implement industry-standard security measures to protect your information, including:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Encryption of data in transit and at rest (TLS/SSL)</li>
                <li>Multi-factor authentication (MFA)</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and monitoring systems</li>
                <li>Secure cloud infrastructure with redundancy</li>
              </ul>
              <p className="text-text-secondary mt-4">
                However, no security system is impenetrable. We cannot guarantee the absolute security of your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
              <p className="text-text-secondary mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li><strong className="text-white">Access:</strong> Request a copy of your personal information</li>
                <li><strong className="text-white">Correction:</strong> Update or correct inaccurate information</li>
                <li><strong className="text-white">Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
                <li><strong className="text-white">Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong className="text-white">Objection:</strong> Object to certain processing activities</li>
                <li><strong className="text-white">Withdrawal:</strong> Withdraw consent for data processing (where applicable)</li>
              </ul>
              <p className="text-text-secondary mt-4">
                To exercise these rights, contact us at admin@stacka.xyz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="text-text-secondary">
                We use cookies, web beacons, and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can control cookie settings through your browser, but disabling cookies may limit functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
              <p className="text-text-secondary">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When no longer needed, we securely delete or anonymize your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>
              <p className="text-text-secondary">
                Your information may be transferred to and processed in countries outside Nigeria. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Children's Privacy</h2>
              <p className="text-text-secondary">
                STACKA is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If we learn that we have collected information from a child, we will promptly delete it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Policy</h2>
              <p className="text-text-secondary">
                We may update this Privacy Policy from time to time. We will notify you of material changes via email or through the platform. Your continued use of STACKA after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
              <p className="text-text-secondary">
                If you have questions or concerns about this Privacy Policy, please contact us:
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
