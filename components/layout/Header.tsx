'use client';

import { Bell, Settings } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function Header({ title, subtitle, actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-black/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">{title}</h1>
          {subtitle && (
            <p className="text-sm text-text-secondary">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {actions}
          <Link
            href="/notifications"
            className="p-2 rounded-xl text-text-secondary hover:text-white hover:bg-background-hover transition-all"
          >
            <Bell className="w-5 h-5" />
          </Link>
          <Link
            href="/settings"
            className="p-2 rounded-xl text-text-secondary hover:text-white hover:bg-background-hover transition-all"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
