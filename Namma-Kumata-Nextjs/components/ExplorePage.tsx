"use client";

import { useRouter } from "next/navigation";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { FloatingAddButton } from "./FloatingAddButton";
import { useLanguage } from "../contexts/LanguageContext";

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  type: string;
  isActive: boolean;
}

export default function ExplorePage({
  initialCategories = [],
}: {
  initialCategories: Category[];
}) {
  const router = useRouter();
  const { t } = useLanguage();

  const categories = initialCategories || [];

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col w-full max-w-7xl mx-auto bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="p-4 md:p-6 lg:p-8 border-b dark:border-gray-800 sticky top-0 z-10 bg-white dark:bg-gray-950">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
          <div>
            <h1 className="dark:text-white text-lg md:text-xl lg:text-2xl">
              {t("exploreNammaKumta")}
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {t("discoverLocalPlaces")}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder={t("searchPlaceholder")} className="pl-10" />
        </div>
      </div>

      {/* Categories */}
      <ScrollArea className="flex-1">
        <div className="p-4 md:p-6 lg:p-8 pb-24">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Card
                key={cat._id}
                className="text-white p-4 cursor-pointer hover:opacity-90 transition-all border-0 shadow-md bg-gradient-to-br from-purple-500 to-indigo-600"
                onClick={() => router.push(`/explore/${cat._id}`)}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-12 h-12 rounded-full object-cover bg-white shadow"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow text-xl">
                      📷
                    </div>
                  )}

                  <span className="text-xs md:text-sm text-center line-clamp-2">
                    {cat.name}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>

      <FloatingAddButton />
    </div>
  );
}
