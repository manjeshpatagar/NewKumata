"use client";

import { useState, useMemo } from "react";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Tag,
  TrendingUp,
  Grid,
  Store,
  Package,
  Search,
  MoreVertical,
  Save,
  X,
  Check,
  Sparkles,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { subCategoryApi } from "@/lib/api/subCategoryApi";

type BackendCategory = {
  _id: string;
  name: string;
  type?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
};

type BackendSubCategory = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  categoryId: string;
  isActive?: boolean;
};

type Category = {
  id: string;
  name: string;
};

type SubCategory = {
  id: string;
  name: string;
  icon: string;
  description?: string;
  itemCount: number; // UI only
  active: boolean;
  categoryId: string;
};

type AdminSubCategoriesPageProps = {
  initialCategories: BackendCategory[];
  initialSubCategories: BackendSubCategory[];
};

export function AdminSubCategoriesPage({
  initialCategories,
  initialSubCategories,
}: AdminSubCategoriesPageProps) {
  const router = useRouter();

  // 🔹 Parent Categories (business categories from backend)
  const [categories] = useState<Category[]>(
    () =>
      (initialCategories || []).map((c) => ({
        id: c._id,
        name: c.name,
      })) || []
  );

  // 🔹 Subcategories mapped to UI shape
  const [subCategories, setSubCategories] = useState<SubCategory[]>(
    () =>
      (initialSubCategories || []).map((s) => ({
        id: s._id,
        name: s.name,
        icon: s.image || "",
        description: s.description || "",
        itemCount: 0, // UI-only; not stored in DB
        active: s.isActive ?? true,
        categoryId: s.categoryId,
      })) || []
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab] = useState("shops"); // keep structure same
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    categories[0]?.id ?? ""
  );

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [editingSubCategory, setEditingSubCategory] =
    useState<SubCategory | null>(null);

  const [newSubCategory, setNewSubCategory] = useState<{
    name: string;
    icon: string;
    description: string;
    categoryId: string | "";
  }>({
    name: "",
    icon: "",
    description: "",
    categoryId: "",
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [editImagePreview, setEditImagePreview] = useState<string>("");

  // Store File objects for upload
  const [newIconFile, setNewIconFile] = useState<File | null>(null);
  const [editIconFile, setEditIconFile] = useState<File | null>(null);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  /* -----------------------------
   ➕ Add Sub-category (API)
  ----------------------------- */
  const handleAddSubCategory = async () => {
    try {
      const categoryId =
        (newSubCategory.categoryId as string) || selectedCategoryId;

      if (!newSubCategory.name || !categoryId) {
        toast.error("Please fill all required fields");
        return;
      }

      const formData = new FormData();
      formData.append("name", newSubCategory.name);
      if (newSubCategory.description) {
        formData.append("description", newSubCategory.description);
      }
      formData.append("categoryId", categoryId);
      if (newIconFile) {
        formData.append("image", newIconFile);
      }

      const res = await subCategoryApi.create(formData);
      const created: BackendSubCategory = (res as any)?.data ?? res;

      const uiSub: SubCategory = {
        id: created._id,
        name: created.name,
        icon: created.image || "",
        description: created.description || "",
        itemCount: 0,
        active: created.isActive ?? true,
        categoryId: created.categoryId,
      };

      setSubCategories((prev) => [...prev, uiSub]);

      setNewSubCategory({
        name: "",
        icon: "",
        description: "",
        categoryId: "",
      });
      setImagePreview("");
      setNewIconFile(null);
      setIsAddDialogOpen(false);
      toast.success("Sub-category added successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to add sub-category");
    }
  };

  /* -----------------------------
   ✏️ Edit Sub-category (API)
  ----------------------------- */
  const handleEditSubCategory = async () => {
    if (!editingSubCategory) return;
    try {
      if (!editingSubCategory.name) {
        toast.error("Please fill all required fields");
        return;
      }

      const formData = new FormData();
      formData.append("name", editingSubCategory.name);
      if (editingSubCategory.description) {
        formData.append("description", editingSubCategory.description);
      }
      formData.append("categoryId", editingSubCategory.categoryId);
      // we map active → isActive in backend
      formData.append("isActive", String(editingSubCategory.active));
      if (editIconFile) {
        formData.append("image", editIconFile);
      }

      const res = await subCategoryApi.update(editingSubCategory.id, formData);
      const updated: BackendSubCategory = (res as any)?.data ?? res;

      setSubCategories((prev) =>
        prev.map((s) =>
          s.id === editingSubCategory.id
            ? {
                ...s,
                name: updated.name,
                icon: updated.image || s.icon,
                description: updated.description || "",
                categoryId: updated.categoryId,
                // keep active from state (backend can also handle isActive if needed)
                active: editingSubCategory.active,
              }
            : s
        )
      );

      setIsEditDialogOpen(false);
      setEditingSubCategory(null);
      setEditImagePreview("");
      setEditIconFile(null);
      toast.success("Sub-category updated successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "Failed to update sub-category"
      );
    }
  };

  /* -----------------------------
   🗑️ Delete Sub-category (API)
  ----------------------------- */
  const handleDeleteSubCategory = async (id: string) => {
    try {
      await subCategoryApi.delete(id);
      setSubCategories((prev) => prev.filter((s) => s.id !== id));
      setDeleteConfirmId(null);
      toast.success("Sub-category deleted successfully");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "Failed to delete sub-category"
      );
    }
  };

  /* -----------------------------
   🔁 Toggle Active/Inactive (local + optional API)
  ----------------------------- */
  const toggleSubCategoryStatus = async (id: string) => {
    const target = subCategories.find((s) => s.id === id);
    if (!target) return;

    const newActive = !target.active;

    // Optimistic UI
    setSubCategories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: newActive } : s))
    );

    try {
      const formData = new FormData();
      formData.append("isActive", String(newActive));
      const res = await subCategoryApi.update(id, formData);
      // if backend responds ok, nothing more to do
      toast.success("Sub-category status updated");
    } catch (err: any) {
      console.error(err);
      // revert if failed
      setSubCategories((prev) =>
        prev.map((s) => (s.id === id ? { ...s, active: !newActive } : s))
      );
      toast.error(err?.response?.data?.message || "Failed to update status");
    }
  };

  /* -----------------------------
   🧮 Card component
  ----------------------------- */
  const SubCategoryCard = ({ subCategory }: { subCategory: SubCategory }) => {
    const gradient = "from-blue-500 to-indigo-600";
    const parent = categories.find((c) => c.id === subCategory.categoryId);

    return (
      <Card className="group relative overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
        {/* Top Gradient Bar */}
        <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

        <div className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} shadow-lg overflow-hidden flex items-center justify-center`}
              >
                {subCategory.icon ? (
                  <img
                    src={subCategory.icon}
                    alt={subCategory.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white truncate">
                  {subCategory.name}
                </h3>
                {parent && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Under: {parent.name}
                  </p>
                )}
                {subCategory.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {subCategory.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                className={`${
                  subCategory.isActive
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-400 text-white"
                } border-0`}
              >
                {subCategory.isActive ? "Active" : "Inactive"}
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setEditingSubCategory(subCategory);
                      setEditImagePreview("");
                      setEditIconFile(null);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Sub-Category
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => toggleSubCategoryStatus(subCategory.id)}
                  >
                    {subCategory.active ? (
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
                    onClick={() => setDeleteConfirmId(subCategory.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Sub-Category
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
                {subCategory.itemCount} listings
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
                onClick={() => router.back()}
                className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl md:text-3xl dark:text-white flex items-center gap-2">
                    <Grid className="w-6 h-6 md:w-7 md:h-7 text-indigo-500" />
                    Manage Sub-Categories
                  </h1>
                  <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
                    {initialSubCategories.length} Sub-Categories
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Organize and manage sub-categories under your business
                  categories
                </p>
              </div>
            </div>

            {/* Category Selector + Add Button */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <Label className="text-xs mb-1 text-gray-600 dark:text-gray-300">
                  Parent Category
                </Label>
                <select
                  className="border rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Sub-Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="dark:bg-gray-900">
                  <DialogHeader>
                    <DialogTitle className="dark:text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-500" />
                      Add New Sub-Category
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="dark:text-gray-400">
                    Add a new sub-category and assign it to a parent category.
                  </DialogDescription>

                  <div className="space-y-4 pt-4">
                    {/* Parent Category select */}
                    <div>
                      <Label className="dark:text-gray-200">
                        Parent Category
                      </Label>
                      <select
                        className="mt-1 w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
                        value={
                          newSubCategory.categoryId || selectedCategoryId || ""
                        }
                        onChange={(e) =>
                          setNewSubCategory((prev) => ({
                            ...prev,
                            categoryId: e.target.value,
                          }))
                        }
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Icon upload */}
                    <div>
                      <Label htmlFor="icon" className="dark:text-gray-200">
                        Sub-Category Icon
                      </Label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Input
                            id="icon"
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setNewIconFile(file);
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  const result = ev.target?.result as string;
                                  setImagePreview(result);
                                  setNewSubCategory((prev) => ({
                                    ...prev,
                                    icon: result,
                                  }));
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
                            onClick={() =>
                              document.getElementById("icon")?.click()
                            }
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            {imagePreview
                              ? "Change Icon"
                              : "Upload Icon (PNG/JPG)"}
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
                              <p className="text-sm dark:text-gray-200">
                                Icon Preview
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Image ready to upload
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setImagePreview("");
                                setNewIconFile(null);
                                setNewSubCategory((prev) => ({
                                  ...prev,
                                  icon: "",
                                }));
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <Label htmlFor="name" className="dark:text-gray-200">
                        Sub-Category Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter sub-category name"
                        value={newSubCategory.name}
                        onChange={(e) =>
                          setNewSubCategory((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <Label
                        htmlFor="description"
                        className="dark:text-gray-200"
                      >
                        Description (optional)
                      </Label>
                      <Input
                        id="description"
                        placeholder="Short description"
                        value={newSubCategory.description}
                        onChange={(e) =>
                          setNewSubCategory((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddSubCategory}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Sub-Category
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                {initialSubCategories.length}
              </div>
              <div className="text-xs font-medium text-blue-700 dark:text-blue-500">
                Total Sub-Categories
              </div>
            </Card>
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {initialSubCategories.filter((sub) => sub.isActive).length}
              </div>
              <div className="text-xs font-medium text-emerald-700 dark:text-emerald-500">
                Active
              </div>
            </Card>
            <Card className="p-3 text-center border-0 shadow-md bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
              <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                {initialSubCategories.filter((sub) => !sub.isActive).length}
              </div>
              <div className="text-xs font-medium text-purple-700 dark:text-purple-500">
                Inactive
              </div>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder={`Search sub-categories in "${
                selectedCategory?.name ?? "Category"
              }"...`}
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
          <Tabs value={selectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-1 mb-6 bg-white dark:bg-gray-900 shadow-md rounded-xl p-1">
              <TabsTrigger
                value="shops"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
              >
                <Store className="w-4 h-4 mr-2" />
                Sub-Categories ({initialSubCategories.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="shops">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {initialSubCategories.map((sub) => (
                  <SubCategoryCard key={sub.id} subCategory={sub} />
                ))}
              </div>

              {initialSubCategories.length === 0 && (
                <div className="text-center py-16">
                  <Tag className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No sub-categories found for this category
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="dark:text-white flex items-center gap-2">
              <Edit className="w-5 h-5 text-indigo-500" />
              Edit Sub-Category
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="dark:text-gray-400">
            Update the sub-category details.
          </DialogDescription>

          {editingSubCategory && (
            <div className="space-y-4 pt-4">
              {/* Parent Category Select */}
              <div>
                <Label className="dark:text-gray-200">Parent Category</Label>
                <select
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  value={editingSubCategory.categoryId}
                  onChange={(e) =>
                    setEditingSubCategory((prev) =>
                      prev ? { ...prev, categoryId: e.target.value } : prev
                    )
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Icon */}
              <div>
                <Label htmlFor="edit-icon" className="dark:text-gray-200">
                  Sub-Category Icon
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Input
                      id="edit-icon"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setEditIconFile(file);
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const result = ev.target?.result as string;
                            setEditImagePreview(result);
                            setEditingSubCategory((prev) =>
                              prev ? { ...prev, icon: result } : prev
                            );
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
                      onClick={() =>
                        document.getElementById("edit-icon")?.click()
                      }
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {editImagePreview
                        ? "Change Icon"
                        : "Upload Icon (PNG/JPG)"}
                    </Button>
                  </div>
                  {(editImagePreview || editingSubCategory.icon) && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <img
                          src={editImagePreview || editingSubCategory.icon}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm dark:text-gray-200">
                          Current Icon
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {editImagePreview
                            ? "New image selected"
                            : "Current sub-category icon"}
                        </p>
                      </div>
                      {editImagePreview && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditImagePreview("");
                            setEditIconFile(null);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="edit-name" className="dark:text-gray-200">
                  Sub-Category Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingSubCategory.name}
                  onChange={(e) =>
                    setEditingSubCategory((prev) =>
                      prev ? { ...prev, name: e.target.value } : prev
                    )
                  }
                />
              </div>

              {/* Description */}
              <div>
                <Label
                  htmlFor="edit-description"
                  className="dark:text-gray-200"
                >
                  Description
                </Label>
                <Input
                  id="edit-description"
                  value={editingSubCategory.description || ""}
                  onChange={(e) =>
                    setEditingSubCategory((prev) =>
                      prev ? { ...prev, description: e.target.value } : prev
                    )
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditSubCategory}
              className="bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteConfirmId !== null}
        onOpenChange={() => setDeleteConfirmId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Sub-Category?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              sub-category and may affect existing listings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteConfirmId && handleDeleteSubCategory(deleteConfirmId)
              }
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
