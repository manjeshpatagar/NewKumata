"use client";

import { ArrowLeft, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { FloatingAddButton } from "./FloatingAddButton";
import { useLanguage } from "../contexts/LanguageContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "next/navigation";

export default function SubcategoryPage({
  categoryId,
  categoryName,
  subcategories,
}: {
  categoryId: string;
  categoryName: string;
  subcategories: any[];
}) {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>

            <div className="flex-1">
              <h1 className="text-xl md:text-2xl lg:text-3xl dark:text-white truncate">
                {categoryName}
              </h1>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                {subcategories.length} {t("subcategories")}
              </p>
            </div>
          </div>

          <div className="relative max-w-2xl">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={`${t("searchFor")} ${categoryName.toLowerCase()}...`}
              className="pl-10 md:pl-12 h-11 md:h-12 rounded-xl  dark:bg-gray-900"
            />
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 pb-24 md:pb-32">
          {subcategories.length === 0 && (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              🚫 {t("noSubcategoriesFound")}
            </div>
          )}

          {subcategories.length > 0 && (
            <div
              className="
              grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
              lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 
              gap-3 sm:gap-4 md:gap-5 lg:gap-6
            "
            >
              {subcategories.map((subcategory, index) => (
                <Card
                  key={index}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 dark:bg-gray-900 dark:border-gray-800 overflow-hidden hover:scale-105 active:scale-95"
                  onClick={() =>
                    router.push(`/explore/${categoryId}/${subcategory._id}`)
                  }
                >
                  {subcategory.image ? (
                    <div className="relative aspect-[4/3] md:aspect-video overflow-hidden">
                      <ImageWithFallback
                        src={subcategory.image}
                        alt={subcategory.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>

                      <div className="absolute top-2 right-2 text-3xl text-white">
                        {subcategory.icon || "📌"}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <div className="bg-black/50 rounded-lg px-2 py-1">
                          <h3 className="text-white text-sm md:text-base line-clamp-2">
                            {subcategory.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/3] md:aspect-video p-4 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-col gap-2 text-white">
                      <div className="text-4xl">{subcategory.icon || "📍"}</div>
                      <h3 className="text-sm md:text-base line-clamp-2">
                        {subcategory.name}
                      </h3>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <FloatingAddButton />
    </div>
  );
}
