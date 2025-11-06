export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  walletAddress: string;
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  balance: number;
  depositAddress: string;
  chains: Chain[];
}

export interface Chain {
  name: string;
  chainId: number;
  address: string;
  enabled: boolean;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: 'STOCK_NGN' | 'STOCK_US' | 'CRYPTO' | 'DEFI';
  icon?: string;
  price: number;
  change24h: number;
  marketCap?: number;
  volume24h?: number;
}

export interface Holding {
  id: string;
  assetId: string;
  symbol: string;
  name: string;
  type: string;
  assetType?: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  currentValue?: number;
  totalCost: number;
  costBasis?: number;
  profitLoss: number;
  gainLoss?: number;
  profitLossPercentage: number;
  gainLossPercent?: number;
  lastUpdated?: string;
  icon?: string;
  // For NGN stocks - original currency values
  originalCurrency?: string;
  originalAveragePrice?: number;
  originalCurrentPrice?: number;
  originalValue?: number;
  exchangeRate?: number;
}

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'BUY' | 'SELL' | 'YIELD_DEPOSIT' | 'YIELD_WITHDRAWAL';
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  amount: number;
  currency: string;
  asset?: string;
  timestamp: string;
  txHash?: string;
  fee?: number;
}

export interface Portfolio {
  overview: {
    totalPortfolioValue: number;
    totalInvested: number;
    totalCurrentValue: number;
    totalGainLoss: number;
    totalGainLossPercent: number;
    cashBalance: {
      usdc: number;
      ngn: number;
      ngnInUsd: number;
      total: number;
    };
  };
  holdings: Holding[];
  assetAllocation: Array<{
    type: string;
    value: number;
    percentage: number;
    count: number;
  }>;
  // Legacy fields for backwards compatibility
  totalValue?: number;
  change24h?: number;
  change24hPercentage?: number;
  allocation?: {
    stocks: number;
    crypto: number;
    defi: number;
    cash: number;
  };
}

export interface Notification {
  id: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface Quote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercentage: number;
  high24h: number;
  low24h: number;
  volume: number;
  marketCap: number;
  timestamp: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
  message?: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TradeOrder {
  symbol: string;
  type: 'BUY' | 'SELL';
  amount: number;
  estimatedPrice: number;
  estimatedFee: number;
  estimatedTotal: number;
}
