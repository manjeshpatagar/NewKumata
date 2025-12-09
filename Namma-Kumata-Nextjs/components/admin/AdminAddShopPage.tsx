'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Store, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { productApi } from "@/lib/api/productApi";
import { categoryApi } from "@/lib/api/categoryApi";
import { subCategoryApi } from "@/lib/api/subCategoryApi";

export function AdminAddShopPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<{ id: string; name: string; type?: string }[]>([]);
  const [subCategories, setSubCategories] = useState<{ id: string; name: string; categoryId?: string }[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subCategory: '',
    owner: '',
    phone: '',
    address: '',
    description: '',
    openingHours: '',
    status: 'approved' as 'pending' | 'approved' | 'rejected',
  });

  

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load categories from API
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      toast.error("Please login as admin to add shops");
      router.push("/admin-login");
      return;
    }
    setAuthorized(true);

    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const res = await categoryApi.getAll();
        const payload = res.data || res;
        const list = (payload.data || payload) as any[];
        const normalized = list.map((cat) => ({
          id: cat._id || cat.id,
          name: cat.name,
          type: cat.type,
        }));
        setCategories(normalized);
      } catch (error) {
        console.error("Failed to load categories", error);
        toast.error("Could not load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Load subcategories once
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        setLoadingSubCategories(true);
        const res = await subCategoryApi.getAll();
        const payload = res.data || res;
        const list = (payload.data || payload) as any[];
        const normalized = list.map((sub) => ({
          id: sub._id || sub.id,
          name: sub.name,
          categoryId: sub.categoryId?._id || sub.categoryId,
        }));
        setSubCategories(normalized);
      } catch (error) {
        console.error("Failed to load subcategories", error);
        toast.error("Could not load subcategories");
      } finally {
        setLoadingSubCategories(false);
      }
    };
    fetchSubCategories();
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // VALIDATION
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Shop name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.owner.trim()) newErrors.owner = 'Owner name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ⭐ SUBMIT TO API
  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const form = new FormData();

      form.append("shopName", formData.name);
      form.append("address", formData.address);
      if (formData.description) form.append("description", formData.description);
      if (formData.owner) form.append("contact[ownerName]", formData.owner);
      if (formData.phone) form.append("contact[phone]", formData.phone);
      if (formData.openingHours) {
        form.append("openingHours[open]", formData.openingHours);
        form.append("openingHours[close]", "");
      }
      if (formData.category) form.append("categoryId", formData.category);
      if (formData.subCategory) form.append("subCategoryId", formData.subCategory);

      const statusPayload =
        formData.status === "approved" ? "active" : "inactive";
      form.append("status", statusPayload);

      images.forEach((file) => form.append("images", file));

      await productApi.create(form); // ⭐ Create Product/Shop

      toast.success("Shop added successfully!");
      router.push("/AdminAddShop"); // back to manage list
    } catch (error: any) {
      toast.error("Failed to add shop");
      console.error(error);
    }
  };

  // IMAGE UPLOAD
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const newPreviews: string[] = [];

    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === newFiles.length) {
          setImagePreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setImages(prev => [...prev, ...newFiles]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // RESET FORM
  const handleReset = () => {
    setFormData({
      name: '',
      category: '',
      subCategory: '',
      owner: '',
      phone: '',
      address: '',
      description: '',
      openingHours: '',
      status: 'approved',
    });
    setImages([]);
    setImagePreviews([]);
    setErrors({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">

      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <div>
              <h1 className="dark:text-white">Add New Shop</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Create a new shop listing
              </p>
            </div>
          </div>

          <Store className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      {/* FORM */}
      <ScrollArea className="flex-1">
        <div className="p-4 pb-6 max-w-4xl mx-auto w-full">
          <Card className="p-6 dark:bg-gray-900 dark:border-gray-800">
            <div className="space-y-6">

              {/* NAME */}
              <div className="space-y-2">
                <Label htmlFor="name">Shop Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter shop name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </div>

              {/* CATEGORY */}
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder={loadingCategories ? "Loading..." : "Select category"} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
              </div>

              {/* SUBCATEGORY (required for business categories) */}
              {categories.find((c) => c.id === formData.category && c.type === "business") && (
                <div className="space-y-2">
                  <Label>Subcategory *</Label>
                  <Select
                    value={formData.subCategory}
                    onValueChange={(value) => handleChange("subCategory", value)}
                  >
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder={loadingSubCategories ? "Loading..." : "Select subcategory"} />
                    </SelectTrigger>
                    <SelectContent>
                      {subCategories
                        .filter((s) => s.categoryId === formData.category)
                        .map((sub) => (
                          <SelectItem key={sub.id} value={sub.id}>
                            {sub.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {!formData.subCategory && (
                    <p className="text-xs text-gray-500">
                      Required for business categories
                    </p>
                  )}
                </div>
              )}

              {/* OWNER */}
              <div className="space-y-2">
                <Label>Owner *</Label>
                <Input
                  placeholder="Enter owner name"
                  value={formData.owner}
                  onChange={(e) => handleChange("owner", e.target.value)}
                  className={errors.owner ? "border-red-500" : ""}
                />
                {errors.owner && <p className="text-red-500 text-xs">{errors.owner}</p>}
              </div>

              {/* PHONE */}
              <div className="space-y-2">
                <Label>Phone *</Label>
                <Input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </div>

              {/* ADDRESS */}
              <div className="space-y-2">
                <Label>Address *</Label>
                <Textarea
                  placeholder="Enter shop address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={3}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Brief description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                />
              </div>

              {/* HOURS */}
              <div className="space-y-2">
                <Label>Opening Hours</Label>
                <Input
                  placeholder="9:00 AM - 8:00 PM"
                  value={formData.openingHours}
                  onChange={(e) => handleChange("openingHours", e.target.value)}
                />
              </div>

              {/* IMAGES */}
              <div className="space-y-2">
                <Label>Shop Images</Label>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    document.getElementById("shop-image-upload")?.click()
                  }
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Images
                </Button>

                <input
                  id="shop-image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {imagePreviews.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative group aspect-square rounded-lg overflow-hidden border"
                      >
                        <img src={preview} className="object-cover w-full h-full" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">No images uploaded yet</p>
                  </div>
                )}
              </div>

              {/* STATUS */}
              <div className="space-y-2">
                <Label>Status</Label>

                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
          </Card>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={handleReset}>
              <X className="w-4 h-4 mr-2" />
              Reset
            </Button>

            <Button className="flex-1 bg-blue-600" onClick={handleSubmit}>
              <Save className="w-4 h-4 mr-2" />
              Add Shop
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
