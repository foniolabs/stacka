import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '@/lib/api/client';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  walletAddress?: string;
  usdcBalance: number;
  ngnBalance: number;
  kycStatus: string;
  // Bread wallet fields
  breadWalletId?: string | null;
  breadEvmAddress?: string | null;
  breadSvmAddress?: string | null;
  alpacaAccount?: {
    accountId: string | null;
    accountNumber: string | null;
    status: string | null;
  };
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response: any = await apiClient.login({ email, password });
          
          // Handle backend response structure
          const { token, user } = response.data || response;
          
          if (!token || !user) {
            throw new Error('Invalid response from server');
          }
          
          apiClient.setToken(token);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Login failed';
          set({ isLoading: false, error: errorMessage });
          throw error;
        }
      },

      signup: async (data: SignupData) => {
        set({ isLoading: true, error: null });
        try {
          const response: any = await apiClient.signup(data);
          
          // Handle backend response structure
          const { token, user } = response.data || response;
          
          if (!token || !user) {
            throw new Error('Invalid response from server');
          }
          
          apiClient.setToken(token);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Signup failed';
          set({ isLoading: false, error: errorMessage });
          throw error;
        }
      },

      logout: () => {
        apiClient.removeToken();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        toast.success('Logged out successfully');
      },

      fetchProfile: async () => {
        try {
          const response: any = await apiClient.getProfile();
          const user = response.data || response;
          set({ user });
        } catch (error: any) {
          console.error('Failed to fetch profile:', error);
          // If fetching profile fails with 401, logout the user
          if (error.response?.status === 401) {
            apiClient.removeToken();
            set({
              user: null,
              token: null,
              isAuthenticated: false,
            });
          }
        }
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
