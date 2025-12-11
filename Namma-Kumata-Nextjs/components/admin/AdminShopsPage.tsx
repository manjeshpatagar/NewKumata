"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  Search,
  Store,
  MapPin,
  Phone,
  User,
  Calendar,
  Eye,
  MoreVertical,
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
import { useAdmin } from "@/contexts/AdminContext"; // ✅ You forgot this import

// ----------- INTERFACE -----------
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
  thumbnail?: string; // only once!
  raw?: any;
}

// ----------- MAIN PAGE -----------
export function AdminShopsPage({ ssrShops = [] }) {
  const router = useRouter();

  const [shops, setShops] = useState<Shop[]>(ssrShops);
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
      console.error(err);
      toast.error("Failed to delete shop");
    }
  };

  const filteredShops = shops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Category Colors
  const categoryColors: Record<string, string> = {
    Grocery: "from-emerald-500 to-teal-600",
    Medical: "from-red-500 to-rose-600",
    Temple: "from-amber-500 to-orange-600",
    Tourism: "from-blue-500 to-indigo-600",
    Furniture: "from-purple-500 to-pink-600",
    Services: "from-indigo-500 to-blue-600",
  };

  // ----------- SHOP CARD -----------
  const ShopCard = ({ shop }: { shop: Shop }) => {
    const gradient = categoryColors[shop.category] || "from-gray-500 to-gray-600";
    const gradient = categoryColors[shop.category] || "from-gray-500 to-gray-600";

    return (
      <Card className="group relative overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
        <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

        <div className="p-5 space-y-4">
          <div className="flex justify-between gap-3">

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
                  <img src={shop.thumbnail} alt={shop.name} className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white truncate">
                    {shop.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge className={`bg-gradient-to-r ${gradient} text-white border-0 text-xs`}>
                      {shop.category}
                    </Badge>

                    {shop.subCategory && (
                      <Badge variant="secondary" className="text-xs">
                        {shop.subCategory}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* MENU */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="min-w-[180px]">
                <DropdownMenuItem onClick={() => router.push(`/AdminEditShopPage/${shop.id}`)}>
                  <Edit className="w-4 h-4 mr-2" /> Edit Shop
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push(`/shop/${shop.id}`)}>
                  <Eye className="w-4 h-4 mr-2" /> View Details
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(shop.id, shop.name)}>
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Shop
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {/* OWNER */}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <User className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">Owner</p>
                <p className="font-medium dark:text-white truncate">{shop.owner}</p>
              </div>
            </div>

            {/* PHONE */}
            {shop.phone && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4 text-emerald-500" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium dark:text-white truncate">{shop.phone}</p>
                </div>
              </div>
            )}

            {/* DATE */}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500">Added Date</p>
                <p className="font-medium dark:text-white">{shop.submittedDate}</p>
              </div>
            </div>

            {/* LOCATION */}
            {shop.location && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 text-orange-500" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-medium dark:text-white truncate">{shop.location}</p>
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

            <h1 className="text-2xl dark:text-white flex items-center gap-2">
              <Store className="w-6 h-6 text-blue-500" /> Manage Shops
            </h1>

            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
              onClick={() => router.push("/AdminAddShopPage")}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Shop
            </Button>

            <Badge>{shops.length} Total</Badge>
          </div>

          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search shops..."
              className="pl-11 h-11 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* LIST */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredShops.length > 0 ? (
              filteredShops.map((shop) => <ShopCard key={shop.id} shop={shop} />)
            ) : (
              <div className="text-center py-16 col-span-full">
                <Store className="w-16 h-16 mx-auto text-gray-300" />
                <p className="text-gray-500 text-lg">No shops found</p>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
