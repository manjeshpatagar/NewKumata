'use client';

import { useState } from 'react';
import { ArrowLeft, ShoppingBag, Save, Trash2, Upload, Image as ImageIcon, Video, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { useAdmin, Ad } from '../../contexts/AdminContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { toast } from 'sonner';
import { advertisementApi } from '@/lib/api/advertisementApi';
import { useRouter } from 'next/navigation';

interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  type: string;
  isActive: boolean;
  emoji?: string;
}

interface AdminEditAdPageProps {
  ad: Ad;
  categories: Category[];
  onBack: () => void;
}

export function AdminEditAdPage({ ad, categories = [], onBack }: AdminEditAdPageProps) {
  const { editAd, deleteAd } = useAdmin();
  const { t } = useLanguage();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: ad.title || '',
    category: ad.category || '',
    owner: ad.owner || '',
    phone: ad.phone || '',
    location: ad.location || '',
    price: ad.price || '',
    description: ad.description || '',
    status: ad.status,
    featured: ad.featured || false,
    sponsored: ad.sponsored || false,
    adminPrice: ad.adminPrice || 0,
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.owner.trim()) {
      newErrors.owner = 'Owner name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare FormData
      const formDataToSend = new FormData();

      // Add all form fields (exactly as backend expects)
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category); // Category ID
      formDataToSend.append('price', formData.price || '0');
      formDataToSend.append('description', formData.description);
      formDataToSend.append('location', formData.location);

      // Add contactinfo as JSON string
      const contactinfo = {
        owner: formData.owner,
        phone: formData.phone,
        email: '', // Add email field if you have it in the form
      };
      formDataToSend.append('contactinfo.whatsapp', contactinfo.owner);   // if owner = whatsapp
      formDataToSend.append('contactinfo.phone', contactinfo.phone);
      formDataToSend.append('contactinfo.email', contactinfo.email || "");

      // Add optional fields
      if (formData.status) {
        formDataToSend.append('status', formData.status);
      }
      if (formData.featured !== undefined) {
        formDataToSend.append('featured', formData.featured.toString());
      }
      if (formData.sponsored !== undefined) {
        formDataToSend.append('sponsored', formData.sponsored.toString());
      }

      // Add images (backend expects 'images' field with multiple files)
      images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      // Add video (backend expects 'video' field with single file)
      if (videos.length > 0) {
        formDataToSend.append('video', videos[0]); // Only first video
      }

      // Call the API to update
      const response = await advertisementApi.update(ad.id, formDataToSend);

      // Also update local context if needed
      editAd(ad.id, formData);

      toast.success('Advertisement updated successfully!');
      router.back();
    } catch (error: any) {
      console.error('Error updating advertisement:', error);

      // Handle specific error messages
      const errorMessage = error.response?.data?.message ||
        error.message ||
        'Failed to update advertisement';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const newPreviews: string[] = [];

    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === newFiles.length) {
          setVideoPreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setVideos(prev => [...prev, ...newFiles]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
    setVideoPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleDelete = async () => {
    try {
      await advertisementApi.delete(ad.id);
      deleteAd(ad.id);
      toast.success('Advertisement deleted successfully!');
      router.back();
    } catch (error: any) {
      console.error('Error deleting advertisement:', error);
      const errorMessage = error.response?.data?.message ||
        error.message ||
        'Failed to delete advertisement';
      toast.error(errorMessage);
    }
  };

  // Helper function to get category emoji based on name
  const getCategoryEmoji = (categoryName: string): string => {
    const emojiMap: Record<string, string> = {
      'Hospital': '🏥',
      'Home Rental': '🏠',
      'Bikes': '🏍️',
      'Cars': '🚗',
      'Electronics': '📱',
      'Furniture': '🪑',
      'Jobs': '💼',
      'Services': '🔧',
      'Education': '📚',
      'Pets': '🐕',
      'Fashion': '👗',
      'Agriculture': '🌾',
    };

    return emojiMap[categoryName] || '📋';
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="dark:text-white">Edit Advertisement</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Update advertisement information
              </p>
            </div>
          </div>
          <ShoppingBag className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
      </div>

      {/* Form */}
      <ScrollArea className="flex-1">
        <div className="p-4 pb-6 max-w-4xl mx-auto w-full">
          <Card className="p-6 dark:bg-gray-900 dark:border-gray-800">
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter advertisement title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-xs text-red-500">{errors.title}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange('category', value)}
                >
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select category">
                      {formData.category
                        ? categories.find(cat => cat._id === formData.category)?.name
                        : "Select category"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length > 0 ? (
                      categories.map((cat) => {
                        const emoji = getCategoryEmoji(cat.name);
                        return (
                          <SelectItem key={cat._id} value={cat._id}>
                            {emoji} {cat.name}
                          </SelectItem>
                        );
                      })
                    ) : (
                      <SelectItem value="none" disabled>
                        No categories available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-xs text-red-500">{errors.category}</p>
                )}
              </div>

              {/* Owner Name */}
              <div className="space-y-2">
                <Label htmlFor="owner" className="text-sm">
                  What'sApp Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="owner"
                  placeholder="Enter What'sApp Number"
                  value={formData.owner}
                  onChange={(e) => handleChange('owner', e.target.value)}
                  className={errors.owner ? 'border-red-500' : ''}
                />
                {errors.owner && (
                  <p className="text-xs text-red-500">{errors.owner}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm">
                  Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className={errors.location ? 'border-red-500' : ''}
                />
                {errors.location && (
                  <p className="text-xs text-red-500">{errors.location}</p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm">
                  Price
                </Label>
                <Input
                  id="price"
                  placeholder="e.g., ₹25,000 or ₹8,000/month"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the item/service"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={5}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-xs text-red-500">{errors.description}</p>
                )}
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-sm">Ad Images</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('ad-image-upload')?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Images
                    </Button>
                    <input
                      id="ad-image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {imagePreviews.length === 0 && (
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                      <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No images uploaded yet
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Video Upload */}
              <div className="space-y-2">
                <Label className="text-sm">Ad Videos</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('ad-video-upload')?.click()}
                      className="w-full"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Upload Videos
                    </Button>
                    <input
                      id="ad-video-upload"
                      type="file"
                      accept="video/*"
                      multiple
                      className="hidden"
                      onChange={handleVideoUpload}
                    />
                  </div>

                  {videoPreviews.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {videoPreviews.map((preview, index) => (
                        <div key={index} className="relative group aspect-video rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                          <video
                            src={preview}
                            className="w-full h-full object-cover"
                            controls
                          />
                          <button
                            type="button"
                            onClick={() => removeVideo(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {videoPreviews.length === 0 && (
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                      <Video className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No videos uploaded yet
                      </p>
                    </div>
                  )}
                </div>
              </div>


            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Ad
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Advertisement</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this advertisement? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}