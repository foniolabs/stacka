"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, ArrowLeft, Shield, DollarSign } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { apiClient } from "@/lib/api/client";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

interface YieldOption {
  provider: string;
  protocol: string;
  asset: string;
  network: string;
  apy: number;
  tvl?: number;
  riskLevel: "low" | "medium" | "high";
  minDeposit: number;
  isActive: boolean;
}

export default function YieldOpportunitiesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [opportunities, setOpportunities] = useState<YieldOption[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<
    YieldOption[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [riskFilter, setRiskFilter] = useState<
    "all" | "low" | "medium" | "high"
  >("all");
  const [sortBy, setSortBy] = useState<"apy" | "risk" | "protocol">("apy");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for zustand to hydrate from localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Only check auth after hydration
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchOpportunities();
  }, [isHydrated, isAuthenticated, router]);

  useEffect(() => {
    filterAndSortOpportunities();
  }, [opportunities, searchQuery, riskFilter, sortBy, sortOrder]);

  const fetchOpportunities = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getYieldOpportunities();
      if (response?.data?.options) {
        setOpportunities(response.data.options);
      }
    } catch (error) {
      console.error("Failed to fetch yield opportunities:", error);
      toast.error("Failed to load yield opportunities. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortOpportunities = () => {
    let filtered = [...opportunities];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (opp) =>
          opp.protocol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.network.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by risk level
    if (riskFilter !== "all") {
      filtered = filtered.filter((opp) => opp.riskLevel === riskFilter);
    }

    // Filter active only
    filtered = filtered.filter((opp) => opp.isActive);

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "apy":
          comparison = a.apy - b.apy;
          break;
        case "risk":
          const riskOrder = { low: 1, medium: 2, high: 3 };
          comparison = riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
          break;
        case "protocol":
          comparison = a.protocol.localeCompare(b.protocol);
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredOpportunities(filtered);
  };

  const handleSort = (field: "apy" | "risk" | "protocol") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder(field === "apy" ? "desc" : "asc");
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "text-accent-green bg-accent-green/10";
      case "medium":
        return "text-yellow-500 bg-yellow-500/10";
      case "high":
        return "text-accent-red bg-accent-red/10";
      default:
        return "text-text-secondary bg-background-hover";
    }
  };

  const handleOpportunityClick = (opportunity: YieldOption) => {
    router.push(`/yield/${encodeURIComponent(opportunity.protocol)}`);
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      <Header
        title="DeFi Yield Opportunities"
        actions={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        }
      />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Info Banner */}
        <Card
          variant="glass"
          className="p-4 bg-gradient-to-r from-primary/10 to-accent-purple/10"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-semibold text-white">Earn Passive Income</p>
              <p className="text-sm text-text-secondary mt-1">
                Deposit your stablecoins and earn competitive yields on DeFi
                protocols
              </p>
            </div>
          </div>
        </Card>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <Input
                type="text"
                placeholder="Search protocols, assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Risk Filter */}
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={riskFilter === "all" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setRiskFilter("all")}
              >
                All
              </Button>
              <Button
                variant={riskFilter === "low" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setRiskFilter("low")}
              >
                Low Risk
              </Button>
              <Button
                variant={riskFilter === "medium" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setRiskFilter("medium")}
              >
                Medium Risk
              </Button>
              <Button
                variant={riskFilter === "high" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setRiskFilter("high")}
              >
                High Risk
              </Button>
            </div>

            {/* Sort Options */}
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={sortBy === "apy" ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleSort("apy")}
              >
                APY {sortBy === "apy" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
              <Button
                variant={sortBy === "risk" ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleSort("risk")}
              >
                Risk {sortBy === "risk" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
              <Button
                variant={sortBy === "protocol" ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleSort("protocol")}
              >
                Protocol{" "}
                {sortBy === "protocol" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
            </div>
          </div>
        </Card>

        {/* Opportunities List */}
        {isLoading ? (
          <Card className="p-6">
            <p className="text-center text-text-secondary">
              Loading opportunities...
            </p>
          </Card>
        ) : filteredOpportunities.length > 0 ? (
          <div className="space-y-3">
            {filteredOpportunities.map((opportunity, index) => (
              <Card
                key={index}
                hover
                className="p-4 cursor-pointer"
                onClick={() => handleOpportunityClick(opportunity)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">{opportunity.protocol}</p>
                        <p className="text-sm text-text-secondary">
                          {opportunity.asset} • {opportunity.network}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent-green">
                        {opportunity.apy.toFixed(2)}%
                      </p>
                      <p className="text-xs text-text-tertiary">APY</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-text-tertiary" />
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getRiskColor(
                          opportunity.riskLevel
                        )}`}
                      >
                        {opportunity.riskLevel.charAt(0).toUpperCase() +
                          opportunity.riskLevel.slice(1)}{" "}
                        Risk
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-text-tertiary" />
                      <span className="text-xs text-text-secondary">
                        Min: ${opportunity.minDeposit}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6">
            <div className="text-center">
              <p className="text-text-secondary">No opportunities found</p>
              <p className="text-sm text-text-tertiary mt-2">
                Try adjusting your filters or search query
              </p>
            </div>
          </Card>
        )}
      </main>

      <MobileNav />
    </div>
  );
}
