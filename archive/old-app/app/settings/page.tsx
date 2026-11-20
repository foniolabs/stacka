"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Bell,
  Shield,
  Globe,
  Moon,
  Smartphone,
  Lock,
  Mail,
  ChevronRight,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    tradeConfirmations: true,
    newsUpdates: false,
    marketingEmails: false,
  });

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          icon: <User className="w-5 h-5" />,
          label: "Profile Information",
          description: "Update your personal details",
          onClick: () => router.push("/profile"),
        },
        {
          icon: <Mail className="w-5 h-5" />,
          label: "Email",
          description: user?.email || "Not set",
          onClick: () => {},
        },
        {
          icon: <Lock className="w-5 h-5" />,
          label: "Change Password",
          description: "Update your password",
          onClick: () => toast("Coming soon!"),
        },
      ],
    },
    {
      title: "Automation",
      items: [
        {
          icon: <Sparkles className="w-5 h-5" />,
          label: "Smart Split Preferences",
          description: "Configure your auto-invest allocation",
          onClick: () => router.push("/smart-split"),
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          icon: <Bell className="w-5 h-5" />,
          label: "Price Alerts",
          description: "Get notified about price changes",
          toggle: true,
          value: notifications.priceAlerts,
          onChange: (value: boolean) =>
            setNotifications({ ...notifications, priceAlerts: value }),
        },
        {
          icon: <Bell className="w-5 h-5" />,
          label: "Trade Confirmations",
          description: "Receive trade confirmations",
          toggle: true,
          value: notifications.tradeConfirmations,
          onChange: (value: boolean) =>
            setNotifications({ ...notifications, tradeConfirmations: value }),
        },
        {
          icon: <Bell className="w-5 h-5" />,
          label: "News Updates",
          description: "Market news and updates",
          toggle: true,
          value: notifications.newsUpdates,
          onChange: (value: boolean) =>
            setNotifications({ ...notifications, newsUpdates: value }),
        },
        {
          icon: <Mail className="w-5 h-5" />,
          label: "Marketing Emails",
          description: "Promotional content",
          toggle: true,
          value: notifications.marketingEmails,
          onChange: (value: boolean) =>
            setNotifications({ ...notifications, marketingEmails: value }),
        },
      ],
    },
    {
      title: "Security",
      items: [
        {
          icon: <Shield className="w-5 h-5" />,
          label: "Two-Factor Authentication",
          description: "Not enabled",
          onClick: () => toast("Coming soon!"),
        },
        {
          icon: <Smartphone className="w-5 h-5" />,
          label: "Trusted Devices",
          description: "Manage your devices",
          onClick: () => toast("Coming soon!"),
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: <Globe className="w-5 h-5" />,
          label: "Language",
          description: "English (US)",
          onClick: () => toast("Coming soon!"),
        },
        {
          icon: <Moon className="w-5 h-5" />,
          label: "Theme",
          description: "Dark Mode",
          onClick: () => toast("Coming soon!"),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black pb-20">
      <Header title="Settings" subtitle="Manage your preferences" />

      <main className="p-4 space-y-6">
        {/* User Info Card */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent-blue flex items-center justify-center">
              <span className="text-2xl font-bold text-black">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-sm text-text-secondary">{user?.email}</p>
            </div>
          </div>
        </Card>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3 px-2">
              {section.title}
            </h3>
            <Card className="divide-y divide-border">
              {section.items.map((item: any, index) => (
                <div
                  key={index}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-background-hover transition-colors"
                  onClick={!item.toggle ? item.onClick : undefined}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-text-secondary">{item.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-text-secondary">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {item.toggle ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.value}
                        onChange={(e) => item.onChange?.(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-background-hover rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-text-tertiary" />
                  )}
                </div>
              ))}
            </Card>
          </div>
        ))}

        {/* About Section */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3 px-2">
            About
          </h3>
          <Card className="divide-y divide-border">
            <div className="p-4">
              <p className="text-sm text-text-secondary">Version</p>
              <p className="font-medium">1.0.0</p>
            </div>
            <button
              onClick={() => toast("Coming soon!")}
              className="w-full p-4 text-left hover:bg-background-hover transition-colors"
            >
              <p className="font-medium">Terms of Service</p>
            </button>
            <button
              onClick={() => toast("Coming soon!")}
              className="w-full p-4 text-left hover:bg-background-hover transition-colors"
            >
              <p className="font-medium">Privacy Policy</p>
            </button>
            <button
              onClick={() => toast("Coming soon!")}
              className="w-full p-4 text-left hover:bg-background-hover transition-colors"
            >
              <p className="font-medium">Help & Support</p>
            </button>
          </Card>
        </div>

        {/* Logout Button */}
        <Button
          variant="secondary"
          className="w-full flex items-center justify-center gap-2 text-accent-red"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>

        {/* Bottom Spacing */}
        <div className="h-4" />
      </main>

      <MobileNav />
    </div>
  );
}
