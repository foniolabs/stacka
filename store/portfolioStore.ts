import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { Portfolio, Holding } from '@/types';

interface PortfolioState {
  portfolio: Portfolio | null;
  holdings: Holding[];
  isLoading: boolean;
  error: string | null;
  fetchPortfolio: () => Promise<void>;
  fetchHoldings: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  portfolio: null,
  holdings: [],
  isLoading: false,
  error: null,

  fetchPortfolio: async () => {
    set({ isLoading: true, error: null });
    try {
      const data: any = await apiClient.getPortfolio();
      // Backend returns { success: true, data: {...} }
      const portfolioData = data?.data || data;
      set({ portfolio: portfolioData, isLoading: false });
    } catch (error: any) {
      // Silently handle 404 - endpoint not implemented yet
      if (error.response?.status === 404) {
        console.warn('Portfolio endpoint not implemented yet');
        set({ isLoading: false });
        return;
      }
      set({ error: error.message, isLoading: false });
    }
  },

  fetchHoldings: async () => {
    set({ isLoading: true, error: null });
    try {
      const data: any = await apiClient.getHoldings();
      // Backend returns { success: true, data: { holdings: [...] } }
      const holdingsArray = data?.data?.holdings || data?.holdings || [];
      
      // Map backend fields to frontend expected fields
      const mappedHoldings = holdingsArray.map((h: any) => ({
        id: h.id,
        assetId: h.id,
        symbol: h.symbol,
        name: h.name,
        type: h.assetType,
        quantity: h.quantity,
        averagePrice: h.averagePrice,
        currentPrice: h.currentPrice,
        totalValue: h.currentValue, // Backend uses currentValue
        totalCost: h.costBasis,
        profitLoss: h.gainLoss, // Map gainLoss -> profitLoss
        profitLossPercentage: h.gainLossPercent || 0, // Map gainLossPercent -> profitLossPercentage
        lastUpdated: h.lastUpdated,
      }));
      
      set({ holdings: mappedHoldings, isLoading: false });
    } catch (error: any) {
      // Silently handle 404 - endpoint not implemented yet
      if (error.response?.status === 404) {
        console.warn('Holdings endpoint not implemented yet');
        set({ holdings: [], isLoading: false });
        return;
      }
      set({ error: error.message, holdings: [], isLoading: false });
    }
  },
}));
