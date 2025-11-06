# Backend Integration Guide

## Overview

This document describes the integration between the STACKA frontend (Next.js) and backend API.

## API Configuration

### Production API URL

```
https://api.stacka.app
```

### Environment Variables

Set in `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://api.stacka.app
```

For local development:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Authentication Endpoints

### Sign Up

**Endpoint:** `POST /api/v1/auth/signup`

**Request Body:**

```json
{
  "email": "user@stacka.app",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_123",
      "email": "user@stacka.app",
      "firstName": "John",
      "lastName": "Doe",
      "walletAddress": "0x...",
      "kycStatus": "PENDING"
    }
  }
}
```

**Frontend Usage:**

```typescript
import { useAuthStore } from "@/store/authStore";

const { signup, isLoading } = useAuthStore();

await signup({
  email: "user@stacka.app",
  password: "SecurePass123",
  firstName: "John",
  lastName: "Doe",
});
```

### Login

**Endpoint:** `POST /api/v1/auth/login`

**Request Body:**

```json
{
  "email": "user@stacka.app",
  "password": "SecurePass123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_123",
      "email": "user@stacka.app",
      "firstName": "John",
      "lastName": "Doe",
      "walletAddress": "0x...",
      "kycStatus": "PENDING"
    }
  }
}
```

**Frontend Usage:**

```typescript
import { useAuthStore } from "@/store/authStore";

const { login, isLoading } = useAuthStore();

await login("user@stacka.app", "SecurePass123");
```

### Get Profile

**Endpoint:** `GET /api/v1/auth/me`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@stacka.app",
    "firstName": "John",
    "lastName": "Doe",
    "walletAddress": "0x...",
    "usdcBalance": 1000.0,
    "ngnBalance": 500000.0,
    "kycStatus": "PENDING"
  }
}
```

**Frontend Usage:**

```typescript
const { fetchProfile } = useAuthStore();
await fetchProfile();
```

## API Client

The API client is configured in `lib/api/client.ts` and handles:

- Automatic token injection in request headers
- Response data extraction
- Error handling with toast notifications
- Token persistence in localStorage

### Using the API Client

```typescript
import { apiClient } from "@/lib/api/client";

// Authentication
await apiClient.signup(data);
await apiClient.login(data);
await apiClient.getProfile();

// Wallet
await apiClient.getDepositAddress();
await apiClient.getBalance();

// Portfolio
await apiClient.getPortfolio();
await apiClient.getHoldings();
```

## Authentication State Management

The auth state is managed using Zustand with persistence:

```typescript
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
```

## Error Handling

The frontend handles errors in multiple layers:

1. **API Client Interceptor**: Shows toast notifications for non-auth errors
2. **Auth Store**: Catches and stores error messages
3. **Component Level**: Displays specific error messages in forms

Example error handling in a component:

```typescript
try {
  await signup(formData);
  toast.success("Account created successfully!");
  router.push("/dashboard");
} catch (error: any) {
  const message = error.response?.data?.message || "Signup failed";
  toast.error(message);
}
```

## Testing the Integration

### 1. Test Signup

```bash
curl -X 'POST' \
  'https://api.stacka.app/api/v1/auth/signup' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "test@stacka.app",
  "password": "SecurePass123",
  "firstName": "Test",
  "lastName": "User"
}'
```

### 2. Test Login

```bash
curl -X 'POST' \
  'https://api.stacka.app/api/v1/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "test@stacka.app",
  "password": "SecurePass123"
}'
```

### 3. Test Profile (with token)

```bash
curl -X 'GET' \
  'https://api.stacka.app/api/v1/auth/me' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN_HERE'
```

## Next Steps

1. **Complete Integration**: Integrate remaining endpoints (wallet, transactions, trading)
2. **Add Loading States**: Enhance UX with skeleton loaders
3. **Implement Refresh Token**: Add token refresh mechanism
4. **Add Session Management**: Handle expired tokens gracefully
5. **Add Analytics**: Track user actions and errors

## Troubleshooting

### CORS Issues

If you encounter CORS errors, verify that the backend has the frontend domain in `CORS_ORIGINS`.

### Token Not Persisting

Check browser localStorage for the `token` key. Clear storage and try again.

### 401 Unauthorized

Ensure the token is being sent in the Authorization header and hasn't expired.

### Network Errors

Verify the API URL is correct and the backend server is running.

## Support

For issues or questions, refer to:

- Backend API Documentation: https://api.stacka.app/api-docs
- Frontend Codebase: `/lib/api/client.ts`, `/store/authStore.ts`
