"use client";

import { useState } from "react";
import { X, Wallet as WalletIcon, Building2, Send } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import { formatCurrency } from "@/lib/utils";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

export default function WithdrawModal({
  isOpen,
  onClose,
  balance,
}: WithdrawModalProps) {
  const [withdrawType, setWithdrawType] = useState<"crypto" | "bank">("crypto");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > balance) {
      toast.error("Insufficient balance");
      return;
    }

    if (withdrawType === "crypto" && !recipient) {
      toast.error("Please enter recipient wallet address");
      return;
    }

    if (withdrawType === "bank") {
      if (
        !bankDetails.accountNumber ||
        !bankDetails.accountName ||
        !bankDetails.bankName
      ) {
        toast.error("Please fill in all bank details");
        return;
      }
    }

    setIsProcessing(true);
    toast.loading("Processing withdrawal...", { id: "withdraw" });

    try {
      // TODO: Call actual withdrawal API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(
        `Withdrawal of ${formatCurrency(
          parseFloat(amount)
        )} initiated successfully`,
        { id: "withdraw", duration: 4000 }
      );

      onClose();
      setAmount("");
      setRecipient("");
      setBankDetails({ accountNumber: "", accountName: "", bankName: "" });
    } catch (error: any) {
      toast.error(error.message || "Withdrawal failed. Please try again.", {
        id: "withdraw",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <Card className="w-full max-w-md max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-background-card z-10 p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold">Withdraw Funds</h2>
          <button
            onClick={onClose}
            className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Available Balance */}
          <div className="bg-background-hover rounded-lg p-3">
            <p className="text-xs text-text-secondary mb-0.5">
              Available Balance
            </p>
            <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
          </div>

          {/* Withdrawal Type Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setWithdrawType("crypto")}
              className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                withdrawType === "crypto"
                  ? "border-primary bg-primary/10 text-white"
                  : "border-border bg-background-hover text-text-secondary"
              }`}
            >
              <Send className="w-5 h-5 mx-auto mb-1" />
              <p className="text-sm font-semibold">Crypto Transfer</p>
              <p className="text-xs text-text-tertiary">To wallet address</p>
            </button>

            <button
              onClick={() => setWithdrawType("bank")}
              className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                withdrawType === "bank"
                  ? "border-primary bg-primary/10 text-white"
                  : "border-border bg-background-hover text-text-secondary"
              }`}
            >
              <Building2 className="w-5 h-5 mx-auto mb-1" />
              <p className="text-sm font-semibold">Bank Withdrawal</p>
              <p className="text-xs text-text-tertiary">To bank account</p>
            </button>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs text-text-secondary mb-1.5">
              Amount (USDC)
            </label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="0"
              step="0.01"
              className="h-9 text-sm"
            />
            <div className="flex gap-1.5 mt-1.5">
              {[25, 50, 75, 100].map((percentage) => (
                <button
                  key={percentage}
                  onClick={() =>
                    setAmount(((balance * percentage) / 100).toFixed(2))
                  }
                  className="px-2.5 py-1 text-xs rounded-md bg-background-hover hover:bg-background-card text-text-secondary hover:text-white transition-all"
                >
                  {percentage}%
                </button>
              ))}
            </div>
          </div>

          {/* Crypto Withdrawal */}
          {withdrawType === "crypto" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1.5">
                  Recipient Wallet Address
                </label>
                <Input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x..."
                  className="h-9 text-sm"
                />
              </div>

              <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-lg p-2.5">
                <p className="text-xs text-accent-blue font-semibold mb-1">
                  Network Information
                </p>
                <ul className="text-xs text-text-secondary space-y-0.5">
                  <li>• Network: Base Mainnet</li>
                  <li>• Asset: USDC</li>
                  <li>• Estimated time: 1-3 minutes</li>
                  <li>• Gas fees: Covered by platform</li>
                </ul>
              </div>
            </div>
          )}

          {/* Bank Withdrawal */}
          {withdrawType === "bank" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1.5">
                  Bank Name
                </label>
                <select
                  value={bankDetails.bankName}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, bankName: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-background-hover border border-border rounded-lg text-white text-sm focus:border-primary focus:outline-none transition-all h-9"
                >
                  <option value="">Select bank</option>
                  <option value="Access Bank">Access Bank</option>
                  <option value="GTBank">GTBank</option>
                  <option value="First Bank">First Bank</option>
                  <option value="UBA">UBA</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="Wema Bank">Wema Bank</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-text-secondary mb-1.5">
                  Account Number
                </label>
                <Input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) =>
                    setBankDetails({
                      ...bankDetails,
                      accountNumber: e.target.value,
                    })
                  }
                  placeholder="1234567890"
                  maxLength={10}
                  className="h-9 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-text-secondary mb-1.5">
                  Account Name
                </label>
                <Input
                  type="text"
                  value={bankDetails.accountName}
                  onChange={(e) =>
                    setBankDetails({
                      ...bankDetails,
                      accountName: e.target.value,
                    })
                  }
                  placeholder="John Doe"
                  className="h-9 text-sm"
                />
              </div>

              <div className="bg-accent-green/10 border border-accent-green/20 rounded-lg p-2.5">
                <p className="text-xs text-accent-green font-semibold mb-1">
                  Processing Time
                </p>
                <p className="text-xs text-text-secondary">
                  Bank withdrawals are processed within 1-24 hours. Funds will
                  be converted to NGN at current exchange rate.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-3">
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex-1 h-9 text-sm"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleWithdraw}
              className="flex-1 h-9 text-sm"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Withdraw"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
