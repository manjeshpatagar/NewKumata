// 'use client';

// import { useState } from 'react';
// import { ArrowLeft, ShoppingBag, Save, X, Upload, Image as ImageIcon, Video } from 'lucide-react';
// import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { Label } from '../ui/label';
// import { Textarea } from '../ui/textarea';
// import { Card } from '../ui/card';
// import { ScrollArea } from '../ui/scroll-area';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
// import { Checkbox } from '../ui/checkbox';
// import { useAdmin } from '../../contexts/AdminContext';
// import { useLanguage } from '../../contexts/LanguageContext';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';
// import { advertisementApi } from '@/lib/api/advertisementApi';

// interface Category {
//   _id: string;
//   name: string;
//   description?: string;
//   image?: string;
//   type: string;
//   isActive: boolean;
//   emoji?: string;
//   subcategories?: any[];
// }

// interface AdminAddAdPageProps {
//   categories: Category[];
// }

// export function AdminAddAdPage({ categories }: AdminAddAdPageProps) {
//   const router = useRouter();
//   const { addAd } = useAdmin();
//   const { t } = useLanguage();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     title: '',
//     category: '', // Changed from categoryId to category (matches backend)
//     price: '',
//     description: '',
//     address: '',
//     location: '',
//     badges: '', // You might want to change this to an array later
//     addetails: '', // Additional details
//     contactinfo: {
//       whatsapp: '',
//       phone: '',
//       email: '',
//     },
//   });

//   const [contactInfo, setContactInfo] = useState({
//     whatsapp: '',
//     phone: '',
//     email: '',
//   });
//   const [images, setImages] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const [videos, setVideos] = useState<File[]>([]);
//   const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleChange = (field: string, value: string | boolean) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   const handleContactInfoChange = (field: string, value: string) => {
//     const updatedContactInfo = { ...contactInfo, [field]: value };
//     setContactInfo(updatedContactInfo);
    
