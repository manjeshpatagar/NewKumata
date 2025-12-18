"use client";

import { useState, useMemo } from "react";
import {
  ArrowLeft,
  Star,
  Phone,
  Mail,
  Clock,
  MapPin,
  Share2,
  Heart,
  MessageCircle,
  Copy,
} from "lucide-react";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import { useFavorites } from "../contexts/FavoritesContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { getReviews } from "../lib/mockListingsData";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { favouriteApi } from "@/lib/api/favouriteApi";

interface DetailPageProps {
  listing: any;
  moreShops: any[];
}

export function DetailPage({ listing, moreShops }: DetailPageProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite, getFavouriteId, removeFavorite } =
    useFavorites();
  const { t, language } = useLanguage();
  const { isAuthenticated, isGuest } = useAuth();

  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!listing) {
    return (
      <div className="p-6 text-center text-gray-500">
        Listing not found.
      </div>
    );
  }

  const images = listing.images || [listing.image];
  const refId = listing._id;
  const favorited = isFavorite(refId);
  const reviews = getReviews(language);

  /* ================= RELATED SHOPS ================= */

  const relatedShops = useMemo(() => {
    const currentSubCatId = listing.subCategoryId?._id;
    return (moreShops || []).filter(
      (shop) =>
        shop._id !== listing._id &&
        shop.subCategoryId?._id === currentSubCatId
    );
  }, [moreShops, listing]);

  /* ================= FAVORITE ================= */

  const handleFavoriteClick = async () => {
    if (!isAuthenticated && !isGuest) {
      toast.info("Please login to add favourites");
      router.push("/auth/login");
      return;
    }

    try {
      if (!favorited) {
        const res = await favouriteApi.addProduct(refId);
        const favouriteId = res.data?.data?._id;
        if (!favouriteId) return toast.error("Favourite ID missing");

        toggleFavorite({
          favouriteId,
          refId,
          type: "listing",
          data: listing,
        });

        toast.success("Added to favourites");
      } else {
        const favouriteId = getFavouriteId(refId);
        if (!favouriteId) return toast.error("Favourite not found");

        await favouriteApi.remove(favouriteId);
        removeFavorite(favouriteId);

        toast.success("Removed from favourites");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  /* ================= SHARE ================= */

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out ${listing.shopName} on Namma Kumta!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied!");
    setShowShareMenu(false);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-gray-950">
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900 sticky top-0 z-40">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={handleFavoriteClick}>
            <Heart
              className={`w-5 h-5 transition ${
                favorited
                  ? "fill-red-500 text-red-500 scale-110"
                  : "hover:text-red-400"
              }`}
            />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowShareMenu(!showShareMenu)}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {showShareMenu && (
          <div className="absolute top-14 right-4 bg-white rounded-xl shadow border p-2 z-50">
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(
                    shareText + " " + shareUrl
                  )}`
                )
              }
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              WhatsApp
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg"
            >
              <Copy className="w-5 h-5 text-gray-600" />
              Copy Link
            </button>
          </div>
        )}
      </div>

      {/* BODY */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT */}
            <div className="lg:col-span-2">
              {/* IMAGES */}
              <Carousel className="rounded-2xl overflow-hidden shadow-lg">
                <CarouselContent>
                  {images.map((img: string, i: number) => (
                    <CarouselItem key={i}>
                      <ImageWithFallback
                        src={img}
                        className="w-full h-64 sm:h-80 md:h-96 object-cover"
                        alt={listing.shopName}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>

              <div className="p-4">
                {/* TITLE */}
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {listing.shopName}
                </h1>

                <Badge className="mt-2 bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                  {listing.subCategoryId?.name}
                </Badge>

                {/* RATING */}
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {listing.rating}
                  </span>
                  <span>({listing.reviewCount} reviews)</span>
                </div>

                {/* ABOUT */}
                <Card className="p-5 mt-5">
                  <h3 className="font-semibold text-lg mb-2">
                    {t("about")}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {listing.description?.length > 200 && !showFullDescription
                      ? `${listing.description.slice(0, 200)}...`
                      : listing.description}
                  </p>

                  {listing.description?.length > 200 && (
                    <button
                      onClick={() => setShowFullDescription((p) => !p)}
                      className="mt-2 text-sm font-medium text-blue-600 hover:underline"
                    >
                      {showFullDescription ? t("showLess") : t("showMore")}
                    </button>
                  )}
                </Card>

                {/* CONTACT */}
                <Card className="p-5 mt-4">
                  <h3 className="font-semibold text-lg mb-3">
                    {t("contactInformation")}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {listing.contact?.phone && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span>{listing.contact.phone}</span>
                      </div>
                    )}

                    {listing.contact?.email && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                        <Mail className="w-4 h-4 text-purple-600" />
                        <span>{listing.contact.email}</span>
                      </div>
                    )}

                    {listing.openingHours?.open && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span>{listing.openingHours.open}</span>
                      </div>
                    )}

                    {listing.address && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span className="line-clamp-1">{listing.address}</span>
                      </div>
                    )}
                  </div>
                </Card>

                {/* REVIEWS */}
                <h3 className="font-semibold text-lg mt-6 mb-3">
                  {t("reviews")} ({listing.reviewCount})
                </h3>

                {reviews.map((r) => (
                  <Card key={r.id} className="p-4 mb-3">
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {r.comment}
                    </p>
                  </Card>
                ))}
              </div>
               {/* MOBILE : RELATED */}
                {relatedShops.length > 0 && (
                  <div className="mt-8 lg:hidden">
                    <h3 className="text-lg font-semibold mb-3">
                      More {listing.subCategoryId?.name}
                    </h3>

                    <div className="flex gap-4 overflow-x-auto">
                      {relatedShops.map((shop) => (
                        <div
                          key={shop._id}
                          onClick={() =>
                            router.push(`/listing/${shop._id}`)
                          }
                          className="min-w-[220px] border rounded-xl cursor-pointer"
                        >
                          <ImageWithFallback
                            src={shop.images?.[0] || shop.image}
                            className="h-32 w-full object-cover"
                          />
                          <div className="p-2">
                            <p className="font-medium line-clamp-1">
                              {shop.shopName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {shop.subCategoryId?.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* DESKTOP RELATED */}
            {relatedShops.length > 0 && (
              <div className="hidden lg:block">
                <div className="sticky top-28">
                  <h3 className="text-lg font-semibold mb-4">
                    More {listing.subCategoryId?.name}
                  </h3>

                  <div className="space-y-4">
                    {relatedShops.map((shop) => (
                      <div
                        key={shop._id}
                        onClick={() => router.push(`/listing/${shop._id}`)}
                        className="border rounded-xl cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                      >
                        <ImageWithFallback
                          src={shop.images?.[0] || shop.image}
                          className="h-32 w-full object-cover"
                        />
                        <div className="p-3">
                          <p className="font-medium line-clamp-1">
                            {shop.shopName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {shop.subCategoryId?.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
