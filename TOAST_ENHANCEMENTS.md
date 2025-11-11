# Toast Notification Enhancements - Stacka Web

## Overview

Enhanced the web application with comprehensive toast notifications using `react-hot-toast` for better user feedback across all pages.

## Changes Made

### ✅ Pages Enhanced with Toast Notifications

#### 1. **Trade Page** (`/app/trade/page.tsx`)

- **Added**: Error toast when failing to fetch trading assets
- **Behavior**: Shows user-friendly error message if API calls fail
- **Toast**: `toast.error("Failed to load trading assets. Please try again.")`

#### 2. **Yield Opportunities Page** (`/app/yield/page.tsx`)

- **Added**: Error toast when failing to fetch yield opportunities
- **Behavior**: Alerts users when yield data cannot be loaded
- **Toast**: `toast.error("Failed to load yield opportunities. Please try again.")`

#### 3. **Nigerian Stocks Page** (`/app/stocks/nigerian/page.tsx`)

- **Added**: Error toast when failing to fetch Nigerian stocks
- **Behavior**: User-friendly error feedback for Nigerian market data failures
- **Toast**: `toast.error("Failed to load Nigerian stocks. Please try again.")`

#### 4. **US Stocks Page** (`/app/stocks/us/page.tsx`)

- **Added**: Error toast when failing to fetch US stocks
- **Behavior**: Clear error messaging for US market data failures
- **Toast**: `toast.error("Failed to load US stocks. Please try again.")`

#### 5. **Dashboard Page** (`/app/dashboard/page.tsx`)

- **Updated**: Silent failures for optional data (yields and stocks)
- **Behavior**: Dashboard shows gracefully without toasts for optional data failures
- **Rationale**: Dashboard aggregates multiple sources; individual failures shouldn't interrupt user experience

### ✅ Already Implemented (No Changes Needed)

#### Login Page (`/app/login/page.tsx`)

- ✅ Success toast: `"Welcome back!"`
- ✅ Error toast: Shows API error message or `"Login failed"`

#### Signup Page (`/app/signup/page.tsx`)

- ✅ Success toast: `"Account created successfully!"`
- ✅ Error toast: Shows API error message or `"Signup failed"`

#### Wallet Page (`/app/wallet/page.tsx`)

- ✅ Copy success: `"Address copied to clipboard"`
- ✅ Balance refresh loading: `"Checking blockchain for deposits..."`
- ✅ Balance refresh success: `"Balance refreshed!"`
- ✅ Balance refresh error: `"Failed to refresh balance"`

#### Deposit Modal (`/components/modals/DepositModal.tsx`)

- ✅ Copy success: `"Address copied to clipboard"`
- ✅ Copy success (bank account): `"Account number copied"`

#### Withdraw Modal (`/components/modals/WithdrawModal.tsx`)

- ✅ Validation errors: Various field-specific error toasts
- ✅ Processing: `toast.loading("Processing withdrawal...", { id: "withdraw" })`
- ✅ Success: Withdrawal confirmation with amount
- ✅ Error: API error messages

## Toast Notification Patterns

### Success Toasts

```typescript
toast.success("Operation successful!");
toast.success("Welcome back!");
toast.success("Balance refreshed!");
```

- Green checkmark icon
- Auto-dismiss after 4 seconds
- Used for: Successful operations, confirmations

### Error Toasts

```typescript
toast.error("Failed to load data. Please try again.");
toast.error(error.response?.data?.message || "Operation failed");
```

- Red X icon
- Auto-dismiss after 4 seconds
- Used for: API errors, validation errors, failures

### Loading Toasts

```typescript
toast.loading("Processing...", { id: "operation-id" });
// Later update it:
toast.success("Complete!", { id: "operation-id" });
```

- Spinner animation
- Does NOT auto-dismiss
- Must be manually updated or dismissed
- Used for: Long-running operations, API calls

### Info Toasts

```typescript
toast.info("Here's some useful information");
```

- Blue info icon
- Auto-dismiss after 4 seconds
- Used for: Informational messages, tips

## Toast Configuration

Configured in `/app/layout.tsx`:

```typescript
<Toaster
  position="top-right"
  toastOptions={{
    duration: 4000,
    style: {
      background: "#1A1A1A",
      color: "#fff",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      padding: "16px",
    },
    success: {
      iconTheme: {
        primary: "#C4FF0D", // Stacka green
        secondary: "#000",
      },
    },
  }}
/>
```

### Styling Details

- **Position**: Top-right corner
- **Duration**: 4 seconds (default)
- **Background**: `#1A1A1A` (dark theme)
- **Border**: Subtle white border with 10% opacity
- **Border Radius**: 16px (rounded corners)
- **Success Icon**: Stacka brand green (`#C4FF0D`)
- **Typography**: White text for contrast

