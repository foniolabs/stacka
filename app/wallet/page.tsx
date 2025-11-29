"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  QrCode,
  ArrowDownToLine,
  ArrowUpFromLine,
  Check,
  Sparkles,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useAuthStore } from "@/store/authStore";
import { useWalletStore } from "@/store/walletStore";
import { apiClient } from "@/lib/api/client";
import { breadAPI } from "@/lib/api/bread";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { formatCurrency, truncateAddress } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";
import DepositModal from "@/components/modals/DepositModal";
import WithdrawModal from "@/components/modals/WithdrawModal";

const CHAINS = [
  { name: "Base Mainnet", chainId: 8453, recommended: true, mainnet: true },
  { name: "Ethereum", chainId: 1, disabled: true },
  { name: "Polygon", chainId: 137, disabled: true },
  { name: "Arbitrum", chainId: 42161, disabled: true },
  { name: "Optimism", chainId: 10, disabled: true },
  { name: "Solana", chainId: 0, disabled: true },
];

export default function WalletPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const {
    balance,
    blockchainBalance,
    platformBalance,
    nairaBalance,
    depositAddress,
    fetchBalance,
    fetchDepositAddress,
  } = useWalletStore();
  const [selectedChain, setSelectedChain] = useState("Base Mainnet");
  const [copied, setCopied] = useState(false);
  const [yieldData, setYieldData] = useState<any[]>([]);
  const [loadingYield, setLoadingYield] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [breadBalance, setBreadBalance] = useState(0);
  const [offrampRate, setOfframpRate] = useState(0);

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
    fetchDepositAddress();
    fetchYieldOpportunities();
    fetchBreadBalance();
    fetchOfframpRate();
  }, [isHydrated, isAuthenticated, router, fetchBalance, fetchDepositAddress]);

  const fetchBreadBalance = async () => {
    if (!user?.breadWalletId) return;
    
    try {
      const balanceData = await breadAPI.getBalance(user.breadWalletId, 'base:usdc');
      const balance = typeof balanceData.balance === 'string' 
        ? parseFloat(balanceData.balance) 
        : balanceData.balance;
      setBreadBalance(balance || 0);
    } catch (error) {
      console.error("Failed to fetch Bread balance:", error);
    }
  };

  const fetchOfframpRate = async () => {
    try {
      const rateData = await breadAPI.getOfframpRate();
      setOfframpRate(rateData.rate || 0);
    } catch (error) {
      console.error("Failed to fetch offramp rate:", error);
    }
  };

  const fetchYieldOpportunities = async () => {
    try {
      setLoadingYield(true);
      const response = await apiClient.getYieldOpportunities();
      if (response?.data) {
        setYieldData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch yield opportunities:", error);
    } finally {
      setLoadingYield(false);
    }
  };

  const handleRefreshBalance = async () => {
    setIsRefreshing(true);
    toast.loading("Checking blockchain for deposits...", {
      id: "refresh-balance",
    });

    try {
      await fetchBalance();
      await fetchBreadBalance();
      toast.success("Balance refreshed!", {
        id: "refresh-balance",
        duration: 2000,
      });
    } catch (error) {
      toast.error("Failed to refresh balance", { id: "refresh-balance" });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      <Header title="Wallet" subtitle="Manage your funds" />

      <main className="p-3 space-y-4">
        {/* Total Balance Card - Compact */}
        <Card className="text-center py-5">
          <p className="text-xs text-text-secondary mb-1">Total Balance</p>
          <h1 className="text-3xl font-bold mb-4">{formatCurrency(balance)}</h1>

          <div className="flex gap-3 justify-center">
            <Button
              variant="primary"
              className="flex items-center gap-1.5 text-sm h-9 px-4"
              onClick={() => setIsDepositModalOpen(true)}
            >
              <ArrowDownToLine className="w-3.5 h-3.5" />
              Deposit
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-1.5 text-sm h-9 px-4"
              onClick={() => setIsWithdrawModalOpen(true)}
            >
              <ArrowUpFromLine className="w-3.5 h-3.5" />
              Withdraw
            </Button>
          </div>
        </Card>

        {/* Modals */}
        <DepositModal
          isOpen={isDepositModalOpen}
          onClose={() => setIsDepositModalOpen(false)}
          depositAddress={user?.breadEvmAddress || depositAddress}
        />

        <WithdrawModal
          isOpen={isWithdrawModalOpen}
          onClose={() => setIsWithdrawModalOpen(false)}
          balance={breadBalance || blockchainBalance}
          depositAddress={user?.breadEvmAddress || depositAddress}
        />

        {/* Balance Breakdown - Compact */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold">Balance Breakdown</h2>
            <button
              onClick={handleRefreshBalance}
              disabled={isRefreshing}
              className="text-xs text-primary hover:text-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Card className="text-center p-2.5">
              <p className="text-xs text-text-secondary mb-0.5">DeFi Wallet</p>
              <p className="text-base font-bold text-accent-green">
                {formatCurrency(breadBalance)}
              </p>
              <p className="text-xs text-text-tertiary mt-0.5">Custodial</p>
            </Card>
            <Card className="text-center p-2.5">
              <p className="text-xs text-text-secondary mb-0.5">Platform</p>
              <p className="text-base font-bold text-accent-blue">
                {formatCurrency(platformBalance)}
              </p>
              <p className="text-xs text-text-tertiary mt-0.5">Trading</p>
            </Card>
            <Card className="text-center p-2.5">
              <p className="text-xs text-text-secondary mb-0.5">Naira</p>
              <p className="text-base font-bold text-accent-purple">
                {formatCurrency(nairaBalance)}
              </p>
              <p className="text-xs text-text-tertiary mt-0.5">Deposits</p>
            </Card>
          </div>
        </div>

        {/* Wallet Addresses */}
        {user?.breadEvmAddress && (
          <Card>
            <h3 className="text-sm font-semibold mb-3">Your Wallet Addresses</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-text-secondary mb-1">Base (EVM)</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-background-hover px-3 py-2 rounded-lg text-xs break-all">
                    {user.breadEvmAddress}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(user.breadEvmAddress || '');
                      toast.success("EVM address copied!");
                    }}
                    className="p-2 rounded-lg bg-background-hover hover:bg-background-card transition-all"
                  >
                    <Copy className="w-4 h-4 text-text-secondary" />
                  </button>
                </div>
              </div>
              {user.breadSvmAddress && (
                <div>
                  <p className="text-xs text-text-secondary mb-1">Solana (SVM)</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-background-hover px-3 py-2 rounded-lg text-xs break-all">
                      {user.breadSvmAddress}
                    </code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(user.breadSvmAddress || '');
                        toast.success("Solana address copied!");
                      }}
                      className="p-2 rounded-lg bg-background-hover hover:bg-background-card transition-all"
                    >
                      <Copy className="w-4 h-4 text-text-secondary" />
                    </button>
                  </div>
                </div>
              )}
              {offrampRate > 0 && (
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-text-secondary">Current Offramp Rate</p>
                  <p className="text-sm font-semibold text-accent-green">
                    1 USDC = ₦{offrampRate.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Deposit Instructions */}
        <div>
          <h2 className="text-xl font-bold mb-4">Deposit USDC</h2>

          {/* Chain Selection */}
          <Card className="mb-4">
            <p className="text-sm text-text-secondary mb-3">Select Network</p>
            <div className="grid grid-cols-2 gap-2">
              {CHAINS.map((chain: any) => (
                <button
                  key={chain.name}
                  onClick={() =>
                    !chain.disabled && setSelectedChain(chain.name)
                  }
                  disabled={chain.disabled}
                  className={`relative p-3 rounded-xl border-2 transition-all ${
                    selectedChain === chain.name
                      ? "border-primary bg-primary/10 text-white"
                      : chain.disabled
                      ? "border-border bg-background text-text-tertiary cursor-not-allowed opacity-50"
                      : "border-border bg-background-hover text-text-secondary hover:border-border-light"
                  }`}
                >
                  {chain.recommended && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded-full bg-primary text-black font-semibold">
                      Recommended
                    </span>
                  )}
                  <div className="flex items-center justify-center">
                    <span className="font-semibold">{chain.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Deposit Address */}
          <Card>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-secondary mb-2">
                  Your Deposit Address
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-background-hover px-4 py-3 rounded-xl text-sm break-all">
                    {user?.breadEvmAddress || depositAddress || "0x0000...0000"}
                  </code>
                  <button
                    onClick={() => {
                      const address = user?.breadEvmAddress || depositAddress;
                      if (address) {
                        navigator.clipboard.writeText(address);
                        setCopied(true);
                        toast.success("Address copied to clipboard");
                        setTimeout(() => setCopied(false), 2000);
                      }
                    }}
                    className="p-3 rounded-xl bg-background-hover hover:bg-background-card transition-all"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-accent-green" />
                    ) : (
                      <Copy className="w-5 h-5 text-text-secondary" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center py-6">
                <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center p-4">
                  {user?.breadEvmAddress || depositAddress ? (
                    <QRCodeSVG
                      value={user?.breadEvmAddress || depositAddress || ''}
                      size={176}
                      level="H"
                      includeMargin={false}
                    />
                  ) : (
                    <QrCode className="w-32 h-32 text-gray-300" />
                  )}
                </div>
              </div>

              <div className="bg-accent-green/10 border border-accent-green/20 rounded-xl p-4">
                <p className="text-sm text-accent-green mb-2 font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Deposit Information
                </p>
                <ul className="text-xs text-text-secondary space-y-1">
                  <li>• Send USDC on {selectedChain}</li>
                  <li>• Gasless transactions - no gas fees required</li>
                  <li>• Automatic USDC → NGN conversion available</li>
                  <li>• Multi-chain support (Base & Solana)</li>
                  <li>• Funds typically arrive in 1-5 minutes</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* USDC/USDT Yields */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Earn Yield</h2>
            </div>
            <Link
              href="/yield"
              className="text-sm text-primary hover:text-primary-hover"
            >
              View All
            </Link>
          </div>

          {loadingYield ? (
            <Card className="p-6">
              <p className="text-text-secondary text-center">
                Loading yield opportunities...
              </p>
            </Card>
          ) : yieldData.length > 0 ? (
            <div className="space-y-3">
              {yieldData.map((yield_item, index) => (
                <Card key={index} hover className="p-4 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-accent-green" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          {yield_item.token || "USDC"}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {yield_item.protocol || "Aave"} • Stablecoin
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent-green">
                        {yield_item.apy || "4.5"}%
                      </p>
                      <p className="text-xs text-text-tertiary">APY</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {/* Default USDC/USDT yields */}
              <Card hover className="p-4 cursor-pointer">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-accent-green" />
                  </div>
                  <p className="font-semibold mb-1">USDC</p>
                  <p className="text-sm text-text-secondary mb-2">Aave</p>
                  <p className="text-2xl font-bold text-accent-green">4.5%</p>
                  <p className="text-xs text-text-tertiary">APY</p>
                </div>
              </Card>

              <Card hover className="p-4 cursor-pointer">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-accent-green" />
                  </div>
                  <p className="font-semibold mb-1">USDT</p>
                  <p className="text-sm text-text-secondary mb-2">Compound</p>
                  <p className="text-2xl font-bold text-accent-green">3.8%</p>
                  <p className="text-xs text-text-tertiary">APY</p>
                </div>
              </Card>

              <Card hover className="p-4 cursor-pointer">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-accent-green" />
                  </div>
                  <p className="font-semibold mb-1">USDC</p>
                  <p className="text-sm text-text-secondary mb-2">Compound</p>
                  <p className="text-2xl font-bold text-accent-green">4.2%</p>
                  <p className="text-xs text-text-tertiary">APY</p>
                </div>
              </Card>

              <Card hover className="p-4 cursor-pointer">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-accent-green" />
                  </div>
                  <p className="font-semibold mb-1">USDT</p>
                  <p className="text-sm text-text-secondary mb-2">Aave</p>
                  <p className="text-2xl font-bold text-accent-green">4.0%</p>
                  <p className="text-xs text-text-tertiary">APY</p>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>

          <Card className="text-center py-8">
            <p className="text-text-secondary">No transactions yet</p>
            <p className="text-sm text-text-tertiary mt-1">
              Your deposit and withdrawal history will appear here
            </p>
          </Card>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
