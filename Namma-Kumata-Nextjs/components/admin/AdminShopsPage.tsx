<<<<<<< HEAD
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
<<<<<<< HEAD
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { productApi } from "@/lib/api/productApi";
import { useAdmin } from "@/contexts/AdminContext";
=======
} from '../ui/dropdown-menu';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { productApi } from '@/lib/api/productApi';
>>>>>>> 05babf6 (add shop)

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

<<<<<<< HEAD
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
=======
  // ✔ Data comes only from SSR
  const [shops, setShops] = useState<Shop[]>(ssrShops);
  console.log("Initial Shops:", shops);
  const [loading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ⭐ DELETE via API (same UI)
>>>>>>> 05babf6 (add shop)
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

<<<<<<< HEAD
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
=======
  // SEARCH FILTER
  const filteredShops = shops.filter(shop =>
    shop.thumbnail &&
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );
>>>>>>> 05babf6 (add shop)

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
<<<<<<< HEAD
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${gradient}`}>
                  <Store className="w-5 h-5 text-white" />
=======
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
                  {/* <Store className="w-5 h-5 text-white" /> */}<img src={shop.thumbnail} alt={shop.name} className="w-5 h-5 text-white"/>
>>>>>>> 05babf6 (add shop)
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

<<<<<<< HEAD
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">

            {/* Owner */}
            <div className="flex gap-2">
              <User className="w-4 h-4 text-blue-500" />
              <div>
=======
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            
            {/* OWNER */}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <User className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
>>>>>>> 05babf6 (add shop)
                <p className="text-xs text-gray-500">Owner</p>
                <p className="truncate">{shop.owner}</p>
              </div>
            </div>

<<<<<<< HEAD
            {/* Phone */}
=======
            {/* PHONE */}
>>>>>>> 05babf6 (add shop)
            {shop.phone && (
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p>{shop.phone}</p>
                </div>
              </div>
            )}

<<<<<<< HEAD
            {/* Date */}
            <div className="flex gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500">Added</p>
                <p>{shop.submittedDate}</p>
              </div>
            </div>

            {/* Location */}
=======
            {/* DATE */}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <Calendar className="w-4 h-4 text-purple-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Added Date</p>
                <p className="font-medium dark:text-white truncate">{shop.submittedDate}</p>
              </div>
            </div>

            {/* LOCATION */}
>>>>>>> 05babf6 (add shop)
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
=======
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">

            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => router.back()}
                className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl dark:text-white flex items-center gap-2">
                    <Store className="w-6 h-6 text-blue-500" />
                    Manage Shops
                  </h1>

                  <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
                    {shops.length} Total
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Add, edit, and manage all shops
                </p>
              </div>
            </div>

            <Button 
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:scale-105"
              onClick={() => router.push('/AdminAddShopPage')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Shop
>>>>>>> 05babf6 (add shop)
            </Button>

            <h1 className="text-xl flex items-center gap-2">
              <Store className="w-6 h-6 text-blue-500" />
              Manage Shops
            </h1>

            <Badge>{shops.length} Total</Badge>
          </div>

<<<<<<< HEAD
          <Button onClick={() => router.push("/AdminAddShopPage")}>
            <Plus className="w-4 h-4 mr-2" />
            Add Shop
          </Button>
        </div>
=======
          {/* SEARCH BAR */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search shops by name, category, or owner..."
              className="pl-11 h-11 rounded-xl border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
>>>>>>> 05babf6 (add shop)

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
