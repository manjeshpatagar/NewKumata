"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Map,
  List as ListIcon,
  Star,
  MapPin,
} from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { FloatingAddButton } from "./FloatingAddButton";
import { useLanguage } from "../contexts/LanguageContext";

/* ================= TYPES ================= */

interface Listing {
  id: string;
  name: string;
  businessName: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance: string;
  address?: string;
  phone?: string;
  badge?: string;
}

interface CategoryListingsPageProps {
  categoryId: string;
  categoryName: string;
  subcategory: string;
  initialProducts: any[];
}

/* ================= COMPONENT ================= */

export function CategoryListingsPage({
  categoryId,
  categoryName,
  subcategory,
  initialProducts,
}: CategoryListingsPageProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  /* ================= NORMALIZE DATA ================= */

  const listings: Listing[] = (initialProducts || []).map((p: any) => ({
    id: p._id,
    name: p.shopName || p.name || "Unnamed",
    businessName: p.description || p.about || "",
    image: p.images?.[0] || "",
    rating: p.rating || 0,
    reviewCount: p.reviewCount || 0,
    distance: p.distance || "",
    phone: p.contact?.phone,
    address: p.address,
    badge: p.badges,
  }));

  /* ================= CARD ================= */

const ListingCard = ({ listing }: { listing: Listing }) => (
  <Card
    onClick={() => router.push(`/listing/${listing.id}`)}
    className="
      group cursor-pointer rounded-2xl border bg-white
      hover:shadow-xl transition-all duration-300
      hover:-translate-y-1
    "
  >
    <div className="flex gap-4 p-4">

      {/* IMAGE */}
      <div className="relative">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-24 h-24 rounded-xl object-cover bg-gray-100"
        />

        {/* RATING BADGE */}
        {listing.rating > 0 && (
          <div className="absolute bottom-1 left-1 bg-[#eff6ff] text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-md shadow">
            ⭐ {listing.rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">

        {/* TITLE + SUBTITLE */}
        <div>
          {/* TITLE */}
          <h3 className="text-[15px] font-semibold text-gray-900 truncate">
            {listing.name}
          </h3>

          {/* SUBTITLE */}
          <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">
            {listing.businessName || "No description available"}
          </p>
        </div>

        {/* META */}
        <div className="flex items-center justify-between mt-3">

          {/* ADDRESS */}
          {listing.address && (
            <div className="
              flex items-center gap-1.5
              bg-gray-100 text-gray-600
              text-xs px-2 py-1 rounded-md
              max-w-[70%]
            ">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate">{listing.address}</span>
            </div>
          )}

          {/* REVIEWS */}
          {listing.reviewCount > 0 && (
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {listing.reviewCount} reviews
            </span>
          )}
        </div>
      </div>
    </div>
  </Card>
);



  /* ================= RENDER ================= */

  return (
    <div className="h-screen flex flex-col max-w-7xl mx-auto bg-white dark:bg-gray-950">
      {/* HEADER */}
      <div className="p-4 border-b sticky top-0 z-10 bg-white dark:bg-gray-950">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex-1">
            <h1 className="text-lg font-semibold dark:text-white">
              {subcategory}
            </h1>
            <p className="text-xs text-gray-500">
              {listings.length} {t("results")} in {categoryName}
            </p>
          </div>

          <Tabs
            value={viewMode}
            onValueChange={(v) => setViewMode(v as "list" | "map")}
          >
            <TabsList className="grid w-24 grid-cols-2">
              <TabsTrigger value="list">
                <ListIcon className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="map">
                <Map className="w-4 h-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

      </div>

      {/* CONTENT */}
      <ScrollArea className="flex-1">
        {viewMode === "list" ? (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-24">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}

            {listings.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-12">
                {t("noResultsFound")}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            {t("mapViewNotAvailable")}
          </div>
        )}
      </ScrollArea>

      <FloatingAddButton />
    </div>
  );
}
