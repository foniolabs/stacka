"use client";

import { useEffect } from "react";
import { useWalletStore } from "@/store/walletStore";
import { formatCurrency } from "@/lib/utils";

export default function BalanceBadge() {
  const { balance, isLoading, fetchBalance } = useWalletStore();

  useEffect(() => {
    // Ensure balance is loaded when header mounts
    fetchBalance().catch(() => {});
    // Intentionally no interval here — pages control when to refetch.
  }, [fetchBalance]);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => fetchBalance().catch(() => {})}
        className="px-3 py-1 rounded-lg bg-background-hover text-sm text-text-secondary hover:text-white transition-colors"
        title="Refresh balance"
      >
        {isLoading ? "Loading..." : formatCurrency(balance || 0)}
      </button>
    </div>
  );
}
