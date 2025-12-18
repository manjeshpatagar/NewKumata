'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeft, Plus, Edit, Trash2, Tag, Grid, Search,
  MoreVertical, Save, X, Check, Upload, Image as ImageIcon,
  Store, ShoppingBag
} from 'lucide-react';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogTrigger, DialogFooter
} from '../ui/dialog';

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '../ui/dropdown-menu';

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from '../ui/alert-dialog';

import { toast } from 'sonner@2.0.3';
import { categoryApi } from '../../lib/api/AdmincategoryApi';


interface AdminCategoriesPageProps {
  onBack: () => void;
}

export function AdminCategoriesPage({ onBack }: AdminCategoriesPageProps) {

  const [shopCategories, setShopCategories] = useState<any[]>([]);
  const [adCategories, setAdCategories] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'shops' | 'ads'>('shops');

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
    const load = async () => {
      try {
        const all = await categoryApi.getAll();

        // SPLIT based on categoryType
        setShopCategories(all.filter((c: any) => c.categoryType === "shop"));
        setAdCategories(all.filter((c: any) => c.categoryType === "ad"));
      } catch (e) {
        console.error(e);
        toast.error("Failed to load categories");
      }
    };
    load();
  }, []);


  /* --------------------------------------------------------
        ADD CATEGORY
  -------------------------------------------------------- */
  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.iconFile) {
      toast.error("Please fill all fields");
      return;
    }

    const categoryType = selectedTab === "shops" ? "shop" : "ad";

    try {
      const created = await categoryApi.create(
        newCategory.name,
        "",
        categoryType,        // ⭐ IMPORTANT
        newCategory.iconFile
      );

      if (selectedTab === "shops") {
        setShopCategories(prev => [created, ...prev]);
      } else {
        setAdCategories(prev => [created, ...prev]);
      }

      toast.success("Category added!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add category");
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
      toast.error("Enter category name");
      return;
    }

    try {
      const updated = await categoryApi.update(
        editingCategory._id,
        editingCategory.name,
        editingCategory.description || "",
        editingCategory.categoryType, // ⭐ keep type same
        editingCategory.isActive,
        editingCategory.iconFile
      );

      if (editingCategory.categoryType === "shop") {
        setShopCategories(prev =>
          prev.map(c => c._id === updated._id ? updated : c)
        );
      } else {
        setAdCategories(prev =>
          prev.map(c => c._id === updated._id ? updated : c)
        );
      }

      toast.success("Category updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update category");
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

      toast.success("Category deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }

    setDeleteConfirmId(null);
  };


  /* --------------------------------------------------------
        TOGGLE ACTIVE STATUS
  -------------------------------------------------------- */
  const toggleStatus = async (category: any) => {
    try {
      const updated = await categoryApi.update(
        category._id,
        category.name,
        category.description || "",
        category.categoryType,
        !category.isActive,
        null
      );

      if (category.categoryType === "shop") {
        setShopCategories(prev =>
          prev.map(c => c._id === updated._id ? updated : c)
        );
      } else {
        setAdCategories(prev =>
          prev.map(c => c._id === updated._id ? updated : c)
        );
      }

      toast.success("Status updated!");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };


  /* --------------------------------------------------------
        FILTER
  -------------------------------------------------------- */
  const filterCats = (list: any[]) =>
    list.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


  /* --------------------------------------------------------
        CATEGORY CARD
  -------------------------------------------------------- */
  const CategoryCard = ({ category }: { category: any }) => {
    return (
      <Card className="group p-5 border shadow-md hover:shadow-xl transition-all">
        <div className="flex items-start justify-between">

          <div className="flex items-center gap-3 flex-1">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center">
              {category.image ? (
                <img src={category.image} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-6 h-6 text-gray-400" />
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-bold dark:text-white">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.categoryType.toUpperCase()}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon"><MoreVertical /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

              <DropdownMenuItem
                onClick={() => {
                  setEditingCategory({
                    ...category,
                    iconFile: null
                  });
                  setEditImagePreview("");
                  setIsEditDialogOpen(true);
                }}
              >
                <Edit className="mr-2" /> Edit
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => toggleStatus(category)}>
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
      </Card>
    );
  };


  const activeList = selectedTab === "shops" ? shopCategories : adCategories;


  /* --------------------------------------------------------
        RETURN UI
  -------------------------------------------------------- */
  return (
    <div className="min-h-screen flex flex-col">

      {/* HEADER */}
     {/* HEADER */}
<div className="sticky top-0 bg-white dark:bg-gray-900 shadow-md p-4 z-50">
  <div className="max-w-7xl mx-auto flex items-center justify-between">

    {/* Back + Title */}
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft />
      </Button>

      <h1 className="text-xl flex items-center gap-2 dark:text-white">
        <Grid className="text-indigo-500" />
        Manage Categories
      </h1>
    </div>

    {/* ALWAYS VISIBLE ADD BUTTON */}
    <Button
      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl px-4 py-2 shadow-lg hover:scale-105 transition"
      onClick={() => setIsAddDialogOpen(true)}
    >
      <Plus className="mr-2" size={18} />
      Add Category
    </Button>
  </div>

  {/* SEARCH BAR */}
  <div className="relative max-w-7xl mx-auto mt-4">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    <Input
      className="pl-10 h-11 rounded-xl"
      placeholder="Search categories..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
</div>



      {/* MAIN CONTENT */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto p-4">

          <Tabs value={selectedTab} onValueChange={(v: any) => setSelectedTab(v)}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="shops"><Store className="mr-2" /> Shop Categories</TabsTrigger>
              <TabsTrigger value="ads"><ShoppingBag className="mr-2" /> Ad Categories</TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {filterCats(activeList).map(cat => (
                <CategoryCard key={cat._id} category={cat} />
              ))}
            </div>

            {filterCats(activeList).length === 0 && (
              <div className="text-center py-16">
                <Tag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No categories found</p>
              </div>
            )}

          </Tabs>
        </div>
      </ScrollArea>


      {/* ADD CATEGORY */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Category</DialogTitle></DialogHeader>

          <div className="space-y-4">

            <div>
              <Label>Icon Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
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


      {/* EDIT CATEGORY */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Category</DialogTitle></DialogHeader>

          {editingCategory && (
            <div className="space-y-4">

              <div>
                <Label>Change Icon</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => setEditImagePreview(ev.target?.result as string);
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
                  value={editingCategory.name}
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
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditCategory}><Save className="mr-2" /> Save</Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>


      {/* DELETE CONFIRM */}
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
