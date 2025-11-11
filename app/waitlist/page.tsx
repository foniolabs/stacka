"use client";

import { useState } from "react";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Using Web3Forms (free, no backend needed)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // You'll need to get this from web3forms.com
          email: email,
          subject: "New STACKA Waitlist Signup",
          from_name: "STACKA Waitlist",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to join waitlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/stacka-logo.svg"
            alt="STACKA"
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Join the Waitlist
          </h1>
          <p className="text-xl text-text-secondary">
            Be among the first to access STACKA when we launch
          </p>
        </div>

        {!submitted ? (
          <div className="bg-background-card border border-border-primary rounded-2xl p-8 md:p-12">
            {/* Benefits */}
            <div className="mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Early Access</h3>
                  <p className="text-text-secondary text-sm">
                    Get priority access before the public launch
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Exclusive Benefits
                  </h3>
                  <p className="text-text-secondary text-sm">
                    Special perks and bonuses for early adopters
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Launch Updates
                  </h3>
                  <p className="text-text-secondary text-sm">
                    Stay informed about our progress and launch date
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 bg-background border border-border-primary rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="w-full py-4 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join Waitlist"
                )}
              </Button>
            </form>

            <p className="text-text-secondary text-sm text-center mt-6">
              We respect your privacy. No spam, ever.
            </p>
          </div>
        ) : (
          <div className="bg-background-card border border-primary rounded-2xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              You're on the list!
            </h2>
            <p className="text-text-secondary mb-6">
              Thank you for joining the STACKA waitlist. We'll keep you updated on
              our launch progress.
            </p>
            <Button
              variant="ghost"
              onClick={() => (window.location.href = "/")}
              className="mx-auto"
            >
              Back to Home
            </Button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              500M+
            </div>
            <div className="text-sm text-text-secondary">
              Addressable Users
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              $10
            </div>
            <div className="text-sm text-text-secondary">
              Min. Investment
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              24/7
            </div>
            <div className="text-sm text-text-secondary">
              Trading Access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
