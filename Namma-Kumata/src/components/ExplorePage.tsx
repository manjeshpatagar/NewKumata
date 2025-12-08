import { useEffect, useState } from "react";
import { Search, ArrowLeft } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

import { FloatingAddButton } from "./FloatingAddButton";
import { useLanguage } from "../contexts/LanguageContext";
import { categoryApi } from "@/lib/api/AdmincategoryApi";

interface ExplorePageProps {
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
}

export function ExplorePage({ onBack, onNavigate }: ExplorePageProps) {
  const { t } = useLanguage();

  const [categories, setCategories] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  /** COLORS */
  const cardColors: Record<string, string> = {
    education: "#d0d0d0",
    vehicals: "#b3d1ff",
    stocks: "#7cc68d",
    books: "#ffe9a7",
    eletronics: "#adc4ff",
  };

  const iconColors: Record<string, string> = {
    education: "#5a5a5a",
    vehicals: "#6a9bff",
    stocks: "#3ea556",
    books: "#d39f00",
    eletronics: "#5472ff",
  };

  const fallbackEmoji: Record<string, string> = {
    education: "🎓",
    vehicals: "🚗",
    stocks: "📈",
    books: "📚",
    eletronics: "💻",
  };

  const getCardColor = (name: string) => cardColors[name.toLowerCase()] || "#ececec";
  const getIconColor = (name: string) => iconColors[name.toLowerCase()] || "#999";
  const getEmoji = (name: string) => fallbackEmoji[name.toLowerCase()] || "📁";

  /** LOAD CATEGORIES */
  useEffect(() => {
    async function load() {
      try {
        const data = await categoryApi.getAll();
        setCategories(data);
        setFiltered(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /** SEARCH FILTER */
  useEffect(() => {
    const s = searchText.toLowerCase().trim();
    if (s === "") setFiltered(categories);
    else setFiltered(categories.filter((c) => c.name.toLowerCase().includes(s)));
  }, [searchText, categories]);

  /* ---------------- SHIMMER LOADING ---------------- */
  if (loading) {
    return (
      <div className="p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-xl bg-gray-200 animate-pulse shimmer"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-gray-950">

      {/* HEADER */}
      <div className="p-4 border-b bg-white dark:bg-gray-950 sticky top-0 z-10 shadow">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div>
            <h1 className="text-lg font-semibold dark:text-white">{t("exploreNammaKumta")}</h1>
            <p className="text-xs text-gray-500">{t("discoverLocalPlaces")}</p>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative mt-2 px-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="
              w-full h-11 pl-10 pr-4 
              bg-white border border-gray-300 
              rounded-md shadow-sm
              focus:ring-2 focus:ring-blue-400
              focus:border-blue-500
              outline-none transition-all
            "
          />
        </div>
      </div>

      {/* CATEGORY GRID */}
      <ScrollArea className="flex-1">
        <div className="p-4 pb-24">

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">

            {filtered.map((cat) => {
              const cardBg = getCardColor(cat.name);
              const iconBg = getIconColor(cat.name);
              const emoji = getEmoji(cat.name);

              return (
                <div
                  key={cat._id}
                  className="
  flex flex-col items-center justify-center
  p-4 rounded-2xl cursor-pointer relative
  transition-all duration-500
  hover:scale-[1.08] hover:-translate-y-1
  neon-card tilt-card reflection-card
"
                  style={{ backgroundColor: cardBg }}
                  onClick={() =>
                    onNavigate("subcategory", {
                      categoryId: cat._id,
                      categoryName: cat.name,
                    })
                  }
                >
                  {/* ICON */}
                  <div
                    className="
                      h-14 w-14 sm:h-16 sm:w-16 rounded-full
                      flex items-center justify-center 
                      shadow-lg mb-2
                      transition-all duration-300 
                      hover:scale-110
                    "
                    style={{ backgroundColor: iconBg }}
                  >
                    {cat.image ? (
                      <img
                        src={cat.image}
                        className="w-10 h-10 rounded-full object-contain"
                      />
                    ) : (
                      <span className="text-3xl text-white">{emoji}</span>
                    )}
                  </div>

                  <span
                    className="text-center text-gray-800 dark:text-gray-200"
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                    }}
                  >
                    {cat.name}
                  </span>

                </div>
              );
            })}
          </div>

        </div>
      </ScrollArea>

      <FloatingAddButton onNavigate={onNavigate} />
    </div>
  );
}
