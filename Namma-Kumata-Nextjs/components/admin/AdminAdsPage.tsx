"use client";
"use client";

import { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  Eye,
  Trash2,
  Sparkles,
  Zap,
  DollarSign,
  MoreVertical,
  RefreshCw,
  Plus,
  Edit,
  ShoppingBag,
  Calendar,
  MapPin,
  User,
  Award,
} from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
} from "../ui/alert-dialog";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { advertisementApi } from "@/lib/api/advertisementApi";

interface Advertisement {
  _id: string;
  title: string;
  category?: any;
  images?: string[];
  price?: number;
  description?: string;
  location?: string;
  contactinfo?: {
    phone?: string;
  };
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

/* ================= CONSTANTS ================= */

const categoryGradients: Record<string, string> = {
  Hospital: "from-blue-500 to-cyan-600",
  Bikes: "from-indigo-500 to-blue-600",
  Cars: "from-amber-500 to-orange-600",
  Hospital: "from-blue-500 to-cyan-600",
  Bikes: "from-indigo-500 to-blue-600",
  Cars: "from-amber-500 to-orange-600",
};

/* ================= PAGE ================= */

export function AdminAdsPage({ initialAds = [] }: AdminAdsPageProps) {
  const router = useRouter();

  const [ads, setAds] = useState<Advertisement[]>(initialAds);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"approved" | "all">(
    "approved"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"approved" | "all">(
    "approved"
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    setIsLoading(true);
    try {
      const res = await advertisementApi.getAll();
      setAds(res.data || []);
    } catch {
      toast.error("Failed to load advertisements");
      toast.error("Failed to load advertisements");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFeatured = async (id: string, val: boolean) => {
    const fd = new FormData();
    fd.append("featured", (!val).toString());
    fd.append("featured", (!val).toString());
    await advertisementApi.update(id, fd);
    setAds(ads.map((ad) => (ad._id === id ? { ...ad, featured: !val } : ad)));
    setAds(ads.map((ad) => (ad._id === id ? { ...ad, featured: !val } : ad)));
  };

  const toggleSponsored = async (id: string, val: boolean) => {
    const fd = new FormData();
    fd.append("sponsored", (!val).toString());
    fd.append("sponsored", (!val).toString());
    await advertisementApi.update(id, fd);
    setAds(ads.map((ad) => (ad._id === id ? { ...ad, sponsored: !val } : ad)));
    setAds(ads.map((ad) => (ad._id === id ? { ...ad, sponsored: !val } : ad)));
  };

  const handleDelete = async (id: string) => {
    await advertisementApi.delete(id);
    setAds(ads.filter((ad) => ad._id !== id));
    toast.success("Advertisement deleted");
    setAds(ads.filter((ad) => ad._id !== id));
    toast.success("Advertisement deleted");
  };

  const filteredAds = ads.filter((ad) => {
  const filteredAds = ads.filter((ad) => {
    const q = searchQuery.toLowerCase();
    return (
      ad.title.toLowerCase().includes(q) ||
      ad.description?.toLowerCase().includes(q) ||
      ad.category?.name?.toLowerCase().includes(q)
    );
  });

  const stats = {
    total: ads.length,
    featured: ads.filter((a) => a.featured).length,
    sponsored: ads.filter((a) => a.sponsored).length,
    featured: ads.filter((a) => a.featured).length,
    sponsored: ads.filter((a) => a.sponsored).length,
  };

  /* ================= CARD ================= */

  const AdCard = ({ ad }: { ad: Advertisement }) => {
    const [showDelete, setShowDelete] = useState(false);
    const gradient =
      categoryGradients[ad.category?.name] || "from-gray-500 to-gray-600";
    const gradient =
      categoryGradients[ad.category?.name] || "from-gray-500 to-gray-600";

    const getImageUrl = (imagePath: string) => {
      if (imagePath.startsWith("http")) return imagePath;
      if (imagePath.startsWith("http")) return imagePath;
      return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${imagePath}`;
    };
    return (
      <Card className="group overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-lg transition">
        <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
        <div className="p-5 space-y-4">
          {/* Header */}
          <div className="flex justify-between gap-3">
            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap gap-2">
                <Badge className={`bg-gradient-to-r ${gradient} text-white`}>
                  {ad.category?.name || "General"}
                  {ad.category?.name || "General"}
                </Badge>
                {ad.badges && (
                  <Badge className="bg-gray-700 text-white">{ad.badges}</Badge>
                )}
                {ad.featured && (
                  <Badge className="bg-pink-600 text-white">
                    <Sparkles className="w-3 h-3 mr-1" /> {ad.badges.charAt(0).toUpperCase() + ad.badges.slice(1)}
                  </Badge>
                )}
              </div>
              <h3 className="font-bold text-lg">{ad.title}</h3>
              {Array.isArray(ad.images) && ad.images.length > 0 && (
                <img
                  src={getImageUrl(ad.images[0])}
                  alt={ad.title}
                  className="rounded-lg object-cover"
                />
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => router.push(`/AdminEditAdPage/${ad._id}`)}
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push(`/advertisements/${ad._id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" /> View
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => setShowDelete(true)}
                >
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => setShowDelete(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Image */}
          {Array.isArray(ad.images) && ad.images.length > 0 && (
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={getImageUrl(ad.images[0])}
                alt={ad.title}
                className="h-full w-full object-cover group-hover:scale-105 transition"
              />
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {ad.description}
          </p>

          {/* Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex gap-2 items-center">
              <DollarSign className="text-emerald-500" /> ₹{ad.price || "N/A"}
            </div>
            <div className="flex gap-2 items-center">
              <User className="text-blue-500" />{" "}
              {ad.contactinfo?.phone || "N/A"}
            </div>
            <div className="flex gap-2 items-center">
              <Calendar className="text-purple-500" />{" "}
              {ad.createdAt
                ? new Date(ad.createdAt).toLocaleDateString()
                : "N/A"}
            </div>
            <div className="flex gap-2 items-center">
              <MapPin className="text-orange-500" /> {ad.location || "N/A"}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-4 pt-3 border-t">
            <label className="flex gap-2 items-center text-sm">
              <Checkbox
                checked={!!ad.featured}
                onCheckedChange={() => toggleFeatured(ad._id, !!ad.featured)}
              />
              <Sparkles className="w-3 h-3" /> Featured
            </label>
            <label className="flex gap-2 items-center text-sm">
              <Checkbox
                checked={!!ad.sponsored}
                onCheckedChange={() => toggleSponsored(ad._id, !!ad.sponsored)}
              />
              <Zap className="w-3 h-3" /> Sponsored
            </label>
          </div>

          {/* Live badge */}
          <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg">
            <Award className="text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              Live Advertisement
            </span>
          </div>
        </div>

        {/* Delete Dialog */}
        <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Advertisement?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(ad._id)}
                className="bg-red-600"
              >
              <AlertDialogAction
                onClick={() => handleDelete(ad._id)}
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

  /* ================= JSX ================= */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER (UNCHANGED) */}
      <div className="sticky top-0 bg-white shadow z-20">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft />
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <ShoppingBag /> Advertisements
              <Badge>{stats.total}</Badge>
            </h1>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchAds}>
              <RefreshCw className={isLoading ? "animate-spin" : ""} />
              <RefreshCw className={isLoading ? "animate-spin" : ""} />
            </Button>
            <Button onClick={() => router.push("/AdminAddAdPage")}>
              <Plus /> Add Advertisement
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea>
        <div className="max-w-7xl mx-auto p-6">
          <Tabs
            value={selectedTab}
            onValueChange={(v) => setSelectedTab(v as any)}
          >
          <Tabs
            value={selectedTab}
            onValueChange={(v) => setSelectedTab(v as any)}
          >
            <TabsList>
              <TabsTrigger value="approved">
                Approved ({stats.total})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({stats.total})
              </TabsTrigger>
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
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
