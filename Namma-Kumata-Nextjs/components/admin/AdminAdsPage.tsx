// components/admin/AdminAdsPage.tsx
"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Eye,
  Trash2,
  Sparkles,
  RefreshCw,
  Plus,
  Edit,
  ShoppingBag,
  Calendar,
  MapPin,
  User,
  Award,
  MoreVertical,
} from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { advertisementApi } from "@/lib/api/advertisementApi";

interface Advertisement {
  _id: string;
  title: string;
  category?: { name?: string };
  images?: string[];
  price?: number | string;
  description?: string;
  location?: string;
  contactinfo?: { phone?: string };
  badges?:
    | "upcoming"
    | "popular"
    | "featured"
    | "new"
    | "trending"
    | "exclusive";
  featured?: boolean;
  sponsored?: boolean;
  createdAt?: string;
}

interface AdminAdsPageProps {
  initialAds?: Advertisement[];
}

const categoryGradients: Record<string, string> = {
  Hospital: "from-blue-500 to-cyan-600",
  Bikes: "from-indigo-500 to-blue-600",
  Cars: "from-amber-500 to-orange-600",
};

export function AdminAdsPage({ initialAds = [] }: AdminAdsPageProps) {
  const router = useRouter();

  const [ads, setAds] = useState<Advertisement[]>(initialAds);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"approved" | "all">(
    "approved"
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If initialAds provided, use them first, but still fetch fresh data
    fetchAds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAds = async () => {
    setIsLoading(true);
    try {
      const res = await advertisementApi.getAll();
      setAds(res.data || []);
    } catch (err) {
      console.error("Failed to load advertisements", err);
      toast.error("Failed to load advertisements");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFeatured = async (id: string, val: boolean) => {
    try {
      const fd = new FormData();
      fd.append("featured", (!val).toString());
      await advertisementApi.update(id, fd);
      setAds((prev) =>
        prev.map((ad) => (ad._id === id ? { ...ad, featured: !val } : ad))
      );
      toast.success(val ? "Removed featured" : "Marked as featured");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update featured status");
    }
  };

  const toggleSponsored = async (id: string, val: boolean) => {
    try {
      const fd = new FormData();
      fd.append("sponsored", (!val).toString());
      await advertisementApi.update(id, fd);
      setAds((prev) =>
        prev.map((ad) => (ad._id === id ? { ...ad, sponsored: !val } : ad))
      );
      toast.success(val ? "Removed sponsored" : "Marked as sponsored");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update sponsored status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await advertisementApi.delete(id);
      setAds((prev) => prev.filter((ad) => ad._id !== id));
      toast.success("Advertisement deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete advertisement");
    }
  };

  const filteredAds = ads.filter((ad) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      (ad.title || "").toLowerCase().includes(q) ||
      (ad.description || "").toLowerCase().includes(q) ||
      (ad.category?.name || "").toLowerCase().includes(q)
    );
  });

  const stats = {
    total: ads.length,
    featured: ads.filter((a) => a.featured).length,
    sponsored: ads.filter((a) => a.sponsored).length,
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    // keep same base behaviour as your code
    return `${
      process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || ""
    }/${imagePath.replace(/^\//, "")}`;
  };

  const AdCard = ({ ad }: { ad: Advertisement }) => {
    const [showDelete, setShowDelete] = useState(false);
    const gradient =
      categoryGradients[ad.category?.name || ""] || "from-gray-500 to-gray-600";

    return (
      <Card className="group overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-lg transition">
        <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex justify-between gap-3">
            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap gap-2 items-center">
                <Badge className={`bg-gradient-to-r ${gradient} text-white`}>
                  {ad.category?.name || "General"}
                </Badge>
                {ad.badges && (
                  <Badge className="bg-pink-600 text-white">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {ad.badges.charAt(0).toUpperCase() + ad.badges.slice(1)}
                  </Badge>
                )}
              </div>

              <h3 className="font-semibold text-base sm:text-lg truncate">
                {ad.title}
              </h3>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => router.push(`/AdminEditAdPage/${ad._id}`)}
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => setShowDelete(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {Array.isArray(ad.images) && ad.images.length > 0 && (
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={getImageUrl(ad.images[0])}
                alt={ad.title}
                className="h-full w-full object-cover group-hover:scale-105 transition"
              />
            </div>
          )}

          <p className="text-sm text-gray-600 line-clamp-2">{ad.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <DollarSignIcon /> ₹{ad.price ?? "N/A"}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 text-blue-500" />{" "}
              {ad.contactinfo?.phone || "N/A"}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 text-purple-500" />{" "}
              {ad.createdAt
                ? new Date(ad.createdAt).toLocaleDateString()
                : "N/A"}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 text-orange-500" /> {ad.location || "N/A"}
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg">
            <Award className="w-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              Live Advertisement
            </span>
          </div>

          <div className="flex items-center gap-2 justify-between">
            <div className="flex gap-2">
              <Button size="sm" onClick={() => router.push(`/ads/${ad._id}`)}>
                <Eye className="w-4 h-4 mr-2" /> View
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => toggleFeatured(ad._id, !!ad.featured)}
              >
                {ad.featured ? "Unfeature" : "Feature"}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => toggleSponsored(ad._id, !!ad.sponsored)}
              >
                {ad.sponsored ? "Unsponsor" : "Sponsor"}
              </Button>
            </div>

            <div className="text-xs text-gray-500">
              {ad.sponsored ? "Sponsored" : ""}
            </div>
          </div>
        </div>

        <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Advertisement?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDelete(ad._id);
                  setShowDelete(false);
                }}
                className="bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-20 bg-white border-b">
        <div className="max-w-7xl mx-auto p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft />
            </Button>

            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <ShoppingBag /> Advertisements
              <Badge className="ml-2">{stats.total}</Badge>
            </h1>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchAds}>
              <RefreshCw className={isLoading ? "animate-spin" : ""} />
            </Button>
            <Button onClick={() => router.push("/AdminAddAdPage")}>
              <Plus /> Add
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4" />
            <Input
              className="pl-9"
              placeholder="Search advertisements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <ScrollArea>
        <div className="max-w-7xl mx-auto p-6">
          <Tabs
            value={selectedTab}
            onValueChange={(v) => setSelectedTab(v as any)}
          >
            <TabsList>
              <TabsTrigger value="approved">
                Approved ({stats.total})
              </TabsTrigger>
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
                {filteredAds.map((ad) => (
                  <AdCard key={ad._id} ad={ad} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}

/* ================= small helper icon wrapper ================= */
function DollarSignIcon() {
  return <span className="text-emerald-600 font-semibold">₹</span>;
}
