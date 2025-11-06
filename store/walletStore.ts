import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';

interface ExchangeRate {
  ngnToUsd: number;
  usdToNgn: number;
  lastUpdated?: number;
}

interface WalletState {
  balance: number;
  availableBalance: number; // Wallet balance (available for investing)
  blockchainBalance: number;
  platformBalance: number;
  nairaBalance: number;
  depositAddress: string;
  exchangeRate: ExchangeRate | null;
  isLoading: boolean;
  error: string | null;
  fetchBalance: () => Promise<void>;
  fetchDepositAddress: () => Promise<void>;
  fetchExchangeRate: () => Promise<void>;
}

export const useWalletStore = create<WalletState>((set) => ({
  balance: 0,
  availableBalance: 0,
  blockchainBalance: 0,
  platformBalance: 0,
  nairaBalance: 0,
  depositAddress: '',
  exchangeRate: null,
  isLoading: false,
  error: null,

  fetchBalance: async () => {
    set({ isLoading: true, error: null });
    try {
      const data: any = await apiClient.getBalance();
      const balanceData = data?.data || data;
      
      // New structure: wallet.defi, wallet.naira, trading.total
      const wallet = balanceData.wallet || {};
      const trading = balanceData.trading || {};
      
      set({
        balance: balanceData.totalBalance || balanceData.balance || 0,
        availableBalance: wallet.total || balanceData.wallet?.total || 0, // Available balance for investing
        blockchainBalance: wallet.defi || balanceData.blockchainBalance || 0,
        platformBalance: trading.total || balanceData.platformBalance || 0,
        nairaBalance: wallet.naira || balanceData.nairaBalance || 0,
        exchangeRate: balanceData.exchangeRate || null,
        isLoading: false,
      });
    } catch (error: any) {
      console.error('❌ Balance fetch error:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  fetchDepositAddress: async () => {
    set({ isLoading: true, error: null });
    try {
      const data: any = await apiClient.getDepositAddress();
      set({ depositAddress: data.data.depositAddress || '', isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchExchangeRate: async () => {
    try {
      const data: any = await apiClient.getExchangeRate();
      const rateData = data?.data || data;
      set({ exchangeRate: rateData });
    } catch (error: any) {
      console.error('❌ Exchange rate fetch error:', error);
    }
  },
}));
