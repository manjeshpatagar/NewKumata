"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft, Edit, Trash2, Plus, Search, Store,
  MapPin, Phone, User, Calendar, Eye, MoreVertical
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { productApi } from "@/lib/api/productApi";
import { useAdmin } from "@/contexts/AdminContext";

// Local Shop Type
export interface Shop {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  owner: string;
  phone?: string;
  address?: string;
  description?: string;
  submittedDate?: string;
  location?: string;
  openingHours?: string;
  status?: string;
}

export function AdminShopsPage() {
  const router = useRouter();
  const { adminUser } = useAdmin();

  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect if no admin
  useEffect(() => {
    if (!adminUser) {
      router.push("/admin-login");
      return;
    }
    loadShops();
  }, [adminUser]);

  // Load shops once admin is verified
  const loadShops = async () => {
    try {
      setLoading(true);

      const res = await productApi.getAll();
      const items = res?.data?.data || res?.data || [];

      const normalized: Shop[] = items.map((item: any) => ({
        id: item._id || item.id,
        name: item.shopName || item.name || "Untitled Shop",
        category:
          item.categoryId?.name ||
          item.category?.name ||
          item.category ||
          "Uncategorized",
        subCategory:
          item.subCategoryId?.name ||
          item.subCategory ||
          undefined,
        owner: item.contact?.ownerName || item.owner || "Unknown owner",
        phone: item.contact?.phone || item.phone,
        address: item.address,
        description: item.description || item.about,
        submittedDate: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString()
          : undefined,
        location: item.address,
        openingHours:
          item.openingHours?.open && item.openingHours?.close
            ? `${item.openingHours.open} - ${item.openingHours.close}`
            : undefined,
        status: item.status,
      }));

      setShops(normalized);
    } catch (err) {
      toast.error("Failed to load shops");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete shop
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;

    try {
      await productApi.delete(id);
      toast.success("Shop deleted");
      setShops((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  };

  // Optimized search
  const filteredShops = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return shops.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.owner.toLowerCase().includes(q)
    );
  }, [searchQuery, shops]);

  // Category Colors
  const categoryColors: Record<string, string> = {
    Grocery: "from-emerald-500 to-teal-600",
    Medical: "from-red-500 to-rose-600",
    Temple: "from-amber-500 to-orange-600",
    Tourism: "from-blue-500 to-indigo-600",
    Furniture: "from-purple-500 to-pink-600",
    Services: "from-indigo-500 to-blue-600",
  };

  // Single Shop Card
  const ShopCard = ({ shop }: { shop: Shop }) => {
    const gradient = categoryColors[shop.category] || "from-gray-500 to-gray-600";

    return (
      <Card className="relative group overflow-hidden border shadow hover:shadow-xl transition">
        <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

        <div className="p-5 space-y-4">
          <div className="flex justify-between gap-3">

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${gradient}`}>
                  <Store className="w-5 h-5 text-white" />
                </div>

                <div>
                  <h3 className="font-bold text-lg truncate">{shop.name}</h3>
                  <Badge className={`bg-gradient-to-r ${gradient} text-white text-xs`}>
                    {shop.category}
                  </Badge>
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push(`/AdminEditShopPage/${shop.id}`)}>
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push(`/shop/${shop.id}`)}>
                  <Eye className="w-4 h-4 mr-2" /> View
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => handleDelete(shop.id, shop.name)}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">

            {/* Owner */}
            <div className="flex gap-2">
              <User className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">Owner</p>
                <p className="truncate">{shop.owner}</p>
              </div>
            </div>

            {/* Phone */}
            {shop.phone && (
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p>{shop.phone}</p>
                </div>
              </div>
            )}

            {/* Date */}
            <div className="flex gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500">Added</p>
                <p>{shop.submittedDate}</p>
              </div>
            </div>

            {/* Location */}
            {shop.location && (
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="truncate">{shop.location}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950">

      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur border-b z-20">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <h1 className="text-xl flex items-center gap-2">
              <Store className="w-6 h-6 text-blue-500" />
              Manage Shops
            </h1>

            <Badge>{shops.length} Total</Badge>
          </div>

          <Button onClick={() => router.push("/AdminAddShopPage")}>
            <Plus className="w-4 h-4 mr-2" />
            Add Shop
          </Button>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-3 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search shops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {loading ? (
            <div className="text-center col-span-full py-10">
              <div className="animate-spin h-10 w-10 border-b-2 rounded-full border-blue-500"></div>
            </div>
          ) : filteredShops.length > 0 ? (
            filteredShops.map((s) => <ShopCard key={s.id} shop={s} />)
          ) : (
            <div className="text-center col-span-full py-10">
              <Store className="w-14 h-14 mx-auto text-gray-400" />
              <p>No shops found</p>
            </div>
          )}

        </div>
      </ScrollArea>
    </div>
  );
}
