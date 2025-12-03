import { useState } from 'react';
import { ArrowLeft, Store, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAdmin } from '../../contexts/AdminContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';

interface AdminAddShopPageProps {
  onBack: () => void;
}

const shopCategories = [
  'Grocery',
  'Medical',
  'Electronics',
  'Furniture',
  'Clothing',
  'Restaurants',
  'Hardware',
  'Bakery',
  'Stationery',
  'Jewelry',
  'Sports',
  'Books'
];

export function AdminAddShopPage({ onBack }: AdminAddShopPageProps) {
  const { addShop } = useAdmin();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
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

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Shop name is required';
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
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    addShop(formData);
    toast.success('Shop added successfully!');
    onBack();
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

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setFormData({
      name: '',
      category: '',
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
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
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

      {/* Form */}
      <ScrollArea className="flex-1">
        <div className="p-4 pb-6 max-w-4xl mx-auto w-full">
          <Card className="p-6 dark:bg-gray-900 dark:border-gray-800">
            <div className="space-y-6">
              {/* Shop Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">
                  Shop Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter shop name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name}</p>
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
                    {shopCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
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

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm">
                  Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  placeholder="Enter shop address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  rows={3}
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && (
                  <p className="text-xs text-red-500">{errors.address}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the shop"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                />
              </div>

              {/* Opening Hours */}
              <div className="space-y-2">
                <Label htmlFor="openingHours" className="text-sm">
                  Opening Hours
                </Label>
                <Input
                  id="openingHours"
                  placeholder="e.g., 9:00 AM - 8:00 PM"
                  value={formData.openingHours}
                  onChange={(e) => handleChange('openingHours', e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-sm">Shop Images</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('shop-image-upload')?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Images
                    </Button>
                    <input
                      id="shop-image-upload"
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
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
            >
              <Save className="w-4 h-4 mr-2" />
              Add Shop
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
