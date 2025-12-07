/**
 * AddListingPage - ADMIN ONLY
 * 
 * NOTE: This component is for ADMIN USE ONLY.
 * Regular users cannot add listings directly.
 * 
 * When users try to add a listing, they are redirected to ContactToListPage
 * where they can contact the admin team to get their business listed.
 * 
 * Only administrators have access to this form through the Admin Dashboard.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, MapPin, Phone, Mail, Clock, CheckCircle2, ShoppingBag, Church, Plane, GraduationCap, Wrench, Users, Building2, Stethoscope, Utensils, MoreHorizontal, Shield, Zap, Award, ChevronRight, FileText, Image as ImageIcon, MapPinned } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';

export function AddListingPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    phone: '',
    email: '',
    timings: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setCurrentStep(1);
      setFormData({
        name: '',
        category: '',
        description: '',
        phone: '',
        email: '',
        timings: '',
        location: '',
      });
      if (onSuccess) {
        onSuccess();
      }
    }, 3000);
  };

  const categories = [
    { id: 'grocery', name: 'Grocery', icon: ShoppingBag, gradient: 'from-orange-500 to-pink-500' },
    { id: 'medical', name: 'Medical', icon: Stethoscope, gradient: 'from-teal-500 to-cyan-600' },
    { id: 'furniture', name: 'Furniture', icon: Building2, gradient: 'from-amber-500 to-orange-500' },
    { id: 'temple', name: 'Temple', icon: Church, gradient: 'from-purple-500 to-indigo-600' },
    { id: 'tourism', name: 'Tourism', icon: Plane, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'services', name: 'Services', icon: Wrench, gradient: 'from-amber-500 to-orange-500' },
    { id: 'schools', name: 'Schools/Colleges', icon: GraduationCap, gradient: 'from-green-500 to-emerald-600' },
    { id: 'restaurant', name: 'Restaurant', icon: Utensils, gradient: 'from-red-500 to-pink-600' },
    { id: 'other', name: 'Other', icon: MoreHorizontal, gradient: 'from-gray-500 to-slate-600' },
  ];

  const verificationSteps = [
    { number: 1, title: 'Basic Info', icon: FileText, active: currentStep >= 1, completed: currentStep > 1 },
    { number: 2, title: 'Details', icon: ImageIcon, active: currentStep >= 2, completed: currentStep > 2 },
    { number: 3, title: 'Review', icon: CheckCircle2, active: currentStep >= 3, completed: false },
  ];

  const acceptedTypes = [
    { icon: ShoppingBag, title: 'Shops', color: 'from-orange-500 to-pink-500' },
    { icon: Church, title: 'Temples', color: 'from-purple-500 to-indigo-600' },
    { icon: Plane, title: 'Tourism', color: 'from-blue-500 to-cyan-500' },
    { icon: Stethoscope, title: 'Medical', color: 'from-teal-500 to-cyan-600' },
    { icon: Utensils, title: 'Food', color: 'from-red-500 to-pink-600' },
    { icon: Users, title: 'Services', color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen flex flex-col w-full bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Premium Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 md:px-6 py-4 sm:py-5">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent">
                Add New Listing
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-0.5">
                Get your business listed in minutes
              </p>
            </div>
          </div>

          {/* Verification Steps */}
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {verificationSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      step.completed 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30' 
                        : step.active 
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30'
                          : 'bg-gray-200 dark:bg-gray-800'
                    }`}>
                      {step.completed ? (
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      ) : (
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${step.active ? 'text-white' : 'text-gray-400'}`} />
                      )}
                    </div>
                    <p className={`text-xs sm:text-sm font-semibold mt-2 ${
                      step.active ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < verificationSteps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 sm:mx-3 rounded-full transition-all duration-300 ${
                      step.completed ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-200 dark:bg-gray-800'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 md:px-6 py-6 sm:py-8 pb-32">
          
          {/* Success Alert */}
          {submitted && (
            <div className="mb-6 animate-in slide-in-from-top duration-500">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 shadow-2xl shadow-green-500/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">Success!</h3>
                    <p className="text-white/90 text-sm">Listing submitted successfully! Pending admin approval.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Card with Gradient */}
          <Card className="p-6 sm:p-8 mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 border-0 rounded-3xl shadow-2xl shadow-purple-500/30 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32" />
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">Admin Verification Required</h2>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                    Your listing will be carefully reviewed by our admin team to ensure quality and accuracy. This typically takes 24-48 hours.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 text-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-yellow-300" />
                  <p className="text-xs sm:text-sm font-semibold">Fast Review</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 text-center">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-yellow-300" />
                  <p className="text-xs sm:text-sm font-semibold">Quality Check</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 text-center">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-yellow-300" />
                  <p className="text-xs sm:text-sm font-semibold">Verified Badge</p>
                </div>
              </div>
            </div>
          </Card>

          {/* We Accept Section */}
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              We Accept These Listings
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {acceptedTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.title}
                    className="group flex items-center gap-2 px-4 sm:px-5 py-3 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-800"
                  >
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {type.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Information Card */}
            <Card className="p-6 sm:p-8 bg-white dark:bg-gray-900 border-0 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Basic Information
                </h3>
              </div>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    Business Name
                    <Badge className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-0 text-xs">Required</Badge>
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., Kumar's General Store"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12 sm:h-14 text-base rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 bg-gray-50 dark:bg-gray-800"
                  />
                </div>

                {/* Category Selection with Icons */}
                <div>
                  <Label className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    Category
                    <Badge className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-0 text-xs">Required</Badge>
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = formData.category === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat.id })}
                          className={`relative group flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-lg shadow-blue-500/20'
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-600'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                          )}
                          <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${cat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white text-center">
                            {cat.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    Description
                    <Badge className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-0 text-xs">Required</Badge>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your business, services, specialties..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="text-base rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 bg-gray-50 dark:bg-gray-800 resize-none"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Minimum 50 characters recommended for better visibility
                  </p>
                </div>
              </div>
            </Card>

            {/* Contact Information Card */}
            <Card className="p-6 sm:p-8 bg-white dark:bg-gray-900 border-0 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Contact Information
                </h3>
              </div>

              <div className="space-y-5">
                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                    <Badge className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-0 text-xs">Required</Badge>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-12 sm:h-14 text-base rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-500 bg-gray-50 dark:bg-gray-800"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                    <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-0 text-xs">Optional</Badge>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 sm:h-14 text-base rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-500 bg-gray-50 dark:bg-gray-800"
                  />
                </div>

                {/* Business Hours */}
                <div>
                  <Label htmlFor="timings" className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Business Hours
                    <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-0 text-xs">Optional</Badge>
                  </Label>
                  <Input
                    id="timings"
                    placeholder="Mon-Sat: 9:00 AM - 8:00 PM"
                    value={formData.timings}
                    onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                    className="h-12 sm:h-14 text-base rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-500 bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              </div>
            </Card>

            {/* Media & Location Card */}
            <Card className="p-6 sm:p-8 bg-white dark:bg-gray-900 border-0 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Media & Location
                </h3>
              </div>

              <div className="space-y-5">
                {/* Images Upload */}
                <div>
                  <Label className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3">
                    Business Images
                    <Badge className="ml-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-0 text-xs">Optional</Badge>
                  </Label>
                  <div className="relative group cursor-pointer">
                    <div className="border-3 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:border-purple-500 dark:hover:border-purple-500 transition-all group-hover:shadow-lg">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xl shadow-purple-500/30">
                        <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        Click to upload images
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        PNG, JPG up to 5MB each (Max 5 images)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <MapPinned className="w-4 h-4" />
                    Location
                    <Badge className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-0 text-xs">Required</Badge>
                  </Label>
                  <div className="relative group cursor-pointer">
                    <div className="border-2 border-gray-200 dark:border-gray-700 rounded-3xl p-6 flex items-center gap-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 hover:border-blue-500 dark:hover:border-blue-500 transition-all group-hover:shadow-lg">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-0.5">
                          Select location on map
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Pin your exact business location
                        </p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <div className="space-y-4">
              <Button 
                type="submit" 
                className="w-full h-14 sm:h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-2xl text-base sm:text-lg font-bold shadow-2xl shadow-purple-500/40 hover:shadow-3xl hover:shadow-purple-500/50 transition-all hover:scale-105 active:scale-95"
              >
                Submit for Approval
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
              </Button>

              <p className="text-xs sm:text-sm text-center text-gray-600 dark:text-gray-400 leading-relaxed">
                By submitting, you agree to our terms. Your listing will be reviewed within 24-48 hours.
              </p>
            </div>
          </form>

          {/* Contact Admin Team Card */}
          <Card className="mt-8 p-6 sm:p-8 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 border-2 border-orange-200 dark:border-orange-800 rounded-3xl">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-orange-500/30">
                <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                Need Help?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
                Our team is here to assist you with any questions about the listing process.
              </p>
              <Button className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white rounded-2xl px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Contact Admin Team
              </Button>
            </div>
          </Card>

        </div>
      </ScrollArea>
    </div>
  );
}