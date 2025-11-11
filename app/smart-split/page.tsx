"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Save, Trash2, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface AllocationBreakdown {
  [key: string]: number;
}

interface AllocationPreference {
  id?: string;
  name: string;
  nigerianPercent: number;
  defiPercent: number;
  usPercent: number;
  nigerianBreakdown: AllocationBreakdown;
  usBreakdown: AllocationBreakdown;
  defiBreakdown: AllocationBreakdown;
}

export default function SmartSplitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Main allocation percentages
  const [nigerianPercent, setNigerianPercent] = useState(40);
  const [defiPercent, setDefiPercent] = useState(30);
  const [usPercent, setUsPercent] = useState(30);

  // Sub-allocations (Nigerian)
  const [dangotePercent, setDangotePercent] = useState(30);
  const [mtnPercent, setMtnPercent] = useState(25);
  const [armPercent, setArmPercent] = useState(45);

  // Sub-allocations (US)
  const [applePercent, setApplePercent] = useState(33);
  const [spyPercent, setSpyPercent] = useState(67);

  // Sub-allocations (DeFi)
  const [aavePercent, setAavePercent] = useState(50);
  const [compoundPercent, setCompoundPercent] = useState(50);

  const totalPercent = nigerianPercent + defiPercent + usPercent;
  const nigerianSubTotal = dangotePercent + mtnPercent + armPercent;
  const usSubTotal = applePercent + spyPercent;
  const defiSubTotal = aavePercent + compoundPercent;

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:4000/api/v1/allocation/preferences",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.success && data.data.preference) {
        const pref = data.data.preference;
        setNigerianPercent(pref.nigerianPercent || 0);
        setDefiPercent(pref.defiPercent || 0);
        setUsPercent(pref.usPercent || 0);

        // Nigerian breakdown
        if (pref.nigerianBreakdown) {
          setDangotePercent(pref.nigerianBreakdown.DANGOTE || 0);
          setMtnPercent(pref.nigerianBreakdown.MTN || 0);
          setArmPercent(pref.nigerianBreakdown.ARM || 0);
        }

        // US breakdown
        if (pref.usBreakdown) {
          setApplePercent(pref.usBreakdown.AAPL || 0);
          setSpyPercent(pref.usBreakdown.SPY || 0);
        }

        // DeFi breakdown
        if (pref.defiBreakdown) {
          setAavePercent(pref.defiBreakdown.AAVE || 0);
          setCompoundPercent(pref.defiBreakdown.COMPOUND || 0);
        }
      }
    } catch (err: any) {
      console.error("Load preferences error:", err);
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    setError("");
    setSuccess("");

    // Validation
    if (Math.abs(totalPercent - 100) > 0.01) {
      setError(
        `Total allocation must equal 100%. Current: ${totalPercent.toFixed(1)}%`
      );
      return;
    }

    if (nigerianPercent > 0 && Math.abs(nigerianSubTotal - 100) > 0.01) {
      setError(
        `Nigerian stocks breakdown must equal 100%. Current: ${nigerianSubTotal.toFixed(
          1
        )}%`
      );
      return;
    }

    if (usPercent > 0 && Math.abs(usSubTotal - 100) > 0.01) {
      setError(
        `US stocks breakdown must equal 100%. Current: ${usSubTotal.toFixed(
          1
        )}%`
      );
      return;
    }

    if (defiPercent > 0 && Math.abs(defiSubTotal - 100) > 0.01) {
      setError(
        `DeFi breakdown must equal 100%. Current: ${defiSubTotal.toFixed(1)}%`
      );
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      const payload: AllocationPreference = {
        name: "My Smart Split",
        nigerianPercent,
        defiPercent,
        usPercent,
        nigerianBreakdown: {
          DANGOTE: dangotePercent,
          MTN: mtnPercent,
          ARM: armPercent,
        },
        usBreakdown: {
          AAPL: applePercent,
          SPY: spyPercent,
        },
        defiBreakdown: {
          AAVE: aavePercent,
          COMPOUND: compoundPercent,
        },
      };

      const response = await fetch(
        "http://localhost:4000/api/v1/allocation/preferences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (data.success) {
        setSuccess("Smart Split preferences saved successfully! 🎉");
        setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        setError(data.message || "Failed to save preferences");
      }
    } catch (err: any) {
      setError(err.message || "Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  const deletePreferences = async () => {
    if (
      !confirm("Are you sure you want to delete your Smart Split preferences?")
    )
      return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:4000/api/v1/allocation/preferences",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setSuccess("Preferences deleted");
        // Reset to defaults
        setNigerianPercent(40);
        setDefiPercent(30);
        setUsPercent(30);
        setDangotePercent(30);
        setMtnPercent(25);
        setArmPercent(45);
        setApplePercent(33);
        setSpyPercent(67);
        setAavePercent(50);
        setCompoundPercent(50);
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete preferences");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-surface-dark rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5 text-text-primary" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                Smart Split
              </h1>
              <p className="text-text-secondary text-sm">
                Set your preferred allocation and invest with one click
              </p>
            </div>
          </div>
          <button
            onClick={deletePreferences}
            className="p-2 hover:bg-red-500/10 rounded-lg transition text-red-500"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 flex gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-text-primary">
            <p className="font-medium mb-1">How Smart Split Works</p>
            <p className="text-text-secondary">
              Set your ideal allocation once. Every time you deposit funds, just
              tap "Use Smart Split" and we'll automatically invest across all
              your preferred assets in the exact ratios you've set.
            </p>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-500">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6 text-green-500">
            {success}
          </div>
        )}

        {/* Main Allocation */}
        <div className="bg-surface rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Main Allocation
          </h2>
          <div className="space-y-6">
            {/* Nigerian */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-text-primary font-medium">
                  Nigerian Stocks
                </label>
                <span className="text-primary font-bold">
                  {nigerianPercent}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={nigerianPercent}
                onChange={(e) => setNigerianPercent(Number(e.target.value))}
                className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* DeFi */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-text-primary font-medium">
                  DeFi Yields
                </label>
                <span className="text-primary font-bold">{defiPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={defiPercent}
                onChange={(e) => setDefiPercent(Number(e.target.value))}
                className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* US */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-text-primary font-medium">
                  US Stocks
                </label>
                <span className="text-primary font-bold">{usPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={usPercent}
                onChange={(e) => setUsPercent(Number(e.target.value))}
                className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-border">
              <div className="flex justify-between">
                <span className="text-text-primary font-semibold">Total</span>
                <span
                  className={`font-bold ${
                    Math.abs(totalPercent - 100) < 0.01
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {totalPercent.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Nigerian Stocks Breakdown */}
        {nigerianPercent > 0 && (
          <div className="bg-surface rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Nigerian Stocks Breakdown
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-text-primary">Dangote Cement</label>
                  <span className="text-primary font-bold">
                    {dangotePercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dangotePercent}
                  onChange={(e) => setDangotePercent(Number(e.target.value))}
                  className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-text-primary">MTN Nigeria</label>
                  <span className="text-primary font-bold">{mtnPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={mtnPercent}
                  onChange={(e) => setMtnPercent(Number(e.target.value))}
                  className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-text-primary">ARM Money Market</label>
                  <span className="text-primary font-bold">{armPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={armPercent}
                  onChange={(e) => setArmPercent(Number(e.target.value))}
                  className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-text-primary font-semibold">
                    Subtotal
                  </span>
                  <span
                    className={`font-bold ${
                      Math.abs(nigerianSubTotal - 100) < 0.01
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {nigerianSubTotal.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* US Stocks Breakdown */}
        {usPercent > 0 && (
          <div className="bg-surface rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              US Stocks Breakdown
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-text-primary">Apple (AAPL)</label>
                  <span className="text-primary font-bold">
                    {applePercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={applePercent}
                  onChange={(e) => setApplePercent(Number(e.target.value))}
                  className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-text-primary">S&P 500 ETF (SPY)</label>
                  <span className="text-primary font-bold">{spyPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={spyPercent}
                  onChange={(e) => setSpyPercent(Number(e.target.value))}
                  className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-text-primary font-semibold">
                    Subtotal
                  </span>
                  <span
                    className={`font-bold ${
                      Math.abs(usSubTotal - 100) < 0.01
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {usSubTotal.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DeFi Breakdown */}
        {defiPercent > 0 && (
          <div className="bg-surface rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              DeFi Yields Breakdown
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-text-primary">Aave Protocol</label>
                  <span className="text-primary font-bold">{aavePercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={aavePercent}
                  onChange={(e) => setAavePercent(Number(e.target.value))}
                  className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-text-primary">Compound Finance</label>
                  <span className="text-primary font-bold">
                    {compoundPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={compoundPercent}
                  onChange={(e) => setCompoundPercent(Number(e.target.value))}
                  className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-text-primary font-semibold">
                    Subtotal
                  </span>
                  <span
                    className={`font-bold ${
                      Math.abs(defiSubTotal - 100) < 0.01
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {defiSubTotal.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <Button
          variant="primary"
          onClick={savePreferences}
          disabled={saving || Math.abs(totalPercent - 100) > 0.01}
          className="w-full py-4 flex items-center justify-center gap-2 text-lg"
        >
          <Save className="w-5 h-5" />
          {saving ? "Saving..." : "Save Smart Split Preferences"}
        </Button>
      </div>
    </div>
  );
}
