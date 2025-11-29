"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Lock,
  LogOut,
  Shield,
  Bell,
  ChevronRight,
  TrendingUp,
  Info,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useWalletStore } from "@/store/walletStore";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import DesktopLayout from "@/components/layout/DesktopLayout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { apiClient } from "@/lib/api/client";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { balance, fetchBalance } = useWalletStore();
  const isDesktop = useIsDesktop();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
      });
    }

    fetchBalance();
  }, [isAuthenticated, router, user, fetchBalance]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await apiClient.updateProfile(profileData);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      await apiClient.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsChangingPassword(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Desktop View
  if (isDesktop) {
    return (
      <DesktopLayout balance={balance || 0}>
        <div className="overflow-y-auto h-full scrollbar-hide">
          <div className="p-6 mx-14">
            {/* Profile Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Profile</h1>
              <p className="text-text-secondary">Manage your account settings</p>
            </div>

            {/* Profile Overview Card */}
            <Card className="p-8 text-center mb-8">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-text-secondary">{user?.email}</p>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - Personal Information & Security */}
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Personal Information</h2>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-sm text-primary hover:text-primary-hover font-medium"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <Card className="p-6">
                      <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <Input
                          label="First Name"
                          value={profileData.firstName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              firstName: e.target.value,
                            })
                          }
                          icon={<User className="w-5 h-5" />}
                        />

                        <Input
                          label="Last Name"
                          value={profileData.lastName}
                          onChange={(e) =>
                            setProfileData({ ...profileData, lastName: e.target.value })
                          }
                        />

                        <Input
                          label="Phone Number"
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({ ...profileData, phone: e.target.value })
                          }
                          icon={<Phone className="w-5 h-5" />}
                          placeholder="+234 000 000 0000"
                        />

                        <div className="flex gap-3 pt-2">
                          <Button
                            type="submit"
                            variant="primary"
                            className="flex-1"
                            isLoading={loading}
                          >
                            Save Changes
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            className="flex-1"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Card>
                  ) : (
                    <Card className="p-6 space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-background-hover rounded-xl">
                        <User className="w-5 h-5 text-text-secondary" />
                        <div className="flex-1">
                          <p className="text-sm text-text-secondary mb-1">Full Name</p>
                          <p className="font-semibold">
                            {user?.firstName} {user?.lastName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-background-hover rounded-xl">
                        <Mail className="w-5 h-5 text-text-secondary" />
                        <div className="flex-1">
                          <p className="text-sm text-text-secondary mb-1">Email</p>
                          <p className="font-semibold">{user?.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-background-hover rounded-xl">
                        <Phone className="w-5 h-5 text-text-secondary" />
                        <div className="flex-1">
                          <p className="text-sm text-text-secondary mb-1">Phone</p>
                          <p className="font-semibold">{user?.phone || "Not set"}</p>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>

                {/* Security */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Security</h2>

                  {isChangingPassword ? (
                    <Card className="p-6">
                      <form onSubmit={handlePasswordChange} className="space-y-4">
                        <Input
                          label="Current Password"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          icon={<Lock className="w-5 h-5" />}
                        />

                        <Input
                          label="New Password"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          icon={<Lock className="w-5 h-5" />}
                        />

                        <Input
                          label="Confirm New Password"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          icon={<Lock className="w-5 h-5" />}
                        />

                        <div className="flex gap-3 pt-2">
                          <Button
                            type="submit"
                            variant="primary"
                            className="flex-1"
                            isLoading={loading}
                          >
                            Change Password
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            className="flex-1"
                            onClick={() => setIsChangingPassword(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Card>
                  ) : (
                    <Card
                      hover
                      className="cursor-pointer p-5"
                      onClick={() => setIsChangingPassword(true)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center">
                            <Lock className="w-6 h-6 text-accent-blue" />
                          </div>
                          <div>
                            <p className="font-semibold mb-1">Change Password</p>
                            <p className="text-sm text-text-secondary">
                              Update your password
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-text-secondary" />
                      </div>
                    </Card>
                  )}
                </div>
              </div>

              {/* Right Column - Account Details & Settings */}
              <div className="space-y-6">
                {/* Account Details */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Account Details</h2>
                  <Card className="p-6 space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-background-hover rounded-xl">
                      <Shield className="w-6 h-6 text-text-secondary" />
                      <div className="flex-1">
                        <p className="text-sm text-text-secondary mb-1">
                          Wallet Address (Base Mainnet)
                        </p>
                        <p className="font-mono text-sm font-semibold break-all">
                          {user?.walletAddress || "Not generated"}
                        </p>
                      </div>
                    </div>

                    {user?.alpacaAccount?.accountNumber && (
                      <div className="flex items-center gap-4 p-4 bg-accent-green/10 border border-accent-green/20 rounded-xl">
                        <TrendingUp className="w-6 h-6 text-accent-green" />
                        <div className="flex-1">
                          <p className="text-sm text-text-secondary mb-1">
                            Alpaca Trading Account
                          </p>
                          <p className="font-semibold">
                            {user.alpacaAccount.accountNumber}
                          </p>
                          <p className="text-xs text-text-tertiary mt-1">
                            Status:{" "}
                            <span className="text-accent-green capitalize">
                              {user.alpacaAccount.status || "Active"}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}

                    {!user?.alpacaAccount?.accountNumber && (
                      <div className="flex items-center gap-4 p-4 bg-accent-blue/10 border border-accent-blue/20 rounded-xl">
                        <Info className="w-6 h-6 text-accent-blue" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-accent-blue mb-1">
                            Trading Account Setup
                          </p>
                          <p className="text-xs text-text-secondary">
                            Your trading account is being set up. Please refresh if it
                            doesn't appear shortly.
                          </p>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>

                {/* Settings */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Settings</h2>
                  <div className="space-y-3">
                    <Card hover className="cursor-pointer p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center">
                            <Bell className="w-6 h-6 text-accent-purple" />
                          </div>
                          <div>
                            <p className="font-semibold mb-1">Notifications</p>
                            <p className="text-sm text-text-secondary">
                              Manage notification preferences
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-text-secondary" />
                      </div>
                    </Card>

                    <Card hover className="cursor-pointer p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-accent-green" />
                          </div>
                          <div>
                            <p className="font-semibold mb-1">Privacy & Security</p>
                            <p className="text-sm text-text-secondary">
                              Manage your security settings
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-text-secondary" />
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Logout */}
                <Card className="p-3">
                  <Button
                    variant="ghost"
                    className="w-full h-12 text-accent-red hover:bg-accent-red/10 flex items-center justify-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </DesktopLayout>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      <Header title="Profile" subtitle="Manage your account" />

      <main className="p-3 space-y-4">
        {/* Profile Info Card */}
        <Card className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-1">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-sm text-text-secondary">{user?.email}</p>
        </Card>

        {/* Personal Information */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold">Personal Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-primary hover:text-primary-hover"
              >
                Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <Card>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <Input
                  label="First Name"
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      firstName: e.target.value,
                    })
                  }
                  icon={<User className="w-5 h-5" />}
                />

                <Input
                  label="Last Name"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, lastName: e.target.value })
                  }
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                  icon={<Phone className="w-5 h-5" />}
                  placeholder="+234 000 000 0000"
                />

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    isLoading={loading}
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card className="space-y-3 p-3">
              <div className="flex items-center gap-3 p-2.5 bg-background-hover rounded-lg">
                <User className="w-4 h-4 text-text-secondary" />
                <div>
                  <p className="text-xs text-text-secondary">Full Name</p>
                  <p className="text-sm font-semibold">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 bg-background-hover rounded-lg">
                <Mail className="w-4 h-4 text-text-secondary" />
                <div>
                  <p className="text-xs text-text-secondary">Email</p>
                  <p className="text-sm font-semibold">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 bg-background-hover rounded-lg">
                <Phone className="w-4 h-4 text-text-secondary" />
                <div>
                  <p className="text-xs text-text-secondary">Phone</p>
                  <p className="text-sm font-semibold">
                    {user?.phone || "Not set"}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Account Details */}
        <div>
          <h2 className="text-base font-bold mb-3">Account Details</h2>
          <Card className="space-y-3 p-3">
            <div className="flex items-center gap-3 p-2.5 bg-background-hover rounded-lg">
              <Shield className="w-5 h-5 text-text-secondary" />
              <div className="flex-1">
                <p className="text-sm text-text-secondary">
                  Wallet Address (Base Mainnet)
                </p>
                <p className="font-mono text-sm font-semibold break-all">
                  {user?.walletAddress || "Not generated"}
                </p>
              </div>
            </div>

            {user?.alpacaAccount?.accountNumber && (
              <div className="flex items-center gap-3 p-2.5 bg-accent-green/10 border border-accent-green/20 rounded-lg">
                <TrendingUp className="w-4 h-4 text-accent-green" />
                <div className="flex-1">
                  <p className="text-xs text-text-secondary">
                    Alpaca Trading Account
                  </p>
                  <p className="text-sm font-semibold">
                    {user.alpacaAccount.accountNumber}
                  </p>
                  <p className="text-xs text-text-tertiary mt-0.5">
                    Status:{" "}
                    <span className="text-accent-green capitalize">
                      {user.alpacaAccount.status || "Active"}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {!user?.alpacaAccount?.accountNumber && (
              <div className="flex items-center gap-3 p-2.5 bg-accent-blue/10 border border-accent-blue/20 rounded-lg">
                <Info className="w-4 h-4 text-accent-blue" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-accent-blue">
                    Trading Account Setup
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Your trading account is being set up. Please refresh if it
                    doesn't appear shortly.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Security */}
        <div>
          <h2 className="text-base font-bold mb-3">Security</h2>

          {isChangingPassword ? (
            <Card>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  icon={<Lock className="w-5 h-5" />}
                />

                <Input
                  label="New Password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  icon={<Lock className="w-5 h-5" />}
                />

                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  icon={<Lock className="w-5 h-5" />}
                />

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    isLoading={loading}
                  >
                    Change Password
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setIsChangingPassword(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card
              hover
              className="cursor-pointer p-2.5"
              onClick={() => setIsChangingPassword(true)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent-blue/10 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-accent-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Change Password</p>
                    <p className="text-xs text-text-secondary">
                      Update your password
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-text-secondary" />
              </div>
            </Card>
          )}
        </div>

        {/* Settings */}
        <div>
          <h2 className="text-base font-bold mb-3">Settings</h2>

          <div className="space-y-2">
            <Card hover className="cursor-pointer p-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent-purple/10 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-accent-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Notifications</p>
                    <p className="text-xs text-text-secondary">
                      Manage notification preferences
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-text-secondary" />
              </div>
            </Card>

            <Card hover className="cursor-pointer p-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent-green/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-accent-green" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Privacy & Security</p>
                    <p className="text-xs text-text-secondary">
                      Manage your security settings
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-text-secondary" />
              </div>
            </Card>
          </div>
        </div>

        {/* Logout */}
        <Card className="p-2">
          <Button
            variant="ghost"
            className="w-full h-9 text-sm text-accent-red hover:bg-accent-red/10 flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </Card>
      </main>

      <MobileNav />
    </div>
  );
}
