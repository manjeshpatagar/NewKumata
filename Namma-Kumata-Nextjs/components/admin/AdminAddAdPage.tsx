'use client';

import { useState } from 'react';
import { ArrowLeft, ShoppingBag, Save, X, Upload, Image as ImageIcon, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { useAdmin } from '../../contexts/AdminContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface AdminAddAdPageProps {
  onBack: () => void;
}

const adCategories = [
  { id: 'bikes', name: 'Bikes', emoji: '🏍️' },
  { id: 'cars', name: 'Cars', emoji: '🚗' },
  { id: 'home-rentals', name: 'Home Rentals', emoji: '🏠' },
  { id: 'electronics', name: 'Electronics', emoji: '📱' },
  { id: 'furniture', name: 'Furniture', emoji: '🪑' },
  { id: 'jobs', name: 'Jobs', emoji: '💼' },
  { id: 'services', name: 'Services', emoji: '🔧' },
  { id: 'education', name: 'Education', emoji: '📚' },
  { id: 'pets', name: 'Pets', emoji: '🐕' },
  { id: 'fashion', name: 'Fashion', emoji: '👗' },
  { id: 'agriculture', name: 'Agriculture', emoji: '🌾' },
];

export function AdminAddAdPage() {
  const router = useRouter();
  const { addAd } = useAdmin();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    owner: '',
    phone: '',
    location: '',
    price: '',
    description: '',
    status: 'approved' as 'pending' | 'approved' | 'rejected',
    featured: false,
    sponsored: false,
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | boolean) => {
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

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    addAd(formData);
    toast.success('Advertisement added successfully!');
    router.back();
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

  const handleReset = () => {
    setFormData({
      title: '',
      category: '',
      owner: '',
      phone: '',
      location: '',
      price: '',
      description: '',
      status: 'approved',
      featured: false,
      sponsored: false,
    });
    setImages([]);
    setImagePreviews([]);
    setVideos([]);
    setVideoPreviews([]);
    setErrors({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="dark:text-white">Add New Advertisement</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Create a new advertisement listing
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
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {adCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.emoji} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-xs text-red-500">{errors.category}</p>
                )}
              </div>

              {/* Owner Name */}
              <div className="space-y-2">
                <Label htmlFor="owner" className="text-sm">
                  Owner Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="owner"
                  placeholder="Enter owner name"
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

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'pending' | 'approved' | 'rejected') => 
                    handleChange('status', value)
                  }
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

              {/* Featured & Sponsored */}
              <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleChange('featured', checked === true)}
                  />
                  <Label htmlFor="featured" className="text-sm cursor-pointer">
                    ⭐ Featured Advertisement
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="sponsored"
                    checked={formData.sponsored}
                    onCheckedChange={(checked) => handleChange('sponsored', checked === true)}
                  />
                  <Label htmlFor="sponsored" className="text-sm cursor-pointer">
                    💎 Sponsored Advertisement
                  </Label>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleReset}
            >
              <X className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              onClick={handleSubmit}
            >
              <Save className="w-4 h-4 mr-2" />
              Add Advertisement
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
