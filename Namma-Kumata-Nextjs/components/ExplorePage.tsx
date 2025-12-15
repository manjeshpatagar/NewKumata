"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Search, ArrowLeft, Star } from "lucide-react";
import Head from "next/head";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { FloatingAddButton } from "./FloatingAddButton";
import { useLanguage } from "../contexts/LanguageContext";

// ---------------- TYPES ----------------
export interface Category {
  _id: string;
  name: string;          // English
  nameKn?: string;       // Kannada
  description?: string;
  image?: string;
  type: string;
  isActive: boolean;
  featured?: boolean;
}

// ---------------- SKELETON ----------------
function CategorySkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="w-14 h-14 rounded-full bg-gray-300 dark:bg-gray-700 mx-auto" />
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mt-3" />
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded mt-2 w-3/4 mx-auto" />
    </div>
  );
}

// ---------------- PAGE ----------------
export default function ExplorePage({
  initialCategories = [],
}: {
  initialCategories: Category[];
}) {
  const router = useRouter();
  const { t, language } = useLanguage();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // fake loading (remove when API loading handled)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // ---------------- SEARCH FILTER ----------------
  const filteredCategories = useMemo(() => {
    return initialCategories.filter((cat) => {
      const text = `${cat.name} ${cat.nameKn ?? ""}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [search, initialCategories]);

  const featuredCategories = filteredCategories.filter((c) => c.featured);
  const normalCategories = filteredCategories.filter((c) => !c.featured);

  return (
    <>
      {/* ---------------- SEO ---------------- */}
      <Head>
        <title>Explore Categories | Namma Kumata</title>
        <meta
          name="description"
          content="Explore local businesses, colleges, books, services and more in Namma Kumata"
        />
      </Head>

      <div className="min-h-screen w-full max-w-7xl mx-auto bg-gray-50 dark:bg-gray-950">
        {/* ---------------- HEADER ---------------- */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b dark:border-gray-800">
          <div className="p-4 flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold dark:text-white">
                {t("exploreNammaKumta")}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t("discoverLocalPlaces")}
              </p>
            </div>
          </div>

          {/* ---------------- SEARCH ---------------- */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={t("searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-gray-100 dark:bg-gray-900"
              />
            </div>
          </div>
        </div>

        {/* ---------------- CONTENT ---------------- */}
        <ScrollArea className="h-[calc(100vh-8.5rem)]">
          <div className="p-4 sm:p-5 md:p-6 space-y-8">

            {/* -------- FEATURED -------- */}
            {featuredCategories.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" /> Featured
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {featuredCategories.map((cat) => (
                    <Card
                      key={cat._id}
                      onClick={() => router.push(`/explore/${cat._id}`)}
                      className="cursor-pointer rounded-2xl border border-yellow-200 dark:border-yellow-800 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/30 shadow hover:shadow-lg transition"
                    >
                      <div className="flex flex-col items-center gap-2 p-4">
                        {cat.image ? (
                          <img src={cat.image} alt={cat.name} className="w-14 h-14 rounded-full" />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-yellow-200 flex items-center justify-center">⭐</div>
                        )}
                        <span className="text-xs font-semibold text-center">
                          {language === "kn" && cat.nameKn ? cat.nameKn : cat.name}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* -------- ALL CATEGORIES -------- */}
            <section>
              <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                Browse Categories
              </h2>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {loading
                  ? Array.from({ length: 12 }).map((_, i) => <CategorySkeleton key={i} />)
                  : normalCategories.map((cat) => (
                      <Card
                        key={cat._id}
                        onClick={() => router.push(`/explore/${cat._id}`)}
                        className="cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                      >
                        <div className="flex flex-col items-center gap-2 p-4">
                          {cat.image ? (
                            <img src={cat.image} alt={cat.name} className="w-14 h-14 rounded-full" />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">📂</div>
                          )}

                          <span className="text-xs sm:text-sm font-medium text-center line-clamp-2">
                            {language === "kn" && cat.nameKn ? cat.nameKn : cat.name}
                          </span>
                        </div>
                      </Card>
                    ))}
              </div>
            </section>
          </div>
        </ScrollArea>

        <FloatingAddButton />
      </div>
    </>
  );
}
