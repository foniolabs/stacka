/**
 * Bread API Client
 * Handles wallet operations, balance checks, transfers, and offramp to NGN
 */

import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Create axios instance for Bread API calls
const createBreadClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add auth token interceptor
  client.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem('token');
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
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  // Response interceptor
  client.interceptors.response.use(
    (response) => response.data.data,
    (error) => Promise.reject(error)
  );

  return client;
};

export interface BreadWallet {
  walletId: string;
  addresses: {
    evm: string;
    svm: string;
  };
}

export interface BreadBalance {
  id: string;
  name: string;
  code: string;
  blockchain: {
    id: number;
    name: string;
  };
  balance: number;
  available: number;
  debt: number;
}

export interface BreadOfframpQuote {
  type: string;
  fee: number;
  expiry: string;
  currency: string;
  rate: number;
  input_amount: number;
  output_amount: number;
}

export interface BreadBank {
  name: string;
  code: string;
  icon: string;
}

export interface BreadNotification {
  asset: string;
  id: string;
  reference: string;
  wallet: string;
  hash: string;
  sender?: string;
  receiver?: string;
  beneficiary?: string;
  currency?: string;
  rate?: number;
  direction: 'incoming' | 'outgoing';
  amount: number;
  fee: number;
  token?: string;
  blockchain: number;
  status: 'completed' | 'pending' | 'failed';
  type: 'transfer' | 'deposit' | 'offramp' | 'onramp' | 'swap';
  timestamp: string;
}

class BreadAPIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = createBreadClient();
  }

  /**
   * Create a new Bread wallet (called automatically on signup)
   */
  async createWallet(): Promise<BreadWallet> {
    const response = await this.client.post('/api/v1/bread/wallet/create');
    return response.data;
  }

  /**
   * Get user's wallet addresses (EVM & Solana)
   */
  async getWalletAddresses(): Promise<{
    evm: string | null;
    svm: string | null;
    offrampEvm: string | null;
  }> {
    const response = await this.client.get('/api/v1/bread/wallet/addresses');
    return response.data;
  }

  /**
   * Get wallet balance for a specific asset
   */
  async getBalance(walletId: string, asset: string = 'base:usdc'): Promise<BreadBalance> {
    const response = await this.client.get('/api/v1/bread/wallet/balances', {
      params: { walletId, asset }
    });
    return response.data;
  }

  /**
   * Get all asset balances for a wallet
   */
  async getAllBalances(walletId: string): Promise<BreadBalance[]> {
    const response = await this.client.get('/api/v1/bread/wallet/all-balances', {
      params: { walletId }
    });
    return response.data;
  }

  /**
   * Transfer assets from wallet to another address
   */
  async transfer(params: {
    walletId: string;
    amount: number;
    receiver: string;
    asset: string; // e.g., 'base:usdc', 'solana:usdc'
  }): Promise<{ hash: string; link: string }> {
    const response = await this.client.post('/api/v1/bread/transfer', params);
    return response.data;
  }

  // ============================================
  // OFFRAMP (USDC -> NGN)
  // ============================================

  /**
   * Get current USDC -> NGN exchange rate
   */
  async getOfframpRate(currency: string = 'NGN'): Promise<{
    currency: string;
    rate: number;
    timestamp: string;
  }> {
    const response = await this.client.get('/api/v1/bread/offramp/rate', {
      params: { currency }
    });
    return response.data;
  }

  /**
   * Get quote for offramp (convert USDC to NGN)
   */
  async getOfframpQuote(params: {
    amount: number;
    currency: string;
    asset: string; // e.g., 'base:usdc'
  }): Promise<BreadOfframpQuote> {
    const response = await this.client.post('/api/v1/bread/offramp/quote', params);
    return response.data;
  }

  /**
   * Execute offramp (convert USDC to NGN and send to bank account)
   */
  async executeOfframp(params: {
    walletId: string;
    amount: number;
    beneficiaryId: string;
    asset: string; // e.g., 'base:usdc'
  }): Promise<{ reference: string; message: string }> {
    const response = await this.client.post('/api/v1/bread/offramp/execute', params);
    return response.data;
  }

  /**
   * Get offramp transaction status
   */
  async getOfframpStatus(params: {
    walletId: string;
    reference?: string;
  }): Promise<any> {
    const response = await this.client.get('/api/v1/bread/offramp/status', {
      params
    });
    return response.data;
  }

  /**
   * Setup complete offramp flow (KYC + Bank + Wallet)
   */
  async setupOfframp(params: {
    name: string;
    bvn: string;
    dob: string; // format: DD-MM-YYYY
    bankCode: string;
    accountNumber: string;
  }): Promise<{
    identityId: string;
    beneficiaryId: string;
    walletId: string;
    evmAddress: string;
  }> {
    const response = await this.client.post('/api/v1/bread/offramp/setup', params);
    return response.data;
  }

  // ============================================
  // BANK MANAGEMENT
  // ============================================

  /**
   * Get list of supported Nigerian banks
   */
  async getBanks(currency: string = 'NGN'): Promise<BreadBank[]> {
    const response = await this.client.get('/api/v1/bread/banks', {
      params: { currency }
    });
    return response.data;
  }

  /**
   * Lookup and verify bank account details
   */
  async lookupBankAccount(params: {
    bankCode: string;
    accountNumber: string;
  }): Promise<{
    bank_code: string;
    bank_name: string;
    account_number: string;
    account_name: string;
  }> {
    const response = await this.client.post('/api/v1/bread/bank/lookup', params);
    return response.data;
  }

  // ============================================
  // NOTIFICATIONS & HISTORY
  // ============================================

  /**
   * Get transaction history/notifications
   */
  async getNotifications(params?: {
    walletId?: string;
    type?: 'transfer' | 'deposit' | 'offramp' | 'onramp' | 'swap';
    reference?: string;
    page?: number;
  }): Promise<{
    notifications: BreadNotification[];
    total: number;
    page: number;
    previous: string | null;
    next: string | null;
    limit: number;
  }> {
    const response = await this.client.get('/api/v1/bread/notifications', { params });
    return response.data;
  }

  /**
   * Get list of supported crypto assets
   */
  async getAssets(): Promise<any[]> {
    const response = await this.client.get('/api/v1/bread/assets');
    return response.data;
  }
}

export const breadAPI = new BreadAPIClient();
