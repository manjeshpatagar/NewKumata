'use client';

import { useState } from 'react';
import { ArrowLeft, Save, Trash2, Upload, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';

interface EditListingPageProps {
  listing: any;
  onBack: () => void;
  onSuccess?: () => void;
  onNavigate?: (page: string, data?: any) => void;
}

export function EditListingPage({ listing, onBack, onSuccess, onNavigate }: EditListingPageProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: listing?.name || '',
    category: listing?.category || '',
    subcategory: listing?.subcategory || '',
    description: listing?.description || '',
    price: listing?.price || '',
    phone: listing?.phone || '',
    email: listing?.email || '',
    address: listing?.address || '',
    timings: listing?.timings || '',
    images: listing?.images || [],
  });

  const categories = [
    'Shops', 'Temples', 'Tourism', 'Schools', 'Services', 
    'Hotels', 'Doctors', 'Grocery', 'Medical', 'Associations'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const updatedListing = {
      ...listing,
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    onSuccess?.();
    toast.success('Listing updated successfully!');
    setTimeout(() => onBack(), 1500);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      onNavigate?.('delete', listing.id);
      toast.success('Listing deleted successfully');
      setTimeout(() => onBack(), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold dark:text-white">Edit Listing</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">{formData.name}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
              >
                <Trash2 className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Delete</span>
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Save className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Save Changes</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Basic Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="dark:text-gray-200">
                      Business Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter business name"
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="dark:text-gray-200">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="dark:text-gray-200">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your business..."
                    rows={4}
                    className="dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="dark:text-gray-200">Price Range (Optional)</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="e.g., ₹100 - ₹500"
                    className="dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Contact Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="dark:text-gray-200">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="business@email.com"
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="dark:text-gray-200">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter business address"
                    rows={2}
                    className="dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
              </div>
            </Card>

            {/* Business Hours */}
            <Card className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">
                <Clock className="w-5 h-5 inline mr-2" />
                Business Hours
              </h2>
              <div className="space-y-2">
                <Label htmlFor="timings" className="dark:text-gray-200">Operating Hours</Label>
                <Input
                  id="timings"
                  value={formData.timings}
                  onChange={(e) => handleInputChange('timings', e.target.value)}
                  placeholder="e.g., Mon-Sat: 9:00 AM - 8:00 PM"
                  className="dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </Card>

            {/* Images */}
            <Card className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Images</h2>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              {formData.images && formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {formData.images.map((img: string, index: number) => (
                    <div key={index} className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <img src={img} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Action Buttons - Mobile */}
            <div className="md:hidden space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handleSave}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button
                variant="outline"
                className="w-full text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Listing
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}