"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Store,
  ShoppingBag,
  Users,
  Clock,
  Bell,
  TrendingUp,
  LogOut,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Plus,
  Settings,
  BarChart3,
  PieChart,
  Calendar,
  DollarSign,
  UserCheck,
  UserX,
  Package,
  Sparkles,
  Zap,
  Crown,
  Award,
  Target,
  Menu,
  X as CloseIcon,
  Grid,
  MessageSquare,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { useAdmin } from "../../contexts/AdminContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast } from "sonner";
import { cn } from "../ui/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminDashboard() {
  const { stats, adminUser, adminLogout } = useAdmin();
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    adminLogout();
    toast.success("Logged out successfully");
    router.push("/admin-login");
  };

  // Calculate percentages and growth
  const totalShopsGrowth = 12;
  const totalAdsGrowth = 8;
  const totalUsersGrowth = 15;
  const approvalRate =
    stats.totalShops > 0
      ? (
          ((stats.totalShops - stats.pendingShops) / stats.totalShops) *
          100
        ).toFixed(1)
      : 0;

  // Main stat cards with gradients
  const mainStats = [
    {
      label: "Total Shops",
      value: stats.totalShops,
      icon: Store,
      gradient: "from-blue-500 to-cyan-600",
      bgGradient:
        "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
      textColor: "text-blue-600 dark:text-blue-400",
      link: "admin/shops",
      growth: totalShopsGrowth,
      trend: "up",
    },
    {
      label: "Total Advertisements",
      value: stats.totalAds,
      icon: ShoppingBag,
      gradient: "from-purple-500 to-pink-600",
      bgGradient:
        "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
      textColor: "text-purple-600 dark:text-purple-400",
      link: "admin/ads",
      growth: totalAdsGrowth,
      trend: "up",
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient:
        "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
      textColor: "text-emerald-600 dark:text-emerald-400",
      link: "admin/users",
      growth: totalUsersGrowth,
      trend: "up",
    },
    {
      label: "Total Events",
      value: stats.totalEvents,
      icon: Calendar,
      gradient: "from-orange-500 to-red-600",
      bgGradient:
        "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30",
      textColor: "text-orange-600 dark:text-orange-400",
      link: "admin/shops",
      growth: 5,
      trend: "up",
    },
  ];

  // Pending approval cards
  const pendingStats = [
    {
      label: "Pending Shops",
      value: stats.pendingShops,
      icon: Clock,
      color: "bg-amber-500",
      gradient: "from-amber-500 to-orange-600",
      link: "admin/shops",
      urgent: stats.pendingShops > 5,
    },
    {
      label: "Pending Ads",
      value: stats.pendingAds,
      icon: AlertCircle,
      color: "bg-yellow-500",
      gradient: "from-yellow-500 to-amber-600",
      link: "admin/ads",
      urgent: stats.pendingAds > 10,
    },
  ];

  // Quick action menu items for sidebar
  const quickActions = [
    {
      label: "Manage Shops",
      description: "View and approve shops",
      icon: Store,
      gradient: "from-blue-500 to-indigo-600",
      link: "/AdminAddShop",
      count: stats.totalShops,
    },
    {
      label: "Manage Advertisements",
      description: "Review ad submissions",
      icon: ShoppingBag,
      gradient: "from-purple-500 to-pink-600",
      link: "/AdminAddAd",
      count: stats.totalAds,
    },
    {
      label: "Manage Users",
      description: "User management",
      icon: Users,
      gradient: "from-emerald-500 to-teal-600",
      link: "/AdminUsers",
      count: stats.totalUsers,
    },
    {
      label: "Categories",
      description: "Organize content",
      icon: Grid,
      gradient: "from-indigo-500 to-purple-600",
      link: "/AdminCategories",
      count: 20,
    },
    {
      label: "SubCategories",
      description: "Organize content",
      icon: Grid,
      gradient: "from-indigo-500 to-purple-600",
      link: "/AdminSubCategories",
      count: 20,
    },
    {
      label: "Push Notifications",
      description: "Send announcements",
      icon: Bell,
      gradient: "from-pink-500 to-rose-600",
      link: "/AdminNotifications",
      count: null,
    },
    {
      label: "Analytics",
      description: "View reports",
      icon: BarChart3,
      gradient: "from-blue-500 to-cyan-600",
      link: "AdminAnalytics",
      count: null,
    },
  ];

  // Recent activities
  const recentActivities = [
    {
      type: "shop",
      title: "New shop submission",
      description: "Quick Mart - Grocery Store",
      time: "1 hour ago",
      status: "pending",
      icon: Store,
    },
    {
      type: "ad",
      title: "New advertisement posted",
      description: "Maruti Swift 2018 - ₹4,50,000",
      time: "2 hours ago",
      status: "approved",
      icon: ShoppingBag,
    },
    {
      type: "user",
      title: "New user registered",
      description: "Deepa R - deepa@example.com",
      time: "4 hours ago",
      status: "active",
      icon: Users,
    },
    {
      type: "shop",
      title: "Shop approved",
      description: "Medical Store - Healthcare",
      time: "6 hours ago",
      status: "approved",
      icon: CheckCircle,
    },
    {
      type: "ad",
      title: "Advertisement rejected",
      description: "Invalid product listing",
      time: "1 day ago",
      status: "rejected",
      icon: XCircle,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-500 text-white text-xs">Pending</Badge>
        );
      case "approved":
        return (
          <Badge className="bg-emerald-500 text-white text-xs">Approved</Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500 text-white text-xs">Rejected</Badge>
        );
      case "active":
        return <Badge className="bg-blue-500 text-white text-xs">Active</Badge>;
      default:
        return (
          <Badge className="bg-gray-500 text-white text-xs">{status}</Badge>
        );
    }
  };

  const Sidebar = () => (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            <span className="font-bold text-lg dark:text-white">
              Admin Panel
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <CloseIcon className="w-5 h-5" />
          </Button>
        </div>

        {/* Sidebar Content */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Quick Actions
              </h3>
            </div>

            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    router.push(action.link);
                    setSidebarOpen(false);
                  }}
                  className="w-full group relative overflow-hidden rounded-xl p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${action.gradient} shadow-md group-hover:scale-110 transition-transform duration-200`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                          {action.label}
                        </p>
                        {action.count !== null && (
                          <Badge variant="secondary" className="text-xs">
                            {action.count}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              {adminUser?.email?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                {adminUser?.email || "Admin"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Administrator
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full text-red-600 border-red-300 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/30 dark:to-purple-950/30">
      {/* Sidebar */}
      <Sidebar />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-72">
        {/* Header - Sticky */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 shadow-lg border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="px-4 py-4 md:py-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden rounded-xl"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.back()}
                  className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl md:text-3xl dark:text-white flex items-center gap-2">
                      <Crown className="w-6 h-6 md:w-7 md:h-7 text-yellow-500" />
                      Admin Dashboard
                    </h1>
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {adminUser?.email || "Manage Namma Kumta"}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hidden lg:flex text-red-600 border-red-300 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950 rounded-xl transition-all hover:scale-105"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="px-4 py-6 pb-24 space-y-8">
            {/* Main Statistics - 4 Column Grid */}
            <section className="animate-in fade-in slide-in-from-bottom duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                <h2 className="text-xl md:text-2xl dark:text-white">
                  Overview Statistics
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {mainStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card
                      key={index}
                      className={`relative overflow-hidden cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group bg-gradient-to-br ${stat.bgGradient}`}
                      onClick={() => router.push(stat.link)}
                    >
                      {/* Background Pattern */}
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                        <Icon className="w-full h-full" />
                      </div>

                      <div className="relative p-5 md:p-6">
                        {/* Icon */}
                        <div
                          className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        {/* Value */}
                        <div className="space-y-2">
                          <p
                            className={`text-4xl md:text-5xl font-extrabold ${stat.textColor}`}
                          >
                            {stat.value}
                          </p>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {stat.label}
                          </p>
                        </div>

                        {/* Growth Indicator */}
                        <div className="flex items-center gap-2 mt-3">
                          <div
                            className={`flex items-center gap-1 text-xs font-semibold ${
                              stat.trend === "up"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>+{stat.growth}%</span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            this month
                          </span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Pending Approvals - Alert Cards */}
            <section className="animate-in fade-in slide-in-from-bottom duration-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-500 to-red-500 rounded-full shadow-lg"></div>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl dark:text-white flex items-center gap-2">
                    Pending Approvals
                    {(stats.pendingShops > 0 || stats.pendingAds > 0) && (
                      <Badge className="bg-red-500 text-white animate-pulse">
                        Action Required
                      </Badge>
                    )}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Items waiting for review
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pendingStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card
                      key={index}
                      className={`relative overflow-hidden cursor-pointer border-2 ${
                        stat.urgent
                          ? "border-red-300 dark:border-red-800"
                          : "border-gray-200 dark:border-gray-800"
                      } shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}
                      onClick={() => router.push(stat.link)}
                    >
                      {/* Urgent Alert */}
                      {stat.urgent && (
                        <div className="absolute top-0 right-0">
                          <div className="bg-gradient-to-br from-red-500 to-orange-600 text-white text-xs font-bold px-3 py-1 shadow-lg flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Urgent
                          </div>
                        </div>
                      )}

                      <div className="p-5 md:p-6 flex items-center gap-4">
                        <div
                          className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
                            {stat.value}
                          </p>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {stat.label}
                          </p>
                        </div>
                        {stat.value > 0 && (
                          <Button
                            size="sm"
                            className={`bg-gradient-to-r ${stat.gradient} text-white border-0 shadow-lg hover:shadow-xl`}
                          >
                            Review
                          </Button>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* System Health & Approval Rate */}
            <section className="animate-in fade-in slide-in-from-bottom duration-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full shadow-lg"></div>
                <h2 className="text-xl md:text-2xl dark:text-white">
                  System Health
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Approval Rate */}
                <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Approval Rate
                      </p>
                      <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        {approvalRate}%
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <Progress value={Number(approvalRate)} className="h-2.5" />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    {stats.totalShops - stats.pendingShops} of{" "}
                    {stats.totalShops} shops approved
                  </p>
                </Card>

                {/* Active Users */}
                <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Active Users Today
                      </p>
                      <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                        {Math.floor(stats.totalUsers * 0.35)}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <Progress value={35} className="h-2.5" />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    35% of total users online
                  </p>
                </Card>
              </div>
            </section>

            {/* Recent Activity Timeline */}
            <section className="animate-in fade-in slide-in-from-bottom duration-1100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full shadow-lg"></div>
                  <div>
                    <h2 className="text-xl md:text-2xl dark:text-white">
                      Recent Activity
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Latest updates and actions
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  View All
                </Button>
              </div>
              <Card className="divide-y dark:divide-gray-800 border-0 shadow-lg">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={index}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300">
                          <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="font-semibold text-sm text-gray-900 dark:text-white">
                              {activity.title}
                            </p>
                            {getStatusBadge(activity.status)}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">
                            {activity.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Card>
            </section>

            {/* System Info Footer */}
            <section className="animate-in fade-in duration-1200">
              <Card className="p-5 border-0 shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      99.9%
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Uptime
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.totalShops + stats.totalAds}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Total Listings
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      4.8★
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Avg Rating
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      24/7
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Support
                    </p>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// import {
//   ArrowLeft, Store, ShoppingBag, Users, Clock, Bell, TrendingUp, LogOut,
//   Activity, CheckCircle, XCircle, AlertCircle, Sparkles, Zap, Crown,
//   Menu, X as CloseIcon, Grid, Calendar
// } from "lucide-react";

// import { Button } from "../ui/button";
// import { Card } from "../ui/card";
// import { ScrollArea } from "../ui/scroll-area";
// import { Badge } from "../ui/badge";
// import { Progress } from "../ui/progress";
// import { cn } from "../ui/utils";

// import { useAdmin } from "../../contexts/AdminContext";
// import { useLanguage } from "../../contexts/LanguageContext";
// import { toast } from "sonner";

// export function AdminDashboard() {
//   const router = useRouter();
//   const { stats, adminUser, adminLogout } = useAdmin();
//   const { t } = useLanguage();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Logout handler
//   const handleLogout = () => {
//     adminLogout();
//     toast.success("Logged out successfully");
//     router.push("/admin-login");
//   };

//   // Quick action sidebar links
//   const quickActions = [
//     { label: "Manage Shops", icon: Store, link: "/AdminAddShop", gradient: "from-blue-500 to-indigo-600", count: stats.totalShops },
//     { label: "Manage Advertisements", icon: ShoppingBag, link: "/AdminAddAd", gradient: "from-purple-500 to-pink-600", count: stats.totalAds },
//     { label: "Manage Users", icon: Users, link: "/admin/users", gradient: "from-emerald-500 to-teal-600", count: stats.totalUsers },
//     { label: "Categories", icon: Grid, link: "/categories", gradient: "from-indigo-500 to-purple-600", count: 20 },
//     { label: "Push Notifications", icon: Bell, link: "/notifications", gradient: "from-pink-500 to-rose-600", count: null },
//     { label: "Analytics", icon: Activity, link: "/analytics", gradient: "from-blue-500 to-cyan-600", count: null },
//   ];

//   // Main stat boxes
//   const mainStats = [
//     { label: "Total Shops", value: stats.totalShops, icon: Store, gradient: "from-blue-500 to-cyan-600", bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30", textColor: "text-blue-600 dark:text-blue-400", link: "/AdminAddShop", growth: 12 },
//     { label: "Total Advertisements", value: stats.totalAds, icon: ShoppingBag, gradient: "from-purple-500 to-pink-600", bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30", textColor: "text-purple-600 dark:text-purple-400", link: "/AdminAddAd", growth: 8 },
//     { label: "Total Users", value: stats.totalUsers, icon: Users, gradient: "from-emerald-500 to-teal-600", bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30", textColor: "text-emerald-600 dark:text-emerald-400", link: "/admin/users", growth: 15 },
//     { label: "Total Events", value: stats.totalEvents, icon: Calendar, gradient: "from-orange-500 to-red-600", bgGradient: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30", textColor: "text-orange-600 dark:text-orange-400", link: "/AdminAddShop", growth: 5 },
//   ];

//   // Pending approvals
//   const pendingStats = [
//     { label: "Pending Shops", value: stats.pendingShops, icon: Clock, gradient: "from-amber-500 to-orange-600", link: "/AdminAddShop", urgent: stats.pendingShops > 5 },
//     { label: "Pending Ads", value: stats.pendingAds, icon: AlertCircle, gradient: "from-yellow-500 to-amber-600", link: "/AdminAddAd", urgent: stats.pendingAds > 10 },
//   ];

//   // Recent activity
//   const recentActivities = [
//     { title: "New shop submission", desc: "Quick Mart - Grocery Store", time: "1 hour ago", status: "pending", icon: Store },
//     { title: "New advertisement posted", desc: "Swift 2018 - ₹4,50,000", time: "2 hours ago", status: "approved", icon: ShoppingBag },
//     { title: "New user registered", desc: "Deepa R - deepa@example.com", time: "4 hours ago", status: "active", icon: Users },
//     { title: "Shop approved", desc: "Medical Store", time: "6 hours ago", status: "approved", icon: CheckCircle },
//     { title: "Advertisement rejected", desc: "Invalid product listing", time: "1 day ago", status: "rejected", icon: XCircle },
//   ];

//   const getStatusBadge = (status: string) => {
//     const map: any = {
//       pending: "bg-amber-500",
//       approved: "bg-emerald-500",
//       rejected: "bg-red-500",
//       active: "bg-blue-500",
//     };
//     return <Badge className={`${map[status]} text-white text-xs`}>{status}</Badge>;
//   };

//   // Sidebar Component
//   const Sidebar = () => (
//     <div className={cn(
//       "fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-900 border-r z-50 transition-transform duration-300 lg:translate-x-0",
//       sidebarOpen ? "translate-x-0" : "-translate-x-full"
//     )}>
//       <div className="p-4 border-b flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Crown className="w-6 h-6 text-yellow-500" />
//           <span className="font-bold dark:text-white">Admin Panel</span>
//         </div>
//         <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
//           <CloseIcon className="w-5 h-5" />
//         </Button>
//       </div>

//       <ScrollArea className="flex-1 p-4">
//         {quickActions.map((item, i) => {
//           const Icon = item.icon;
//           return (
//             <Link href={item.link} key={i}>
//               <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer mb-2">
//                 <div className={`p-2 rounded-lg bg-gradient-to-br ${item.gradient} text-white`}>
//                   <Icon className="w-5 h-5" />
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-semibold text-sm dark:text-white">{item.label}</p>
//                   {item.count !== null && <Badge>{item.count}</Badge>}
//                 </div>
//               </div>
//             </Link>
//           );
//         })}
//       </ScrollArea>

//       <div className="p-4 border-t">
//         <div className="flex items-center gap-3 mb-3">
//           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold">
//             {adminUser?.email?.charAt(0).toUpperCase()}
//           </div>
//           <div>
//             <p className="font-semibold dark:text-white">{adminUser?.email}</p>
//             <p className="text-xs text-gray-500">Administrator</p>
//           </div>
//         </div>

//         <Button onClick={handleLogout} className="w-full text-red-600 border-red-300">
//           <LogOut className="w-4 h-4 mr-2" /> Logout
//         </Button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/30 dark:to-purple-950/30">

//       <Sidebar />

//       {sidebarOpen && (
//         <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
//       )}

//       <div className="flex-1 flex flex-col lg:ml-72">

//         {/* HEADER */}
//         <div className="sticky top-0 bg-white/90 dark:bg-gray-900/90 shadow-md p-4 z-20 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
//               <Menu className="w-5 h-5" />
//             </Button>

//             <Button variant="ghost" size="icon" onClick={() => router.back()}>
//               <ArrowLeft className="w-5 h-5" />
//             </Button>

//             <h1 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
//               <Crown className="w-6 h-6 text-yellow-500" /> Admin Dashboard
//             </h1>
//           </div>

//           <Button onClick={handleLogout} className="hidden lg:flex text-red-600 border-red-300">
//             <LogOut className="w-4 h-4 mr-2" /> Logout
//           </Button>
//         </div>

//         {/* MAIN CONTENT */}
//         <ScrollArea className="flex-1">
//           <div className="p-6 space-y-10">

//             {/* -------- STATS SECTION -------- */}
//             <section>
//               <h2 className="text-xl font-semibold mb-4 dark:text-white">Overview Statistics</h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {mainStats.map((stat, i) => {
//                   const Icon = stat.icon;
//                   return (
//                     <Link href={stat.link} key={i}>
//                       <Card className={`p-6 cursor-pointer bg-gradient-to-br ${stat.bgGradient} hover:scale-105 transition`}>
//                         <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white mb-4`}>
//                           <Icon className="w-6 h-6" />
//                         </div>

//                         <p className={`text-4xl font-extrabold ${stat.textColor}`}>{stat.value}</p>
//                         <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>

//                         <div className="flex items-center gap-2 mt-3 text-emerald-600 dark:text-emerald-400 text-xs">
//                           <TrendingUp className="w-3 h-3" />
//                           +{stat.growth}% this month
//                         </div>
//                       </Card>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </section>

//             {/* -------- PENDING APPROVALS -------- */}
//             <section>
//               <h2 className="text-xl font-semibold mb-4 dark:text-white">Pending Approvals</h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {pendingStats.map((item, i) => {
//                   const Icon = item.icon;
//                   return (
//                     <Link href={item.link} key={i}>
//                       <Card className={`p-6 border-2 hover:scale-105 transition cursor-pointer ${item.urgent ? "border-red-300" : "border-gray-200"}`}>
//                         {item.urgent && (
//                           <div className="bg-red-600 text-white px-3 py-1 text-xs rounded absolute right-2 top-2 flex items-center gap-1">
//                             <Zap className="w-3 h-3" /> Urgent
//                           </div>
//                         )}

//                         <div className={`p-4 rounded-xl bg-gradient-to-br ${item.gradient} text-white inline-flex mb-3`}>
//                           <Icon className="w-8 h-8" />
//                         </div>

//                         <p className="text-4xl font-extrabold dark:text-white">{item.value}</p>
//                         <p className="text-sm text-gray-600 dark:text-gray-300">{item.label}</p>
//                       </Card>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </section>

//             {/* -------- SYSTEM HEALTH -------- */}
//             <section>
//               <h2 className="text-xl font-semibold mb-4 dark:text-white">System Health</h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                 {/* Approval Rate */}
//                 <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
//                   <div className="flex justify-between mb-4">
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-300">Approval Rate</p>
//                       <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
//                         {((stats.totalShops - stats.pendingShops) / stats.totalShops * 100).toFixed(1)}%
//                       </p>
//                     </div>
//                     <div className="p-3 rounded-xl bg-emerald-500 text-white">
//                       <CheckCircle className="w-6 h-6" />
//                     </div>
//                   </div>
//                   <Progress value={((stats.totalShops - stats.pendingShops) / stats.totalShops) * 100} />
//                 </Card>

//                 {/* Active Users */}
//                 <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
//                   <div className="flex justify-between mb-4">
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-300">Active Users Today</p>
//                       <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
//                         {Math.floor(stats.totalUsers * 0.35)}
//                       </p>
//                     </div>
//                     <div className="p-3 rounded-xl bg-blue-500 text-white">
//                       <Activity className="w-6 h-6" />
//                     </div>
//                   </div>
//                   <Progress value={35} />
//                 </Card>
//               </div>
//             </section>

//             {/* -------- RECENT ACTIVITY -------- */}
//             <section>
//               <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Activity</h2>
//               <Card className="divide-y dark:divide-gray-700">
//                 {recentActivities.map((act, i) => {
//                   const Icon = act.icon;
//                   return (
//                     <div key={i} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition">
//                       <div className="flex gap-4 items-start">
//                         <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800">
//                           <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
//                         </div>

//                         <div className="flex-1">
//                           <div className="flex justify-between items-start">
//                             <p className="font-semibold dark:text-white">{act.title}</p>
//                             {getStatusBadge(act.status)}
//                           </div>

//                           <p className="text-sm text-gray-600 dark:text-gray-300">{act.desc}</p>

//                           <div className="flex gap-2 text-xs text-gray-500 mt-1">
//                             <Clock className="w-3 h-3" />
//                             {act.time}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </Card>
//             </section>

//             {/* -------- FOOTER STATS -------- */}
//             <section>
//               <Card className="p-5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
//                 <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-4">
//                   <div>
//                     <p className="text-2xl font-bold">99.9%</p>
//                     <p className="text-xs">Uptime</p>
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold">{stats.totalShops + stats.totalAds}</p>
//                     <p className="text-xs">Total Listings</p>
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold">4.8★</p>
//                     <p className="text-xs">Avg Rating</p>
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold">24/7</p>
//                     <p className="text-xs">Support</p>
//                   </div>
//                 </div>
//               </Card>
//             </section>

//           </div>
//         </ScrollArea>
//       </div>
//     </div>
//   );
// }
