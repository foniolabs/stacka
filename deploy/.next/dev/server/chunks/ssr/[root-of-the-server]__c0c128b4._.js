module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/stacka-project/stacka/lib/api/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiClient",
    ()=>apiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
;
;
const API_URL = ("TURBOPACK compile-time value", "http://localhost:4000") || 'http://localhost:4000';
class ApiClient {
    client;
    constructor(){
        this.client = __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
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
                __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(message);
            }
            return Promise.reject(error);
        });
    }
    getToken() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return null;
    }
    getBaseURL() {
        return API_URL;
    }
    setToken(token) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    removeToken() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
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
}),
"[project]/stacka-project/stacka/store/authStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/lib/api/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
;
;
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set)=>({
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].login({
                    email,
                    password
                });
                // Handle backend response structure
                const { token, user } = response.data || response;
                if (!token || !user) {
                    throw new Error('Invalid response from server');
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].setToken(token);
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].signup(data);
                // Handle backend response structure
                const { token, user } = response.data || response;
                if (!token || !user) {
                    throw new Error('Invalid response from server');
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].setToken(token);
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
            __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].removeToken();
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                error: null
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Logged out successfully');
        },
        fetchProfile: async ()=>{
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getProfile();
                const user = response.data || response;
                set({
                    user
                });
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                // If fetching profile fails with 401, logout the user
                if (error.response?.status === 401) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].removeToken();
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
}),
"[project]/stacka-project/stacka/components/AuthInitializer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthInitializer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$store$2f$authStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/store/authStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/lib/api/client.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function AuthInitializer() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Get the persisted auth state
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$store$2f$authStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"].getState().token;
        // If token exists, set it in the API client
        if (token) {
            __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].setToken(token);
            console.log("✅ Auth token restored from storage");
        }
    }, []);
    return null; // This component doesn't render anything
}
}),
"[project]/stacka-project/stacka/components/PWAInstaller.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PWAInstaller
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stacka-project/stacka/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function PWAInstaller() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$stacka$2d$project$2f$stacka$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", ()=>{
                navigator.serviceWorker.register("/sw.js").then((registration)=>{
                    console.log("✅ Service Worker registered:", registration);
                }).catch((error)=>{
                    console.log("❌ Service Worker registration failed:", error);
                });
            });
        }
    }, []);
    return null;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c0c128b4._.js.map