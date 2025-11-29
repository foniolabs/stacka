"use client";

import { ReactNode } from 'react';
import { Bell, Settings, Wallet, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

interface DesktopLayoutProps {
  children: ReactNode;
  balance?: number;
}

const DesktopLayout = ({ children, balance = 0 }: DesktopLayoutProps) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-black">
      {/* Top Navigation Bar */}
      <header className="border-b border-border bg-black sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3 mx-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/stacka-logo.svg"
              alt="Stacka"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold">Stacka</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {/* Navigation */}
            <nav className="flex items-center gap-6">
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/trade"
                className={`text-sm font-medium transition-colors ${
                  isActive('/trade')
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                Trade
              </Link>
              <Link
                href="/portfolio"
                className={`text-sm font-medium transition-colors ${
                  isActive('/portfolio')
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                Portfolio
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Wallet Balance Badge */}
              <div className="flex items-center gap-2 bg-background-card border border-border rounded-xl px-3 py-1.5">
                <Wallet className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">{formatCurrency(balance)}</span>
              </div>

              <button className="p-2 hover:bg-background-hover rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-background-hover rounded-lg transition-colors">
                <Bell className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-background-hover rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
              </button>

              <Link href="/wallet">
                <Button variant="primary" size="sm" className="h-8 text-sm">
                  Deposit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[calc(100vh-57px)] overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default DesktopLayout;
