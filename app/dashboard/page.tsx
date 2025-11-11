"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Wallet as WalletIcon,
  DollarSign,
  Sparkles,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useWalletStore } from "@/store/walletStore";
import { usePortfolioStore } from "@/store/portfolioStore";
import { apiClient } from "@/lib/api/client";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SmartSplitModal from "@/components/features/SmartSplitModal";
import { formatCurrency, formatPercentage, getChangeColor } from "@/lib/utils";
import Link from "next/link";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { balance, fetchBalance } = useWalletStore();
  const { portfolio, holdings, fetchPortfolio, fetchHoldings } =
    usePortfolioStore();

  const [yieldData, setYieldData] = useState<any[]>([]);
  const [nigerianStocks, setNigerianStocks] = useState<any[]>([]);
  const [usStocks, setUSStocks] = useState<any[]>([]);
  const [loadingYield, setLoadingYield] = useState(false);
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showSmartSplit, setShowSmartSplit] = useState(false);

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

    fetchBalance();
    fetchPortfolio();
    fetchHoldings();
    fetchYieldOpportunities();
    fetchTopStocks();
  }, [
    isHydrated,
    isAuthenticated,
    router,
    fetchBalance,
    fetchPortfolio,
    fetchHoldings,
  ]);

  const fetchYieldOpportunities = async () => {
    try {
      setLoadingYield(true);
      const response = await apiClient.getYieldOpportunities();
      if (response?.data?.options) {
        setYieldData(response.data.options);
      }
    } catch (error) {
      console.error("Failed to fetch yield opportunities:", error);
      // Silent fail on dashboard - data is optional
    } finally {
      setLoadingYield(false);
    }
  };

  const fetchTopStocks = async () => {
    try {
      setLoadingStocks(true);
      const [ngnResponse, usResponse] = await Promise.all([
        apiClient
          .getNigerianStocks({ limit: 3 })
          .catch(() => ({ data: { stocks: [] } })),
        apiClient
          .getUSStocks({ limit: 3 })
          .catch(() => ({ data: { stocks: [] } })),
      ]);

      if (ngnResponse?.data?.stocks) setNigerianStocks(ngnResponse.data.stocks);
      if (usResponse?.data?.stocks) setUSStocks(usResponse.data.stocks);
    } catch (error) {
      console.error("Failed to fetch stocks:", error);
      // Silent fail on dashboard - data is optional
    } finally {
      setLoadingStocks(false);
    }
  };

  // Use portfolio data from new API structure
  const investmentsValue = portfolio?.overview?.totalCurrentValue || 0;
  const cashBalance = portfolio?.overview?.cashBalance?.total || balance || 0;
  const totalValue = balance || 0; // Total = Main balance (not adding investments since they came from balance)
  const gainLoss = portfolio?.overview?.totalGainLoss || 0;
  const gainLossPercent = portfolio?.overview?.totalGainLossPercent || 0;

  return (
    <div className="min-h-screen bg-black pb-20">
      <Header
        title={`Hi, ${user?.firstName || "Investor"}`}
        subtitle="Welcome back"
      />

      <main className="p-3 space-y-4">
        {/* Portfolio Value Card - Compact */}
        <Card className="text-center py-5">
          <p className="text-xs text-text-secondary mb-1">Total Value</p>
          <h1 className="text-3xl font-bold mb-3">
            {formatCurrency(totalValue)}
          </h1>
          <div
            className={`flex items-center justify-center gap-1.5 ${getChangeColor(
              gainLoss
            )}`}
          >
            {gainLoss >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-semibold">
              {formatCurrency(Math.abs(gainLoss))} (
              {formatPercentage(gainLossPercent)})
            </span>
            <span className="text-xs text-text-secondary">All Time</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 text-sm">
            <div>
              <p className="text-text-tertiary text-xs">Total Investments</p>
              <p className="font-semibold">
                {formatCurrency(investmentsValue)}
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Actions - Compact */}
        <div className="grid grid-cols-3 gap-3">
          <Link href="/wallet">
            <Card hover className="text-center py-4 cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <WalletIcon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold">Deposit</p>
              <p className="text-xs text-text-secondary mt-0.5">Add funds</p>
            </Card>
          </Link>

          <button onClick={() => setShowSmartSplit(true)}>
            <Card hover className="text-center py-4 cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold whitespace-nowrap">Smart Split</p>
              <p className="text-xs text-text-secondary mt-0.5">Auto-invest</p>
            </Card>
          </button>

          <Link href="/trade">
            <Card hover className="text-center py-4 cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-5 h-5 text-accent-green" />
              </div>
              <p className="text-sm font-semibold">Trade</p>
              <p className="text-xs text-text-secondary mt-0.5">Buy & sell</p>
            </Card>
          </Link>
        </div>

        {/* Holdings - Compact */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold">Your Holdings</h2>
            <Link
              href="/portfolio"
              className="text-xs text-primary hover:text-primary-hover"
            >
              View All
            </Link>
          </div>

          {holdings.length === 0 ? (
            <Card className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-background-hover flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-text-secondary" />
              </div>
              <h3 className="text-base font-semibold mb-1.5">
                No holdings yet
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Start investing in stocks, crypto, or DeFi
              </p>
              <Link href="/trade">
                <Button variant="primary" className="text-sm h-9">
                  Start Investing
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-2">
              {Array.isArray(holdings) && holdings.length > 0 ? (
                holdings.slice(0, 5).map((holding) => (
                  <Card key={holding.id} hover className="cursor-pointer p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-background-hover flex items-center justify-center">
                          <span className="text-base font-bold">
                            {holding.symbol.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            {holding.symbol}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {holding.name}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {formatCurrency(holding.totalValue)}
                        </p>
                        <p
                          className={`text-xs ${getChangeColor(
                            holding.profitLoss
                          )}`}
                        >
                          {formatPercentage(holding.profitLossPercentage)}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card>
                  <div className="text-center py-8">
                    <p className="text-text-secondary">No holdings yet</p>
                    <p className="text-sm text-text-muted mt-2">
                      Start investing to see your portfolio here
                    </p>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* DeFi Yield Opportunities - Compact */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              <h2 className="text-base font-bold">DeFi Yields</h2>
            </div>
            <Link
              href="/yield"
              className="text-xs text-primary hover:text-primary-hover"
            >
              View All
            </Link>
          </div>

          {loadingYield ? (
            <Card className="p-4">
              <p className="text-sm text-text-secondary text-center">
                Loading yield opportunities...
              </p>
            </Card>
          ) : Array.isArray(yieldData) && yieldData.length > 0 ? (
            <div className="space-y-2">
              {yieldData.slice(0, 2).map((yield_item, index) => (
                <Card
                  key={index}
                  hover
                  className="p-3 cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/yield/${encodeURIComponent(
                        yield_item.protocol || "Aave"
                      )}`
                    )
                  }
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">
                        {yield_item.protocol || "Aave"}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {yield_item.token || "USDC"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-accent-green">
                        {yield_item.apy || "4.5"}%
                      </p>
                      <p className="text-xs text-text-tertiary">APY</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6">
              <div className="text-center">
                <DollarSign className="w-12 h-12 text-text-secondary mx-auto mb-3" />
                <p className="text-text-secondary">
                  Earn yield on your stablecoins
                </p>
                <Link href="/yield">
                  <Button variant="primary" size="sm" className="mt-4">
                    Explore Yields
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>

        {/* Nigerian Stocks - Compact */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold">Nigerian Stocks</h2>
            <Link
              href="/stocks/nigerian"
              className="text-xs text-primary hover:text-primary-hover"
            >
              View All
            </Link>
          </div>

          {Array.isArray(nigerianStocks) && nigerianStocks.length > 0 ? (
            <div className="space-y-2">
              {nigerianStocks.map((stock) => (
                <Card
                  key={stock.symbol}
                  hover
                  className="p-3 cursor-pointer"
                  onClick={() =>
                    router.push(`/stocks/${stock.symbol}?market=NGN`)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-accent-blue/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-accent-blue">
                          {stock.symbol?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{stock.symbol}</p>
                        <p className="text-xs text-text-secondary">
                          {stock.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        ₦{stock.price?.toFixed(2)}
                      </p>
                      <p
                        className={`text-xs ${getChangeColor(
                          stock.change || 0
                        )}`}
                      >
                        {formatPercentage(Math.abs(stock.change || 0))}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-4 text-center">
              <p className="text-sm text-text-secondary">
                Loading Nigerian stocks...
              </p>
            </Card>
          )}
        </div>

        {/* US Stocks - Compact */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold">US Stocks</h2>
            <Link
              href="/stocks/us"
              className="text-xs text-primary hover:text-primary-hover"
            >
              View All
            </Link>
          </div>

          {Array.isArray(usStocks) && usStocks.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {usStocks.map((stock) => (
                <Card
                  key={stock.symbol}
                  hover
                  variant="glass"
                  className="p-2.5 cursor-pointer"
                  onClick={() =>
                    router.push(`/stocks/${stock.symbol}?market=US`)
                  }
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-7 h-7 rounded-full bg-accent-purple/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-accent-purple">
                        {stock.symbol?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{stock.symbol}</p>
                      <p className="text-xs text-text-tertiary truncate">
                        {stock.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold mb-0.5">
                    ${stock.price?.toFixed(2)}
                  </p>
                  <p
                    className={`text-xs flex items-center gap-0.5 ${getChangeColor(
                      stock.change || 0
                    )}`}
                  >
                    {(stock.change || 0) >= 0 ? (
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    ) : (
                      <TrendingDown className="w-2.5 h-2.5" />
                    )}
                    {formatPercentage(Math.abs(stock.change || 0))}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-4 text-center">
              <p className="text-sm text-text-secondary">
                Loading US stocks...
              </p>
            </Card>
          )}
        </div>
      </main>

      <MobileNav />

      {/* Smart Split Modal */}
      <SmartSplitModal
        isOpen={showSmartSplit}
        onClose={() => setShowSmartSplit(false)}
        balance={balance || 0}
      />
    </div>
  );
}
