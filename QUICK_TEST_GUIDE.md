# Quick Test Guide - Authentication Integration

## ✅ Integration Complete

The STACKA frontend is now connected to the production backend API at `https://api.stacka.app`.

## 🧪 How to Test

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Test Signup Flow

1. Navigate to http://localhost:3000/signup
2. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: test@stacka.app
   - Password: SecurePass123
   - Confirm Password: SecurePass123
3. Click "Create Account"
4. You should be redirected to `/dashboard` with a success toast

### 3. Test Login Flow

1. Navigate to http://localhost:3000/login
2. Enter credentials:
   - Email: test@stacka.app
   - Password: SecurePass123
3. Click "Login"
4. You should be redirected to `/dashboard` with a welcome message

### 4. Test Logout

1. Click the logout button in the header/navigation
2. You should be redirected to the login page
3. Your token should be cleared from localStorage

## 🔍 Debugging

### Check Network Requests

Open browser DevTools → Network tab:

- Verify requests go to `https://api.stacka.app`
- Check request/response payloads
- Look for 200/201 status codes

### Check LocalStorage

Open browser DevTools → Application → Local Storage:

- Look for `auth-storage` key
- Should contain: `{ user, token, isAuthenticated }`

### Check Console Logs

Open browser DevTools → Console:

- Look for any error messages
- Verify no CORS errors

## 📝 API Endpoints Being Used

| Endpoint              | Method | Purpose                    |
| --------------------- | ------ | -------------------------- |
| `/api/v1/auth/signup` | POST   | Create new user account    |
| `/api/v1/auth/login`  | POST   | Authenticate existing user |
| `/api/v1/auth/me`     | GET    | Get current user profile   |

## 🛠️ What Was Changed

1. **API Client** (`lib/api/client.ts`)

   - Updated base URL to production: `https://api.stacka.app`
   - Kept token management and interceptors

2. **Auth Store** (`store/authStore.ts`)

   - Added better error handling
   - Added `clearError` method
   - Improved response parsing
   - Added toast notifications

3. **Environment Variables**

   - `.env.local`: Set production API URL
   - `.env.example`: Updated with comments

4. **TypeScript Types** (`types/index.ts`)
   - Added `AuthResponse` type
   - Added `SignupRequest` type
   - Added `LoginRequest` type
   - Added generic `ApiResponse<T>` type

## ✨ Features Working

- ✅ User signup with form validation
- ✅ User login with credentials
- ✅ JWT token storage in localStorage
- ✅ Automatic token injection in API requests
- ✅ Token persistence across page refreshes
- ✅ User logout with token cleanup
- ✅ Error handling with toast notifications
- ✅ Loading states during API calls

## 🚀 Next Steps

To extend the integration:

1. **Wallet Integration**

   ```typescript
   const { data } = await apiClient.getBalance();
   const { data } = await apiClient.getDepositAddress();
   ```

2. **Portfolio Integration**

   ```typescript
   const { data } = await apiClient.getPortfolio();
   const { data } = await apiClient.getHoldings();
   ```

3. **Transaction History**
   ```typescript
   const { data } = await apiClient.getTransactions();
   ```

## 📚 Documentation

- Full integration guide: `BACKEND_INTEGRATION.md`
- API Documentation: https://api.stacka.app/api-docs
- Backend source: See provided backend code

## 🐛 Common Issues

### Issue: "Network Error"

**Solution**: Check if backend is running at https://api.stacka.app

### Issue: "CORS Error"

**Solution**: Backend must include your frontend URL in CORS_ORIGINS

### Issue: "Invalid credentials"

**Solution**: Verify email/password are correct, or create a new account

### Issue: Token expired

**Solution**: Logout and login again (refresh token not yet implemented)

## 📞 Support

If you encounter any issues:

1. Check browser console for errors
2. Check network tab for failed requests
3. Verify environment variables are set
4. Restart the development server

---

**Status**: ✅ Ready for Testing
**Version**: 1.0.0
**Last Updated**: November 4, 2025
