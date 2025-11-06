'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, Check, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SmartSplitModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

interface PreviewItem {
  category: string;
  symbol?: string;
  protocol?: string;
  amount: string;
  percentage: string;
}

export default function SmartSplitModal({ isOpen, onClose, balance }: SmartSplitModalProps) {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [preview, setPreview] = useState<PreviewItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [hasPreferences, setHasPreferences] = useState(false);
  const [checkingPreferences, setCheckingPreferences] = useState(true);

  useEffect(() => {
    if (isOpen) {
      checkPreferences();
    }
  }, [isOpen]);

  const checkPreferences = async () => {
    try {
      setCheckingPreferences(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/v1/allocation/preferences', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setHasPreferences(data.success && data.data.preference !== null);
    } catch (err) {
      console.error('Check preferences error:', err);
      setHasPreferences(false);
    } finally {
      setCheckingPreferences(false);
    }
  };

  const fetchPreview = async (investAmount: string) => {
    if (!investAmount || Number(investAmount) <= 0) {
      setPreview([]);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/v1/allocation/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(investAmount) }),
      });

      const data = await response.json();
      if (data.success) {
        setPreview(data.data.preview || []);
      } else {
        setError(data.message || 'Failed to load preview');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load preview');
    } finally {
      setLoading(false);
    }
  };

  const executeSmartSplit = async () => {
    if (!amount || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (Number(amount) > balance) {
      setError(`Insufficient balance. Available: $${balance.toFixed(2)}`);
      return;
    }

    try {
      setExecuting(true);
      setError('');
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/v1/allocation/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          window.location.reload(); // Refresh to show updated balances
        }, 2000);
      } else {
        setError(data.message || 'Failed to execute Smart Split');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to execute Smart Split');
    } finally {
      setExecuting(false);
    }
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (value && Number(value) > 0) {
      fetchPreview(value);
    } else {
      setPreview([]);
    }
  };

  const setMaxAmount = () => {
    handleAmountChange(balance.toFixed(2));
  };

  if (!isOpen) return null;

  if (checkingPreferences) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-surface rounded-2xl p-8 max-w-md w-full">
          <p className="text-center text-text-primary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasPreferences) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-surface rounded-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-text-primary mb-2">Set Up Smart Split First</h2>
            <p className="text-text-secondary">
              You need to configure your allocation preferences before using Smart Split.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-surface-dark hover:bg-surface-dark/80 text-text-primary font-semibold py-3 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              onClick={() => router.push('/smart-split')}
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition"
            >
              Set Up Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">Smart Split</h2>
              <p className="text-sm text-text-secondary">Invest with one click</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-dark rounded-lg transition"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">Success! 🎉</h3>
            <p className="text-text-secondary">
              Your Smart Split investment has been executed successfully.
            </p>
          </div>
        ) : (
          <>
            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                How much do you want to invest?
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-lg">
                  $
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-surface-dark border border-border rounded-xl pl-8 pr-24 py-4 text-lg font-semibold text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary"
                />
                <button
                  onClick={setMaxAmount}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-semibold px-4 py-2 rounded-lg transition"
                >
                  MAX
                </button>
              </div>
              <p className="text-sm text-text-secondary mt-2">
                Available: ${balance.toFixed(2)}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* Preview */}
            {loading ? (
              <div className="text-center py-8 text-text-secondary">Loading preview...</div>
            ) : preview.length > 0 ? (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Investment Breakdown</h3>
                <div className="bg-surface-dark rounded-xl p-4 space-y-3">
                  {preview.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {item.symbol || item.protocol}
                        </p>
                        <p className="text-xs text-text-secondary">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-text-primary">${item.amount}</p>
                        <p className="text-xs text-text-secondary">{item.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-surface-dark hover:bg-surface-dark/80 text-text-primary font-semibold py-3 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={executeSmartSplit}
                disabled={executing || !amount || Number(amount) <= 0 || preview.length === 0}
                className="flex-1 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {executing ? 'Executing...' : 'Execute Smart Split'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
