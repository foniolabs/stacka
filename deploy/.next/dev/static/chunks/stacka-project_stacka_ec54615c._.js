(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/stacka-project/stacka/lib/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiClient",
    ()=>apiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/stacka-project/stacka/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
;
;
const API_URL = ("TURBOPACK compile-time value", "http://localhost:4000") || 'http://localhost:4000';
class ApiClient {
    client;
    constructor(){
        this.client = __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Request interceptor
        this.client.interceptors.request.use((config)=>{
            const token = this.getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error)=>Promise.reject(error));
        // Response interceptor
        this.client.interceptors.response.use((response)=>response.data, (error)=>{
            const message = error.response?.data?.message || error.message || 'An error occurred';
            // Don't show toast for auth errors (401) or not found errors (404)
            // 404s are expected for unimplemented endpoints
            if (error.response?.status !== 401 && error.response?.status !== 404) {
                __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(message);
            }
            return Promise.reject(error);
        });
    }
    getToken() {
        if ("TURBOPACK compile-time truthy", 1) {
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn('No authentication token found. Please login first.');
            }
            return token;
        }
        //TURBOPACK unreachable
        ;
    }
    getBaseURL() {
        return API_URL;
    }
    setToken(token) {
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('token', token);
        }
    }
    removeToken() {
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('token');
        }
    }
    // Auth endpoints
    async signup(data) {
        return this.client.post('/api/v1/auth/signup', data);
    }
    async login(data) {
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
    // Portfolio endpoints
    async getPortfolio() {
        return this.client.get('/api/v1/portfolio');
    }
    async getHoldings(assetType) {
        return this.client.get('/api/v1/portfolio/holdings', {
            params: {
                assetType
            }
        });
    }
    async getPerformance(period = '30d') {
        return this.client.get('/api/v1/portfolio/performance', {
            params: {
                period
            }
        });
    }
    // Transaction endpoints
    async getTransactions(params) {
        return this.client.get('/api/v1/transactions', {
            params
        });
    }
    async getTransactionStats() {
        return this.client.get('/api/v1/transactions/stats');
    }
    // Withdrawal endpoints
    async requestWithdrawal(data) {
        return this.client.post('/api/v1/withdrawals', data);
    }
    async getWithdrawals(params) {
        return this.client.get('/api/v1/withdrawals', {
            params
        });
    }
    async getWithdrawalLimits() {
        return this.client.get('/api/v1/withdrawals/limits');
    }
    async cancelWithdrawal(id) {
        return this.client.post(`/api/v1/withdrawals/${id}/cancel`);
    }
    // Notifications
    async getNotifications(params) {
        return this.client.get('/api/v1/notifications', {
            params
        });
    }
    async markNotificationAsRead(id) {
        return this.client.put(`/api/v1/notifications/${id}/read`);
    }
    async markAllNotificationsAsRead() {
        return this.client.put('/api/v1/notifications/read-all');
    }
    // User profile
    async updateProfile(data) {
        return this.client.put('/api/v1/user/profile', data);
    }
    async changePassword(data) {
        return this.client.put('/api/v1/user/password', data);
    }
    // Nigerian Stocks (Chaka API)
    async getNigerianStocks(params) {
        return this.client.get('/api/v1/stocks/ngn', {
            params
        });
    }
    async getNigerianStockDetail(symbol) {
        return this.client.get(`/api/v1/stocks/ngn/${symbol}`);
    }
    async tradeNigerianStock(data) {
        return this.client.post('/api/v1/trade/stocks/ngn', data);
    }
    // US Stocks (Alpaca API)
    async getUSStocks(params) {
        return this.client.get('/api/v1/stocks/us', {
            params
        });
    }
    async getUSStockDetail(symbol) {
        return this.client.get(`/api/v1/stocks/us/${symbol}`);
    }
    async tradeUSStock(data) {
        return this.client.post('/api/v1/trade/stocks/us', data);
    }
    // Trading general
    async getQuote(symbol) {
        return this.client.get(`/api/v1/trade/quote/${symbol}`);
    }
    async getMarketData(params) {
        return this.client.get('/api/v1/trading/market', {
            params
        });
    }
    async getOrderHistory(params) {
        return this.client.get('/api/v1/trading/orders', {
            params
        });
    }
    // DeFi Yield (Aave & Compound)
    async getYieldOpportunities() {
        return this.client.get('/api/v1/yield/opportunities');
    }
    async getYieldAPY(protocol) {
        return this.client.get('/api/v1/yield/apy', {
            params: {
                protocol
            }
        });
    }
    async getYieldEstimate(amount, protocol) {
        return this.client.get('/api/v1/yield/estimate', {
            params: {
                amount,
                protocol
            }
        });
    }
    async depositYield(data) {
        return this.client.post('/api/v1/yield/deposit', data);
    }
    async withdrawYield(data) {
        return this.client.post('/api/v1/yield/withdraw', data);
    }
    async getYieldPositions() {
        return this.client.get('/api/v1/yield/positions');
    }
    // Funding
    async getFundingSources() {
        return this.client.get('/api/v1/funds/sources');
    }
    async addFundingSource(data) {
        return this.client.post('/api/v1/funds/sources', data);
    }
    async depositFunds(data) {
        return this.client.post('/api/v1/funds/deposit', data);
    }
    // Naira Deposits
    async getNairaDepositAccount() {
        return this.client.get('/api/v1/deposits/naira/account');
    }
    async getNairaDepositHistory(params) {
        return this.client.get('/api/v1/deposits/naira/history', {
            params
        });
    }
    async confirmNairaDeposit(reference) {
        return this.client.post('/api/v1/deposits/naira/confirm', {
            reference
        });
    }
    // Stats & Analytics
    async getDashboardStats() {
        return this.client.get('/api/v1/stats');
    }
    async getPortfolioAnalytics(period = '30d') {
        return this.client.get('/api/v1/portfolio/analytics', {
            params: {
                period
            }
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
const apiClient = new ApiClient();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/stacka-project/stacka/store/authStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
;
;
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        login: async (email, password)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].login({
                    email,
                    password
                });
                // Handle backend response structure
                const { token, user } = response.data || response;
                if (!token || !user) {
                    throw new Error('Invalid response from server');
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].setToken(token);
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message || 'Login failed';
                set({
                    isLoading: false,
                    error: errorMessage
                });
                throw error;
            }
        },
        signup: async (data)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].signup(data);
                // Handle backend response structure
                const { token, user } = response.data || response;
                if (!token || !user) {
                    throw new Error('Invalid response from server');
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].setToken(token);
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message || 'Signup failed';
                set({
                    isLoading: false,
                    error: errorMessage
                });
                throw error;
            }
        },
        logout: ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].removeToken();
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                error: null
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Logged out successfully');
        },
        fetchProfile: async ()=>{
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].getProfile();
                const user = response.data || response;
                set({
                    user
                });
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                // If fetching profile fails with 401, logout the user
                if (error.response?.status === 401) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].removeToken();
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false
                    });
                }
            }
        },
        updateUser: (userData)=>{
            set((state)=>({
                    user: state.user ? {
                        ...state.user,
                        ...userData
                    } : null
                }));
        },
        clearError: ()=>{
            set({
                error: null
            });
        }
    }), {
    name: 'auth-storage',
    partialize: (state)=>({
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated
        })
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/stacka-project/stacka/components/AuthInitializer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthInitializer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$store$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/store/authStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/lib/api/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AuthInitializer() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthInitializer.useEffect": ()=>{
            // Get the persisted auth state
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$store$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].getState().token;
            // If token exists, set it in the API client
            if (token) {
                __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].setToken(token);
                console.log("✅ Auth token restored from storage");
            }
        }
    }["AuthInitializer.useEffect"], []);
    return null; // This component doesn't render anything
}
_s(AuthInitializer, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = AuthInitializer;
var _c;
__turbopack_context__.k.register(_c, "AuthInitializer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/stacka-project/stacka/components/PWAInstaller.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PWAInstaller
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function PWAInstaller() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PWAInstaller.useEffect": ()=>{
            if ("serviceWorker" in navigator) {
                window.addEventListener("load", {
                    "PWAInstaller.useEffect": ()=>{
                        navigator.serviceWorker.register("/sw.js").then({
                            "PWAInstaller.useEffect": (registration)=>{
                                console.log("✅ Service Worker registered:", registration);
                            }
                        }["PWAInstaller.useEffect"]).catch({
                            "PWAInstaller.useEffect": (error)=>{
                                console.log("❌ Service Worker registration failed:", error);
                            }
                        }["PWAInstaller.useEffect"]);
                    }
                }["PWAInstaller.useEffect"]);
            }
        }
    }["PWAInstaller.useEffect"], []);
    return null;
}
_s(PWAInstaller, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = PWAInstaller;
var _c;
__turbopack_context__.k.register(_c, "PWAInstaller");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=stacka-project_stacka_ec54615c._.js.map