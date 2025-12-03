'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Plus, Edit, Trash2, Tag, TrendingUp, Grid,
  ShoppingBag, Store, Package, Search, MoreVertical, Save,
  X, Check, Upload, Image as ImageIcon
} from 'lucide-react';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

import { toast } from 'sonner@2.0.3';
import { categoryApi } from '../../lib/api/categoryApi';

interface AdminCategoriesPageProps {
  onBack: () => void;
}

export function AdminCategoriesPage({ onBack }: AdminCategoriesPageProps) {

  const [shopCategories, setShopCategories] = useState<any[]>([]);
  const [adCategories, setAdCategories] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('shops');

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [editingCategory, setEditingCategory] = useState<any>(null);

  const [newCategory, setNewCategory] = useState({
    name: '',
    iconFile: null as File | null
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [editImagePreview, setEditImagePreview] = useState<string>('');


  /* --------------------------------------------------------
        FETCH CATEGORIES
  -------------------------------------------------------- */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await categoryApi.getAll();
        setShopCategories(categories);
        setAdCategories(categories);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load categories');
      }
    };
    loadCategories();
  }, []);


  /* --------------------------------------------------------
        ADD CATEGORY
  -------------------------------------------------------- */
  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.iconFile) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const created = await categoryApi.create(
        newCategory.name,
        "",
        newCategory.iconFile
      );

      if (selectedTab === "shops") {
        setShopCategories(prev => [created, ...prev]);
      } else {
        setAdCategories(prev => [created, ...prev]);
      }

      toast.success("Category created!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create category");
    }

    setImagePreview("");
    setNewCategory({ name: "", iconFile: null });
    setIsAddDialogOpen(false);
  };


  /* --------------------------------------------------------
        EDIT CATEGORY
  -------------------------------------------------------- */
  const handleEditCategory = async () => {
    if (!editingCategory?.name) {
      toast.error("Please enter name");
      return;
    }

    try {
      const updated = await categoryApi.update(
        editingCategory._id,
        editingCategory.name,
        editingCategory.description || "",
        editingCategory.isActive,
        editingCategory.iconFile
      );

      setShopCategories(prev =>
        prev.map(c => c._id === updated._id ? updated : c)
      );

      setAdCategories(prev =>
        prev.map(c => c._id === updated._id ? updated : c)
      );

      toast.success("Category updated!");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }

    setIsEditDialogOpen(false);
  };


  /* --------------------------------------------------------
        DELETE CATEGORY
  -------------------------------------------------------- */
  const handleDeleteCategory = async (id: string) => {
    try {
      await categoryApi.delete(id);

      setShopCategories(prev => prev.filter(c => c._id !== id));
      setAdCategories(prev => prev.filter(c => c._id !== id));

      toast.success("Deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }

    setDeleteConfirmId(null);
  };


  /* --------------------------------------------------------
        TOGGLE ACTIVE
  -------------------------------------------------------- */
  const toggleCategoryStatus = async (category: any) => {
    const newStatus = !category.isActive;

    try {
      const updated = await categoryApi.update(
        category._id,
        category.name,
        category.description || "",
        newStatus,
        null
      );

      setShopCategories(prev =>
        prev.map(c => c._id === updated._id ? updated : c)
      );

      setAdCategories(prev =>
        prev.map(c => c._id === updated._id ? updated : c)
      );

      toast.success(
        newStatus ? "Category Activated" : "Category Deactivated"
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };


  /* --------------------------------------------------------
        FILTER
  -------------------------------------------------------- */
  const filteredCategories = (cats: any[]) =>
    cats.filter(cat =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


  /* --------------------------------------------------------
        CATEGORY CARD
  -------------------------------------------------------- */
  const CategoryCard = ({ category, type }: { category: any; type: string }) => {
    const gradient =
      type === 'shops'
        ? 'from-blue-500 to-indigo-600'
        : 'from-purple-500 to-pink-600';

    return (
      <Card className="group relative overflow-hidden border shadow-lg hover:shadow-2xl transition-all">
        <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

        <div className="p-5 space-y-4">

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} overflow-hidden flex items-center justify-center`}>
                {category.image ? (
                  <img src={category.image} className="w-full h-full object-cover" />
                ) : <ImageIcon className="w-6 h-6 text-white" />}
              </div>

              <div className="flex-1">
                <h3 className="font-bold truncate dark:text-white">{category.name}</h3>
                <p className="text-sm text-gray-500">0 items</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={category.isActive ? 'bg-emerald-500' : 'bg-gray-400'}>
                {category.isActive ? 'Active' : 'Inactive'}
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon"><MoreVertical /></Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>

                  <DropdownMenuItem
                    onClick={() => {
                      setEditingCategory({
                        ...category,
                        iconFile: null,
                        isActive: category.isActive
                      });
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="mr-2" /> Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => toggleCategoryStatus(category)}>
                    {category.isActive ? <><X className="mr-2" /> Deactivate</> : <><Check className="mr-2" /> Activate</>}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => setDeleteConfirmId(category._id)}
                  >
                    <Trash2 className="mr-2" /> Delete
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

        </div>
      </Card>
    );
  };


  const currentCategories = selectedTab === "shops" ? shopCategories : adCategories;


  return (
    <div className="min-h-screen flex flex-col">

      {/* HEADER */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 shadow-lg p-4 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft />
            </Button>

            <h1 className="text-2xl flex items-center gap-2 dark:text-white">
              <Grid className="text-indigo-500" />
              Manage Categories
            </h1>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl">
                <Plus className="mr-2" /> Add Category
              </Button>
            </DialogTrigger>

            <DialogContent className="dark:bg-gray-900">
              <DialogHeader><DialogTitle>Add Category</DialogTitle></DialogHeader>

              <div className="space-y-4">

                <div>
                  <Label>Category Icon</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => setImagePreview(e.target?.result as string);
                        reader.readAsDataURL(file);

                        setNewCategory(prev => ({ ...prev, iconFile: file }));
                      }
                    }}
                  />

                  {imagePreview && <img src={imagePreview} className="w-24 h-24 mt-3 rounded border" />}
                </div>

                <div>
                  <Label>Name</Label>
                  <Input
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  />
                </div>

              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddCategory}>Add</Button>
              </DialogFooter>

            </DialogContent>
          </Dialog>

        </div>

        {/* SEARCH */}
        <div className="relative max-w-7xl mx-auto mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>


      {/* MAIN CONTENT */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto p-4">

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="shops"><Store className="mr-2" /> Shop Categories</TabsTrigger>
              <TabsTrigger value="ads"><ShoppingBag className="mr-2" /> Ad Categories</TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {filteredCategories(currentCategories).map(cat => (
                <CategoryCard key={cat._id} category={cat} type={selectedTab} />
              ))}
            </div>

            {filteredCategories(currentCategories).length === 0 && (
              <div className="text-center py-16">
                <Tag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No categories found</p>
              </div>
            )}

          </Tabs>
        </div>
      </ScrollArea>


      {/* EDIT CATEGORY DIALOG */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="dark:bg-gray-900">
          <DialogHeader><DialogTitle>Edit Category</DialogTitle></DialogHeader>

          {editingCategory && (
            <div className="space-y-4">

              <div>
                <Label>Category Icon</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) =>
                        setEditImagePreview(ev.target?.result as string);

                      reader.readAsDataURL(file);

                      setEditingCategory((prev: any) => ({
                        ...prev,
                        iconFile: file
                      }));
                    }
                  }}
                />

                <img
                  src={editImagePreview || editingCategory.image}
                  className="w-24 h-24 mt-3 rounded border"
                />
              </div>

              <div>
                <Label>Name</Label>
                <Input
                  value={editingCategory?.name || ""}
                  onChange={(e) =>
                    setEditingCategory((prev: any) => ({
                      ...prev,
                      name: e.target.value
                    }))
                  }
                />
              </div>

            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCategory}>
              <Save className="mr-2" /> Save
            </Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>


      {/* DELETE CONFIRMATION */}
      <AlertDialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600"
              onClick={() => deleteConfirmId && handleDeleteCategory(deleteConfirmId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
