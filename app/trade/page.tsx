"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useWalletStore } from "@/store/walletStore";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { apiClient } from "@/lib/api/client";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import DesktopLayout from "@/components/layout/DesktopLayout";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import toast from "react-hot-toast";

const CATEGORIES = ["All", "Yields", "Nigerian Stocks", "US Stocks"];

export default function TradePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { balance } = useWalletStore();
  const isDesktop = useIsDesktop();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [yieldData, setYieldData] = useState<any[]>([]);
  const [nigerianStocks, setNigerianStocks] = useState<any[]>([]);
  const [usStocks, setUSStocks] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    fetchAllAssets();
  }, [isAuthenticated, router]);

  const fetchAllAssets = async () => {
    try {
      setLoadingData(true);
      const [yieldResponse, ngnResponse, usResponse] = await Promise.all([
        apiClient
          .getYieldOpportunities()
          .catch(() => ({ data: { options: [] } })),
        apiClient
          .getNigerianStocks({ limit: 8 })
          .catch(() => ({ data: { stocks: [] } })),
        apiClient
          .getUSStocks({ limit: 8 })
          .catch(() => ({ data: { stocks: [] } })),
      ]);

      if (yieldResponse?.data?.options)
        setYieldData(yieldResponse.data.options);
      if (ngnResponse?.data?.stocks) setNigerianStocks(ngnResponse.data.stocks);
      if (usResponse?.data?.stocks) setUSStocks(usResponse.data.stocks);
    } catch (error) {
      console.error("Failed to fetch assets:", error);
      toast.error("Failed to load trading assets. Please try again.");
    } finally {
      setLoadingData(false);
    }
  };

  const filterBySearch = (items: any[]) => {
    if (!searchQuery) return items;
    return items.filter(
      (item) =>
        item.symbol?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.protocol?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const showYields =
    selectedCategory === "All" || selectedCategory === "Yields";
  const showNigerianStocks =
    selectedCategory === "All" || selectedCategory === "Nigerian Stocks";
  const showUSStocks =
    selectedCategory === "All" || selectedCategory === "US Stocks";

  const filteredYields = filterBySearch(yieldData);
  const filteredNigerianStocks = filterBySearch(nigerianStocks);
  const filteredUSStocks = filterBySearch(usStocks);

  // Desktop View
  if (isDesktop) {
    return (
      <DesktopLayout balance={balance || 0}>
        <div className="overflow-y-auto h-full scrollbar-hide">
          <div className="p-6 mx-14 space-y-6">
            {/* Search & Filter */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Trade</h1>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                <Input
                  placeholder="Search stocks, protocols..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base"
                />
              </div>

              {/* Categories */}
              <div className="flex gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-primary text-black"
                        : "bg-background-hover text-text-secondary hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {loadingData ? (
              <Card className="p-8">
                <p className="text-center text-text-secondary">
                  Loading investment options...
                </p>
              </Card>
            ) : (
              <div className="space-y-8">
                {/* DeFi Yields Section */}
                {showYields && Array.isArray(filteredYields) && filteredYields.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-bold">DeFi Yields</h2>
                      </div>
                      <Link href="/yield" className="text-sm text-primary hover:text-primary-hover">
                        View All →
                      </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {filteredYields.map((yieldItem, index) => (
                        <Card
                          key={index}
                          hover
                          className="p-4 cursor-pointer text-center"
                          onClick={() => router.push(`/yield/${encodeURIComponent(yieldItem.protocol)}`)}
                        >
                          <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-3">
                            <Sparkles className="w-6 h-6 text-accent-green" />
                          </div>
                          <p className="font-semibold mb-1">{yieldItem.asset || "USDC"}</p>
                          <p className="text-sm text-text-secondary mb-2">{yieldItem.protocol}</p>
                          <p className="text-2xl font-bold text-accent-green">{yieldItem.apy?.toFixed(2)}%</p>
                          <p className="text-xs text-text-tertiary">APY</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* US Stocks Section */}
                {showUSStocks && Array.isArray(filteredUSStocks) && filteredUSStocks.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">US Stocks</h2>
                      <Link href="/stocks/us" className="text-sm text-primary hover:text-primary-hover">
                        View All →
                      </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {filteredUSStocks.map((stock) => (
                        <Card
                          key={stock.symbol}
                          hover
                          className="p-4 cursor-pointer"
                          onClick={() => router.push(`/stocks/${stock.symbol}?market=US`)}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center">
                              <span className="text-sm font-bold text-accent-purple">
                                {stock.symbol?.charAt(0)}
                              </span>
                            </div>
                            <p className="font-semibold">{stock.symbol}</p>
                          </div>
                          <p className="text-sm text-text-secondary mb-2 line-clamp-1">{stock.name}</p>
                          <p className="text-lg font-semibold mb-1">${stock.price?.toFixed(2)}</p>
                          <p className={`text-sm flex items-center gap-1 ${stock.changePercent >= 0 ? "text-accent-green" : "text-accent-red"}`}>
                            {stock.changePercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            {Math.abs(stock.changePercent || 0).toFixed(2)}%
                          </p>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nigerian Stocks - Coming Soon */}
                {showNigerianStocks && (
                  <Card>
                    <div className="flex items-center gap-4 p-6 bg-accent-purple/5 rounded-xl border border-accent-purple/20">
                      <Sparkles className="w-8 h-8 text-accent-purple flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-1">Nigerian Stocks Coming Soon</p>
                        <p className="text-sm text-text-secondary">Integration with Nigerian Stock Exchange in progress</p>
                      </div>
                    </div>
                  </Card>
                )}

                {/* No Results */}
                {searchQuery && filteredYields.length === 0 && filteredNigerianStocks.length === 0 && filteredUSStocks.length === 0 && (
                  <Card className="p-8 text-center">
                    <p className="text-text-secondary">No results found for "{searchQuery}"</p>
                    <p className="text-sm text-text-tertiary mt-2">Try a different search term or category</p>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </DesktopLayout>
    );
  }

  // Mobile View
  return (
    <div className="min-h-screen bg-black pb-20">
      <Header title="Trade" subtitle="Invest in stocks and earn yields" />

      <main className="p-3 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <Input
            placeholder="Search stocks, protocols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-primary text-black"
                  : "bg-background-hover text-text-secondary hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loadingData ? (
          <Card className="p-4">
            <p className="text-center text-sm text-text-secondary">
              Loading investment options...
            </p>
          </Card>
        ) : (
          <>
            {/* DeFi Yields Section */}
            {showYields &&
              Array.isArray(filteredYields) &&
              filteredYields.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent-green" />
                      <h2 className="text-base font-bold">DeFi Yields</h2>
                    </div>
                    <Link
                      href="/yield"
                      className="text-xs text-primary hover:text-primary-hover"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {filteredYields.slice(0, 4).map((yieldItem, index) => (
                      <Card
                        key={index}
                        hover
                        className="p-3 cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/yield/${encodeURIComponent(yieldItem.protocol)}`
                          )
                        }
                      >
                        <div className="text-center">
                          <div className="w-10 h-10 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-2">
                            <Sparkles className="w-5 h-5 text-accent-green" />
                          </div>
                          <p className="text-sm font-semibold mb-0.5">
                            {yieldItem.asset || "USDC"}
                          </p>
                          <p className="text-xs text-text-secondary mb-1.5">
                            {yieldItem.protocol}
                          </p>
                          <p className="text-xl font-bold text-accent-green">
                            {yieldItem.apy?.toFixed(2)}%
                          </p>
                          <p className="text-xs text-text-tertiary">APY</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

            {/* Nigerian Stocks Section - Coming Soon */}
            {showNigerianStocks && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-bold">Nigerian Stocks</h2>
                    <span className="text-xs text-accent-purple font-semibold px-2 py-1 rounded-lg bg-accent-purple/10">
                      Coming Soon
                    </span>
                  </div>

                  <Card className="p-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-accent-blue" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-0.5">Nigerian Stocks Coming Soon</p>
                        <p className="text-xs text-text-secondary">
                          Integration with Nigerian Stock Exchange in progress
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

            {/* US Stocks Section */}
            {showUSStocks &&
              Array.isArray(filteredUSStocks) &&
              filteredUSStocks.length > 0 && (
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

                  <div className="grid grid-cols-2 gap-2">
                    {filteredUSStocks.map((stock) => (
                      <Card
                        key={stock.symbol}
                        hover
                        variant="glass"
                        className="p-2.5 cursor-pointer"
                        onClick={() =>
                          router.push(`/stocks/${stock.symbol}?market=US`)
                        }
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-7 h-7 rounded-full bg-accent-purple/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-accent-purple">
                              {stock.symbol?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold">
                              {stock.symbol}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-text-secondary mb-1.5 line-clamp-1">
                          {stock.name}
                        </p>
                        <p className="text-sm font-semibold mb-0.5">
                          ${stock.price?.toFixed(2)}
                        </p>
                        <p
                          className={`text-xs flex items-center gap-1 ${
                            stock.changePercent >= 0
                              ? "text-accent-green"
                              : "text-accent-red"
                          }`}
                        >
                          {stock.changePercent >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {Math.abs(stock.changePercent || 0).toFixed(2)}%
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

            {/* No Results */}
            {searchQuery &&
              filteredYields.length === 0 &&
              filteredNigerianStocks.length === 0 &&
              filteredUSStocks.length === 0 && (
                <Card className="p-4 text-center">
                  <p className="text-sm text-text-secondary">
                    No results found for "{searchQuery}"
                  </p>
                  <p className="text-xs text-text-tertiary mt-1">
                    Try a different search term or category
                  </p>
                </Card>
              )}

            {/* CTA Banner */}
            {selectedCategory === "All" && !searchQuery && (
              <Card className="bg-gradient-to-r from-primary/20 to-accent-purple/20 p-4">
                <h3 className="text-base font-bold mb-1.5">
                  New to Investing?
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  Start with DeFi yields - earn passive income with low risk
                </p>
                <Link href="/yield">
                  <Button variant="primary" className="h-9 text-sm">
                    Explore DeFi Yields
                  </Button>
                </Link>
              </Card>
            )}
          </>
        )}
      </main>

      <MobileNav />
    </div>
  );
}
