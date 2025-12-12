"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Store,
  Save,
  X,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { productApi } from "@/lib/api/productApi";
import { categoryApi } from "@/lib/api/categoryApi";
import { subCategoryApi } from "@/lib/api/subCategoryApi";
import { useAdmin } from "@/contexts/AdminContext";

export function AdminAddShopPage() {
  const router = useRouter();
  const { adminUser } = useAdmin();

  // --------------------
  // STATE
  // --------------------
  const [categories, setCategories] = useState<
    { id: string; name: string; type?: string }[]
  >([]);

  const [subCategories, setSubCategories] = useState<
    { id: string; name: string; categoryId?: string }[]
  >([]);

  const [loadingSubCategories, setLoadingSubCategories] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subCategory: "",
    owner: "",
    phone: "",
    address: "",
    description: "",
    openingHours: "",
    status: "approved" as "pending" | "approved" | "rejected",
    badges: "", // ⭐ NEW FIELD
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --------------------
  // AUTH CHECK
  // --------------------
  useEffect(() => {
    if (adminUser === null) return;

    if (!adminUser) {
      toast.error("Please login as admin");
      router.push("/admin-login");
    }
  }, [adminUser, router]);

  // --------------------
  // LOAD CATEGORIES
  // --------------------
  useEffect(() => {
    if (!adminUser) return;

    const fetchCategories = async () => {
      try {
        const res = await categoryApi.getAll();
        const payload = res.data || res;
        const list = payload.data || payload;

        const normalized = list.map((cat: any) => ({
          id: cat._id,
          name: cat.name,
          type: cat.type,
        }));

        setCategories(normalized);
      } catch {
        toast.error("Could not load categories");
      }
    };

    fetchCategories();
  }, [adminUser]);

  // --------------------
  // LOAD SUBCATEGORIES
  // --------------------
  useEffect(() => {
    if (!adminUser) return;

    const fetchSubCategories = async () => {
      try {
        setLoadingSubCategories(true);
        const res = await subCategoryApi.getAll();
        const payload = res.data || res;
        const list = payload.data || payload;

        const normalized = list.map((sub: any) => ({
          id: sub._id,
          name: sub.name,
          categoryId: sub.categoryId?._id || sub.categoryId,
        }));

        setSubCategories(normalized);
      } catch {
        toast.error("Could not load subcategories");
      } finally {
        setLoadingSubCategories(false);
      }
    };

    fetchSubCategories();
  }, [adminUser]);

  // --------------------
  // INPUT HANDLER
  // --------------------
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // --------------------
  // VALIDATION
  // --------------------
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Shop name is required";
    if (!formData.subCategory)
      newErrors.subCategory = "Subcategory is required";
    if (!formData.owner.trim()) newErrors.owner = "Owner name is required";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^\+?[\d\s-]{10,}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number";

    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --------------------
  // SUBMIT FORM
  // --------------------
  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill required fields");
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

      // Subcategory → category auto mapping
      const selectedSub = subCategories.find(
        (s) => s.id === formData.subCategory
      );

      if (!selectedSub) {
        toast.error("Invalid subcategory");
        return;
      }

      form.append("subCategoryId", selectedSub.id);
      form.append("categoryId", selectedSub.categoryId || "");

      // Status mapping for DB
      form.append(
        "status",
        formData.status === "approved" ? "active" : "inactive"
      );

      // ⭐ ADD BADGE
      if (formData.badges) {
        form.append("badges", formData.badges);
      }

      // Images
      images.forEach((file) => form.append("images", file));

      await productApi.create(form);

      toast.success("Shop added successfully!");
      router.push("/AdminAddShop");
    } catch (error) {
      toast.error("Failed to add shop");
      console.log(error);
    }
  };

  // --------------------
  // IMAGES
  // --------------------
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const arr = Array.from(files);
    const previewList: string[] = [];

    arr.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewList.push(reader.result as string);
        if (previewList.length === arr.length)
          setImagePreviews((prev) => [...prev, ...previewList]);
      };
      reader.readAsDataURL(file);
    });

    setImages((prev) => [...prev, ...arr]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // --------------------
  // RESET
  // --------------------
  const handleReset = () => {
    setFormData({
      name: "",
      category: "",
      subCategory: "",
      owner: "",
      phone: "",
      address: "",
      description: "",
      openingHours: "",
      status: "approved",
      badges: "",
    });
    setImages([]);
    setImagePreviews([]);
    setErrors({});
  };

  // --------------------
  // UI
  // --------------------
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
                <Label>Shop Name *</Label>
                <Input
                  placeholder="Enter shop name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

              {/* SUBCATEGORY */}
              <div className="space-y-2">
                <Label>Subcategory *</Label>
                <Select
                  value={formData.subCategory}
                  onValueChange={(value) => {
                    const matched = subCategories.find((s) => s.id === value);
                    setFormData((prev) => ({
                      ...prev,
                      subCategory: value,
                      category: matched?.categoryId || "",
                    }));
                    if (errors.subCategory)
                      setErrors((prev) => ({ ...prev, subCategory: "" }));
                  }}
                >
                  <SelectTrigger
                    className={errors.subCategory ? "border-red-500" : ""}
                  >
                    <SelectValue
                      placeholder={
                        loadingSubCategories
                          ? "Loading..."
                          : "Select subcategory"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {subCategories.map((sub) => (
                      <SelectItem key={sub.id} value={sub.id}>
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.subCategory && (
                  <p className="text-red-500 text-xs">{errors.subCategory}</p>
                )}
              </div>
              {/* BADGES */}
              <div className="space-y-2">
                <Label>Badge (optional)</Label>

                <Select
                  value={formData.badges}
                  onValueChange={(value) => handleChange("badges", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select badge" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="exclusive">Exclusive</SelectItem>
                  </SelectContent>
                </Select>
              </div>


              {/* OWNER */}
              <div className="space-y-2">
                <Label>Owner *</Label>
                <Input
                  placeholder="Owner name"
                  value={formData.owner}
                  onChange={(e) => handleChange("owner", e.target.value)}
                  className={errors.owner ? "border-red-500" : ""}
                />
                {errors.owner && (
                  <p className="text-red-500 text-xs">{errors.owner}</p>
                )}
              </div>

              {/* PHONE */}
              <div className="space-y-2">
                <Label>Phone *</Label>
                <Input
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone}</p>
                )}
              </div>

              {/* ADDRESS */}
              <div className="space-y-2">
                <Label>Address *</Label>
                <Textarea
                  placeholder="Shop address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={3}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs">{errors.address}</p>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Short description"
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

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {imagePreviews.map((src, i) => (
                      <div
                        key={i}
                        className="relative border rounded-lg overflow-hidden group"
                      >
                        <img src={src} className="object-cover w-full h-full" />

                        <button
                          onClick={() => removeImage(i)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
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

          {/* BUTTONS */}
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
