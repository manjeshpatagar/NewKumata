"use client";

import { useState } from "react";
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
  Facebook,
  Twitter,
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
}

export function DetailPage({ listing }: DetailPageProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite, getFavouriteId, removeFavorite } =
    useFavorites();
  const { t, language } = useLanguage();
  const { isAuthenticated, isGuest } = useAuth();

  const [showShareMenu, setShowShareMenu] = useState(false);

  if (!listing) {
    return (
      <div className="p-6 text-center text-gray-500">Listing not found.</div>
    );
  }

  const images = listing.images || [listing.image];

  // IMPORTANT: product uses _id, NOT id
  const refId = listing._id;
  localStorage.removeItem("namma_kumata_favorites");

  const favorited = isFavorite(refId);

  const reviews = getReviews(language);

  /** ============================================================
   * ⭐ Fully Correct Favourite Logic
   * ============================================================ */
  const handleFavoriteClick = async () => {
    if (!isAuthenticated && !isGuest) {
      toast.info("Please login to add favourites");
      router.push("/auth/login");
      return;
    }

    try {
      if (!favorited) {
        // ADD favourite
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
        // REMOVE favourite
        const favouriteId = getFavouriteId(refId);
        if (!favouriteId) return toast.error("Favourite not found");

        await favouriteApi.remove(favouriteId);
        removeFavorite(favouriteId);

        toast.success("Removed from favourites");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  /** ============================================================
   * SHARE FUNCTIONS (unchanged UI)
   * ============================================================ */

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out ${listing.name} on Namma Kumta!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied!");
    setShowShareMenu(false);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col max-w-md mx-auto bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-800 relative">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={handleFavoriteClick}>
            <Heart
              className={`w-5 h-5 ${
                favorited ? "fill-red-500 text-red-500" : ""
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
          <div className="absolute top-14 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-xl border p-2 z-50">
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(
                    shareText + " " + shareUrl
                  )}`
                )
              }
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              WhatsApp
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Copy className="w-5 h-5 text-gray-600" />
              Copy Link
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <ScrollArea className="flex-1">
        <div className="pb-20">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((img: string, i: number) => (
                <CarouselItem key={i}>
                  <ImageWithFallback
                    src={img}
                    className="w-full h-64 object-cover"
                    alt={listing.shopName}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>

          <div className="p-4">
            {/* Title */}
            <div className="flex justify-between items-start mb-2">
              <h1 className="dark:text-white">{listing.shopName}</h1>
              <Badge className="bg-green-100 text-green-700">
                {listing.category}
              </Badge>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>{listing.rating}</span>
              <span className="text-sm text-gray-600">
                ({listing.reviewCount} reviews)
              </span>
            </div>

            {/* Description */}
            <Card className="p-4 mb-4">
              <h3>{t("about")}</h3>
              <p className="text-gray-600">{listing.description}</p>
            </Card>

            {/* Contact */}
            <Card className="p-4 mb-4">
              <h3>{t("contactInformation")}</h3>
              <div className="mt-3 space-y-3">
                <p className="flex items-center gap-2">
                  <Phone className="w-4" /> {listing.contact.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4" /> {listing.contact.email}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4" /> {listing.openingHours.open} -{" "}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4" /> {listing.address}
                </p>
              </div>
            </Card>

            {/* Reviews */}
            <h3 className="mb-3">
              {t("reviews")} ({listing.reviewCount})
            </h3>

            {reviews.map((review) => (
              <Card key={review.id} className="p-4 mb-3">
                <p className="font-semibold">{review.name}</p>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
