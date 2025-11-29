"use client";

import { useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { cn } from '@/lib/utils';

interface TradingPanelProps {
  symbol: string;
  balance: {
    eth: number;
    usd: number;
  };
  currentPrice: number;
  estimatedFee: number;
  spread: number;
}

const TradingPanel = ({
  symbol,
  balance,
  currentPrice,
  estimatedFee,
  spread
}: TradingPanelProps) => {
  const [activeTab, setActiveTab] = useState<'BUY' | 'SELL'>('BUY');
  const [amount, setAmount] = useState('');

  const tabs = ['BUY', 'SELL'] as const;

  const totalBalance = balance.eth;
  const availableBalance = balance.usd;
  const estimatedReceive = parseFloat(amount || '0') / currentPrice;
  const estimatedSpend = parseFloat(amount || '0');

  return (
    <div className="flex flex-col h-full">
      {/* Symbol Badge */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-black" />
          </div>
          <div>
            <div className="text-xs text-text-secondary">You Buy</div>
            <div className="text-sm font-bold">{symbol}</div>
          </div>
        </div>
      </div>

      {/* Balance Display */}
      <div className="mb-6">
        <div className="text-xs text-text-secondary mb-1">Balance</div>
        <div className="text-2xl font-bold">{totalBalance.toFixed(3)}</div>
        <div className="flex items-center gap-2 text-sm text-accent-green mt-1">
          <TrendingUp className="w-4 h-4" />
          <span>+7.45%</span>
        </div>
      </div>

      {/* Buy/Sell Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-3 rounded-xl font-semibold text-sm transition-all",
              activeTab === tab
                ? tab === 'BUY'
                  ? "bg-accent-green text-black"
                  : "bg-accent-red text-white"
                : "bg-background-hover text-text-secondary hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* USD Input */}
      <div className="mb-4">
        <label className="text-xs text-text-secondary mb-2 block">
          You Spend
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-accent-green flex items-center justify-center">
              <DollarSign className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium">USD</span>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-background-hover border border-border rounded-xl py-4 pl-20 pr-4 text-lg font-medium focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="text-xs text-text-secondary mt-2">
          Available Balance: ${availableBalance.toLocaleString()}
        </div>
      </div>

      {/* Estimated Receive */}
      <div className="mb-6">
        <label className="text-xs text-text-secondary mb-2 block">
          You will receive
        </label>
        <div className="bg-background-hover border border-border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs font-bold text-black">{symbol.charAt(0)}</span>
              </div>
              <span className="text-sm font-medium">{symbol}</span>
            </div>
            <div className="text-lg font-bold">{estimatedReceive.toFixed(4)}</div>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="space-y-3 mb-6 pb-6 border-b border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Estimate fee</span>
          <span className="font-medium">{estimatedFee.toFixed(2)} USD</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Spread</span>
          <span className="font-medium">{spread}%</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mt-auto">
        <Button
          variant={activeTab === 'BUY' ? 'primary' : 'danger'}
          className="w-full"
          size="lg"
        >
          {activeTab === 'BUY' ? 'Buy BTC' : 'Sell BTC'}
        </Button>

        <button className="w-full py-3 text-sm text-text-secondary hover:text-white transition-colors flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Connect Wallet
        </button>
      </div>

      {/* Available Balance Info */}
      <div className="mt-6 p-4 bg-background-hover rounded-xl">
        <div className="text-xs text-text-secondary mb-2">Available Balance</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold">{totalBalance.toFixed(4)} {symbol}</div>
            <div className="text-xs text-accent-green">+7.45%</div>
          </div>
          <button className="p-2 hover:bg-background-card rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradingPanel;