## Design Philosophy

### When to Show Toasts

✅ **User-initiated actions**: Login, signup, copy, withdraw
✅ **Critical failures**: Cannot load essential page data
✅ **Success confirmations**: Operations completed successfully
✅ **Form validation**: Field-specific errors

### When NOT to Show Toasts

❌ **Optional data on dashboard**: Yields/stocks are supplementary
❌ **Background operations**: Silent data refreshes
❌ **Excessive errors**: Multiple failed retries (consolidate)
❌ **Non-critical info**: Use in-page messages instead

## Error Handling Strategy

### API Failures

```typescript
try {
  const response = await apiClient.getData();
  // Process data
} catch (error) {
  console.error("Context for debugging:", error);
  toast.error("User-friendly message");
}
```

### Best Practices

1. **Console.error** for debugging (keeps logs)
2. **Toast.error** for user feedback (clear messaging)
3. **Specific messages** for different error types
4. **Fallback messages** when API doesn't provide details

## Usage Examples

### Basic Error Handling

```typescript
import toast from "react-hot-toast";

const fetchData = async () => {
  try {
    const data = await api.getData();
    // Success - no toast needed unless explicit confirmation required
  } catch (error) {
    toast.error("Failed to load data. Please try again.");
  }
};
```

### Loading State with Update

```typescript
const processOrder = async () => {
  toast.loading("Processing order...", { id: "order" });

  try {
    await api.submitOrder();
    toast.success("Order placed successfully!", { id: "order" });
  } catch (error) {
    toast.error("Order failed. Please try again.", { id: "order" });
  }
};
```

### Copy to Clipboard

```typescript
const handleCopy = () => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard!");
};
```

### Form Validation

```typescript
const handleSubmit = () => {
  if (!email) {
    toast.error("Email is required");
    return;
  }
  if (!password) {
    toast.error("Password is required");
    return;
  }
  // Submit form
};
```

## Benefits

### User Experience

- ✅ **Non-blocking**: Toasts don't interrupt user flow
- ✅ **Stackable**: Multiple toasts can appear simultaneously
- ✅ **Animated**: Smooth slide-in/out animations
- ✅ **Dismissible**: Users can close toasts manually
- ✅ **Consistent**: Same look and feel across entire app

### Developer Experience

- ✅ **Simple API**: Easy to use `toast.success()`, `toast.error()`
- ✅ **No boilerplate**: No need to manage toast state manually
- ✅ **Flexible**: Supports custom duration, IDs, and styling
- ✅ **TypeScript support**: Fully typed

## Comparison: Mobile vs Web

| Feature         | Web (react-hot-toast) | Mobile (Custom)     |
| --------------- | --------------------- | ------------------- |
| Library         | react-hot-toast       | Custom React Native |
| Success toast   | ✅                    | ✅                  |
| Error toast     | ✅                    | ✅                  |
| Loading toast   | ✅                    | ✅                  |
| Info toast      | ✅                    | ✅                  |
| Animations      | ✅ Smooth             | ✅ Smooth           |
| Auto-dismiss    | ✅                    | ✅                  |
| Custom duration | ✅                    | ✅                  |
| Toast IDs       | ✅                    | ✅                  |
| Positioning     | Top-right             | Top-center          |
| Dark theme      | ✅                    | ✅                  |
| Brand colors    | ✅ Stacka green       | ✅ Stacka green     |

Both implementations provide a consistent user experience across platforms while respecting platform conventions.

## Testing

To test the toast enhancements:

1. **Trade Page**: Navigate to `/trade` without internet → Error toast appears
2. **Yield Page**: Navigate to `/yield` with API down → Error toast appears
3. **Nigerian Stocks**: Navigate to `/stocks/nigerian` with failed API → Error toast
4. **US Stocks**: Navigate to `/stocks/us` with failed API → Error toast
5. **Dashboard**: Failed optional data loads → No toasts (graceful degradation)
6. **Wallet**: Click refresh balance → Loading → Success/Error toast
7. **Login**: Wrong credentials → Error toast
8. **Signup**: Create account → Success toast

## Future Enhancements

Potential improvements for future iterations:

- [ ] Add undo functionality for certain actions
- [ ] Implement toast queuing for rate limiting
- [ ] Add custom toast types (warning, pending)
- [ ] Integrate with error tracking service
- [ ] Add sound notifications (optional, user preference)
- [ ] Implement toast history log
- [ ] Add accessibility improvements (ARIA labels)

## Conclusion

The web app now has comprehensive toast notification coverage across all critical user journeys. Users receive clear, timely feedback for their actions while maintaining a clean, non-intrusive interface. The implementation is consistent with the mobile app's toast system, providing a unified experience across platforms.