//     // Update the contactinfo field in formData as JSON string
//     setFormData(prev => ({
//       ...prev,
//       contactinfo: (updatedContactInfo)
//     }));
    
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.title.trim()) {
//       newErrors.title = 'Title is required';
//     }
//     if (!formData.category) {
//       newErrors.category = 'Category is required';
//     }
//     if (!contactInfo.whatsapp.trim()) {
//       newErrors.owner = 'Owner name is required';
//     }
//     if (!contactInfo.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^\+?[\d\s-]{10,}$/.test(contactInfo.phone)) {
//       newErrors.phone = 'Invalid phone number';
//     }
//     if (!formData.location.trim()) {
//       newErrors.location = 'Location is required';
//     }
//     if (!formData.description.trim()) {
//       newErrors.description = 'Description is required';
//     }
//     if (!formData.address.trim()) {
//       newErrors.address = 'Address is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       // Prepare FormData
//       const formDataToSend = new FormData();
      
//       // Add all form fields (exactly as backend expects)
//       formDataToSend.append('title', formData.title);
//       formDataToSend.append('category', formData.category); // Category ID
//       formDataToSend.append('price', formData.price || '0');
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('address', formData.address);
//       formDataToSend.append('location', formData.location);
//       formDataToSend.append('badges', formData.badges || '');
//       formDataToSend.append('addetails', formData.addetails || '');
//       formDataToSend.append('contactinfo', JSON.stringify(formData.contactinfo));
      
//       // Add images (backend expects 'images' field with multiple files)
//       images.forEach((image, index) => {
//         formDataToSend.append('images', image);
//       });
      
//       // Add video (backend expects 'video' field with single file)
//       if (videos.length > 0) {
//         formDataToSend.append('video', videos[0]); // Only first video
//       }
      
//       // Log for debugging
//       console.log('Sending form data:', {
//         title: formData.title,
//         category: formData.category,
//         price: formData.price,
//         description: formData.description,
//         address: formData.address,
//         location: formData.location,
//         badges: formData.badges,
//         addetails: formData.addetails,
//         contactinfo: formData.contactinfo,
//         imagesCount: images.length,
//         videosCount: videos.length
//       });
      
//       // Call the API
//       const response = await advertisementApi.create(formDataToSend);
      
//       // Also add to local context if needed
//       addAd({
//         ...formData,
//         contactinfo: contactInfo,
//         id: response.data?._id || Date.now().toString(),
//         images: imagePreviews,
//         videos: videoPreviews,
//         createdAt: new Date().toISOString(),
//       });
      
//       toast.success('Advertisement created successfully!');
//       router.back();
//     } catch (error: any) {
//       console.error('Error creating advertisement:', error);
      
//       // Handle specific error messages
//       const errorMessage = error.response?.data?.message || 
//                           error.message || 
//                           'Failed to create advertisement';
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     const newFiles = Array.from(files);
//     const newPreviews: string[] = [];

//     newFiles.forEach(file => {
//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error(`Image ${file.name} is too large. Max size is 5MB.`);
//         return;
//       }

//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         toast.error(`File ${file.name} is not a valid image.`);
//         return;
//       }

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         newPreviews.push(reader.result as string);
//         if (newPreviews.length === newFiles.length) {
//           setImagePreviews(prev => [...prev, ...newPreviews]);
//         }
//       };
//       reader.readAsDataURL(file);
//     });

//     setImages(prev => [...prev, ...newFiles.filter(file => 
//       file.size <= 5 * 1024 * 1024 && file.type.startsWith('image/')
//     )]);
//   };

//   const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     const newFiles = Array.from(files);
//     const newPreviews: string[] = [];

//     newFiles.forEach(file => {
//       // Validate file size (max 50MB for videos)
//       if (file.size > 50 * 1024 * 1024) {
//         toast.error(`Video ${file.name} is too large. Max size is 50MB.`);
//         return;
//       }

//       // Validate file type
//       if (!file.type.startsWith('video/')) {
//         toast.error(`File ${file.name} is not a valid video.`);
//         return;
//       }

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         newPreviews.push(reader.result as string);
//         if (newPreviews.length === newFiles.length) {
//           setVideoPreviews(prev => [...prev, ...newPreviews]);
//         }
//       };
//       reader.readAsDataURL(file);
//     });

//     setVideos(prev => [...prev, ...newFiles.filter(file => 
//       file.size <= 50 * 1024 * 1024 && file.type.startsWith('video/')
//     )]);
//   };

//   const removeImage = (index: number) => {
//     setImages(prev => prev.filter((_, i) => i !== index));
//     setImagePreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   const removeVideo = (index: number) => {
//     setVideos(prev => prev.filter((_, i) => i !== index));
//     setVideoPreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleReset = () => {
//     setFormData({
//       title: '',
//       category: '',
//       price: '',
//       description: '',
//       address: '',
//       location: '',
//       badges: '',
//       addetails: '',
//       contactinfo:{
//         whatsapp: '',
//         phone: '',
//         email: '',
//       },
//     });
//     setContactInfo({
//       whatsapp: '',
//       phone: '',
//       email: '',
//     });
//     setImages([]);
//     setImagePreviews([]);
//     setVideos([]);
//     setVideoPreviews([]);
//     setErrors({});
//   };

//   // Helper function to get category emoji based on name
//   const getCategoryEmoji = (categoryName: string): string => {
//     const emojiMap: Record<string, string> = {
//       'Hospital': '🏥',
//       'Home Rental': '🏠',
//       'Bikes': '🏍️',
//       'Cars': '🚗',
//       'Electronics': '📱',
//       'Furniture': '🪑',
//       'Jobs': '💼',
//       'Services': '🔧',
//       'Education': '📚',
//       'Pets': '🐕',
//       'Fashion': '👗',
//       'Agriculture': '🌾',
//     };
    
//     return emojiMap[categoryName] || '📋';
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
//       {/* Header */}
//       <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b dark:border-gray-800">
//         <div className="flex items-center justify-between p-4 max-w-4xl mx-auto w-full">
//           <div className="flex items-center gap-3">
//             <Button variant="ghost" size="icon" onClick={() => router.back()}>
//               <ArrowLeft className="w-5 h-5" />
//             </Button>
//             <div>
//               <h1 className="dark:text-white">Add New Advertisement</h1>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Create a new advertisement listing
//               </p>
//             </div>
//           </div>
//           <ShoppingBag className="w-6 h-6 text-purple-600 dark:text-purple-400" />
//         </div>
//       </div>

//       {/* Form */}
//       <ScrollArea className="flex-1">
//         <div className="p-4 pb-6 max-w-4xl mx-auto w-full">
//           <Card className="p-6 dark:bg-gray-900 dark:border-gray-800">
//             <div className="space-y-6">
//               {/* Title */}
//               <div className="space-y-2">
//                 <Label htmlFor="title" className="text-sm">
//                   Title <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="title"
//                   placeholder="Enter advertisement title"
//                   value={formData.title}
//                   onChange={(e) => handleChange('title', e.target.value)}
//                   className={errors.title ? 'border-red-500' : ''}
//                   disabled={isSubmitting}
//                 />
//                 {errors.title && (
//                   <p className="text-xs text-red-500">{errors.title}</p>
//                 )}
//               </div>

//               {/* Category */}
//               <div className="space-y-2">
//                 <Label htmlFor="category" className="text-sm">
//                   Category <span className="text-red-500">*</span>
//                 </Label>
//                 <Select
//                   value={formData.category}
//                   onValueChange={(value) => handleChange('category', value)}
//                   disabled={isSubmitting}
//                 >
//                   <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
//                     <SelectValue placeholder="Select a category">
//                       {formData.category 
//                         ? categories.find(cat => cat._id === formData.category)?.name
//                         : "Select a category"}
//                     </SelectValue>
//                   </SelectTrigger>
//                   <SelectContent>
//                     {categories.length > 0 ? (
//                       categories.map((cat) => {
//                         const emoji = getCategoryEmoji(cat.name);
//                         return (
//                           <SelectItem key={cat._id} value={cat._id}>
//                             {emoji} {cat.name}
//                           </SelectItem>
//                         );
//                       })
//                     ) : (
//                       <SelectItem value="none" disabled>
//                         No categories available
//                       </SelectItem>
//                     )}
//                   </SelectContent>
//                 </Select>
//                 {errors.category && (
//                   <p className="text-xs text-red-500">{errors.category}</p>
//                 )}
//               </div>

//               {/* Address */}
//               <div className="space-y-2">
//                 <Label htmlFor="address" className="text-sm">
//                   Address <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="address"
//                   placeholder="Enter full address"
//                   value={formData.address}
//                   onChange={(e) => handleChange('address', e.target.value)}
//                   className={errors.address ? 'border-red-500' : ''}
//                   disabled={isSubmitting}
//                 />
//                 {errors.address && (
//                   <p className="text-xs text-red-500">{errors.address}</p>
//                 )}
//               </div>

//               {/* Location (City/Area) */}
//               <div className="space-y-2">
//                 <Label htmlFor="location" className="text-sm">
//                   Location (City/Area) <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="location"
//                   placeholder="Enter city or area"
//                   value={formData.location}
//                   onChange={(e) => handleChange('location', e.target.value)}
//                   className={errors.location ? 'border-red-500' : ''}
//                   disabled={isSubmitting}
//                 />
//                 {errors.location && (
//                   <p className="text-xs text-red-500">{errors.location}</p>
//                 )}
//               </div>

//               {/* Price */}
//               <div className="space-y-2">
//                 <Label htmlFor="price" className="text-sm">
//                   Price
//                 </Label>
//                 <Input
//                   id="price"
//                   placeholder="e.g., ₹25,000 or ₹8,000/month"
//                   value={formData.price}
//                   onChange={(e) => handleChange('price', e.target.value)}
//                   disabled={isSubmitting}
//                 />
//               </div>

//               {/* Contact Information */}
//               <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
//                 <h3 className="text-sm font-medium">Contact Information <span className="text-red-500">*</span></h3>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="owner" className="text-sm">
//                     Owner Name
//                   </Label>
//                   <Input
//                     id="whatsapp"
//                     placeholder="Enter owner name"
//                     value={contactInfo.whatsapp}
//                     onChange={(e) => handleContactInfoChange('whatsapp', e.target.value)}
//                     className={errors.owner ? 'border-red-500' : ''}
//                     disabled={isSubmitting}
//                   />
//                   {errors.owner && (
//                     <p className="text-xs text-red-500">{errors.owner}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="phone" className="text-sm">
//                     Phone Number
//                   </Label>
//                   <Input
//                     id="phone"
//                     type="tel"
//                     placeholder="+91 9876543210"
//                     value={contactInfo.phone}
//                     onChange={(e) => handleContactInfoChange('phone', e.target.value)}
//                     className={errors.phone ? 'border-red-500' : ''}
//                     disabled={isSubmitting}
//                   />
//                   {errors.phone && (
//                     <p className="text-xs text-red-500">{errors.phone}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email" className="text-sm">
//                     Email (Optional)
//                   </Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="owner@example.com"
//                     value={contactInfo.email}
//                     onChange={(e) => handleContactInfoChange('email', e.target.value)}
//                     disabled={isSubmitting}
//                   />
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="space-y-2">
//                 <Label htmlFor="description" className="text-sm">
//                   Description <span className="text-red-500">*</span>
//                 </Label>
//                 <Textarea
//                   id="description"
//                   placeholder="Detailed description of the item/service"
//                   value={formData.description}
//                   onChange={(e) => handleChange('description', e.target.value)}
//                   rows={5}
//                   className={errors.description ? 'border-red-500' : ''}
//                   disabled={isSubmitting}
//                 />
//                 {errors.description && (
//                   <p className="text-xs text-red-500">{errors.description}</p>
//                 )}
//               </div>

//               {/* Additional Details */}
//               <div className="space-y-2">
//                 <Label htmlFor="addetails" className="text-sm">
//                   Additional Details (Optional)
//                 </Label>
//                 <Textarea
//                   id="addetails"
//                   placeholder="Any additional information, features, or specifications"
//                   value={formData.addetails}
//                   onChange={(e) => handleChange('addetails', e.target.value)}
//                   rows={3}
//                   disabled={isSubmitting}
//                 />
//               </div>

//               {/* Badges (comma-separated) */}
//               <div className="space-y-2">
//                 <Label htmlFor="badges" className="text-sm">
//                   Badges (Optional)
//                 </Label>
//                 <Input
//                   id="badges"
//                   placeholder="e.g., Verified, Featured, Urgent (comma separated)"
//                   value={formData.badges}
//                   onChange={(e) => handleChange('badges', e.target.value)}
//                   disabled={isSubmitting}
//                 />
//               </div>

//               {/* Image Upload */}
//               <div className="space-y-2">
//                 <Label className="text-sm">Ad Images (Up to 10)</Label>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={() => document.getElementById('ad-image-upload')?.click()}
//                       className="w-full"
//                       disabled={isSubmitting}
//                     >
//                       <Upload className="w-4 h-4 mr-2" />
//                       Upload Images
//                     </Button>
//                     <input
//                       id="ad-image-upload"
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       className="hidden"
//                       onChange={handleImageUpload}
//                       disabled={isSubmitting}
//                     />
//                   </div>
                  
//                   {imagePreviews.length > 0 && (
//                     <div className="grid grid-cols-3 gap-3">
//                       {imagePreviews.map((preview, index) => (
//                         <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
//                           <img
//                             src={preview}
//                             alt={`Preview ${index + 1}`}
//                             className="w-full h-full object-cover"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index)}
//                             disabled={isSubmitting}
//                             className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
                  
//                   {imagePreviews.length === 0 && (
//                     <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
//                       <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         No images uploaded yet
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Video Upload */}
//               <div className="space-y-2">
//                 <Label className="text-sm">Ad Video (Optional)</Label>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={() => document.getElementById('ad-video-upload')?.click()}
//                       className="w-full"
//                       disabled={isSubmitting}
//                     >
//                       <Video className="w-4 h-4 mr-2" />
//                       Upload Video
//                     </Button>
//                     <input
//                       id="ad-video-upload"
//                       type="file"
//                       accept="video/*"
//                       className="hidden"
//                       onChange={handleVideoUpload}
//                       disabled={isSubmitting}
//                     />
//                   </div>
                  
