"use client";

import { useState } from 'react';
import { Bell, Settings, RefreshCw, Wallet } from 'lucide-react';
import Card from '@/components/ui/Card';
import TradingChart from './TradingChart';
import ExchangeTable from './ExchangeTable';
import TradingPanel from './TradingPanel';
import { formatCurrency } from '@/lib/utils';

interface DesktopTradingDashboardProps {
  user?: {
    firstName?: string;
    walletAddress?: string;
  };
  balance: number;
  symbol?: string;
  holdings?: any[];
}

const DesktopTradingDashboard = ({
  user,
  balance,
  symbol = 'ETH/USD',
  holdings = []
}: DesktopTradingDashboardProps) => {
  // Mock data for the chart
  const [chartData] = useState([
    { time: '2:00 AM', price: 3540 },
    { time: '6:00 AM', price: 3570 },
    { time: '10:00 AM', price: 3600 },
    { time: '12:00 PM', price: 3615.86 },
    { time: '2:00 PM', price: 3640 },
    { time: '4:00 PM', price: 3620 },
  ]);

  // Mock exchange data
  const [exchanges] = useState([
    { name: 'UniSwap', logo: '🦄', amount: '3,615.32', diff: 'Limited', volume: '$5,875.00' },
    { name: 'SushiSwap', logo: '🍣', amount: '3,617.12', diff: 'Trending', volume: '$5,840.12' },
    { name: 'PancakeSwap', logo: '🥞', amount: '3,620.00', diff: 'Rising', volume: '$5,430.00' },
  ]);

  const currentPrice = 3615.86;
  const priceChange = 118.73;
  const priceChangePercent = 3.27;

  return (
    <div className="min-h-screen bg-black">
      {/* Top Navigation Bar */}
      <header className="border-b border-border bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-lg font-bold text-black">L</span>
              </div>
              <span className="text-xl font-bold">LumaTrade</span>
            </div>

            {/* Main Navigation */}
            <nav className="flex items-center gap-6">
              <a href="/dashboard" className="text-sm font-medium text-white hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="/trade" className="text-sm font-medium text-white hover:text-primary transition-colors">
                Trade
              </a>
              <a href="/market" className="text-sm font-medium text-text-secondary hover:text-white transition-colors flex items-center gap-1">
                Market
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Wallet Address Badge */}
            <div className="flex items-center gap-2 bg-background-card border border-border rounded-xl px-4 py-2">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono">
                {user?.walletAddress || '0xA7F3d4B8c...'}
              </span>
            </div>

            {/* Action Buttons */}
            <button className="p-2 hover:bg-background-hover rounded-lg transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-background-hover rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-background-hover rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            {/* Log In Button */}
            <button className="bg-primary text-black px-6 py-2 rounded-xl font-semibold hover:bg-primary-hover transition-colors">
              Log In
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - 3 Column Layout */}
      <div className="grid grid-cols-[1fr_2fr_400px] gap-0 h-[calc(100vh-73px)]">
        {/* Left Sidebar - Chart */}
        <div className="border-r border-border overflow-y-auto">
          <Card className="h-full rounded-none border-0">
            <TradingChart
              symbol={symbol}
              currentPrice={currentPrice}
              change={priceChange}
              changePercent={priceChangePercent}
              data={chartData}
            />
          </Card>
        </div>

        {/* Center - Exchange Table & Holdings */}
        <div className="border-r border-border overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Exchange Comparison Table */}
            <Card className="p-0">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="text-lg font-bold">Exchange</h3>
              </div>
              <ExchangeTable exchanges={exchanges} />
            </Card>

            {/* Holdings / Portfolio */}
            {holdings && holdings.length > 0 && (
              <Card>
                <h3 className="text-lg font-bold mb-4">Your Holdings</h3>
                <div className="space-y-3">
                  {holdings.slice(0, 5).map((holding, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 hover:bg-background-hover rounded-xl transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-bold text-primary">
                            {holding.symbol?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold">{holding.symbol}</div>
                          <div className="text-sm text-text-secondary">
                            {holding.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {formatCurrency(holding.totalValue || 0)}
                        </div>
                        <div className={`text-sm ${
                          (holding.profitLoss || 0) >= 0
                            ? 'text-accent-green'
                            : 'text-accent-red'
                        }`}>
                          {((holding.profitLossPercentage || 0) >= 0 ? '+' : '')}
                          {(holding.profitLossPercentage || 0).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Right Sidebar - Trading Panel */}
        <div className="bg-background-card overflow-y-auto">
          <Card className="h-full rounded-none border-0">
            <TradingPanel
              symbol="ETH"
              balance={{
                eth: 12.695,
                usd: balance
              }}
              currentPrice={currentPrice}
              estimatedFee={4.28}
              spread={0}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DesktopTradingDashboard;
