"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, TrendingUp, TrendingDown, Info } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useWalletStore } from "@/store/walletStore";
import { apiClient } from "@/lib/api/client";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

export default function StockDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuthStore();
  const { availableBalance, exchangeRate, fetchBalance } = useWalletStore();

  const symbol = params.symbol as string;
  const market = searchParams.get("market") || "US";

  const [stock, setStock] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState("1");
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchStockDetails();
    fetchBalance();
  }, [isAuthenticated, router, symbol, market]);

  const fetchStockDetails = async () => {
    try {
      setIsLoading(true);
      const response =
        market === "NGN"
          ? await apiClient.getNigerianStocks({ limit: 50 })
          : await apiClient.getUSStocks({ limit: 50 });

      const stocks = response?.data?.stocks || [];
      const foundStock = stocks.find(
        (s: any) => s.symbol === symbol.toUpperCase()
      );

      if (foundStock) {
        setStock(foundStock);
      }
    } catch (error) {
      console.error("Failed to fetch stock details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrder = async () => {
    if (!quantity || parseFloat(quantity) <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    const totalCost = stock.price * parseFloat(quantity);

    // Convert to USD for Nigerian stocks using real-time rate
    const ngnToUsd = exchangeRate?.ngnToUsd || 0.00067;
    const totalCostUSD = market === "NGN" ? totalCost * ngnToUsd : totalCost;

    if (orderType === "buy" && totalCostUSD > availableBalance) {
      toast.error(
        `Insufficient balance. You have ${formatCurrency(
          availableBalance
        )} available.`
      );
      return;
    }

    try {
      setIsProcessing(true);
      toast.loading(
        `Processing ${orderType === "buy" ? "purchase" : "sale"}...`,
        { id: "stock-order" }
      );

      // Call the appropriate trading API based on market
      const tradeData = {
        symbol: symbol.toUpperCase(),
        side: orderType.toUpperCase() as "BUY" | "SELL",
        quantity: parseFloat(quantity),
        orderType: "MARKET" as const,
      };

      const response =
        market === "NGN"
          ? await apiClient.tradeNigerianStock(tradeData)
          : await apiClient.tradeUSStock(tradeData);

      // Check if auto-conversion happened
      const conversion = response?.data?.conversion;

      if (conversion?.converted) {
        toast.success(
          `💱 Converted $${conversion.usdcAmount.toFixed(
            2
          )} USDC → ₦${conversion.ngnAmount.toFixed(2)} NGN`,
          { id: "stock-order", duration: 2000 }
        );

        // Wait a bit then show purchase success
        setTimeout(() => {
          toast.success(
            `${
              orderType === "buy" ? "Bought" : "Sold"
            } ${quantity} shares of ${symbol}`,
            { duration: 3000 }
          );
        }, 2000);
      } else {
        toast.success(
          `${
            orderType === "buy" ? "Bought" : "Sold"
          } ${quantity} shares of ${symbol}`,
          { id: "stock-order", duration: 3000 }
        );
      }

      await fetchBalance();
      router.push("/portfolio");
    } catch (error: any) {
      console.error("Order failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Order failed. Please try again.";
      toast.error(errorMessage, { id: "stock-order" });
    } finally {
      setIsProcessing(false);
    }
  };

  const totalCost = stock ? stock.price * parseFloat(quantity || "0") : 0;
  const currencySymbol = market === "NGN" ? "₦" : "$";

  // Use real-time exchange rate from backend, fallback to default if not available
  const ngnToUsdRate = exchangeRate?.ngnToUsd || 0.00067;
  const usdToNgnRate = exchangeRate?.usdToNgn || 1492.54;
  const totalCostUSD = market === "NGN" ? totalCost * ngnToUsdRate : totalCost;
  const availableBalanceNGN = availableBalance * usdToNgnRate;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pb-20">
        <Header title="Loading..." />
        <main className="p-4">
          <Card className="p-6">
            <p className="text-center text-text-secondary">
              Loading stock details...
            </p>
          </Card>
        </main>
        <MobileNav />
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="min-h-screen bg-black pb-20">
        <Header title="Stock Not Found" />
        <main className="p-4">
          <Card className="p-6 text-center">
            <p className="text-text-secondary mb-4">Stock not found</p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </Card>
        </main>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      <Header
        title={stock.symbol}
        subtitle={stock.name}
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

      <main className="p-4 space-y-6">
        {/* Stock Info Card */}
        <Card className="p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-white">
                {stock.symbol.charAt(0)}
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {currencySymbol}
              {stock.price.toFixed(2)}
            </h2>
            {market === "NGN" && (
              <p className="text-sm text-text-secondary mb-2">
                ≈ ${(stock.price / usdToNgnRate).toFixed(4)} USD
              </p>
            )}
            <div
              className={`flex items-center justify-center gap-2 ${
                stock.changePercent >= 0
                  ? "text-accent-green"
                  : "text-accent-red"
              }`}
            >
              {stock.changePercent >= 0 ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              <span className="text-lg font-semibold">
                {currencySymbol}
                {Math.abs(stock.change || 0).toFixed(2)} (
                {Math.abs(stock.changePercent || 0).toFixed(2)}%)
              </span>
            </div>
            <p className="text-sm text-text-tertiary mt-2">Today</p>
          </div>

          {/* Stock Details */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <p className="text-sm text-text-secondary">Market</p>
              <p className="font-semibold">
                {market === "NGN"
                  ? "Nigerian Stock Exchange"
                  : "US Stock Market"}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Symbol</p>
              <p className="font-semibold">{stock.symbol}</p>
            </div>
          </div>
        </Card>

        {/* Order Type Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setOrderType("buy")}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              orderType === "buy"
                ? "bg-accent-green text-black"
                : "bg-background-hover text-text-secondary"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setOrderType("sell")}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              orderType === "sell"
                ? "bg-accent-red text-black"
                : "bg-background-hover text-text-secondary"
            }`}
          >
            Sell
          </button>
        </div>

        {/* Order Form */}
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Quantity (shares)
            </label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              min="1"
              step="1"
            />
          </div>

          <div className="py-3 border-t border-b border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Total Cost</span>
              <span className="text-xl font-bold">
                {currencySymbol}
                {totalCost.toFixed(2)}
              </span>
            </div>
            {market === "NGN" && (
              <div className="flex items-center justify-end mt-1">
                <span className="text-sm text-text-tertiary">
                  ≈ ${totalCostUSD.toFixed(2)} USD
                </span>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Available Balance</span>
              <span className="font-semibold">
                {market === "NGN"
                  ? `₦${availableBalanceNGN.toFixed(2)}`
                  : formatCurrency(availableBalance)}
              </span>
            </div>
            {market === "NGN" && (
              <div className="flex items-center justify-end mt-1">
                <span className="text-xs text-text-tertiary">
                  ${availableBalance.toFixed(2)} USDC (auto-converts to NGN)
                </span>
              </div>
            )}
          </div>

          {orderType === "buy" &&
            totalCostUSD > availableBalance &&
            market === "NGN" && (
              <div className="flex items-start gap-2 p-3 bg-accent-blue/10 border border-accent-blue/20 rounded-lg">
                <Info className="w-5 h-5 text-accent-blue flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-accent-blue font-medium">
                    Auto-conversion enabled
                  </p>
                  <p className="text-text-secondary mt-1">
                    Your USDC will be automatically converted to NGN at market
                    rate to complete this purchase
                  </p>
                </div>
              </div>
            )}

          {orderType === "buy" &&
            totalCostUSD > availableBalance &&
            market !== "NGN" && (
              <div className="flex items-start gap-2 p-3 bg-accent-red/10 border border-accent-red/20 rounded-lg">
                <Info className="w-5 h-5 text-accent-red flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-accent-red font-medium">
                    Insufficient balance
                  </p>
                  <p className="text-text-secondary mt-1">
                    You need {formatCurrency(totalCostUSD - availableBalance)}{" "}
                    more to complete this order
                  </p>
                </div>
              </div>
            )}

          <Button
            variant={orderType === "buy" ? "primary" : "secondary"}
            className={`w-full ${
              orderType === "sell" ? "bg-accent-red hover:bg-accent-red/90" : ""
            }`}
            onClick={handleOrder}
            disabled={
              isProcessing ||
              !quantity ||
              parseFloat(quantity) <= 0 ||
              (orderType === "buy" && totalCostUSD > availableBalance)
            }
          >
            {isProcessing
              ? "Processing..."
              : `${orderType === "buy" ? "Buy" : "Sell"} ${stock.symbol}`}
          </Button>
        </Card>

        {/* Info Banner */}
        <Card className="bg-background-hover p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-text-secondary">
                This is a {market === "NGN" ? "Nigerian" : "US"} stock. Orders
                are executed at market price.
                {market === "NGN" &&
                  ` Current exchange rate: ₦${usdToNgnRate.toFixed(
                    2
                  )} = $1 USD.`}
              </p>
            </div>
          </div>
        </Card>
      </main>

      <MobileNav />
    </div>
  );
}