//                   {videoPreviews.length > 0 && (
//                     <div className="grid grid-cols-1 gap-3">
//                       {videoPreviews.slice(0, 1).map((preview, index) => (
//                         <div key={index} className="relative group aspect-video rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
//                           <video
//                             src={preview}
//                             className="w-full h-full object-cover"
//                             controls
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeVideo(index)}
//                             disabled={isSubmitting}
//                             className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
                  
//                   {videoPreviews.length === 0 && (
//                     <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
//                       <Video className="w-12 h-12 mx-auto text-gray-400 mb-2" />
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         No video uploaded yet
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Card>

//           {/* Action Buttons */}
//           <div className="flex gap-3 mt-6">
//             <Button
//               variant="outline"
//               className="flex-1"
//               onClick={handleReset}
//               disabled={isSubmitting}
//             >
//               <X className="w-4 h-4 mr-2" />
//               Reset
//             </Button>
//             <Button
//               className="flex-1 bg-purple-600 hover:bg-purple-700"
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//             >
//               <Save className="w-4 h-4 mr-2" />
//               {isSubmitting ? 'Creating...' : 'Add Advertisement'}
//             </Button>
//           </div>
//         </div>
//       </ScrollArea>
//     </div>
//   );
// }


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
import { useAdmin } from '../../contexts/AdminContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { advertisementApi } from '@/lib/api/advertisementApi';

