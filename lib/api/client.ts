import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response.data,
      (error: AxiosError<any>) => {
        const message = error.response?.data?.message || error.message || 'An error occurred';
        
        // Don't show toast for auth errors (401) or not found errors (404)
        // 404s are expected for unimplemented endpoints
        if (error.response?.status !== 401 && error.response?.status !== 404) {
          toast.error(message);
        }

        return Promise.reject(error);
      }
    );
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      // First try direct token storage
      let token = localStorage.getItem('token');
      
      // If not found, check auth-storage from zustand persist
      if (!token) {
        try {
          const authStorage = localStorage.getItem('auth-storage');
          if (authStorage) {
            const parsed = JSON.parse(authStorage);
            token = parsed.state?.token || null;
          }
        } catch (error) {
          console.error('Failed to parse auth storage:', error);
        }
      }
      
      if (!token) {
        console.warn('No authentication token found. Please login first.');
      }
      return token;
    }
    return null;
  }
  
  public getBaseURL(): string {
    return API_URL;
  }

  public setToken(token: string): void {
    if (typeof window !== 'undefined') {
      // Store in both locations for compatibility
      localStorage.setItem('token', token);
      
      // Also update the auth-storage from zustand
      try {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const parsed = JSON.parse(authStorage);
          parsed.state = parsed.state || {};
          parsed.state.token = token;
          localStorage.setItem('auth-storage', JSON.stringify(parsed));
        }
      } catch (error) {
        console.error('Failed to update auth storage:', error);
      }
    }
  }

  public removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  // Auth endpoints
  async signup(data: { email: string; password: string; firstName?: string; lastName?: string }) {
    return this.client.post('/api/v1/auth/signup', data);
  }

  async login(data: { email: string; password: string }) {
    return this.client.post('/api/v1/auth/login', data);
  }

  async getProfile() {
    return this.client.get('/api/v1/auth/me');
  }

  // Wallet endpoints
  async getDepositAddress() {
    return this.client.get('/api/v1/wallet/deposit-address');
  }

  async getBalance() {
    return this.client.get('/api/v1/wallet/balance');
  }

  async getExchangeRate() {
    return this.client.get('/api/v1/wallet/exchange-rate');
  }

  // Bread Wallet endpoints
  async createBreadWallet() {
    return this.client.post('/api/v1/bread/wallet/create');
  }

  async getBreadWalletAddresses() {
    return this.client.get('/api/v1/bread/wallet/addresses');
  }

  async getBreadWalletBalance(walletId: string) {
    return this.client.get('/api/v1/bread/wallet/balances', {
      params: { walletId },
    });
  }

  async getBreadOfframpRate(currency: string = 'NGN') {
    return this.client.get('/api/v1/bread/offramp/rate', {
      params: { currency },
    });
  }

  async getBreadOfframpQuote(data: {
    amount: number;
    currency: string;
    asset: string;
  }) {
    return this.client.post('/api/v1/bread/offramp/quote', data);
  }

  async executeBreadOfframp(data: {
    walletId: string;
    amount: number;
    beneficiaryId: string;
    asset: string;
  }) {
    return this.client.post('/api/v1/bread/offramp/execute', data);
  }

  async setupBreadOfframp(data: {
    name: string;
    bvn: string;
    dob: string;
    bankCode: string;
    accountNumber: string;
  }) {
    return this.client.post('/api/v1/bread/offramp/setup', data);
  }

  async lookupBankAccount(data: {
    bankCode: string;
    accountNumber: string;
  }) {
    return this.client.post('/api/v1/bread/bank/lookup', data);
  }

  async transferBreadAssets(data: {
    walletId: string;
    amount: number;
    receiver: string;
    asset: string;
  }) {
    return this.client.post('/api/v1/bread/transfer', data);
  }

  // Portfolio endpoints
  async getPortfolio() {
    return this.client.get('/api/v1/portfolio');
  }

  async getHoldings(assetType?: string) {
    return this.client.get('/api/v1/portfolio/holdings', {
      params: { assetType },
    });
  }

  async getPerformance(period: string = '30d') {
    return this.client.get('/api/v1/portfolio/performance', {
      params: { period },
    });
  }

  // Transaction endpoints
  async getTransactions(params?: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
  }) {
    return this.client.get('/api/v1/transactions', { params });
  }

  async getTransactionStats() {
    return this.client.get('/api/v1/transactions/stats');
  }

  // Withdrawal endpoints
  async requestWithdrawal(data: {
    amount: number;
    currency: string;
    destination: any;
  }) {
    return this.client.post('/api/v1/withdrawals', data);
  }

  async getWithdrawals(params?: { page?: number; limit?: number; status?: string }) {
    return this.client.get('/api/v1/withdrawals', { params });
  }

  async getWithdrawalLimits() {
    return this.client.get('/api/v1/withdrawals/limits');
  }

  async cancelWithdrawal(id: string) {
    return this.client.post(`/api/v1/withdrawals/${id}/cancel`);
  }

  // Notifications
  async getNotifications(params?: { page?: number; limit?: number; unreadOnly?: boolean }) {
    return this.client.get('/api/v1/notifications', { params });
  }

  async markNotificationAsRead(id: string) {
    return this.client.put(`/api/v1/notifications/${id}/read`);
  }

  async markAllNotificationsAsRead() {
    return this.client.put('/api/v1/notifications/read-all');
  }

  // User profile
  async updateProfile(data: { firstName?: string; lastName?: string; phone?: string }) {
    return this.client.put('/api/v1/user/profile', data);
  }

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    return this.client.put('/api/v1/user/password', data);
  }

  // Nigerian Stocks (Chaka API)
  async getNigerianStocks(params?: { search?: string; limit?: number }) {
    return this.client.get('/api/v1/stocks/ngn', { params });
  }

  async getNigerianStockDetail(symbol: string) {
    return this.client.get(`/api/v1/stocks/ngn/${symbol}`);
  }

  async tradeNigerianStock(data: {
    symbol: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    price?: number;
  }) {
    return this.client.post('/api/v1/trade/stocks/ngn', data);
  }

  // US Stocks (Alpaca API)
  async getUSStocks(params?: { search?: string; limit?: number }) {
    return this.client.get('/api/v1/stocks/us', { params });
  }

  async getUSStockDetail(symbol: string) {
    return this.client.get(`/api/v1/stocks/us/${symbol}`);
  }

  async tradeUSStock(data: {
    symbol: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    price?: number;
  }) {
    return this.client.post('/api/v1/trade/stocks/us', data);
  }

  // Trading general
  async getQuote(symbol: string) {
    return this.client.get(`/api/v1/trade/quote/${symbol}`);
  }

  async getMarketData(params?: { assetType?: string }) {
    return this.client.get('/api/v1/trading/market', { params });
  }

  async getOrderHistory(params?: { page?: number; limit?: number; status?: string }) {
    return this.client.get('/api/v1/trading/orders', { params });
  }

  // DeFi Yield (Moonwell, Aave, Compound on Base)
  async getYieldOptions() {
    return this.client.get('/api/v1/yield/options');
  }

  async getYieldOpportunities() {
    return this.client.get('/api/v1/yield/opportunities');
  }

  async getBestYield() {
    return this.client.get('/api/v1/yield/best');
  }

  async getYieldEstimate(provider: string, amount: number) {
    return this.client.get(`/api/v1/yield/estimate/${provider}`, {
      params: { amount },
    });
  }

  async compareYields(amount: number) {
    return this.client.get('/api/v1/yield/compare', {
      params: { amount },
    });
  }

  async depositYield(data: {
    provider: string; // 'aave', 'compound', 'moonwell'
    amount: number;
  }) {
    return this.client.post('/api/v1/yield/deposit', data);
  }

  async getYieldPositions() {
    return this.client.get('/api/v1/yield/positions');
  }

  // Tokenized Stocks (Backed Finance on Arbitrum)
  async getAvailableTokenizedStocks() {
    return this.client.get('/api/v1/tokenized-stocks/available');
  }

  async getTokenizedStockQuote(params: { symbol: string; amount: number }) {
    return this.client.get('/api/v1/tokenized-stocks/quote', { params });
  }

  async buyTokenizedStock(data: {
    symbol: string;
    amount: number;
    targetChain?: 'Arbitrum' | 'BinanceSmartChain' | 'Ethereum';
  }) {
    return this.client.post('/api/v1/tokenized-stocks/buy', data);
  }

  // Funding
  async getFundingSources() {
    return this.client.get('/api/v1/funds/sources');
  }

  async addFundingSource(data: {
    type: 'bank' | 'card' | 'crypto';
    details: any;
  }) {
    return this.client.post('/api/v1/funds/sources', data);
  }

  async depositFunds(data: {
    sourceId: string;
    amount: number;
    currency: string;
  }) {
    return this.client.post('/api/v1/funds/deposit', data);
  }

  // Naira Deposits
  async getNairaDepositAccount() {
    return this.client.get('/api/v1/deposits/naira/account');
  }

  async getNairaDepositHistory(params?: { page?: number; limit?: number }) {
    return this.client.get('/api/v1/deposits/naira/history', { params });
  }

  async confirmNairaDeposit(reference: string) {
    return this.client.post('/api/v1/deposits/naira/confirm', { reference });
  }

  // Stats & Analytics
  async getDashboardStats() {
    return this.client.get('/api/v1/stats');
  }

  async getPortfolioAnalytics(period: string = '30d') {
    return this.client.get('/api/v1/portfolio/analytics', {
      params: { period },
    });
  }

  // Test endpoints
  async createTestAlpacaAccount() {
    return this.client.post('/api/v1/test/create-alpaca-account');
  }

  async getAlpacaAccountStatus() {
    return this.client.get('/api/v1/test/alpaca-account-status');
  }
}

export const apiClient = new ApiClient();
