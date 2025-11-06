"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, X, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";

export default function RebalancingAlert() {
  const [rebalancingStatus, setRebalancingStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetchRebalancingStatus();
  }, []);

  const fetchRebalancingStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:4000/api/v1/portfolio/rebalancing-status",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (data.success) {
        setRebalancingStatus(data.data);
      }
    } catch (err) {
      console.error("Fetch rebalancing status error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || dismissed || !rebalancingStatus) return null;

  // Only show if rebalancing is needed
  if (!rebalancingStatus.needsRebalancing) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6">
      <div className="flex gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-text-primary">
                Portfolio Rebalancing Needed
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                Your portfolio has drifted {rebalancingStatus.maxDrift}% from
                your target allocation
              </p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 hover:bg-surface-dark/50 rounded-lg transition"
            >
              <X className="w-4 h-4 text-text-secondary" />
            </button>
          </div>

          {/* Current vs Target */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="bg-surface-dark/50 rounded-lg p-2">
              <p className="text-xs text-text-secondary mb-1">Nigerian</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-text-primary">
                  {rebalancingStatus.currentAllocation?.nigerian?.toFixed(1)}%
                </span>
                <span className="text-xs text-text-tertiary">
                  → {rebalancingStatus.targetAllocation?.nigerian?.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="bg-surface-dark/50 rounded-lg p-2">
              <p className="text-xs text-text-secondary mb-1">DeFi</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-text-primary">
                  {rebalancingStatus.currentAllocation?.defi?.toFixed(1)}%
                </span>
                <span className="text-xs text-text-tertiary">
                  → {rebalancingStatus.targetAllocation?.defi?.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="bg-surface-dark/50 rounded-lg p-2">
              <p className="text-xs text-text-secondary mb-1">US</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-text-primary">
                  {rebalancingStatus.currentAllocation?.us?.toFixed(1)}%
                </span>
                <span className="text-xs text-text-tertiary">
                  → {rebalancingStatus.targetAllocation?.us?.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          {rebalancingStatus.suggestions &&
            rebalancingStatus.suggestions.length > 0 && (
              <div className="space-y-2 mb-3">
                <p className="text-xs font-medium text-text-primary">
                  Suggested Actions:
                </p>
                {rebalancingStatus.suggestions.map(
                  (suggestion: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm bg-surface-dark/30 rounded-lg p-2"
                    >
                      <div className="flex items-center gap-2">
                        {suggestion.action === "BUY" ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-text-primary">
                          {suggestion.action} {suggestion.category}
                        </span>
                      </div>
                      <span className="font-semibold text-text-primary">
                        ${suggestion.amount}
                      </span>
                    </div>
                  )
                )}
              </div>
            )}

          {/* CTA */}
          <div className="flex gap-2">
            <Link
              href="/smart-split"
              className="flex-1 bg-primary hover:bg-primary-dark text-white text-sm font-semibold py-2 rounded-lg text-center transition"
            >
              Review Allocation
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="px-4 bg-surface-dark hover:bg-surface-dark/80 text-text-primary text-sm font-semibold rounded-lg transition"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
