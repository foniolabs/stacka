"use client";

import { cn } from '@/lib/utils';

interface Exchange {
  name: string;
  logo: string;
  amount: string;
  diff: string;
  volume: string;
}

interface ExchangeTableProps {
  exchanges: Exchange[];
}

const ExchangeTable = ({ exchanges }: ExchangeTableProps) => {
  return (
    <div className="overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-border text-xs font-medium text-text-secondary">
        <div>Exchange</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Diff</div>
        <div className="text-right">Volume</div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-border/50">
        {exchanges.map((exchange, index) => {
          const diffValue = parseFloat(exchange.diff);
          const isPositive = diffValue >= 0;

          return (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 px-4 py-3 hover:bg-background-hover/50 transition-colors cursor-pointer"
            >
              {/* Exchange Name */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-background-hover flex items-center justify-center">
                  <span className="text-xs font-bold">
                    {exchange.logo}
                  </span>
                </div>
                <span className="text-sm font-medium">{exchange.name}</span>
              </div>

              {/* Amount */}
              <div className="text-right">
                <span className="text-sm font-medium">{exchange.amount}</span>
              </div>

              {/* Diff */}
              <div className="text-right">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded",
                    isPositive
                      ? "text-accent-green bg-accent-green/10"
                      : "text-accent-red bg-accent-red/10"
                  )}
                >
                  {exchange.diff}
                </span>
              </div>

              {/* Volume */}
              <div className="text-right">
                <span className="text-sm text-text-secondary">{exchange.volume}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExchangeTable;
