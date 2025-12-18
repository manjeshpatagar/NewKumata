"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, User, Star, Crown, MapPin } from "lucide-react";

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
import { BottomNav } from "@/components/BottomNav";

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

  /* ======================================================
     ADS — BADGE BASED
  ====================================================== */
  const badgeAds = advertisements.filter((ad: any) => {
    return !!ad.badges || ad.featured === true || ad.sponsored === true;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /* ======================================================
     SHOPS — BADGE BASED (IMAGE PRESENT)
  ====================================================== */
  const badgeShops = shops.filter((shop: any) => {
    return !!shop.badges;
  });

  /* ======================================================
     CATEGORIES — BUSINESS ONLY
  ====================================================== */
  useEffect(() => {
    async function loadCategories() {
      const res = await categoryApi.getAll();

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
    <div className="h-screen flex flex-col bg-[#F7F9FC] dark:bg-[#0B0F1A]">
      <div style={{ padding: "10px" }}>
        {" "}
        <SmartSearchBarWithImages placeholder={t("searchPlaceholder")} />
      </div>

      <div>
        {" "}
        <WeatherWidget />
      </div>

      {/* CONTENT */}
      <ScrollArea className="flex-1">
        <div className="pb-28">
          {/* BANNER */}
          <section className="py-6 bg-white dark:bg-[#0F172A]">
            <BannerCarousel />
          </section>

          {/* CATEGORIES */}
          {categories.length > 0 && (
            <section className="py-10">
              <h2 className="text-2xl font-bold px-4 mb-6 text-gray-900 dark:text-gray-100">
                {t("browseServices")}
              </h2>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 px-4">
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => router.push(`/explore/${cat._id}`)}
                    className="flex flex-col items-center gap-2"
                  >
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-900 dark:text-gray-100">
                        {cat.name?.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* SHOPS */}
          {badgeShops.length > 0 && (
            <section className="py-10 bg-[#F7F9FC] dark:bg-[#0B0F1A]">
              <h2 className="text-2xl font-bold px-4 mb-6 text-gray-900 dark:text-gray-100">
                {t("topRatedShops")}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {badgeShops.map((shop) => {
                  const img = shop.thumbnail || shop.images?.[0];

                  // ✅ TITLE
                  const title =
                    shop.contact?.ownerName ||
                    shop.name ||
                    shop.title ||
                    "Unnamed Shop";

                  // ✅ PLACE / LOCATION (SAFE)
                  const place =
                    shop.location ||
                    shop.address ||
                    shop.area ||
                    shop.city ||
                    " ";

                  return (
                    <div
                      key={shop._id}
                      onClick={() => router.push(`/listing/${shop._id}`)}
                      className="bg-white dark:bg-[#111827] rounded-3xl shadow-lg overflow-hidden cursor-pointer"
                    >
                      {img ? (
                        <img
                          src={img}
                          alt={title}
                          className="w-full h-52 object-cover"
                        />
                      ) : (
                        <div className="w-full h-52 bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-100">
                          {title.charAt(0)}
                        </div>
                      )}

                      <div className="p-4">
                        <Badge className="bg-yellow-500 mb-2">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>

                        {/* TITLE */}
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">
                          {title}
                        </h3>

                        {place && (
                          <div className="mt-2 flex items-center gap-1.5 text-sm text-black dark:text-gray-300">
                            <MapPin className="w-4 h-4 text-black dark:text-gray-400" />
                            <span className="truncate">{place}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ADS */}
          {badgeAds.length > 0 && (
            <section className="py-10 bg-white dark:bg-[#0F172A]">
              <h2 className="text-2xl font-bold px-4 mb-6 text-gray-900 dark:text-gray-100">
                {t("latestAds")}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {badgeAds.map((ad) => {
                  const img = ad.images?.[0];

                  return (
                    <div
                      key={ad._id}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/ads/${ad._id}`);
                      }}
                      className="bg-white dark:bg-[#111827] rounded-3xl shadow-lg overflow-hidden cursor-pointer"
                    >
                      {img ? (
                        <img
                          src={img}
                          alt={ad.title}
                          className="w-full h-52 object-cover"
                        />
                      ) : (
                        <div className="w-full h-52 bg-purple-200 dark:bg-purple-800 flex items-center justify-center font-bold text-white">
                          {ad.title?.charAt(0)}
                        </div>
                      )}

                      <div className="p-4">
                        <Badge className="bg-purple-600 mb-2">
                          <Crown className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>

                        <h3 className="font-bold text-gray-900 dark:text-gray-100">
                          {ad.title}
                        </h3>

                        {ad.location && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
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

          {/* EMERGENCY */}
          <section className="py-10 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
            <h2 className="text-2xl font-bold px-4 mb-6 text-gray-900 dark:text-gray-100">
              {t("emergencyNumbers") || "Emergency Contacts"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              {/* POLICE */}
              <a
                href="tel:100"
                className="group bg-white dark:bg-[#111827] rounded-3xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-all active:scale-95"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                  🚓
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Police
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    100
                  </p>
                </div>
                <Badge className="bg-green-600 text-white">Call</Badge>
              </a>

              {/* AMBULANCE */}
              <a
                href="tel:108"
                className="group bg-white dark:bg-[#111827] rounded-3xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-all active:scale-95"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center text-white shadow-lg">
                  🚑
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Ambulance
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    108
                  </p>
                </div>
                <Badge className="bg-green-600 text-white">Call</Badge>
              </a>

              {/* FIRE */}
              <a
                href="tel:101"
                className="group bg-white dark:bg-[#111827] rounded-3xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-all active:scale-95"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-lg">
                  🚒
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Fire Service
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    101
                  </p>
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
