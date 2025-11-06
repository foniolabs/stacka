"use client";

import { useState } from "react";
import {
  X,
  Copy,
  QrCode,
  Check,
  Building2,
  Wallet as WalletIcon,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  depositAddress: string;
}

export default function DepositModal({
  isOpen,
  onClose,
  depositAddress,
}: DepositModalProps) {
  const [depositType, setDepositType] = useState<"crypto" | "fiat">("crypto");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    toast.success("Address copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <Card className="w-full max-w-md max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-background-card z-10 p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold">Deposit Funds</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-background-hover transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Deposit Type Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setDepositType("crypto")}
              className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                depositType === "crypto"
                  ? "border-primary bg-primary/10 text-white"
                  : "border-border bg-background-hover text-text-secondary"
              }`}
            >
              <WalletIcon className="w-5 h-5 mx-auto mb-1" />
              <p className="text-sm font-semibold">Crypto</p>
              <p className="text-xs text-text-tertiary">USDC on Base</p>
            </button>

            <button
              onClick={() => setDepositType("fiat")}
              className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                depositType === "fiat"
                  ? "border-primary bg-primary/10 text-white"
                  : "border-border bg-background-hover text-text-secondary"
              }`}
            >
              <Building2 className="w-5 h-5 mx-auto mb-1" />
              <p className="text-sm font-semibold">Bank Transfer</p>
              <p className="text-xs text-text-tertiary">Naira (NGN)</p>
            </button>
          </div>

          {/* Crypto Deposit */}
          {depositType === "crypto" && (
            <div className="space-y-3">
              <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-lg p-2.5">
                <p className="text-xs text-accent-blue font-semibold mb-1">
                  Deposit USDC to this address
                </p>
                <p className="text-xs text-text-secondary">
                  Only send USDC on Base Sepolia network to this address.
                  Sending other tokens or using wrong network will result in
                  permanent loss.
                </p>
              </div>

              {/* Wallet Address */}
              <div>
                <label className="block text-xs text-text-secondary mb-1.5">
                  Your Deposit Address
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-background-hover px-3 py-2 rounded-lg text-xs break-all">
                    {depositAddress || "0x0000...0000"}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-background-hover hover:bg-background-card transition-all"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-accent-green" />
                    ) : (
                      <Copy className="w-4 h-4 text-text-secondary" />
                    )}
                  </button>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex items-center justify-center py-3">
                <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center p-3">
                  {depositAddress ? (
                    <QRCodeSVG
                      value={depositAddress}
                      size={140}
                      level="H"
                      includeMargin={false}
                    />
                  ) : (
                    <QrCode className="w-24 h-24 text-gray-300" />
                  )}
                </div>
              </div>

              <div className="bg-background-hover border border-border rounded-lg p-2.5 space-y-1.5">
                <p className="text-xs font-semibold">Important Notes:</p>
                <ul className="text-xs text-text-secondary space-y-0.5">
                  <li>• Network: Base Sepolia Testnet</li>
                  <li>• Asset: USDC only</li>
                  <li>• Minimum deposit: $1</li>
                  <li>• Deposits typically arrive in 1-5 minutes</li>
                  <li>
                    • Click "Refresh Balance" on wallet page to check for
                    deposits
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Fiat Deposit */}
          {depositType === "fiat" && (
            <div className="space-y-3">
              <div className="bg-accent-green/10 border border-accent-green/20 rounded-lg p-2.5">
                <p className="text-xs text-accent-green font-semibold mb-1">
                  Bank Transfer Instructions
                </p>
                <p className="text-xs text-text-secondary">
                  Transfer funds to the account below. Your account will be
                  credited within 10 minutes.
                </p>
              </div>

              <div className="space-y-2">
                <div className="bg-background-hover rounded-lg p-2.5">
                  <p className="text-xs text-text-tertiary mb-0.5">Bank Name</p>
                  <p className="text-sm font-semibold">Wema Bank</p>
                </div>

                <div className="bg-background-hover rounded-lg p-2.5">
                  <p className="text-xs text-text-tertiary mb-0.5">
                    Account Number
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold font-mono">
                      7820123456
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("7820123456");
                        toast.success("Account number copied");
                      }}
                      className="text-primary hover:text-primary-hover"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-background-hover rounded-lg p-2.5">
                  <p className="text-xs text-text-tertiary mb-0.5">
                    Account Name
                  </p>
                  <p className="text-sm font-semibold">
                    STACKA - {depositAddress?.slice(0, 8)}
                  </p>
                </div>
              </div>

              <div className="bg-accent-purple/10 border border-accent-purple/20 rounded-lg p-2.5">
                <p className="text-xs text-accent-purple font-semibold mb-1">
                  Note
                </p>
                <p className="text-xs text-text-secondary">
                  This is a dedicated virtual account for your STACKA wallet.
                  Deposits are automatically credited to your account.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
