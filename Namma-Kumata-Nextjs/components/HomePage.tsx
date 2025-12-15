"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  User,
  Star,
  Crown,
  MapPin,
} from "lucide-react";

import { categoryApi } from "@/lib/api/categoryApi";
import { WeatherWidget } from "@/components/WeatherWidget";
import { EmergencyContactCard } from "@/components/EmergencyContactCard";
import { LanguageSelector } from "@/components/LanguageSelector";
import { BannerCarousel } from "@/components/BannerCarousel";
import { FloatingAddButton } from "@/components/FloatingAddButton";
import { QuickAddDialog } from "@/components/QuickAddDialog";
import { NammaKumtaLogo } from "@/components/NammaKumtaLogo";
import { SmartSearchBarWithImages } from "@/components/SmartSearchBarWithImages";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

import { useLanguage } from "@/contexts/LanguageContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";

interface HomePageProps {
  advertisements: any[];
  shops: any[];
}

export function HomePage({ advertisements, shops }: HomePageProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const { unreadCount } = useNotifications();
  const { requireAuth } = useRequireAuth();

  const [categories, setCategories] = useState<any[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  /* ======================================================
     🔍 DEBUG — RAW PROPS
  ====================================================== */
  console.log("🟢 HOME PAGE PROPS ADS:", advertisements);
  console.log("🟢 HOME PAGE PROPS SHOPS:", shops);

  /* ======================================================
     ADS — BADGE BASED
  ====================================================== */
  const badgeAds = advertisements.filter(
    (ad: any) =>
      ad.featured === true ||
      ad.isFeatured === true ||
      ad.sponsored === true ||
      ad.badge === true ||
      Array.isArray(ad.images) // fallback so ads show
  );

  console.log("⭐ BADGE ADS:", badgeAds);

  /* ======================================================
     SHOPS — BADGE BASED (IMAGE PRESENT)
  ====================================================== */
  const badgeShops = shops.filter(
    (shop: any) =>
      !!shop.thumbnail ||
      (Array.isArray(shop.images) && shop.images.length > 0)
  );

  console.log("⭐ BADGE SHOPS:", badgeShops);

  /* ======================================================
     CATEGORIES — BUSINESS ONLY
  ====================================================== */
  useEffect(() => {
    async function loadCategories() {
      const res = await categoryApi.getAll();
      console.log("📦 CATEGORY API RAW:", res);

      const list = res?.data || res || [];
      const businessOnly = list.filter(
        (cat: any) => cat.type === "business" && cat.isActive !== false
      );

      setCategories(businessOnly);
    }

    loadCategories();
  }, []);

  /* ======================================================
     NAVIGATION
  ====================================================== */
  const go = (path: string, data?: any) => {
    if (data) {
      sessionStorage.setItem("currentData", JSON.stringify(data));
    }
    router.push(path);
  };

  /* ======================================================
     RENDER
  ====================================================== */
  return (
    <div className="h-screen flex flex-col bg-[#F7F9FC]">

      {/* HEADER */}
      <header className="bg-white/90 backdrop-blur border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <NammaKumtaLogo size="sm" />

            <div className="flex items-center gap-2">
              <LanguageSelector />

              <button
                onClick={() =>
                  requireAuth(
                    () => go("/notifications"),
                    () => go("/auth/login")
                  )
                }
                className="relative w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center"
              >
                <Bell />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() =>
                  requireAuth(
                    () => go("/profile"),
                    () => go("/auth/login")
                  )
                }
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white"
              >
                <User />
              </button>
            </div>
          </div>

          <SmartSearchBarWithImages placeholder={t("searchPlaceholder")} />
        </div>

        <WeatherWidget />
      </header>

      {/* CONTENT */}
      <ScrollArea className="flex-1">
        <div className="pb-28">

          {/* BANNER */}
          <section className="py-6 bg-white">
            <BannerCarousel />
          </section>

          {/* CATEGORIES */}
          {categories.length > 0 && (
            <section className="py-10">
              <h2 className="text-2xl font-bold px-4 mb-6">
                {t("browseServices")}
              </h2>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 px-4">
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() =>
                      go(
                        `/subcategory?categoryId=${cat._id}&categoryName=${cat.name}`
                      )
                    }
                    className="flex flex-col items-center gap-2"
                  >
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gray-200 flex items-center justify-center font-bold">
                        {cat.name?.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm font-medium">{cat.name}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* SHOPS */}
          {badgeShops.length > 0 && (
            <section className="py-10 bg-[#F7F9FC]">
              <h2 className="text-2xl font-bold px-4 mb-6">
                {t("topRatedShops")}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {badgeShops.map((shop) => {
                  const img = shop.thumbnail || shop.images?.[0];

                  return (
                    <div
                      key={shop._id}
                      onClick={() => go("/detail", shop)}
                      className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer"
                    >
                      {img ? (
                        <img
                          src={img}
                          alt={shop.name}
                          className="w-full h-52 object-cover"
                        />
                      ) : (
                        <div className="w-full h-52 bg-gray-200 flex items-center justify-center font-bold">
                          {shop.name?.charAt(0)}
                        </div>
                      )}

                      <div className="p-4">
                        <Badge className="bg-yellow-500 mb-2">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                        <h3 className="font-bold">{shop.name}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ADS — FIXED */}
          {badgeAds.length > 0 && (
            <section className="py-10 bg-white">
              <h2 className="text-2xl font-bold px-4 mb-6">
                {t("latestAds")}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {badgeAds.map((ad) => {
                  console.log("🟡 RENDERING AD:", ad);
                  console.log("🟡 AD IMAGES:", ad.images);

                  const img = ad.images?.[0];

                  return (
                    <div
                      key={ad._id}
                      onClick={() => go("/ad-detail", ad)}
                      className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer"
                    >
                      {img ? (
                        <img
                          src={img}
                          alt={ad.title}
                          className="w-full h-52 object-cover"
                          onError={() =>
                            console.error("❌ IMAGE FAILED:", img)
                          }
                        />
                      ) : (
                        <div className="w-full h-52 bg-purple-200 flex items-center justify-center font-bold text-white">
                          {ad.title?.charAt(0)}
                        </div>
                      )}

                      <div className="p-4">
                        <Badge className="bg-purple-600 mb-2">
                          <Crown className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>

                        <h3 className="font-bold">{ad.title}</h3>

                        {ad.location && (
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {ad.location}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

         {/* ===================== EMERGENCY (INLINE UI) ===================== */}
<section className="py-10 bg-gradient-to-br from-red-50 to-orange-50">
  <h2 className="text-2xl font-bold px-4 mb-6 text-gray-900">
    {t("emergencyNumbers") || "Emergency Contacts"}
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
    {/* POLICE */}
    <a
      href="tel:100"
      className="group bg-white rounded-3xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-all active:scale-95"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
        🚓
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">Police</p>
        <p className="text-2xl font-bold text-gray-900">100</p>
      </div>
      <Badge className="bg-green-600 text-white">Call</Badge>
    </a>

    {/* AMBULANCE */}
    <a
      href="tel:108"
      className="group bg-white rounded-3xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-all active:scale-95"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center text-white shadow-lg">
        🚑
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">Ambulance</p>
        <p className="text-2xl font-bold text-gray-900">108</p>
      </div>
      <Badge className="bg-green-600 text-white">Call</Badge>
    </a>

    {/* FIRE */}
    <a
      href="tel:101"
      className="group bg-white rounded-3xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-all active:scale-95"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-lg">
        🚒
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">Fire Service</p>
        <p className="text-2xl font-bold text-gray-900">101</p>
      </div>
      <Badge className="bg-green-600 text-white">Call</Badge>
    </a>
  </div>
</section>

        </div>
      </ScrollArea>

      <FloatingAddButton />
      <QuickAddDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}
