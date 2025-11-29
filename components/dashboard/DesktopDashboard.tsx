"use client";

import { useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, Sparkles, ArrowUpRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils';

interface DesktopDashboardProps {
  user?: {
    firstName?: string;
    walletAddress?: string;
  };
  balance: number;
  portfolio: any;
  holdings: any[];
  yieldData: any[];
  usStocks: any[];
  nigerianStocks: any[];
  onSmartSplit: () => void;
}

const DesktopDashboard = ({
  user,
  balance,
  portfolio,
  holdings = [],
  yieldData = [],
  usStocks = [],
  nigerianStocks = [],
  onSmartSplit
}: DesktopDashboardProps) => {
  const [selectedAsset, setSelectedAsset] = useState<any>(holdings[0] || null);
  const [timeframe, setTimeframe] = useState('1w');

  // Calculate portfolio metrics
  const totalValue = balance || 0;
  const investmentsValue = portfolio?.overview?.totalCurrentValue || 0;
  const gainLoss = portfolio?.overview?.totalGainLoss || 0;
  const gainLossPercent = portfolio?.overview?.totalGainLossPercent || 0;

  const timeframes = ['1h', '24h', '1w', '1m'];

  return (
    <DesktopLayout balance={balance}>
      {/* Main Content Layout: Main Area + Right Sidebar */}
      <div className="grid grid-cols-[1fr_320px] h-full">
        {/* Main Area - Holdings & Market Opportunities */}
        <div className="overflow-y-auto scrollbar-hide">
          <div className="p-6 mx-14">
            {/* Holdings Table */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Your Holdings</h2>
                <Link href="/portfolio" className="text-sm text-primary hover:text-primary-hover font-medium">
                  View All →
                </Link>
              </div>

              {holdings.length > 0 ? (
                <Card className="p-0">
                  {/* Table Header */}
                  <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-4 py-3 border-b border-border text-xs font-medium text-text-secondary">
                    <div>Asset</div>
                    <div className="text-right">Amount</div>
                    <div className="text-right">Price</div>
                    <div className="text-right">Value</div>
                    <div className="text-right">Change</div>
                  </div>

                  {/* Table Rows */}
                  <div className="divide-y divide-border/50">
                    {holdings.map((holding) => (
                      <div
                        key={holding.id}
                        onClick={() => setSelectedAsset(holding)}
                        className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-4 py-3 hover:bg-background-hover/50 transition-colors cursor-pointer ${
                          selectedAsset?.id === holding.id ? 'bg-background-hover/30' : ''
                        }`}
                      >
                        {/* Asset */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">
                              {holding.symbol?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{holding.symbol}</p>
                            <p className="text-xs text-text-secondary truncate max-w-[120px]">
                              {holding.name}
                            </p>
                          </div>
                        </div>

                        {/* Amount */}
                        <div className="text-right flex items-center justify-end">
                          <span className="text-sm">{holding.quantity?.toFixed(4)}</span>
                        </div>

                        {/* Price */}
                        <div className="text-right flex items-center justify-end">
                          <span className="text-sm">{formatCurrency(holding.currentPrice)}</span>
                        </div>

                        {/* Value */}
                        <div className="text-right flex items-center justify-end">
                          <span className="text-sm font-semibold">{formatCurrency(holding.totalValue)}</span>
                        </div>

                        {/* Change */}
                        <div className="text-right flex items-center justify-end">
                          <span className={`text-sm font-medium ${getChangeColor(holding.profitLoss)}`}>
                            {formatPercentage(holding.profitLossPercentage)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ) : (
                <Card className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-background-hover flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No holdings yet</h3>
                  <p className="text-sm text-text-secondary mb-6">
                    Start investing to build your portfolio
                  </p>
                  <Link href="/trade">
                    <Button variant="primary">Browse Markets</Button>
                  </Link>
                </Card>
              )}
            </div>

            {/* Market Opportunities Cards */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* DeFi Yields Card */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="font-bold">Top DeFi Yields</h3>
                  </div>
                  <Link href="/yield" className="text-xs text-primary hover:text-primary-hover">
                    View All
                  </Link>
                </div>

                <div className="space-y-3">
                  {yieldData.slice(0, 5).map((yield_item, index) => (
                    <Link
                      key={index}
                      href={`/yield/${encodeURIComponent(yield_item.protocol || 'Aave')}`}
                    >
                      <div className="p-3 rounded-xl bg-background-hover hover:bg-background-card border border-transparent hover:border-border transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold">{yield_item.protocol || 'Aave'}</p>
                          <span className="text-xl font-bold text-accent-green">
                            {yield_item.apy || '4.5'}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-text-secondary">{yield_item.token || 'USDC'}</p>
                          <p className="text-xs text-text-tertiary">APY</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>

              {/* US Stocks Card */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Trending US Stocks</h3>
                  <Link href="/stocks/us" className="text-xs text-primary hover:text-primary-hover">
                    View All
                  </Link>
                </div>

                <div className="space-y-3">
                  {usStocks.slice(0, 5).map((stock) => (
                    <Link
                      key={stock.symbol}
                      href={`/stocks/${stock.symbol}?market=US`}
                    >
                      <div className="p-3 rounded-xl bg-background-hover hover:bg-background-card border border-transparent hover:border-border transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-accent-purple/10 flex items-center justify-center">
                              <span className="text-xs font-bold text-accent-purple">
                                {stock.symbol?.charAt(0)}
                              </span>
                            </div>
                            <p className="font-semibold">{stock.symbol}</p>
                          </div>
                          <p className="font-semibold">${stock.price?.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-text-secondary truncate max-w-[180px]">
                            {stock.name}
                          </p>
                          <p className={`text-sm flex items-center gap-1 ${getChangeColor(stock.change || 0)}`}>
                            {(stock.change || 0) >= 0 ? (
                              <ArrowUpRight className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {formatPercentage(Math.abs(stock.change || 0))}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </div>

            {/* Nigerian Stocks Coming Soon */}
            <Card>
              <div className="flex items-center gap-3 p-4 bg-accent-purple/5 rounded-xl border border-accent-purple/20">
                <Sparkles className="w-6 h-6 text-accent-purple flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Nigerian Stocks</p>
                  <p className="text-sm text-text-secondary">Coming soon! Invest in NSE-listed companies.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Sidebar - Cards */}
        <div className="overflow-y-auto scrollbar-hide">
          <div className="p-6 space-y-4">
            {/* Portfolio Summary Card */}
            <Card className="rounded-xl">
              <p className="text-xs text-text-secondary mb-2">Total Portfolio Value</p>
              <h1 className="text-3xl font-bold mb-2">{formatCurrency(totalValue)}</h1>
              <div className={`flex items-center gap-2 text-sm mb-4 ${getChangeColor(gainLoss)}`}>
                {gainLoss >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-semibold">
                  {formatCurrency(Math.abs(gainLoss))} ({formatPercentage(gainLossPercent)})
                </span>
              </div>

              {/* Balances */}
              <div className="space-y-3 pt-3 border-t border-border">
                <div>
                  <p className="text-xs text-text-tertiary mb-1">Cash Balance</p>
                  <p className="text-lg font-semibold">{formatCurrency(balance)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary mb-1">Investments</p>
                  <p className="text-lg font-semibold">{formatCurrency(investmentsValue)}</p>
                </div>
              </div>
            </Card>

            {/* Quick Actions Card */}
            <Card className="rounded-xl">
              <h3 className="text-sm font-bold mb-3">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={onSmartSplit}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 hover:from-primary/20 hover:to-purple-500/20 border border-primary/20 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Smart Split</p>
                    <p className="text-xs text-text-secondary">AI-powered allocation</p>
                  </div>
                </button>

                <Link href="/wallet">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-background-hover hover:bg-background-card border border-transparent hover:border-border transition-all text-left">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Wallet className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Deposit Funds</p>
                      <p className="text-xs text-text-secondary">Add money to invest</p>
                    </div>
                  </button>
                </Link>

                <Link href="/trade">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-background-hover hover:bg-background-card border border-transparent hover:border-border transition-all text-left">
                    <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-accent-green" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Browse Markets</p>
                      <p className="text-xs text-text-secondary">Stocks & DeFi yields</p>
                    </div>
                  </button>
                </Link>
              </div>
            </Card>

            {/* Market Overview Card */}
            <Card className="rounded-xl">
              <h3 className="text-sm font-bold mb-3">Market Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-tertiary">US Stocks Available</span>
                  <span className="text-sm font-semibold">{usStocks.length}+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-tertiary">DeFi Yields</span>
                  <span className="text-sm font-semibold">{yieldData.length}+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-tertiary">Avg. Yield APY</span>
                  <span className="text-sm font-semibold text-accent-green">
                    {yieldData.length > 0
                      ? (yieldData.reduce((sum, y) => sum + parseFloat(y.apy || 0), 0) / yieldData.length).toFixed(2)
                      : '0.00'}%
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
};

export default DesktopDashboard;
