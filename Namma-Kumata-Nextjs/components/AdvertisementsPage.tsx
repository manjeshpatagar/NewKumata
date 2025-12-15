"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Plus,
  MapPin,
  Calendar,
  Heart,
  Phone,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { BrandingBanners } from "./BrandingBanners";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useFavorites } from "../contexts/FavoritesContext";
import { toast } from "sonner";
import { favouriteApi } from "@/lib/api/favouriteApi";

export function AdvertisementsPage({
  initialCategories,
  initialAdvertisment,
}: {
  initialCategories: any[];
  initialAdvertisment: any[];
}) {
  const router = useRouter();
  const { t } = useLanguage();
  const { isAuthenticated, isGuest } = useAuth();
  const { isFavorite, toggleFavorite, getFavouriteId, removeFavorite } =
    useFavorites();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* --------------------------
      CATEGORY LIST
  --------------------------- */
  const categories = [
    { id: "all", label: t("all") },
    ...initialCategories.map((cat) => ({
      id: cat._id,
      label: cat.name,
    })),
  ];

  /* --------------------------
      FILTERING
  --------------------------- */
  const filteredAds = initialAdvertisment.filter((ad) => {
    const matchesCategory =
      selectedCategory === "all" || ad.category?._id === selectedCategory;

    const matchesSearch =
      searchQuery === "" ||
      ad.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  /* --------------------------
      FEATURED ADS
  --------------------------- */
  const featuredAds = initialAdvertisment.filter(
    (ad) => ad.badges === "featured"
  );

  /* --------------------------
      Category Info
  --------------------------- */
  const getCategoryInfo = (categoryId: string) =>
    initialCategories.find((cat) => cat._id === categoryId);

  /* --------------------------
      FAVOURITE HANDLER
  --------------------------- */
  const handleFavoriteToggle = async (ad: any) => {
    if (!isAuthenticated && !isGuest) {
      toast.info("Please login to add favourites");
      router.push("/auth/login");
      return;
    }

    const refId = ad._id;
    const liked = isFavorite(refId);

    try {
      if (!liked) {
        // ⭐ ADD favourite
        const res = await favouriteApi.addAdvertisement(refId);

        const favouriteId = res.data?.data?._id;
        if (!favouriteId) return toast.error("Favourite ID missing");

        toggleFavorite({
          favouriteId,
          refId,
          type: "ad",
          data: ad,
        });

        toast.success("Added to favourites");
      } else {
        // ⭐ REMOVE favourite
        const favouriteId = getFavouriteId(refId);
        if (!favouriteId) return toast.error("Favourite not found");

        await favouriteApi.remove(favouriteId);

        removeFavorite(favouriteId);

        toast.success("Removed from favourites");
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Something went wrong");
    }
  };

  /* --------------------------
      Ad Card Component
  --------------------------- */
  const AdCard = ({ ad }: { ad: any }) => {
    const categoryInfo = getCategoryInfo(ad.category?._id);
    const liked = isFavorite(ad._id);

    return (
      <Card
        className="relative group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border hover:shadow-lg transition-all"
        onClick={() => {
          sessionStorage.setItem("currentAd", JSON.stringify(ad));
          router.push(`/ads/${ad._id}`);
        }}
      >
        {ad.sponsored && (
          <div className="bg-yellow-500 px-3 py-1 text-white text-xs">
            ⭐ {t("sponsored")}
          </div>
        )}

        {ad.images?.length > 0 && (
          <div className="relative h-40">
            <ImageWithFallback
              src={ad.images[0]}
              alt={ad.title}
              className="w-full h-full object-cover"
            />

            {ad.featured && !ad.sponsored && (
              <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                {t("featured")}
              </Badge>
            )}
          </div>
        )}

        <div className="p-3">
          <Badge variant="secondary" className="absolute top-2 right-2 bg-yellow-500 text-white">
            {categoryInfo?.name}
          </Badge>
          <Badge variant="secondary" className="mb-2 text-xs bg-blue-500 text-white">
            {ad.badges}
          </Badge>

          <h3 className="line-clamp-1 font-medium">{ad.title}</h3>

          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {ad.description}
          </p>

          <p className="text-blue-600 font-semibold">
            {ad.price || "Contact for details"}
          </p>

          <p className="text-xs text-gray-500 flex items-center gap-2 mt-2">
            <MapPin className="w-3 h-3" /> {ad.location}
            <span>•</span>
            <Calendar className="w-3 h-3" />
            {new Date(ad.createdAt).toLocaleDateString()}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <Button
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/ads/${ad._id}`);
              }}
            >
              {t("viewDetails")}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteToggle(ad);
              }}
            >
              <Heart
                className={`w-4 h-4 ${
                  liked ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`tel:${ad.phone}`);
              }}
            >
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  /* --------------------------
      LATEST ADS (for banner)
  --------------------------- */
  const latestAds = [...initialAdvertisment]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto bg-white dark:bg-gray-950">
      {/* HEADER */}
      <div className="p-4 border-b bg-white dark:bg-gray-900 sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex-1">
            <h1 className="text-xl">{t("advertisements")}</h1>
            <p className="text-xs text-gray-500">
              {filteredAds.length} {t("adsAvailable")}
            </p>
          </div>

          <Button
            className="bg-blue-600"
            onClick={() => router.push("/add-advertisement")}
          >
            <Plus className="w-4 h-4 mr-1" /> {t("postAd")}
          </Button>
        </div>

        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={t("searchAds")}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* CATEGORIES */}
        <div className="mt-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                className="cursor-pointer text-xs px-3 py-2"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <ScrollArea className="flex-1">
        <div className="pb-24">
          {/* BANNERS */}
          <div className="p-4">
            <BrandingBanners latestAds={latestAds} />
          </div>

          {/* FEATURED */}
          {/* {featuredAds.length > 0 && (
            <div className="px-4 mb-6">
              <h2 className="text-lg mb-3">🔥 {t("featuredAds")}</h2>

              <Carousel>
                <CarouselContent>
                  {featuredAds.map((ad) => (
                    <CarouselItem key={ad._id}>
                      <AdCard ad={ad} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )} */}

          {/* ALL ADS */}
          <div className="px-4">
            <h2 className="text-lg mb-4">{t("allAdvertisements")}</h2>

            {filteredAds.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                {t("noAdsFound")}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAds.map((ad) => (
                  <AdCard key={ad._id} ad={ad} />
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
