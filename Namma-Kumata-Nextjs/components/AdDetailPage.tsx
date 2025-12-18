"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  Share2,
  Heart,
  MapPin,
  MessageCircle,
  Copy,
  Facebook,
  Twitter,
  Star,
  ChevronLeft,
  ChevronRight,
  Mail,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useFavorites } from "../contexts/FavoritesContext";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { useState } from "react";
import { favouriteApi } from "@/lib/api/favouriteApi";

interface AdDetailPageProps {
  ad: any;
  moreAds: any[];
}

export function AdDetailPage({ ad, moreAds }: AdDetailPageProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite, getFavouriteId, removeFavorite } =
    useFavorites();
  const { isAuthenticated, isGuest } = useAuth();

  const [showShareMenu, setShowShareMenu] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = ad.images || [];
  const video = ad.video || null;

  // ✅ ADDED (visibility fix)
  const phone = ad?.contactinfo?.phone;
  const whatsapp = ad?.contactinfo?.whatsapp;
  const email = ad?.contactinfo?.email;


  /* -------------------------
       FAVORITE HANDLER
  ---------------------------- */
  const handleFavoriteClick = async () => {
    if (!isAuthenticated && !isGuest) {
      toast.info("Please login to add favourites");
      router.push("/auth/login");
      return;
    }

    const refId = ad._id;

    try {
      if (!isFavorite(refId)) {
        const res = await favouriteApi.addAdvertisement(refId);
        const favouriteId = res.data?.data?._id || res.data?._id;
        if (!favouriteId) return toast.error("Failed to add favourite");

        toggleFavorite({
          favouriteId,
          refId,
          type: "ad",
          data: ad,
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

  /* -------------------------
       CONTACT
  ---------------------------- */
  const handleCall = () => {
    if (!phone) return toast.error("Phone number not available");
    window.open(`tel:${phone}`);
  };
  const handleEmail = () => {
    if (!email) return toast.error("Email not available");
    window.open(`mailto:${email}?subject=Regarding ${ad.title}`);
  };
  const handleWhatsApp = () => {
    const number = whatsapp || phone;
    if (!number) return toast.error("WhatsApp number not available");

    const msg = encodeURIComponent(
      `Hi! I'm interested in your ad: ${ad.title}`
    );
    window.open(`https://wa.me/${number.replace(/\D/g, "")}?text=${msg}`);
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-950">
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 py-4 border-b dark:border-gray-800 bg-white dark:bg-gray-900 relative">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="font-medium text-gray-900 dark:text-white">
          Ad Details
        </h1>

        <div className="flex gap-5">
          <button onClick={handleFavoriteClick}>
            <Heart
              className={`w-6 h-6 ${isFavorite(ad._id)
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
                }`}
            />
          </button>

          <button onClick={() => setShowShareMenu((prev) => !prev)}>
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* BODY */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ================= LEFT : MAIN AD ================= */}
            <div className="lg:col-span-2">
              {/* MEDIA */}
              <div className="relative h-64 sm:h-80 md:h-96 bg-gray-200 dark:bg-gray-900 rounded-xl overflow-hidden">
                {video ? (
                  <video src={video} controls className="w-full h-full object-cover" />
                ) : images.length > 0 ? (
                  <>
                    <ImageWithFallback
                      src={images[currentImageIndex]}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />

                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setCurrentImageIndex(
                              currentImageIndex === 0
                                ? images.length - 1
                                : currentImageIndex - 1
                            )
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                        >
                          <ChevronLeft />
                        </button>

                        <button
                          onClick={() =>
                            setCurrentImageIndex(
                              currentImageIndex === images.length - 1
                                ? 0
                                : currentImageIndex + 1
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                        >
                          <ChevronRight />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No Media
                  </div>
                )}
              </div>

              {/* DETAILS */}
              <div
                className={`
    mt-4 space-y-4 rounded-2xl p-4 sm:p-6 bg-white dark:bg-gray-900
    border transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px]
    ${ad.badges === "featured"
                    ? "border-transparent bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-pink-400/20"
                    : "border-gray-200 dark:border-gray-800"
                  }
  `}
              >
                {/* TITLE + PRICE */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {ad.title}
                  </h2>

                  {ad.price && (
                    <span className="shrink-0 bg-blue-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                      {ad.price}
                    </span>
                  )}
                </div>

                {/* BADGES */}
                <div className="flex gap-2 flex-wrap">
                  <Badge className="bg-blue-600 text-white">
                    {ad.category?.name}
                  </Badge>

                  {ad.badges === "featured" && (
                    <Badge className="bg-yellow-500 text-white flex items-center gap-1">
                      <Star className="w-3 h-3" /> Featured
                    </Badge>
                  )}
                </div>

                {/* DIVIDER */}
                <div className="border-t border-gray-200 dark:border-gray-800" />

                {/* DESCRIPTION */}
                <p className="text-gray-700 dark:text-gray-300 break-words whitespace-pre-line overflow-hidden leading-relaxed">
                  {ad.description}
                </p>

                {/* DIVIDER */}
                <div className="border-t border-gray-200 dark:border-gray-800" />

                {/* LOCATION */}
                <p className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4" />
                  {ad.location}
                </p>
              </div>


              {/* CONTACT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {phone && (
                  <button
                    onClick={handleCall}
                    className="bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call: {phone}
                  </button>
                )}

                {(whatsapp || phone) && (
                  <button
                    onClick={handleWhatsApp}
                    className="bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                )}
                {email && (
                  <button
                    onClick={handleEmail}
                    className="bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                )}
              </div>

              {/* ================= MOBILE : MORE ADS ================= */}
              {moreAds.length > 0 && (
                <div className="mt-8 lg:hidden">
                  <h3 className="text-lg font-semibold mb-3">More Ads</h3>
                  <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                    {moreAds.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => router.push(`/ads/${item._id}`)}
                        className="min-w-[220px] border rounded-xl overflow-hidden cursor-pointer"
                      >
                        <ImageWithFallback
                          src={item.images?.[0]}
                          alt={item.title}
                          className="h-32 w-full object-cover"
                        />
                        <div className="p-2">
                          <p className="font-medium text-sm line-clamp-1">
                            {item.title}
                          </p>
                          <p className="text-blue-600 text-sm">
                            {item.price || "Contact"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ================= DESKTOP : MORE ADS ================= */}
            {moreAds.length > 0 && (
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <h3 className="text-lg font-semibold mb-4">More Ads</h3>
                  <div className="space-y-4">
                    {moreAds.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => router.push(`/ads/${item._id}`)}
                        className="border rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition"
                      >
                        <ImageWithFallback
                          src={item.images?.[0]}
                          alt={item.title}
                          className="h-36 w-full object-cover"
                        />
                        <div className="p-3">
                          <p className="font-medium line-clamp-1">
                            {item.title}
                          </p>
                          <p className="text-blue-600 text-sm">
                            {item.price || "Contact"}
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
