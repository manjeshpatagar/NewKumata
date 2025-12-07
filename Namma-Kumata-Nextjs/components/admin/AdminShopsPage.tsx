'use client';

import { useState } from 'react';
import { 
  ArrowLeft, Edit, Trash2, Plus, Search, Store,
  MapPin, Phone, User, Calendar, Eye, MoreVertical
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useAdmin, Shop } from '../../contexts/AdminContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { toast } from 'sonner';

interface AdminShopsPageProps {
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
}

export function AdminShopsPage({ onBack, onNavigate }: AdminShopsPageProps) {
  const { shops, deleteShop } = useAdmin();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (shopId: string, shopName: string) => {
    if (confirm(`Are you sure you want to delete "${shopName}"? This action cannot be undone.`)) {
      deleteShop(shopId);
      toast.success('Shop deleted successfully!');
    }
  };

  const categoryColors: Record<string, string> = {
    Grocery: 'from-emerald-500 to-teal-600',
    Medical: 'from-red-500 to-rose-600',
    Temple: 'from-amber-500 to-orange-600',
    Tourism: 'from-blue-500 to-indigo-600',
    Furniture: 'from-purple-500 to-pink-600',
    Services: 'from-indigo-500 to-blue-600',
  };

  const ShopCard = ({ shop }: { shop: Shop }) => {
    const gradient = categoryColors[shop.category] || 'from-gray-500 to-gray-600';
    
    return (
      <Card className="group relative overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
        {/* Top Gradient Bar */}
        <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
        
        <div className="p-5 space-y-4">
          {/* Header Section */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
                  <Store className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white truncate">
                    {shop.name}
                  </h3>
                  <Badge className={`bg-gradient-to-r ${gradient} text-white border-0 text-xs mt-1`}>
                    {shop.category}
                  </Badge>
                </div>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onNavigate('admin/edit-shop', { shop })}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Shop
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(shop.id, shop.name)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Shop
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Shop Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <User className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-500">Owner</p>
                <p className="font-medium text-gray-900 dark:text-white truncate">{shop.owner}</p>
              </div>
            </div>

            {shop.phone && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Phone className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900 dark:text-white truncate">{shop.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <Calendar className="w-4 h-4 text-purple-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-500">Added Date</p>
                <p className="font-medium text-gray-900 dark:text-white truncate">{shop.submittedDate}</p>
              </div>
            </div>

            {shop.location && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <MapPin className="w-4 h-4 text-orange-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-500">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white truncate">{shop.location}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hover Border Glow */}
        <div className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/30 transition-colors duration-300 pointer-events-none`} />
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/30 dark:to-purple-950/30">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 shadow-lg border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onBack}
                className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl dark:text-white flex items-center gap-2">
                    <Store className="w-6 h-6 md:w-7 md:h-7 text-blue-500" />
                    Manage Shops
                  </h1>
                  <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
                    {shops.length} Total
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Add, edit, and manage all shops
                </p>
              </div>
            </div>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 rounded-xl"
              onClick={() => onNavigate('admin/add-shop')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Shop
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search shops by name, category, or owner..."
              className="pl-11 h-11 rounded-xl border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Shops Grid */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredShops.map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
          {filteredShops.length === 0 && (
            <div className="text-center py-16">
              <Store className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {searchQuery ? 'No shops found' : 'No shops yet'}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                {searchQuery ? 'Try a different search term' : 'Click "Add Shop" to create your first shop'}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}