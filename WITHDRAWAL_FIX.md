# Withdrawal Functionality Fix

## Issues Identified

### 1. Insufficient Balance Error (Original Issue)
**Problem:** User had 3.38 USDC in blockchain balance but couldn't withdraw due to "insufficient balance" error.

**Root Cause:** The `WithdrawModal` was checking against the wrong balance. It was using `balance` (total balance including locked funds) instead of `blockchainBalance` (actual withdrawable on-chain USDC).

**Fix:** Changed the balance prop from `balance` to `blockchainBalance` in wallet page.

### 2. Missing Gas Fee Requirements
**Problem:** Generic "insufficient balance" error didn't indicate that ETH was needed for gas fees.

**Root Cause:** No gas fee checking or user education about needing ETH on Base network for transactions.

**Fix:** 
- Added real-time ETH balance checking
- Added gas fee estimation
- Added visual warnings when ETH balance is insufficient
- Added informative error messages

### 3. MetaMask RPC Error: `eth_maxPriorityFeePerGas`
**Problem:** Error when trying to withdraw: "The method 'eth_maxPriorityFeePerGas' does not exist / is not available"

**Root Cause:** Base network RPC doesn't support EIP-1559 `eth_maxPriorityFeePerGas` method. Ethers.js v6 tries to use EIP-1559 transactions by default.

**Fix:**
- Force legacy transaction type (type 0) instead of EIP-1559 (type 2)
- Use `gasPrice` instead of `maxFeePerGas`/`maxPriorityFeePerGas`
- Added fallback gas price estimation if RPC call fails
- Wrapped fee estimation in try-catch blocks

## Implementation Details

### Changes Made

**1. `/app/wallet/page.tsx`**
```typescript
// Before
<WithdrawModal balance={balance} />

// After  
<WithdrawModal balance={blockchainBalance} />
```

**2. `/components/modals/WithdrawModal.tsx`**

**Added:**
- Real-time ETH balance checking via useEffect
- Gas fee estimation with fallback
- Visual gas fee warning component
- Legacy transaction type support
- Better error messages

**Key Code:**
```typescript
// Legacy transaction with explicit gas price
const txOptions = {
  gasLimit: 100000,
  gasPrice: feeData.gasPrice || ethers.parseUnits("1", "gwei"),
  type: 0 // Force legacy transaction type
};

const tx = await usdcContract.transfer(recipient, amountInUnits, txOptions);
```

**3. `/types/window.d.ts`** (New file)
```typescript
// Added TypeScript declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}
```

**4. Installed Dependencies**
```bash
npm install ethers
```

## How It Works Now

### Withdrawal Flow

1. **User clicks Withdraw**
   - Modal opens and checks ETH balance immediately
   - Estimates gas fees (~0.0001 ETH)

2. **Visual Feedback**
   - ✅ Green box: Shows ETH balance and estimated gas (if sufficient)
   - ⚠️ Red box: Warning if insufficient ETH with clear instructions

3. **Validation**
   - Checks USDC balance (now correctly checks blockchainBalance)
   - Checks ETH balance for gas fees
   - Shows specific error: "You need ~0.000100 ETH but only have 0.000050 ETH"

4. **Transaction**
   - Uses legacy transaction type (type 0) compatible with Base
   - Explicit gas price instead of EIP-1559 fields
   - Falls back to 1 gwei if fee estimation fails

5. **Error Handling**
   - "Transaction rejected by user" - clear message
   - "Insufficient funds" - shows exactly how much ETH needed
   - Generic errors truncated to 100 chars for readability

## Testing Checklist

- [x] Build passes without TypeScript errors
- [ ] Withdrawal with sufficient ETH works
- [ ] Error message shows when ETH balance is 0
- [ ] Error message shows when ETH < gas fees
- [ ] Gas estimation displays correctly
- [ ] Transaction submits to Base mainnet
- [ ] Transaction confirms successfully
- [ ] Balance updates after withdrawal

## User Requirements

### To Withdraw USDC from Base:

1. **USDC Balance**: Must have USDC in blockchain wallet (DeFi Wallet)
2. **ETH for Gas**: Must have ~0.0001-0.0002 ETH on Base for gas fees
3. **MetaMask**: Must be connected to Base network
4. **Recipient**: Valid Ethereum address

### Where to Get ETH on Base:

- Bridge from Ethereum mainnet: https://bridge.base.org
- Buy directly on Base (via exchanges)
- Use Coinbase (Base is Coinbase's L2)

## Error Messages Reference

| Error | Meaning | Solution |
|-------|---------|----------|
| "Insufficient USDC balance" | Trying to withdraw more than you have | Check your blockchain balance |
| "Insufficient ETH for gas fees" | Need more ETH to pay transaction fee | Add ETH to your wallet on Base |
| "Please connect MetaMask" | Wallet not connected | Install/connect MetaMask |
| "Transaction rejected by user" | User declined in MetaMask | Approve transaction in MetaMask |
| "MetaMask is not installed" | No Web3 wallet detected | Install MetaMask extension |

## Technical Notes

### Base Network Compatibility

- **Network**: Base Mainnet (Chain ID: 8453)
- **RPC**: Does NOT support `eth_maxPriorityFeePerGas`
- **Transaction Type**: Legacy (type 0) required
- **Gas Price**: Use `gasPrice` field, not `maxFeePerGas`

### Contract Addresses on Base

- **USDC**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Standard ERC-20** token, use `transfer()` method

### Gas Estimation

- **USDC Transfer**: ~50,000-100,000 gas
- **Typical Gas Price**: 0.001-0.01 gwei on Base (very cheap!)
- **Estimated Cost**: ~0.0001 ETH ($0.0002 USD)

## Future Improvements

1. **Auto-detect Network**: Check if user is on Base, prompt to switch if not
2. **Gas Price Optimization**: Fetch real-time gas prices from Base API
3. **Multi-token Support**: Support withdrawing other tokens (ETH, DAI, etc.)
4. **Batch Withdrawals**: Allow withdrawing multiple assets at once
5. **Address Book**: Save frequently used recipient addresses
6. **QR Code Scanner**: Scan recipient address from QR code
7. **Transaction History**: Show pending/confirmed withdrawals in UI

## Commit Message

```
Fix withdrawal functionality with proper gas fee checking

- Fix insufficient balance error by using blockchainBalance instead of total balance
- Add real-time ETH balance and gas fee estimation
- Force legacy transaction type for Base network compatibility
- Add clear error messages for gas fee requirements
- Add visual warnings when ETH balance is insufficient
- Install ethers library for blockchain interactions
- Fix MetaMask RPC error: eth_maxPriorityFeePerGas not available

Fixes #[issue-number]
```

## Related Files

- `stacka/app/wallet/page.tsx` - Pass correct balance
- `stacka/components/modals/WithdrawModal.tsx` - Main withdrawal logic
- `stacka/types/window.d.ts` - TypeScript declarations
- `stacka/package.json` - Added ethers dependency
