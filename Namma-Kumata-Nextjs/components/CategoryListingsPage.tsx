"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Map,
  List as ListIcon,
  Star,
  Phone,
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
import { productApi } from "@/lib/api/productApi";

interface CategoryListingsPageProps {
  categoryId: string;
  categoryName: string;
  subcategory: string;
  initialProducts: any[];
}

export function CategoryListingsPage({
  categoryId,
  categoryName,
  subcategory,
  initialProducts,
}: CategoryListingsPageProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const [products, setProducts] = useState<any[]>(initialProducts || []);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // Convert products into UI-friendly listing items
  const listings = products.map((p: any) => ({
    id: p._id,
    name: p.shopName,
    businessName: p.description || p.about || "",
    image: p.images?.[0] || "",
    rating: p.rating || 0,
    reviewCount: p.reviewCount || 0,
    distance: p.distance || "",
    phone: p.contact?.phone,
    address: p.address,
  }));

  const ListingCard = ({ listing }: { listing: any }) => (
    <Card
      className="p-4 md:p-5 lg:p-6 cursor-pointer hover:shadow-lg transition-shadow dark:bg-gray-900 dark:border-gray-800"
      onClick={() => router.push(`/listing/${listing.id}`)}
    >
      <div className="flex gap-3 md:gap-4">
        <Avatar className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
          <AvatarImage src={listing.image} />
          <AvatarFallback className="bg-blue-600 text-white text-lg md:text-xl lg:text-2xl">
            {listing.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h3 className="mb-1 dark:text-white text-base md:text-lg lg:text-xl">
            {listing.name}
          </h3>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-1 md:mb-2">
            {listing.businessName}
          </p>

          <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
              <span>{listing.rating}</span>
              <span>({listing.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 md:w-4 md:h-4" />
              <span>{listing.distance}</span>
            </div>
          </div>
        </div>

        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 md:h-10 md:w-10"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`tel:${listing.phone}`);
          }}
        >
          <Phone className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </div>

      <div className="mt-3 md:mt-4 flex items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
        <MapPin className="w-3 h-3 md:w-4 md:h-4" />
        <span>{listing.address}</span>
      </div>
    </Card>
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col w-full max-w-7xl mx-auto bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="p-4 md:p-6 lg:p-8 border-b dark:border-gray-800 sticky top-0 z-10 bg-white dark:bg-gray-950">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Button>

          <div className="flex-1">
            <h1 className="dark:text-white text-lg md:text-xl lg:text-2xl">
              {subcategory}
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {products.length} {t("results")} in {categoryName}
            </p>
          </div>

          <Tabs
            value={viewMode}
            onValueChange={(v) => setViewMode(v as "list" | "map")}
          >
            <TabsList className="grid w-24 md:w-28 grid-cols-2 md:h-10">
              <TabsTrigger value="list">
                <ListIcon className="w-4 h-4 md:w-5 md:h-5" />
              </TabsTrigger>
              <TabsTrigger value="map">
                <Map className="w-4 h-4 md:w-5 md:h-5" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder={`${t("search")} ${subcategory}...`}
            className="pl-10 md:pl-12 md:h-12 md:text-base"
          />
        </div>
      </div>

      {/* LIST / MAP VIEW */}
      <ScrollArea className="flex-1">
        {loading ? (
          <div className="py-10 text-center">{t("loading")}...</div>
        ) : viewMode === "list" ? (
          <div className="p-4 md:p-6 lg:p-8 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}

            {listings.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                {t("noResultsFound")}
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <p className="text-gray-500 dark:text-gray-400">
              {t("mapViewNotAvailable")}
            </p>
          </div>
        )}
      </ScrollArea>

      <FloatingAddButton />
    </div>
  );
}
