"use client";

import {
  ShoppingBag,
  Stethoscope,
  Plane,
  Sparkles,
  Wrench,
  HomeIcon,
  ChevronRight,
  User,
  Star,
  MapPin,
  TrendingUp,
  Phone,
  Settings,
  Church,
  GraduationCap,
  Users,
  Drama,
  Building2,
  Ambulance,
  Hotel,
  Car,
  Dumbbell,
  Bell,
  Zap,
  Crown,
  Heart,
  Search,
} from "lucide-react";
import { categoryApi } from "@/lib/api/categoryApi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WeatherWidget } from "@/components/WeatherWidget";
import { EmergencyContactCard } from "@/components/EmergencyContactCard";
import { LanguageSelector } from "@/components/LanguageSelector";
import { BannerCarousel } from "@/components/BannerCarousel";
import { PopularShopsCarousel } from "@/components/PopularShopsCarousel";
import { FeaturedAdsCarousel } from "@/components/FeaturedAdsCarousel";
import { NearbyCard } from "@/components/NearbyCard";
import { FloatingAddButton } from "@/components/FloatingAddButton";
import { QuickAddDialog } from "@/components/QuickAddDialog";
import { NammaKumtaLogo } from "@/components/NammaKumtaLogo";
import { SmartSearchBarWithImages } from "@/components/SmartSearchBarWithImages";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export function HomePage() {
  const router = useRouter();

  // Navigation helper function
  const handleNavigate = (page: string, data?: any) => {
    if (page === "subcategory") {
      router.push(
        `/subcategory?categoryId=${
          data.categoryId
        }&categoryName=${encodeURIComponent(data.categoryName)}`
      );
      return;
    }

    if (page === "categoryListings") {
      router.push(
        `/category-listings?categoryId=${
          data.categoryId
        }&categoryName=${encodeURIComponent(
          data.categoryName
        )}&subcategory=${encodeURIComponent(data.subcategory)}`
      );
      return;
    }

    if (page === "detail") {
      const listing = data.listing || data;
      if (listing) {
        sessionStorage.setItem("currentListing", JSON.stringify(listing));
        router.push("/detail");
      }
      return;
    }

    if (page === "ad-detail") {
      const ad = data.ad || data;
      if (ad && ad.id) {
        sessionStorage.setItem("currentAd", JSON.stringify(ad));
        router.push("/ad-detail");
      }
      return;
    }

    type ApiCategory = {
      id: string;
      name: string;
      slug?: string;
      image?: string;
      description?: string;
      isActive?: boolean;
      // add other fields your backend returns
    };

    type UnifiedCategory = {
      id: string;
      name?: string;
      nameKey?: string;
      slug?: string;
      image?: string;
      icon?: any;
      gradient?: string;
    };
    // Map page names to routes
    const routeMap: Record<string, string> = {
      home: "/",
      explore: "/explore",
      categories: "/categories",
      advertisements: "/ads",
      favorites: "/favorites",
      profile: "/profile",
      notifications: "/notifications",
      login: "/auth/login",
      register: "/auth/register",
      settings: "/settings",
      emergency: "/emergency",
      help: "/help",
      "contact-us": "/contact-us",
      "terms-conditions": "/terms-conditions",
      about: "/about",
      "privacy-policy": "/privacy-policy",
      "add-advertisement": "/add-advertisement",
      "edit-advertisement": "/edit-advertisement",
      "add-listing": "/add-listing",
      "edit-listing": "/edit-listing",
    };

    const route = routeMap[page] || `/${page}`;
    router.push(route);
  };
  const { t } = useLanguage();
  const { unreadCount } = useNotifications();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { requireAuth } = useRequireAuth();
  const [businessCategories, setBusinessCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // -------------------------
  // Categories from API
  // -------------------------

  const getIconForCategory = (cat: any) => {
    const slug = (cat.slug || cat.id || cat.name || "")
      .toString()
      .toLowerCase();
    switch (slug) {
      case "shops":
      case "grocery":
        return ShoppingBag;
      case "doctors":
      case "medical":
        return Stethoscope;
      case "tourism":
      case "travel":
        return Plane;
      case "hotels":
      case "hotel":
        return Hotel;
      case "services":
        return Wrench;
      case "education":
      case "schools":
        return GraduationCap;
      case "associations":
        return Users;
      case "culturalprograms":
      case "culture":
        return Drama;
      case "departments":
        return Building2;
      case "emergencyservices":
      case "emergency":
        return Ambulance;
      case "rentvehicles":
      case "cars":
        return Car;
      case "sports":
      case "sportsequipment":
        return Dumbbell;
      default:
        // fallback: if item already has an `icon` (like mainCategories), use it, otherwise ShoppingBag
        return cat.icon || ShoppingBag;
    }
  };
  useEffect(() => {
    async function loadCategories() {
      try {
        const result = await categoryApi.getAll();

        const filtered = (result?.data || []).filter(
          (cat: any) => cat.type === "business"
        );

        setBusinessCategories(filtered);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  const categoriesMapped = businessCategories.map((c: any) => ({
    id: c._id,
    name: c.name,
    slug: c.slug,
    image: c.image,
    gradient: "from-orange-500 to-pink-500",
  }));

  const popularShops = [
    {
      id: "1",
      name: "Kumta General Store",
      category: "Grocery",
      image:
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmV8ZW58MHx8fHwxNzYwNDIzNDY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviewCount: 124,
      distance: "0.5 km",
      isNew: false,
      isTrending: true,
    },
    {
      id: "2",
      name: "Sri Krishna Medical",
      category: "Medical",
      image:
        "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RvcmV8ZW58MHx8fHwxNzYwNDIzNDY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviewCount: 89,
      distance: "1.2 km",
      isNew: true,
    },
    {
      id: "3",
      name: "Classic Furniture Hub",
      category: "Furniture",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBzaG93cm9vbXxlbnwwfHx8fDE3NjA0MjM0Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviewCount: 156,
      distance: "2.1 km",
      isNew: false,
      isFeatured: true,
    },
  ];

  const featuredAds = [
    {
      id: "1",
      title: "Honda City 2019",
      category: "Cars",
      price: "₹8,50,000",
      location: "Kumta",
      image:
        "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzZWRhbnxlbnwwfHx8fDE3NjA0MjM0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      isFeatured: true,
      postedDate: "2 days ago",
    },
    {
      id: "2",
      title: "3BHK Apartment for Rent",
      category: "Property",
      price: "₹15,000/month",
      location: "Kumta",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwwfHx8fDE3NjA0MjM0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      isFeatured: true,
      postedDate: "1 day ago",
    },
    {
      id: "3",
      title: "iPhone 13 Pro",
      category: "Electronics",
      price: "₹65,000",
      location: "Kumta",
      image:
        "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjAxM3xlbnwwfHx8fDE3NjA0MjM0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      isFeatured: true,
      postedDate: "3 days ago",
    },
  ];

  const nearbyPlaces = [
    {
      id: "1",
      name: "Om Beach",
      type: "Beach",
      distance: "15 km",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHBhbG0lMjB0cmVlc3xlbnwxfHx8fDE3NjA0MjM0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "2",
      name: "Mirjan Fort",
      type: "Historical",
      distance: "12 km",
      image:
        "https://images.unsplash.com/photo-1738766726243-1476ed4a06f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGZvcnQlMjBoaXN0b3JpY2FsfGVufDF8fHx8MTc2MDQyMzQ2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const emergencyContacts = [
    {
      id: "1",
      name: t("police"),
      number: "100",
      icon: "👮",
      color: "from-blue-400 to-blue-600",
      description: "Emergency police",
    },
    {
      id: "2",
      name: t("ambulance"),
      number: "108",
      icon: "🚑",
      color: "from-red-400 to-red-600",
      description: "Medical emergency",
    },
    {
      id: "3",
      name: t("fireService"),
      number: "101",
      icon: "🚒",
      color: "from-orange-400 to-orange-600",
      description: "Fire & rescue",
    },
  ];

  // All 13 main categories with gradient colors
  const mainCategories = [
    {
      id: "shops",
      nameKey: "shops",
      icon: ShoppingBag,
      gradient: "from-orange-500 to-pink-500",
    },
    {
      id: "temples",
      nameKey: "temples",
      icon: Church,
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      id: "tourism",
      nameKey: "tourism",
      icon: Plane,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "schoolsColleges",
      nameKey: "schoolsColleges",
      icon: GraduationCap,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      id: "services",
      nameKey: "services",
      icon: Wrench,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      id: "associations",
      nameKey: "associations",
      icon: Users,
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      id: "culturalPrograms",
      nameKey: "culturalPrograms",
      icon: Drama,
      gradient: "from-pink-500 to-rose-600",
    },
    {
      id: "departments",
      nameKey: "departments",
      icon: Building2,
      gradient: "from-slate-500 to-gray-600",
    },
    {
      id: "doctors",
      nameKey: "doctors",
      icon: Stethoscope,
      gradient: "from-teal-500 to-cyan-600",
    },
    {
      id: "emergencyServices",
      nameKey: "emergencyServices",
      icon: Ambulance,
      gradient: "from-red-500 to-rose-600",
    },
    {
      id: "hotels",
      nameKey: "hotels",
      icon: Hotel,
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      id: "rentVehicles",
      nameKey: "rentVehicles",
      icon: Car,
      gradient: "from-violet-500 to-purple-600",
    },
    {
      id: "sportsEquipments",
      nameKey: "sportsEquipments",
      icon: Dumbbell,
      gradient: "from-rose-500 to-pink-600",
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#F7F9FC] dark:bg-gray-950">
      {/* Premium Header with Glass Effect */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50 shadow-lg shadow-gray-200/20 dark:shadow-none">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
            {/* Logo with Glow */}
            <div className="flex items-center gap-2">
              <NammaKumtaLogo size="sm" />
            </div>

            {/* Right Icons with Premium Style */}
            <div className="flex items-center gap-2">
              <LanguageSelector />

              {/* Notification Bell with Gradient Badge */}
              <button
                onClick={() =>
                  requireAuth(
                    () => handleNavigate("notifications"),
                    () => handleNavigate("login")
                  )
                }
                className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
              >
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg shadow-pink-500/30 animate-pulse">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() =>
                  requireAuth(
                    () => handleNavigate("profile"),
                    () => handleNavigate("login")
                  )
                }
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Premium Search Bar */}
          <div className="max-w-3xl mx-auto">
            <SmartSearchBarWithImages
              placeholder={
                t("searchPlaceholder") ||
                "Search shops, services, temples, or ads..."
              }
            />
          </div>
        </div>

        {/* Weather Strip */}
        <WeatherWidget />
      </header>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="pb-24 md:pb-28 lg:pb-32">
          {/* Hero Banner with Premium Cards */}
          <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-4 sm:py-6 md:py-8">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
              <BannerCarousel />
            </div>
          </section>

          {/* Browse Services - Premium Gradient Icons */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
              {/* Section Header with Premium Typography */}
              <div className="mb-6 sm:mb-8 md:mb-10 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-2 sm:mb-3">
                  {t("browseServices")}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
                  {t("whatLookingFor")}
                </p>
              </div>

              {/* Premium Grid with Gradient Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {(loadingCategories
                  ? mainCategories
                  : categoriesMapped.length > 0
                  ? categoriesMapped
                  : mainCategories
                ).map((cat, index) => {
                  const Icon = getIconForCategory(cat);
                  const gradient =
                    cat.gradient || "from-orange-500 to-pink-500";
                  const categoryName =
                    cat.name || t(cat.nameKey) || cat.title || "Category";
                  const categoryId = cat.id ?? cat.slug ?? categoryName;

                  return (
                    <button
                      key={categoryId + "-" + index}
                      onClick={() =>
                        handleNavigate("subcategory", {
                          categoryId,
                          categoryName,
                        })
                      }
                      className="group relative flex flex-col items-center justify-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg"
                    >
                      {/* Icon / Image */}
                      <div
                        className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center overflow-hidden ${
                          !cat.image ? `bg-gradient-to-br ${gradient}` : ""
                        }`}
                      >
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={categoryName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Icon className="w-8 h-8 text-white" />
                        )}
                      </div>

                      <span className="text-sm font-semibold text-gray-800 dark:text-white text-center">
                        {categoryName}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Premium View All Button */}
              <div className="text-center mt-8 sm:mt-10 md:mt-12">
                <Button
                  onClick={() => handleNavigate("categories")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transition-all hover:scale-105 active:scale-95"
                >
                  {t("viewAll")}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* Top Rated Shops - Premium Cards */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-[#F7F9FC] dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                    {t("topRatedShops")}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {t("bestInArea")}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigate("categories")}
                  className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl px-4 py-2"
                >
                  {t("viewAll")}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Premium Shop Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {popularShops.map((shop) => (
                  <div
                    key={shop.id}
                    onClick={() =>
                      handleNavigate("detail", {
                        listing: { id: shop.id, ...shop },
                      })
                    }
                    className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-gray-300/50 dark:hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  >
                    {/* Image with Gradient Overlay */}
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                      <img
                        src={shop.image}
                        alt={shop.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Floating Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {shop.isNew && (
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg shadow-green-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                            <Sparkles className="w-3 h-3 mr-1" />
                            New
                          </Badge>
                        )}
                        {shop.isTrending && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-pink-600 text-white border-0 shadow-lg shadow-orange-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        {shop.isFeatured && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-0 shadow-lg shadow-yellow-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                            <Crown className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>

                      {/* Distance Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          <MapPin className="w-3 h-3 mr-1" />
                          {shop.distance}
                        </Badge>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute bottom-4 right-4">
                        <Badge className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-0 px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          {shop.rating}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                        {shop.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {shop.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {shop.reviewCount} reviews
                        </span>
                        <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile View All Button */}
              <div className="text-center mt-6 md:hidden">
                <Button
                  onClick={() => handleNavigate("categories")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 py-5 text-sm font-semibold shadow-lg shadow-blue-500/30"
                >
                  {t("viewAll")}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </section>

          {/* Latest Ads - Premium Cards */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                    {t("latestAds")}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-500 fill-purple-500" />
                    {t("freshDeals")}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigate("advertisements")}
                  className="hidden md:flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl px-4 py-2"
                >
                  {t("viewAll")}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Premium Ad Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {featuredAds.map((ad) => (
                  <div
                    key={ad.id}
                    onClick={() => handleNavigate("ad-detail", { ad })}
                    className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-gray-300/50 dark:hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  >
                    {/* Image with Gradient Overlay */}
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Featured Badge */}
                      {ad.isFeatured && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 shadow-lg shadow-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                            <Crown className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}

                      {/* Price Tag */}
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-0 px-4 py-2 rounded-xl text-base font-bold shadow-lg">
                          {ad.price}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-0 px-3 py-1 rounded-lg text-xs font-semibold">
                          {ad.category}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {ad.postedDate}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                        {ad.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {ad.location}
                        </span>
                        <ChevronRight className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile View All Button */}
              <div className="text-center mt-6 md:hidden">
                <Button
                  onClick={() => handleNavigate("advertisements")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-6 py-5 text-sm font-semibold shadow-lg shadow-purple-500/30"
                >
                  {t("viewAll")}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </section>

          {/* Emergency Numbers - Premium Pastel Design */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-pink-950/20">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  {t("emergencyNumbers")}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  {t("tapToCall")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {emergencyContacts.map((contact) => (
                  <a
                    key={contact.id}
                    href={`tel:${contact.number}`}
                    className="group relative flex items-center gap-4 sm:gap-5 p-5 sm:p-6 md:p-7 bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-gray-300/50 transition-all hover:-translate-y-2 active:scale-95 overflow-hidden"
                  >
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Icon with Gradient */}
                    <div
                      className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${contact.color} rounded-2xl sm:rounded-3xl flex items-center justify-center text-3xl sm:text-4xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                    >
                      {contact.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-1 truncate">
                        {contact.name}
                      </p>
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-400 dark:to-pink-400 bg-clip-text text-transparent">
                        {contact.number}
                      </p>
                    </div>

                    <Phone className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:rotate-12 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Places to Visit - Premium Cards */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-[#F7F9FC] dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  Places to Visit
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500 fill-blue-500" />
                  Popular tourist spots
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
                {nearbyPlaces.map((place) => (
                  <div
                    key={place.id}
                    onClick={() => handleNavigate("detail", { listing: place })}
                    className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-gray-300/50 dark:hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  >
                    {/* Large Image with Gradient Overlay */}
                    <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* Distance Badge */}
                      <div className="absolute top-6 right-6">
                        <Badge className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          <MapPin className="w-4 h-4 mr-1.5" />
                          {place.distance}
                        </Badge>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <Badge className="bg-blue-500/20 backdrop-blur-sm text-white border border-blue-400/30 px-3 py-1 rounded-lg text-xs font-semibold mb-3">
                          {place.type}
                        </Badge>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                          {place.name}
                        </h3>
                        <div className="flex items-center gap-3">
                          <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl px-4 py-2 text-sm font-semibold shadow-lg group-hover:scale-105 transition-transform">
                            Explore
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                          <button className="p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-colors">
                            <Heart className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8 sm:mt-10">
                <Button
                  onClick={() =>
                    handleNavigate("subcategory", {
                      categoryId: "tourism",
                      categoryName: "Tourism",
                    })
                  }
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-2xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all hover:scale-105"
                >
                  Explore More Places
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </ScrollArea>

      {/* Premium Floating Add Button */}
      <FloatingAddButton />

      {/* Quick Add Dialog */}
      <QuickAddDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}
