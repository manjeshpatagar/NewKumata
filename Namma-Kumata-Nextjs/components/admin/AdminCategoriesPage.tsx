'use client';

import { useState } from 'react';
import { 
  ArrowLeft, Plus, Edit, Trash2, Tag, TrendingUp, Grid,
  ShoppingBag, Store, Package, Search, MoreVertical, Save,
  X, Check, Sparkles, Upload, Image as ImageIcon
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '../ui/dialog';
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
import { toast } from 'sonner';
import { useRouter } from "next/navigation";


export function AdminCategoriesPage() {
  const [shopCategories, setShopCategories] = useState([
    { id: 1, name: 'Associations', icon: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100&h=100&fit=crop', itemCount: 12, active: true },
    { id: 2, name: 'Cultural Programs', icon: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=100&h=100&fit=crop', itemCount: 8, active: true },
    { id: 3, name: 'Departments', icon: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop', itemCount: 15, active: true },
    { id: 4, name: 'Doctors', icon: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=100&h=100&fit=crop', itemCount: 24, active: true },
    { id: 5, name: 'Emergency Services', icon: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=100&h=100&fit=crop', itemCount: 6, active: true },
    { id: 6, name: 'Hotels', icon: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop', itemCount: 18, active: true },
    { id: 7, name: 'Rent Vehicles', icon: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=100&h=100&fit=crop', itemCount: 10, active: true },
    { id: 8, name: 'Schools & Colleges', icon: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop', itemCount: 22, active: true },
    { id: 9, name: 'Services', icon: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop', itemCount: 35, active: true },
    { id: 10, name: 'Shops', icon: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop', itemCount: 48, active: true },
    { id: 11, name: 'Sports & Equipments', icon: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&h=100&fit=crop', itemCount: 14, active: true },
    { id: 12, name: 'Tourism', icon: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop', itemCount: 20, active: true },
    { id: 13, name: 'Temples', icon: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=100&h=100&fit=crop', itemCount: 16, active: true },
  ]);

  const [adCategories, setAdCategories] = useState([
    { id: 1, name: 'Bikes', icon: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=100&h=100&fit=crop', itemCount: 45, active: true },
    { id: 2, name: 'Cars', icon: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=100&h=100&fit=crop', itemCount: 32, active: true },
    { id: 3, name: 'Home Rentals', icon: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop', itemCount: 28, active: true },
    { id: 4, name: 'Electronics', icon: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop', itemCount: 56, active: true },
    { id: 5, name: 'Furniture', icon: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop', itemCount: 38, active: true },
    { id: 6, name: 'Jobs', icon: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop', itemCount: 64, active: true },
    { id: 7, name: 'Services', icon: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop', itemCount: 42, active: true },
  ]);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('shops');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [newCategory, setNewCategory] = useState({ name: '', icon: '' });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [editImagePreview, setEditImagePreview] = useState<string>('');

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.icon) {
      toast.error('Please fill all fields');
      return;
    }

    const categories = selectedTab === 'shops' ? shopCategories : adCategories;
    const newCat = {
      id: Math.max(...categories.map(c => c.id)) + 1,
      name: newCategory.name,
      icon: newCategory.icon,
      itemCount: 0,
      active: true,
    };

    if (selectedTab === 'shops') {
      setShopCategories([...shopCategories, newCat]);
    } else {
      setAdCategories([...adCategories, newCat]);
    }

    setNewCategory({ name: '', icon: '' });
    setImagePreview('');
    setIsAddDialogOpen(false);
    toast.success('Category added successfully!');
  };

  const handleEditCategory = () => {
    if (!editingCategory?.name || !editingCategory?.icon) {
      toast.error('Please fill all fields');
      return;
    }

    if (selectedTab === 'shops') {
      setShopCategories(shopCategories.map(c => 
        c.id === editingCategory.id ? editingCategory : c
      ));
    } else {
      setAdCategories(adCategories.map(c => 
        c.id === editingCategory.id ? editingCategory : c
      ));
    }

    setIsEditDialogOpen(false);
    setEditingCategory(null);
    toast.success('Category updated successfully!');
  };

  const handleDeleteCategory = (id: number) => {
    if (selectedTab === 'shops') {
      setShopCategories(shopCategories.filter(c => c.id !== id));
    } else {
      setAdCategories(adCategories.filter(c => c.id !== id));
    }
    setDeleteConfirmId(null);
    toast.success('Category deleted successfully');
  };

  const toggleCategoryStatus = (id: number) => {
    if (selectedTab === 'shops') {
      setShopCategories(shopCategories.map(c => 
        c.id === id ? { ...c, active: !c.active } : c
      ));
    } else {
      setAdCategories(adCategories.map(c => 
        c.id === id ? { ...c, active: !c.active } : c
      ));
    }
    toast.success('Category status updated');
  };

  const filteredCategories = (categories: any[]) => {
    return categories.filter(cat =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const CategoryCard = ({ category, type }: { category: any, type: string }) => {
    const gradient = type === 'shops' 
      ? 'from-blue-500 to-indigo-600' 
      : 'from-purple-500 to-pink-600';

    return (
      <Card className="group relative overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
        {/* Top Gradient Bar */}
        <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
        
        <div className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} shadow-lg overflow-hidden flex items-center justify-center`}>
                {category.icon ? (
                  <img 
                    src={category.icon} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white truncate">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.itemCount} items
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={`${
                category.active 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-gray-400 text-white'
              } border-0`}>
                {category.active ? 'Active' : 'Inactive'}
              </Badge>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    setEditingCategory(category);
                    setIsEditDialogOpen(true);
                  }}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Category
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleCategoryStatus(category.id)}>
                    {category.active ? (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Activate
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => setDeleteConfirmId(category.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Category
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 pt-3 border-t dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {category.itemCount} listings
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-emerald-600 dark:text-emerald-400">
                +12% this week
              </span>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const currentCategories = selectedTab === 'shops' ? shopCategories : adCategories;
  const stats = {
    shops: {
      total: shopCategories.length,
      active: shopCategories.filter(c => c.active).length,
      items: shopCategories.reduce((acc, c) => acc + c.itemCount, 0),
    },
    ads: {
      total: adCategories.length,
      active: adCategories.filter(c => c.active).length,
      items: adCategories.reduce((acc, c) => acc + c.itemCount, 0),
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 dark:from-gray-950 dark:via-indigo-950/30 dark:to-purple-950/30">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 shadow-lg border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={()=>router.back()}
                className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl dark:text-white flex items-center gap-2">
                    <Grid className="w-6 h-6 md:w-7 md:h-7 text-indigo-500" />
                    Manage Categories
                  </h1>
                  <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
                    {currentCategories.length} Categories
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Organize and manage content categories
                </p>
              </div>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="dark:bg-gray-900">
                <DialogHeader>
                  <DialogTitle className="dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    Add New Category
                  </DialogTitle>
                </DialogHeader>
                <DialogDescription className="dark:text-gray-400">
                  Add a new category to your platform.
                </DialogDescription>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="icon" className="dark:text-gray-200">Category Icon</Label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Input
                          id="icon"
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/webp"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (e) => {
                                const result = e.target?.result as string;
                                setImagePreview(result);
                                setNewCategory({ ...newCategory, icon: result });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => document.getElementById('icon')?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {imagePreview ? 'Change Icon' : 'Upload Icon (PNG/JPG)'}
                        </Button>
                      </div>
                      {imagePreview && (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm dark:text-gray-200">Icon Preview</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Image ready to upload</p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setImagePreview('');
                              setNewCategory({ ...newCategory, icon: '' });
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="name" className="dark:text-gray-200">Category Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter category name"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddCategory}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                {selectedTab === 'shops' ? stats.shops.total : stats.ads.total}
              </div>
              <div className="text-xs font-medium text-blue-700 dark:text-blue-500">Total Categories</div>
            </Card>
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {selectedTab === 'shops' ? stats.shops.active : stats.ads.active}
              </div>
              <div className="text-xs font-medium text-emerald-700 dark:text-emerald-500">Active</div>
            </Card>
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
              <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                {selectedTab === 'shops' ? stats.shops.items : stats.ads.items}
              </div>
              <div className="text-xs font-medium text-purple-700 dark:text-purple-500">Total Items</div>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search categories..."
              className="pl-11 h-11 rounded-xl border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white dark:bg-gray-900 shadow-md rounded-xl p-1">
              <TabsTrigger value="shops" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
                <Store className="w-4 h-4 mr-2" />
                Shop Categories ({shopCategories.length})
              </TabsTrigger>
              <TabsTrigger value="ads" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Ad Categories ({adCategories.length})
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCategories(currentCategories).map((category) => (
                <CategoryCard key={category.id} category={category} type={selectedTab} />
              ))}
            </div>

            {filteredCategories(currentCategories).length === 0 && (
              <div className="text-center py-16">
                <Tag className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">No categories found</p>
              </div>
            )}
          </Tabs>
        </div>
      </ScrollArea>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="dark:text-white flex items-center gap-2">
              <Edit className="w-5 h-5 text-indigo-500" />
              Edit Category
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="dark:text-gray-400">
            Update the category name and icon.
          </DialogDescription>
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="edit-icon" className="dark:text-gray-200">Category Icon</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Input
                    id="edit-icon"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const result = e.target?.result as string;
                          setEditImagePreview(result);
                          setEditingCategory({ ...editingCategory, icon: result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => document.getElementById('edit-icon')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {editImagePreview ? 'Change Icon' : 'Upload Icon (PNG/JPG)'}
                  </Button>
                </div>
                {(editImagePreview || editingCategory?.icon) && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <img
                        src={editImagePreview || editingCategory?.icon}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm dark:text-gray-200">Current Icon</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{editImagePreview ? 'New image selected' : 'Current category icon'}</p>
                    </div>
                    {editImagePreview && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditImagePreview('');
                          setEditingCategory({ ...editingCategory, icon: editingCategory?.icon });
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="edit-name" className="dark:text-gray-200">Category Name</Label>
              <Input
                id="edit-name"
                value={editingCategory?.name || ''}
                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEditCategory}
              className="bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category and may affect existing listings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteConfirmId && handleDeleteCategory(deleteConfirmId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}