interface Category {
  _id: string;
  name: string;
  type: string;
}

interface AdminAddAdPageProps {
  categories: Category[];
}

export function AdminAddAdPage({ categories }: AdminAddAdPageProps) {
  const router = useRouter();
  const { addAd } = useAdmin();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    address: '',
    location: '',
    badges: '',
    addetails: '',
    contactinfo: {
      whatsapp: '',
      phone: '',
      email: '',
    }
  });

  const [contactInfo, setContactInfo] = useState({
    whatsapp: '',
    phone: '',
    email: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactInfoChange = (field: string, value: string) => {
    const updated = { ...contactInfo, [field]: value };
    setContactInfo(updated);

    setFormData(prev => ({
      ...prev,
      contactinfo: updated
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!contactInfo.whatsapp.trim()) newErrors.owner = 'Owner name is required';
    if (!contactInfo.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.location.trim()) newErrors.location = 'Location required';
    if (!formData.description.trim()) newErrors.description = 'Description required';
    if (!formData.address.trim()) newErrors.address = 'Address required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("price", formData.price || "0");
      formDataToSend.append("description", formData.description);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("badges", formData.badges);
      formDataToSend.append("addetails", formData.addetails);

      // ✅ FIXED — send each contact field separately
      formDataToSend.append("contactinfo.whatsapp", contactInfo.whatsapp);
      formDataToSend.append("contactinfo.phone", contactInfo.phone);
      formDataToSend.append("contactinfo.email", contactInfo.email);

      images.forEach((img) => formDataToSend.append("images", img));

      if (videos.length > 0) {
        formDataToSend.append("video", videos[0]);
      }

      const response = await advertisementApi.create(formDataToSend);

      addAd({
        ...formData,
        contactinfo: contactInfo,
        id: response.data?._id || Date.now().toString(),
        images: imagePreviews,
        videos: videoPreviews,
        createdAt: new Date().toISOString(),
      });

      toast.success("Advertisement created successfully!");
      router.back();

    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to create advertisement");
    }

    setIsSubmitting(false);
  };

  const handleImageUpload = (e: any) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => setImagePreviews(prev => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const handleVideoUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideos([file]);
    const reader = new FileReader();
    reader.onload = () => setVideoPreviews([reader.result as string]);
    reader.readAsDataURL(file);
  };

  const removeImage = (i: number) => {
    setImages(prev => prev.filter((_, index) => index !== i));
    setImagePreviews(prev => prev.filter((_, index) => index !== i));
  };

  const removeVideo = () => {
    setVideos([]);
    setVideoPreviews([]);
  };

  const handleReset = () => {
    setFormData({
      title: '',
      category: '',
      price: '',
      description: '',
      address: '',
      location: '',
      badges: '',
      addetails: '',
      contactinfo: {
        whatsapp: '',
        phone: '',
        email: '',
      }
    });

    setContactInfo({
      whatsapp: '',
      phone: '',
      email: '',
    });

    setImages([]);
    setVideos([]);
    setImagePreviews([]);
    setVideoPreviews([]);
    setErrors({});
  };

  const getCategoryEmoji = (name: string) =>
    ({
      "Hospital": "🏥",
      "Home Rental": "🏠",
      "Bikes": "🏍️",
      "Cars": "🚗",
      "Electronics": "📱",
      "Furniture": "🪑",
      "Jobs": "💼",
      "Services": "🔧",
      "Education": "📚",
      "Pets": "🐕",
      "Fashion": "👗",
      "Agriculture": "🌾"
    }[name] || "📋");

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
                <Label>Title <span className="text-red-500">*</span></Label>
                <Input
                  placeholder="Enter advertisement title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={errors.title ? 'border-red-500' : ''}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category <span className="text-red-500">*</span></Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange('category', value)}
                >
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {getCategoryEmoji(cat.name)} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label>Address <span className="text-red-500">*</span></Label>
                <Input
                  placeholder="Enter full address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className={errors.address ? 'border-red-500' : ''}
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Location <span className="text-red-500">*</span></Label>
                <Input
                  placeholder="Enter city or area"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className={errors.location ? 'border-red-500' : ''}
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  placeholder="₹25,000 or ₹8,000/month"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                />
              </div>

              {/* Contact Info */}
              <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-sm font-medium">Contact Information <span className="text-red-500">*</span></h3>

                <div className="space-y-2">
                  <Label>What'sApp Number</Label>
                  <Input
                    id="whatsapp"
                    placeholder="What'sApp Number"
                    value={contactInfo.whatsapp}
                    onChange={(e) => handleContactInfoChange('whatsapp', e.target.value)}
                    className={errors.owner ? 'border-red-500' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={contactInfo.phone}
                    onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email (optional)</Label>
                  <Input
                    type="email"
                    placeholder="owner@example.com"
                    value={contactInfo.email}
                    onChange={(e) => handleContactInfoChange('email', e.target.value)}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description <span className="text-red-500">*</span></Label>
                <Textarea
                  placeholder="Detailed description"
                  rows={5}
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className={errors.description ? 'border-red-500' : ''}
                />
              </div>



              {/* Badges */}
              <div className="space-y-2">
                <Label>Badges</Label>
                <Select
                  value={formData.badges}
                  onValueChange={(value) => handleChange('badges', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a badge" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="exclusive">Exclusive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Images */}
              <div className="space-y-2">
                <Label>Ad Images (up to 10)</Label>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('ad-image-upload')?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" /> Upload Images
                  </Button>

                  <input
                    id="ad-image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />

                  {imagePreviews.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border">
                          <img src={preview} className="w-full h-full object-cover" />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border border-dashed rounded-lg p-6 text-center">
                      <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-400">No images uploaded yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Video */}
              <div className="space-y-2">
                <Label>Ad Video (optional)</Label>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('ad-video-upload')?.click()}
                  className="w-full"
                >
                  <Video className="w-4 h-4 mr-2" /> Upload Video
                </Button>

                <input
                  id="ad-video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                />

                {videoPreviews.length > 0 ? (
                  <div className="relative group aspect-video rounded-lg overflow-hidden border mt-2">
                    <video src={videoPreviews[0]} className="w-full h-full object-cover" controls />
                    <button
                      onClick={removeVideo}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border border-dashed rounded-lg p-6 mt-2 text-center">
                    <Video className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="text-sm text-gray-400">No video uploaded</p>
                  </div>
                )}
              </div>

            </div>
          </Card>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={handleReset}>
              <X className="w-4 h-4 mr-2" /> Reset
            </Button>
            <Button className="flex-1 bg-purple-600" onClick={handleSubmit} disabled={isSubmitting}>
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? "Creating..." : "Add Advertisement"}
            </Button>
          </div>
        </div>
      </ScrollArea>

    </div>
  );
}
