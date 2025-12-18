"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Upload,
  X,
  Calendar,
  Briefcase,
  Image as ImageIcon,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  FileText,
  Info,
  Sparkles,
  CheckCircle2,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { adCategories } from "../lib/advertisementData";
import { toast } from "sonner";

interface RequestAdvertisementPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function RequestAdvertisementPage({
  onBack,
  onSuccess,
}: RequestAdvertisementPageProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    requesterName: user?.name || "",
    requesterPhone: user?.phone || "",
    requesterEmail: user?.email || "",
    adTitle: "",
    category: "",
    description: "",
    priceRange: "",
    preferredDuration: "1week",
    additionalNotes: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - images.length);
      const imageUrls = newImages.map((file) => URL.createObjectURL(file));
      setImages([...images, ...imageUrls]);
      toast.success(`${newImages.length} image(s) uploaded successfully`);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.requesterName ||
      !formData.requesterPhone ||
      !formData.adTitle ||
      !formData.category ||
      !formData.description
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!agreedToTerms) {
      toast.error("Please agree to terms and conditions");
      return;
    }

    setSubmitted(true);
    toast.success("Advertisement request submitted successfully!");

    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4">
        <Card className="max-w-md w-full p-8 bg-white dark:bg-gray-900 border-0 rounded-3xl shadow-2xl text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Request Submitted! 🎉
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Your advertisement request has been sent to our admin team. You'll
            receive a confirmation once it's reviewed and approved (usually
            within 24-48 hours).
          </p>
          <Button
            onClick={onBack}
            className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl shadow-lg"
          >
            Back to Advertisements
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Premium Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50 shadow-lg flex-shrink-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 md:px-6 py-4 sm:py-5">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 dark:from-purple-200 dark:via-pink-200 dark:to-orange-200 bg-clip-text text-transparent">
                Request Advertisement
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-0.5">
                Submit your ad request to our admin team
              </p>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 md:px-6 py-6 sm:py-8 pb-24 md:pb-28 lg:pb-32">
          {/* Info Banner */}
          <Card className="p-5 sm:p-6 mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 border-0 rounded-3xl shadow-2xl shadow-purple-500/30 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -ml-20 -mb-20" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-bold mb-2">
                  Professional Review Process
                </h2>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  Only admins can publish advertisements. Fill out this form and
                  our team will review your request within 24-48 hours. Once
                  approved, your ad will go live automatically!
                </p>
              </div>
            </div>
          </Card>

          {/* Visual Guide Card */}
          <Card className="p-5 sm:p-6 mb-6 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 border-0 rounded-3xl shadow-2xl shadow-orange-500/30 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10 flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base sm:text-lg mb-1">
                  Why Request Instead of Direct Post?
                </h3>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                  We ensure all ads are verified, professional, and meet our
                  quality standards before publishing
                </p>
              </div>
            </div>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Your Contact Information */}
            <Card className="p-6 sm:p-8 bg-white dark:bg-gray-900 border-0 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    Your Contact Information
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    So we can reach you about your ad request
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <Label
                    htmlFor="requesterName"
                    className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2"
                  >
                    Your Name
                    <Badge className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-0 text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Input
                    id="requesterName"
                    placeholder="Enter your full name"
                    value={formData.requesterName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        requesterName: e.target.value,
                      })
                    }
                    required
                    className="h-12 sm:h-14 text-base rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 bg-gray-50 dark:bg-gray-800 shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label
                      htmlFor="requesterPhone"
                      className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2"
                    >
                      Phone Number
                      <Badge className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-0 text-xs">
                        Required
                      </Badge>
                    </Label>
                    <Input
                      id="requesterPhone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.requesterPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          requesterPhone: e.target.value,
                        })
                      }
                      required
                      className="h-12 sm:h-14 text-base rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-sm"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="requesterEmail"
                      className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      Email (Optional)
                    </Label>
                    <Input
                      id="requesterEmail"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.requesterEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          requesterEmail: e.target.value,
                        })
                      }
                      className="h-12 sm:h-14 text-base rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Advertisement Details */}
            <Card className="p-6 sm:p-8 bg-white dark:bg-gray-900 border-0 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    Advertisement Details
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Tell us about the advertisement you want to post
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Ad Title */}
                <div>
                  <Label
                    htmlFor="adTitle"
                    className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2"
                  >
                    Advertisement Title
                    <Badge className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-0 text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Input
                    id="adTitle"
                    placeholder="e.g., 2 BHK House for Rent, Looking for Sales Executive, etc."
                    value={formData.adTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, adTitle: e.target.value })
                    }
                    required
                    className="h-12 sm:h-14 text-base rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 bg-gray-50 dark:bg-gray-800 shadow-sm"
                  />
                </div>

                {/* Category */}
                <div>
                  <Label
                    htmlFor="category"
                    className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2"
                  >
                    Category
                    <Badge className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-0 text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger
                      id="category"
                      className="h-12 sm:h-14 text-base rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 bg-gray-50 dark:bg-gray-800 shadow-sm"
                    >
                      <SelectValue placeholder="Select advertisement category" />
                    </SelectTrigger>
                    <SelectContent>
                      {adCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.emoji} {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div>
                  <Label
                    htmlFor="description"
                    className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2"
                  >
                    Description
                    <Badge className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-0 text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed description of your advertisement..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={5}
                    required
                    className="text-base rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 bg-gray-50 dark:bg-gray-800 resize-none shadow-sm"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    💡 Include all important details - price, location,
                    specifications, etc.
                  </p>
                </div>

                {/* Price Range */}
                <div>
                  <Label
                    htmlFor="priceRange"
                    className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    Price / Budget (Optional)
                  </Label>
                  <Input
                    id="priceRange"
                    placeholder="₹10,000 - ₹15,000 or Contact for details"
                    value={formData.priceRange}
                    onChange={(e) =>
                      setFormData({ ...formData, priceRange: e.target.value })
                    }
                    className="h-12 sm:h-14 text-base rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-sm"
                  />
                </div>

                {/* Preferred Duration */}
                <div>
                  <Label
                    htmlFor="preferredDuration"
                    className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    Preferred Duration
                  </Label>
                  <Select
                    value={formData.preferredDuration}
                    onValueChange={(value) =>
                      setFormData({ ...formData, preferredDuration: value })
                    }
                  >
                    <SelectTrigger
                      id="preferredDuration"
                      className="h-12 sm:h-14 text-base rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-sm"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1day">1 Day</SelectItem>
                      <SelectItem value="3days">3 Days</SelectItem>
                      <SelectItem value="1week">
                        1 Week (Recommended)
                      </SelectItem>
                      <SelectItem value="1month">1 Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    ℹ️ Final duration will be confirmed by admin
                  </p>
                </div>

                {/* Additional Notes */}
                <div>
                  <Label
                    htmlFor="additionalNotes"
                    className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    Additional Notes for Admin (Optional)
                  </Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Any special requirements or notes for the admin team..."
                    value={formData.additionalNotes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        additionalNotes: e.target.value,
                      })
                    }
                    rows={3}
                    className="text-base rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 resize-none shadow-sm"
                  />
                </div>
              </div>
            </Card>

            {/* Images Upload */}
            <Card className="p-6 sm:p-8 bg-white dark:bg-gray-900 border-0 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    Images (Optional)
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Upload up to 5 images
                  </p>
                </div>
              </div>

              {/* Upload Area */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={images.length >= 5}
                />
                <div
                  className={`border-3 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all ${
                    images.length >= 5
                      ? "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 cursor-not-allowed"
                      : "border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/30 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/40 cursor-pointer"
                  }`}
                >
                  <Upload
                    className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 ${
                      images.length >= 5
                        ? "text-gray-400"
                        : "text-purple-600 dark:text-purple-400"
                    }`}
                  />
                  <p
                    className={`text-base sm:text-lg font-semibold mb-2 ${
                      images.length >= 5
                        ? "text-gray-500"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {images.length >= 5
                      ? "Maximum 5 images reached"
                      : "Click or drag images here"}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {images.length >= 5
                      ? "Remove images to upload more"
                      : `PNG, JPG, WebP (Max 5 images, ${images.length}/5 uploaded)`}
                  </p>
                </div>
              </div>

              {/* Image Preview Grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-cover rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Terms & Conditions */}
            <Card className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-800 rounded-3xl">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) =>
                    setAgreedToTerms(checked as boolean)
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="terms"
                    className="text-sm sm:text-base text-gray-900 dark:text-white cursor-pointer leading-relaxed"
                  >
                    I understand that this is a request and the final decision
                    to publish the advertisement rests with the admin team. I
                    agree to provide accurate information and follow all
                    platform guidelines.
                  </Label>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <div className="sticky bottom-0 pt-6 pb-6 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-950 dark:via-gray-950 dark:to-transparent">
              <Button
                type="submit"
                className="w-full h-14 sm:h-16 text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white rounded-2xl shadow-2xl shadow-purple-500/50 transition-all hover:shadow-purple-500/70 hover:scale-[1.02] flex items-center justify-center gap-3"
                disabled={!agreedToTerms}
              >
                <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                Submit Request to Admin
              </Button>
            </div>
          </form>
        </div>
      </ScrollArea>
    </div>
  );
}
