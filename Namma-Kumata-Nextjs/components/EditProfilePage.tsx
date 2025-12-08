'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Mail, Phone, Store, MapPin, Upload, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export function EditProfilePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Ramesh Kumar',
    email: user?.email || 'ramesh.kumar@email.com',
    phone: '+91 98765 43210',
    shopName: user?.shopName || '',
    shopCategory: 'Grocery',
    address: 'Kumta, Karnataka',
    bio: 'Local shop owner providing quality products',
  });

  const isShopOwner = user?.role === 'shopowner';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.back();
    }, 2000);
  };

  const shopCategories = [
    'Associations', 'Cultural Programs', 'Departments', 'Doctors',
    'Emergency Services', 'Hotels', 'Rent Vehicles', 'Schools & Colleges',
    'Services', 'Shops', 'Sports & Equipments', 'Tourism', 'Temples', 'Other'
  ];

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col max-w-2xl mx-auto bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 lg:p-8 border-b dark:border-gray-800">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="md:h-10 md:w-10">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
        <div>
          <h1 className="dark:text-white text-lg md:text-xl lg:text-2xl">{t('editProfile')}</h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{t('updateYourInfo')}</p>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 md:p-6 lg:p-8 pb-20 md:pb-24">
          {saved && (
            <Alert className="mb-4 md:mb-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <AlertDescription className="text-green-800 dark:text-green-300 text-sm md:text-base">
                {t('profileUpdated')}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 lg:space-y-8">
            {/* Profile Picture */}
            <section>
              <h2 className="mb-2 md:mb-3 dark:text-white text-base md:text-lg lg:text-xl">{t('profilePicture')}</h2>
              <Card className="p-4 md:p-5 lg:p-6 dark:bg-gray-900 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-5">
                  <div className="relative">
                    <Avatar className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-blue-600 text-white text-xl md:text-2xl lg:text-3xl">
                        {formData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 p-1.5 md:p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <Camera className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                  <div className="flex-1 w-full sm:w-auto">
                    <Button type="button" variant="outline" className="w-full h-9 md:h-10 lg:h-11 text-sm md:text-base">
                      <Upload className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                      {t('uploadImage')}
                    </Button>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 text-center sm:text-left">
                      {t('maxImageSize')}
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* Personal Information */}
            <section>
              <h2 className="mb-2 md:mb-3 dark:text-white text-base md:text-lg lg:text-xl">{t('personalInfo')}</h2>
              <Card className="p-3 md:p-4 lg:p-5 dark:bg-gray-900 dark:border-gray-800 space-y-3 md:space-y-4">
                {/* Full Name */}
                <div>
                  <Label htmlFor="name" className="dark:text-gray-200 text-sm md:text-base">
                    {t('fullName')} *
                  </Label>
                  <div className="relative mt-1.5">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      className="pl-9 md:pl-10 h-9 md:h-10 lg:h-11 text-sm md:text-base"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="dark:text-gray-200 text-sm md:text-base">
                    {t('email')} *
                  </Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-9 md:pl-10 h-9 md:h-10 lg:h-11 text-sm md:text-base"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="dark:text-gray-200 text-sm md:text-base">
                    {t('phoneNumber')} *
                  </Label>
                  <div className="relative mt-1.5">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      className="pl-9 md:pl-10 h-9 md:h-10 lg:h-11 text-sm md:text-base"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio" className="dark:text-gray-200 text-sm md:text-base">
                    {t('bio')} ({t('optional')})
                  </Label>
                  <Input
                    id="bio"
                    type="text"
                    className="mt-1.5 h-9 md:h-10 lg:h-11 text-sm md:text-base"
                    placeholder={t('bioPlaceholder')}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>
              </Card>
            </section>

            {/* Shop Information (Only for Shop Owners) */}
            {isShopOwner && (
              <section>
                <h2 className="mb-2 md:mb-3 dark:text-white text-base md:text-lg lg:text-xl">{t('shopInfo')}</h2>
                <Card className="p-3 md:p-4 lg:p-5 dark:bg-gray-900 dark:border-gray-800 space-y-3 md:space-y-4">
                  {/* Shop Name */}
                  <div>
                    <Label htmlFor="shopName" className="dark:text-gray-200 text-sm md:text-base">
                      {t('shopName')} *
                    </Label>
                    <div className="relative mt-1.5">
                      <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                      <Input
                        id="shopName"
                        type="text"
                        className="pl-9 md:pl-10 h-9 md:h-10 lg:h-11 text-sm md:text-base"
                        value={formData.shopName}
                        onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Shop Category */}
                  <div>
                    <Label htmlFor="shopCategory" className="dark:text-gray-200 text-sm md:text-base">
                      {t('shopCategory')} *
                    </Label>
                    <Select
                      value={formData.shopCategory}
                      onValueChange={(value) => setFormData({ ...formData, shopCategory: value })}
                    >
                      <SelectTrigger className="mt-1.5 h-9 md:h-10 lg:h-11 text-sm md:text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {shopCategories.map((cat) => (
                          <SelectItem key={cat} value={cat} className="text-sm md:text-base">
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Address */}
                  <div>
                    <Label htmlFor="address" className="dark:text-gray-200 text-sm md:text-base">
                      {t('address')} *
                    </Label>
                    <div className="relative mt-1.5">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                      <Input
                        id="address"
                        type="text"
                        className="pl-9 md:pl-10 h-9 md:h-10 lg:h-11 text-sm md:text-base"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Shop Image */}
                  <div>
                    <Label className="dark:text-gray-200 text-sm md:text-base">{t('shopImage')}</Label>
                    <Button type="button" variant="outline" className="w-full mt-1.5 h-9 md:h-10 lg:h-11 text-sm md:text-base">
                      <Upload className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                      {t('uploadShopImage')}
                    </Button>
                  </div>
                </Card>
              </section>
            )}

            {/* Account Settings */}
            <section>
              <h2 className="mb-2 md:mb-3 dark:text-white text-base md:text-lg lg:text-xl">{t('accountSettings')}</h2>
              <Card className="p-3 md:p-4 lg:p-5 dark:bg-gray-900 dark:border-gray-800">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 h-9 md:h-10 lg:h-11 text-sm md:text-base"
                >
                  {t('changePassword')}
                </Button>
              </Card>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-2 md:pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-10 md:h-11 lg:h-12 text-sm md:text-base"
                onClick={() => router.back()}
              >
                {t('cancel')}
              </Button>

              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 h-10 md:h-11 lg:h-12 text-sm md:text-base"
              >
                {t('saveChanges')}
              </Button>
            </div>
          </form>
        </div>
      </ScrollArea>
    </div>
  );
}