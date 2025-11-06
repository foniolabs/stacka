"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, TrendingUp, TrendingDown, ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { apiClient } from "@/lib/api/client";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface Stock {
  symbol: string;
  name: string;
  market: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function USStocksPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"name" | "price" | "change">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchStocks();
  }, [isAuthenticated, router]);

  useEffect(() => {
    filterAndSortStocks();
  }, [stocks, searchQuery, sortBy, sortOrder]);

  const fetchStocks = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getUSStocks({ limit: 50 });
      if (response?.data?.stocks) {
        setStocks(response.data.stocks);
      }
    } catch (error) {
      console.error("Failed to fetch US stocks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortStocks = () => {
    let filtered = [...stocks];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "change":
          comparison = a.changePercent - b.changePercent;
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredStocks(filtered);
  };

  const handleSort = (field: "name" | "price" | "change") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleStockClick = (symbol: string) => {
    router.push(`/stocks/${symbol}?market=US`);
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      <Header
        title="US Stocks"
        actions={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        }
      />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Search and Filters */}
        <Card className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <Input
                type="text"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={sortBy === "name" ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleSort("name")}
              >
                Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
              <Button
                variant={sortBy === "price" ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleSort("price")}
              >
                Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
              <Button
                variant={sortBy === "change" ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleSort("change")}
              >
                Change{" "}
                {sortBy === "change" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
            </div>
          </div>
        </Card>

        {/* Stock List */}
        {isLoading ? (
          <Card className="p-6">
            <p className="text-center text-text-secondary">Loading stocks...</p>
          </Card>
        ) : filteredStocks.length > 0 ? (
          <div className="space-y-3">
            {filteredStocks.map((stock) => (
              <Card
                key={stock.symbol}
                hover
                className="p-4 cursor-pointer"
                onClick={() => handleStockClick(stock.symbol)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center">
                      <span className="font-bold text-accent-purple">
                        {stock.symbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{stock.symbol}</p>
                      <p className="text-sm text-text-secondary">
                        {stock.name}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">${stock.price.toFixed(2)}</p>
                    <p
                      className={`text-sm flex items-center gap-1 justify-end ${
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
                      {Math.abs(stock.changePercent).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6">
            <div className="text-center">
              <p className="text-text-secondary">No stocks found</p>
              <p className="text-sm text-text-tertiary mt-2">
                Try adjusting your search query
              </p>
            </div>
          </Card>
        )}
      </main>

      <MobileNav />
    </div>
  );
}
