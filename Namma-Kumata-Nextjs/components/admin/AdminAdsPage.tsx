'use client';

import { useState } from 'react';
import { 
  ArrowLeft, Search, Filter, Check, X, Eye, Trash2, Star, Plus, Edit,
  ShoppingBag, Calendar, MapPin, User, TrendingUp, Sparkles, Zap,
  DollarSign, Tag, MoreVertical, Award
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Checkbox } from '../ui/checkbox';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { AdminApproveAdDialog } from './AdminApproveAdDialog';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAdmin } from '../../contexts/AdminContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { adCategories } from '../../lib/advertisementData';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";




export function AdminAdsPage() {
  const router = useRouter();

  const { t } = useLanguage();
  const { ads, approveAd, rejectAd, deleteAd, editAd } = useAdmin();
  // const { ads, approveAdWithPrice, rejectAd, deleteAd, editAd } = useAdmin(); // Old payment-based approval
  const { sendAdApprovalNotification, sendNewAdNotification } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'approved'>('pending');
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [selectedAdForApproval, setSelectedAdForApproval] = useState<any>(null);

  const handleApproveClick = (ad: any) => {
    setSelectedAdForApproval(ad);
    setApproveDialogOpen(true);
  };

  const handleApproveWithPrice = () => {
    // Simplified approval - no payment required
    if (!selectedAdForApproval) return;
    
    approveAd(selectedAdForApproval.id);
    sendAdApprovalNotification(selectedAdForApproval.title, true);
    toast.success(`✅ Ad "${selectedAdForApproval.title}" approved and is now live!`);
    
    /* OLD PAYMENT-BASED APPROVAL - COMMENTED OUT FOR FUTURE USE
    approveAdWithPrice(selectedAdForApproval.id, price);
    sendAdApprovalNotification(selectedAdForApproval.title, true);
    toast.success(`Ad approved with price ₹${price}. User notified to make payment.`);
    */
  };

  const handleReject = (adId: string) => {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;

    rejectAd(adId);
    sendAdApprovalNotification(ad.title, false);
    toast.success('Advertisement rejected');
  };

  const handleDelete = (adId: string) => {
    deleteAd(adId);
    toast.success('Advertisement deleted');
  };

  const toggleSponsored = (adId: string) => {
    const ad = ads.find(a => a.id === adId);
    editAd(adId, { sponsored: !ad?.sponsored });
    toast.success(ad?.sponsored ? 'Removed from sponsored' : 'Marked as sponsored');
  };

  const toggleFeatured = (adId: string) => {
    const ad = ads.find(a => a.id === adId);
    editAd(adId, { featured: !ad?.featured });
    toast.success(ad?.featured ? 'Removed from featured' : 'Marked as featured');
  };

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (ad.description && ad.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedTab === 'approved') return matchesSearch && ad.status === 'approved';
    if (selectedTab === 'pending') return matchesSearch && ad.status === 'pending';
    return matchesSearch;
  });

  const stats = {
    total: ads.length,
    approved: ads.filter(ad => ad.status === 'approved').length,
    pending: ads.filter(ad => ad.status === 'pending').length,
    featured: ads.filter(ad => ad.featured).length,
    sponsored: ads.filter(ad => ad.sponsored).length,
  };

  const categoryGradients: Record<string, string> = {
    bikes: 'from-blue-500 to-cyan-600',
    cars: 'from-purple-500 to-pink-600',
    electronics: 'from-indigo-500 to-blue-600',
    furniture: 'from-amber-500 to-orange-600',
    'home-rentals': 'from-emerald-500 to-teal-600',
    jobs: 'from-rose-500 to-red-600',
    services: 'from-violet-500 to-purple-600',
  };

  const AdCard = ({ ad }: { ad: any }) => {
    const category = adCategories.find(cat => cat.id === ad.category);
    const gradient = categoryGradients[ad.category] || 'from-gray-500 to-gray-600';
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    
    return (
      <Card className="group relative overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
        {/* Top Gradient Bar */}
        <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
        
        <div className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge className={`bg-gradient-to-r ${gradient} text-white border-0 text-xs`}>
                  {category?.emoji} {category?.name}
                </Badge>
                <Badge className={`text-xs ${
                  ad.status === 'approved'
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-amber-500 text-white'
                }`}>
                  {ad.status === 'approved' ? 'Approved' : 'Pending'}
                </Badge>
                {ad.featured && (
                  <Badge className="text-xs bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {ad.sponsored && (
                  <Badge className="text-xs bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-0">
                    <Zap className="w-3 h-3 mr-1" />
                    Sponsored
                  </Badge>
                )}
              </div>
              <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white line-clamp-2">
                {ad.title}
              </h3>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push(`/AdminEditAdPage/${ad.id}`)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Ad
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Ad
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {ad.description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <DollarSign className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Price</p>
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {ad.price || ad.salary || 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <User className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Posted By</p>
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {ad.postedBy}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <Calendar className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Posted On</p>
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {new Date(ad.postedOn).toLocaleDateString()}
                </p>
              </div>
            </div>

            {ad.location && (
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <MapPin className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Location</p>
                  <p className="font-semibold text-gray-900 dark:text-white truncate">
                    {ad.location}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-4 pt-3 border-t dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`featured-${ad.id}`}
                checked={ad.featured || false}
                onCheckedChange={() => toggleFeatured(ad.id)}
              />
              <label htmlFor={`featured-${ad.id}`} className="text-sm cursor-pointer text-gray-700 dark:text-gray-300">
                <Sparkles className="w-3 h-3 inline mr-1" />
                Featured
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id={`sponsored-${ad.id}`}
                checked={ad.sponsored || false}
                onCheckedChange={() => toggleSponsored(ad.id)}
              />
              <label htmlFor={`sponsored-${ad.id}`} className="text-sm cursor-pointer text-gray-700 dark:text-gray-300">
                <Zap className="w-3 h-3 inline mr-1" />
                Sponsored
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          {ad.status !== 'approved' ? (
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl"
                onClick={() => handleApproveClick(ad)}
              >
                <Check className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-red-600 border-red-300 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
                onClick={() => handleReject(ad.id)}
              >
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                Approved and Live
              </span>
            </div>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Advertisement?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the advertisement "{ad.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => {
                  handleDelete(ad.id);
                  setShowDeleteDialog(false);
                }} 
                className="bg-red-600 hover:bg-red-700"
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 dark:from-gray-950 dark:via-purple-950/30 dark:to-pink-950/30">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 shadow-lg border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-5">
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
                  <h1 className="text-2xl md:text-3xl dark:text-white flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 md:w-7 md:h-7 text-purple-500" />
                    Manage Advertisements
                  </h1>
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                    {stats.total} Total
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Review and manage advertisement submissions
                </p>
              </div>
            </div>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 rounded-xl"
              onClick={() => router.push('/AdminAddAdPage')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Advertisement
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{stats.total}</div>
              <div className="text-xs font-medium text-blue-700 dark:text-blue-500">Total</div>
            </Card>
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
              <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{stats.pending}</div>
              <div className="text-xs font-medium text-amber-700 dark:text-amber-500">Pending</div>
            </Card>
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{stats.approved}</div>
              <div className="text-xs font-medium text-emerald-700 dark:text-emerald-500">Approved</div>
            </Card>
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30">
              <div className="text-2xl font-extrabold text-pink-600 dark:text-pink-400">{stats.featured}</div>
              <div className="text-xs font-medium text-pink-700 dark:text-pink-500">Featured</div>
            </Card>
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30">
              <div className="text-2xl font-extrabold text-yellow-600 dark:text-yellow-400">{stats.sponsored}</div>
              <div className="text-xs font-medium text-yellow-700 dark:text-yellow-500">Sponsored</div>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search ads by title, description, or category..."
              className="pl-11 h-11 rounded-xl border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
          <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-white dark:bg-gray-900 shadow-md rounded-xl p-1">
              <TabsTrigger value="pending" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white">
                <Tag className="w-4 h-4 mr-2" />
                Pending ({stats.pending})
              </TabsTrigger>
              <TabsTrigger value="approved" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white">
                <Check className="w-4 h-4 mr-2" />
                Approved ({stats.approved})
              </TabsTrigger>
              <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
                <Filter className="w-4 h-4 mr-2" />
                All ({stats.total})
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAds.length > 0 ? (
                filteredAds.map((ad) => <AdCard key={ad.id} ad={ad} />)
              ) : (
                <div className="col-span-full text-center py-16">
                  <Filter className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No advertisements found</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </ScrollArea>

      {/* Approve Ad Dialog */}
      <AdminApproveAdDialog
        open={approveDialogOpen}
        onOpenChange={setApproveDialogOpen}
        ad={selectedAdForApproval}
        onApprove={handleApproveWithPrice}
      />
    </div>
  );
}