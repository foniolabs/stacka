"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  DollarSign,
  PieChart,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { usePortfolioStore } from "@/store/portfolioStore";
import { useWalletStore } from "@/store/walletStore";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import Card from "@/components/ui/Card";
import RebalancingAlert from "@/components/features/RebalancingAlert";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default function PortfolioPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { balance, blockchainBalance, platformBalance, fetchBalance } =
    useWalletStore();
  const { portfolio, isLoading, fetchPortfolio } = usePortfolioStore();
  const [activeTab, setActiveTab] = useState<"all" | "stocks" | "yields">(
    "all"
  );
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for zustand to hydrate from localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Only check auth after hydration
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    fetchPortfolio();
    fetchBalance();
  }, [isHydrated, isAuthenticated, router]);

  // Get holdings array
  const holdings = portfolio?.holdings || [];

  // Calculate portfolio values
  const totalInvestmentsValue = portfolio?.overview?.totalCurrentValue || 0; // Just investments
  const totalPortfolioValue =
    portfolio?.overview?.totalPortfolioValue || balance; // Investments + cash
  const totalGain = portfolio?.overview?.totalGainLoss || 0;
  const totalGainPercent = portfolio?.overview?.totalGainLossPercent || 0;
  const cashBalance = portfolio?.overview?.cashBalance?.total || 0;

  // Filter portfolio items
  const filteredPortfolio = holdings.filter((item: any) => {
    if (activeTab === "all") return true;
    if (activeTab === "stocks")
      return item.assetType === "STOCK_US" || item.assetType === "STOCK_NGN";
    if (activeTab === "yields")
      return item.assetType === "DEFI" || item.assetType === "YIELD";
    return true;
  });

  // Separate stocks and yields
  const stockPositions = holdings.filter(
    (item: any) =>
      item.assetType === "STOCK_US" || item.assetType === "STOCK_NGN"
  );
  const yieldPositions = holdings.filter(
    (item: any) => item.assetType === "DEFI" || item.assetType === "YIELD"
  );

  return (
    <div className="min-h-screen bg-black pb-20">
      <Header title="Portfolio" subtitle="Track your investments" />

      <main className="p-4 space-y-6">
        {/* Rebalancing Alert */}
        <RebalancingAlert />

        {/* Total Value Card */}
        <Card className="p-6">
          <p className="text-sm text-text-secondary mb-2">Investments Value</p>
          <h1 className="text-5xl font-bold mb-4">
            {formatCurrency(totalInvestmentsValue)}
          </h1>

          <div className="flex items-center gap-2 mb-6">
            {totalGain >= 0 ? (
              <>
                <TrendingUp className="w-5 h-5 text-accent-green" />
                <span className="text-accent-green font-semibold">
                  +{formatCurrency(Math.abs(totalGain))} (
                  {totalGainPercent.toFixed(2)}%)
                </span>
              </>
            ) : (
              <>
                <TrendingDown className="w-5 h-5 text-accent-red" />
                <span className="text-accent-red font-semibold">
                  -{formatCurrency(Math.abs(totalGain))} (
                  {totalGainPercent.toFixed(2)}%)
                </span>
              </>
            )}
            <span className="text-text-tertiary text-sm">All Time</span>
          </div>

          {/* Available Cash */}
          <div className="pt-4 border-t border-white/10 mb-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-text-secondary">Available Cash</p>
              <p className="text-xl font-semibold text-accent-green">
                {formatCurrency(cashBalance)}
              </p>
            </div>
            <p className="text-xs text-text-tertiary mt-1">Ready to invest</p>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              activeTab === "all"
                ? "bg-primary text-black"
                : "bg-background-hover text-text-secondary"
            }`}
          >
            All ({holdings.length})
          </button>
          <button
            onClick={() => setActiveTab("stocks")}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              activeTab === "stocks"
                ? "bg-primary text-black"
                : "bg-background-hover text-text-secondary"
            }`}
          >
            Stocks ({stockPositions.length})
          </button>
          <button
            onClick={() => setActiveTab("yields")}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              activeTab === "yields"
                ? "bg-primary text-black"
                : "bg-background-hover text-text-secondary"
            }`}
          >
            Yields ({yieldPositions.length})
          </button>
        </div>

        {/* Holdings */}
        {isLoading ? (
          <Card className="p-6">
            <p className="text-text-secondary text-center">
              Loading portfolio...
            </p>
          </Card>
        ) : filteredPortfolio.length > 0 ? (
          <div className="space-y-3">
            {filteredPortfolio.map((item, index) => {
              const value = item.currentPrice * item.quantity;
              const gain =
                (item.currentPrice - item.averagePrice) * item.quantity;
              const gainPercent =
                ((item.currentPrice - item.averagePrice) / item.averagePrice) *
                100;
              const isPositive = gain >= 0;

              const assetType = (item as any).assetType || item.type;
              const isYield =
                assetType === "DEFI" ||
                assetType === "YIELD" ||
                assetType === "yield";
              const isStock =
                assetType === "STOCK_US" ||
                assetType === "STOCK_NGN" ||
                assetType === "stock";

              return (
                <Link
                  key={index}
                  href={
                    isStock
                      ? `/stocks/${item.symbol}`
                      : `/yield/${item.symbol.toLowerCase()}`
                  }
                >
                  <Card hover className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            isYield ? "bg-accent-green/10" : "bg-accent-blue/10"
                          }`}
                        >
                          {isYield ? (
                            <Sparkles className="w-6 h-6 text-accent-green" />
                          ) : (
                            <DollarSign className="w-6 h-6 text-accent-blue" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{item.symbol}</p>
                          <p className="text-sm text-text-secondary">
                            {item.quantity.toFixed(2)}{" "}
                            {isYield ? "USDC" : "shares"}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(value)}</p>
                        <div className="flex items-center justify-end gap-1">
                          {isPositive ? (
                            <TrendingUp className="w-4 h-4 text-accent-green" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-accent-red" />
                          )}
                          <span
                            className={`text-sm font-medium ${
                              isPositive
                                ? "text-accent-green"
                                : "text-accent-red"
                            }`}
                          >
                            {isPositive ? "+" : ""}
                            {gainPercent.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-background-hover flex items-center justify-center mx-auto mb-4">
              <PieChart className="w-8 h-8 text-text-secondary" />
            </div>
            <p className="text-text-secondary mb-2">No investments yet</p>
            <p className="text-sm text-text-tertiary mb-6">
              Start building your portfolio by investing in stocks or yield
              opportunities
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/trade">
                <button className="px-6 py-2 bg-primary hover:bg-primary-hover text-black font-semibold rounded-xl transition-all">
                  Explore Investments
                </button>
              </Link>
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/wallet">
            <Card hover className="p-4 text-center cursor-pointer">
              <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-semibold">Add Funds</p>
              <p className="text-xs text-text-secondary">Deposit to wallet</p>
            </Card>
          </Link>

          <Link href="/trade">
            <Card hover className="p-4 text-center cursor-pointer">
              <TrendingUp className="w-8 h-8 text-accent-green mx-auto mb-2" />
              <p className="font-semibold">Discover</p>
              <p className="text-xs text-text-secondary">Find investments</p>
            </Card>
          </Link>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
