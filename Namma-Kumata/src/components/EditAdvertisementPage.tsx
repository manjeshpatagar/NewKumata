import { useState } from 'react';
import { ArrowLeft, Save, Trash2, Upload, MapPin, Calendar, IndianRupee, Image as ImageIcon, Video as VideoIcon, Film } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';

interface EditAdvertisementPageProps {
  ad: any;
  onBack: () => void;
  onSuccess?: () => void;
  onNavigate?: (page: string, data?: any) => void;
}

export function EditAdvertisementPage({ ad, onBack, onSuccess, onNavigate }: EditAdvertisementPageProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: ad?.title || '',
    category: ad?.category || '',
    description: ad?.description || '',
    price: ad?.price || '',
    location: ad?.location || '',
    phone: ad?.phone || '',
    whatsapp: ad?.whatsapp || '',
    email: ad?.email || '',
    images: ad?.images || [],
    videos: ad?.videos || [],
    status: ad?.status || 'pending',
    // Category-specific fields
    brand: ad?.brand || '',
    model: ad?.model || '',
    year: ad?.year || '',
    condition: ad?.condition || '',
    // Property fields
    propertyType: ad?.propertyType || '',
    bhk: ad?.bhk || '',
    furnishing: ad?.furnishing || '',
    // Job fields
    jobType: ad?.jobType || '',
    salary: ad?.salary || '',
    experience: ad?.experience || '',
  });

  const adCategories = [
    'Bikes', 'Cars', 'Home Rentals', 'Jobs', 'Electronics', 
    'Furniture', 'Services', 'Business Offers', 'Events', 'Launches', 'Others'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const updatedAd = {
      ...ad,
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    onSuccess?.();
    toast.success('Advertisement updated successfully!');
    setTimeout(() => onBack(), 1500);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this advertisement? This action cannot be undone.')) {
      onNavigate?.('delete', ad.id);
      toast.success('Advertisement deleted successfully');
      setTimeout(() => onBack(), 1500);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'active':
        return 'bg-green-600';
      case 'pending':
        return 'bg-yellow-600';
      case 'rejected':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold dark:text-white">Edit Advertisement</h1>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{formData.title}</p>
                  <Badge className={getStatusColor(formData.status)}>
                    {formData.status}
                  </Badge>
                </div>
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
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
            {/* Status Notice */}
            {formData.status === 'pending' && (
              <Card className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  ⏳ This advertisement is pending admin approval. Changes will also require re-approval.
                </p>
              </Card>
            )}
            {formData.status === 'rejected' && (
              <Card className="p-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
                <p className="text-sm text-red-800 dark:text-red-200">
                  ❌ This advertisement was rejected. Please review and make necessary changes before resubmitting.
                </p>
              </Card>
            )}

            {/* Basic Information */}
            <Card className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Basic Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="dark:text-gray-200">
                    Advertisement Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter advertisement title"
                    className="dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="dark:text-gray-200">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {adCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="dark:text-gray-200">
                      <IndianRupee className="w-4 h-4 inline mr-1" />
                      Price
                    </Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="Enter price or 'Free' or 'NA'"
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="dark:text-gray-200">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your advertisement in detail..."
                    rows={5}
                    className="dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="dark:text-gray-200">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter location"
                    className="dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
              </div>
            </Card>

            {/* Category-Specific Fields */}
            {(formData.category === 'Bikes' || formData.category === 'Cars') && (
              <Card className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">Vehicle Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand" className="dark:text-gray-200">Brand</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      placeholder="e.g., Honda, Toyota"
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model" className="dark:text-gray-200">Model</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      placeholder="e.g., Activa, Fortuner"
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year" className="dark:text-gray-200">Year</Label>
                    <Input
                      id="year"
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      placeholder="e.g., 2020"
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition" className="dark:text-gray-200">Condition</Label>
                    <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                      <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Like New">Like New</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            )}

            {formData.category === 'Home Rentals' && (
              <Card className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">Property Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType" className="dark:text-gray-200">Property Type</Label>
                    <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                      <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="Room">Room</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bhk" className="dark:text-gray-200">BHK</Label>
                    <Select value={formData.bhk} onValueChange={(value) => handleInputChange('bhk', value)}>
                      <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectValue placeholder="Select BHK" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 BHK">1 BHK</SelectItem>
                        <SelectItem value="2 BHK">2 BHK</SelectItem>
                        <SelectItem value="3 BHK">3 BHK</SelectItem>
                        <SelectItem value="4+ BHK">4+ BHK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="furnishing" className="dark:text-gray-200">Furnishing</Label>
                    <Select value={formData.furnishing} onValueChange={(value) => handleInputChange('furnishing', value)}>
                      <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectValue placeholder="Select furnishing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fully Furnished">Fully Furnished</SelectItem>
                        <SelectItem value="Semi Furnished">Semi Furnished</SelectItem>
                        <SelectItem value="Unfurnished">Unfurnished</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            )}

            {formData.category === 'Jobs' && (
              <Card className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">Job Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobType" className="dark:text-gray-200">Job Type</Label>
                    <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                      <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full Time">Full Time</SelectItem>
                        <SelectItem value="Part Time">Part Time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary" className="dark:text-gray-200">Salary</Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => handleInputChange('salary', e.target.value)}
                      placeholder="e.g., ₹20,000 - ₹30,000"
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="dark:text-gray-200">Experience</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      placeholder="e.g., 2-5 years"
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                </div>
              </Card>
            )}

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
                    <Label htmlFor="whatsapp" className="dark:text-gray-200">WhatsApp Number</Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="dark:text-gray-200">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="contact@email.com"
                    className="dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
              </div>
            </Card>

            {/* Photos & Videos */}
            <Card className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Photos & Videos</h2>
              
              {/* Photos Section */}
              <div className="mb-6">
                <Label className="flex items-center gap-2 mb-2 dark:text-gray-200">
                  <ImageIcon className="w-4 h-4" />
                  Photos (Max 5)
                </Label>
                <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 mx-auto mb-2 text-blue-500 dark:text-blue-400" />
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">
                    Click to upload photos
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>
                {formData.images && formData.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 md:grid-cols-5 gap-2">
                    {formData.images.map((img: string, index: number) => (
                      <div key={index} className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group border-2 border-gray-200 dark:border-gray-700">
                        <img src={img} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Videos Section */}
              <div>
                <Label className="flex items-center gap-2 mb-2 dark:text-gray-200">
                  <Film className="w-4 h-4" />
                  Videos (Max 2)
                </Label>
                <div className="border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg p-6 text-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors cursor-pointer">
                  <VideoIcon className="w-10 h-10 mx-auto mb-2 text-purple-500 dark:text-purple-400" />
                  <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">
                    Click to upload videos
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    MP4, MOV, AVI up to 50MB each
                  </p>
                </div>
                {formData.videos && formData.videos.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {formData.videos.map((video: string, index: number) => (
                      <div key={index} className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                        <video src={video} className="w-full h-full object-cover" controls />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                💡 Tip: Add videos to showcase your product/service in action and attract more buyers!
              </p>
            </Card>

            {/* Action Buttons - Mobile */}
            <div className="md:hidden space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
                Delete Advertisement
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}