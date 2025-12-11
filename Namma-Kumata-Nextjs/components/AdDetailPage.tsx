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
}

export function AdDetailPage({ ad }: AdDetailPageProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite, getFavouriteId, removeFavorite } =
    useFavorites();
  const { isAuthenticated, isGuest } = useAuth();

  const [showShareMenu, setShowShareMenu] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = ad.images || [];
  const video = ad.video || null;

  /* -------------------------
       FAVORITE HANDLER
  ---------------------------- */
  // const handleFavoriteClick = async () => {
  //   if (!isAuthenticated && !isGuest) {
  //     toast.info("Please login to add favourites");
  //     router.push("/auth/login");
  //     return;
  //   }

  //   const refId = ad._id;

  //   try {
  //     if (!isFavorite(refId)) {
  //       // ⭐ ADD Favourite (Advertisement)
  //       const res = await favouriteApi.addAdvertisement(refId);

  //       const favouriteId = res.data?._id; // backend favourite _id

  //       toggleFavorite({
  //         favouriteId,
  //         refId,
  //         type: "ad",
  //         data: ad,
  //       });

  //       toast.success("Added to favourites");
  //     } else {
  //       // ⭐ REMOVE Favourite
  //       const favouriteId = getFavouriteId(refId);
  //       if (!favouriteId) return toast.error("Favourite not found");

  //       await favouriteApi.remove(favouriteId);

  //       toggleFavorite({
  //         favouriteId,
  //         refId,
  //         type: "ad",
  //         data: ad,
  //       });

  //       toast.success("Removed from favourites");
  //     }
  //   } catch (error: any) {
  //     toast.error(error?.response?.data?.message || "Something went wrong");
  //   }
  // };

  const handleFavoriteClick = async () => {
    if (!isAuthenticated && !isGuest) {
      toast.info("Please login to add favourites");
      router.push("/auth/login");
      return;
    }

    const refId = ad._id;

    try {
      if (!isFavorite(refId)) {
        // ⭐ ADD Favourite (Advertisement)
        const res = await favouriteApi.addAdvertisement(refId);

        const favouriteId = res.data?.data?._id || res.data?._id;

        if (!favouriteId) {
          return toast.error("Failed to add favourite");
        }

        // UI update
        toggleFavorite({
          favouriteId,
          refId,
          type: "ad",
          data: ad,
        });

        toast.success("Added to favourites");
      } else {
        // ⭐ REMOVE Favourite
        const favouriteId = getFavouriteId(refId);
        if (!favouriteId) return toast.error("Favourite not found");

        await favouriteApi.remove(favouriteId);

        // ⭐ IMPORTANT: use removeFavorite, NOT toggleFavorite
        removeFavorite(favouriteId);

        toast.success("Removed from favourites");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  /* -------------------------
       SHARE & CONTACT HANDLERS
  ---------------------------- */

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${ad.title} - Found on Namma Kumta`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied!");
    setShowShareMenu(false);
  };

  const handleCall = () => {
    if (ad.phone) window.open(`tel:${ad.phone}`);
  };

  const handleWhatsApp = () => {
    const phone = ad.whatsapp || ad.phone;
    if (!phone) return toast.error("No WhatsApp number available");

    const msg = encodeURIComponent(
      `Hi! I'm interested in your ad: ${ad.title}`
    );
    window.open(`https://wa.me/${phone.replace(/\D/g, "")}?text=${msg}`);
  };

  const relatedAds = ad.similarAds || ad.relatedAds || [];

  /* -------------------------
       UI
  ---------------------------- */
  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-950">
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 py-4 border-b dark:border-gray-800 bg-white dark:bg-gray-900">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="font-medium text-gray-900 dark:text-white">
          Ad Details
        </h1>

        <div className="flex gap-5">
          <button onClick={handleFavoriteClick}>
            <Heart
              className={`w-6 h-6 ${
                isFavorite(ad._id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }`}
            />
          </button>

          <button onClick={() => setShowShareMenu(!showShareMenu)}>
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {showShareMenu && (
          <div className="absolute right-4 top-16 bg-white dark:bg-gray-900 p-3 rounded-xl shadow-lg border dark:border-gray-700 space-y-3 z-50 w-44">
            <button
              className="flex items-center gap-2"
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(
                    shareText + " " + shareUrl
                  )}`
                )
              }
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              WhatsApp
            </button>

            <button
              className="flex items-center gap-2"
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareUrl
                  )}`
                )
              }
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              Facebook
            </button>

            <button
              className="flex items-center gap-2"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    shareText
                  )}&url=${encodeURIComponent(shareUrl)}`
                )
              }
            >
              <Twitter className="w-4 h-4 text-sky-600" />
              Twitter
            </button>

            <button
              className="flex items-center gap-2"
              onClick={handleCopyLink}
            >
              <Copy className="w-4 h-4" />
              Copy Link
            </button>
          </div>
        )}
      </div>

      {/* CONTENT (UNCHANGED) */}
      <ScrollArea className="flex-1">
        <div className="pb-32">
          {/* MEDIA */}
          <div className="relative h-64 bg-gray-200 dark:bg-gray-900">
            {video ? (
              <video
                src={video}
                controls
                className="w-full h-full object-cover"
              />
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
                        setCurrentImageIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow"
                    >
                      <ChevronLeft />
                    </button>

                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow"
                    >
                      <ChevronRight />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500">
                No Media
              </div>
            )}
          </div>

          {/* MAIN INFO */}
          <div className="px-4 py-4 space-y-2">
            <h2 className="text-xl font-semibold">{ad.title}</h2>

            <Badge className="bg-blue-600 text-white">
              {ad.category?.name}
            </Badge>

            {ad.badges === "featured" && (
              <Badge className="bg-yellow-500 text-white">
                <Star className="w-3 h-3 mr-1" /> Featured
              </Badge>
            )}

            {ad.price && (
              <p className="text-3xl font-bold text-blue-600">{ad.price}</p>
            )}

            <p className="text-gray-700 dark:text-gray-300">{ad.description}</p>

            <p className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-4 h-4" />
              {ad.location}
            </p>

            <p className="text-sm text-gray-400">
              Posted on {new Date(ad.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* RELATED ADS */}
          {relatedAds.length > 0 && (
            <div className="px-4 py-4">
              <h3 className="text-lg font-semibold mb-4">Similar Ads</h3>

              <div className="grid grid-cols-2 gap-3">
                {relatedAds.map((item: any) => (
                  <div
                    key={item._id}
                    onClick={() => router.push(`/ad-detail/${item._id}`)}
                    className="border dark:border-gray-800 rounded-lg overflow-hidden shadow-sm"
                  >
                    <ImageWithFallback
                      src={item.images?.[0]}
                      alt={item.title}
                      className="h-24 w-full object-cover"
                    />
                    <div className="p-2">
                      <p className="text-sm font-medium line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-blue-600 text-sm">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT BUTTONS */}
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={handleCall}
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              Call Now
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full bg-green-600 text-white py-3 rounded-lg"
            >
              WhatsApp
            </button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
