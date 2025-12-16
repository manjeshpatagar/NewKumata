"use client";

import { useState, useMemo } from "react";
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
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance?: string;
  address?: string;
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

  /* ================= DEDUPLICATE + NORMALIZE (NO MAP) ================= */

  const listings: Listing[] = useMemo(() => {
    const seen: Record<string, boolean> = {};
    const result: Listing[] = [];

    for (const p of initialProducts || []) {
      const id = String(p._id);
      if (seen[id]) continue;

      seen[id] = true;

      result.push({
        id,
        name: p.shopName || p.name || "Unnamed",
        description: p.description || p.about || "",
        image: p.images?.[0] || "",
        rating: p.rating || 0,
        reviewCount: p.reviewCount || 0,
        distance: p.distance,
        address: p.address,
      });
    }

    return result;
  }, [initialProducts]);

  /* ================= CARD ================= */

  const ListingCard = ({ listing }: { listing: Listing }) => (
    <Card
      onClick={() => router.push(`/listing/${listing.id}`)}
      className="
        cursor-pointer
        hover:shadow-lg transition-shadow
        flex flex-col justify-between
        p-4 min-h-[150px]
        dark:bg-gray-900 dark:border-gray-800
      "
    >
      <div className="flex gap-4">
        <Avatar className="w-16 h-16 shrink-0">
          <AvatarImage src={listing.image} />
          <AvatarFallback className="bg-blue-600 text-white text-lg">
            {listing.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold dark:text-white line-clamp-1">
            {listing.name}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {listing.description}
          </p>

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {listing.rating} ({listing.reviewCount})
            </div>

            {listing.distance && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {listing.distance}
              </div>
            )}
          </div>

          {listing.address && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
              <MapPin className="w-3 h-3 inline mr-1" />
              {listing.address}
            </p>
          )}
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

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder={`${t("search")} ${subcategory}...`}
            className="pl-10"
          />
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
                {t("results")}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            {t("view")}
          </div>
        )}
      </ScrollArea>

      <FloatingAddButton />
    </div>
  );
}
