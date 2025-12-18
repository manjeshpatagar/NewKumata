'use client';

import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Store,
  Save,
  Trash2,
  Upload,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
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
import { productApi } from '@/lib/api/productApi';
import { categoryApi } from '@/lib/api/categoryApi';
import { subCategoryApi } from '@/lib/api/subCategoryApi';
import { toast } from 'sonner';

interface AdminEditShopPageProps {
  shopId: string;
  onBack: () => void;
}

export function AdminEditShopPage({ shopId, onBack }: AdminEditShopPageProps) {
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<
    { id: string; name: string }[]
  >([]);

  const [subCategories, setSubCategories] = useState<
    { id: string; name: string; categoryId?: string }[]
  >([]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subCategory: '',
    owner: '',
    phone: '',
    address: '',
    description: '',
    openingHours: '',
    status: 'approved' as 'pending' | 'approved' | 'rejected',
    badges: '' as
      | ''
      | 'new'
      | 'popular'
      | 'featured'
      | 'upcoming'
      | 'trending'
      | 'exclusive',
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  /* -------------------- LOAD CATEGORIES -------------------- */
  useEffect(() => {
    categoryApi.getAll().then(res => {
      const list = res.data?.data || res.data || [];
      setCategories(
        list.map((c: any) => ({ id: c._id, name: c.name }))
      );
    });
  }, []);

  /* -------------------- LOAD SUBCATEGORIES -------------------- */
  useEffect(() => {
    subCategoryApi.getAll().then(res => {
      const list = res.data?.data || res.data || [];
      setSubCategories(
        list.map((s: any) => ({
          id: s._id,
          name: s.name,
          categoryId: s.categoryId?._id || s.categoryId,
        }))
      );
    });
  }, []);

  /* -------------------- LOAD SHOP -------------------- */
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await productApi.getById(shopId);
        const item = res.data?.data || res.data;

        setFormData({
          name: item.shopName || '',
          category: item.categoryId?._id || item.categoryId || '',
          subCategory: item.subCategoryId?._id || item.subCategoryId || '',
          owner: item.contact?.ownerName || '',
          phone: item.contact?.phone || '',
          address: item.address || '',
          description: item.description || '',
          openingHours: item.openingHours?.open || '',
          status: item.status === 'inactive' ? 'pending' : 'approved',
          badges: item.badges || '',
        });

        setImagePreviews(item.images || []);
      } catch {
        toast.error('Failed to load shop');
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [shopId]);

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async () => {
    try {
      const form = new FormData();

      form.append('shopName', formData.name);
      form.append('address', formData.address);
      form.append('description', formData.description);
      form.append('contact[ownerName]', formData.owner);
      form.append('contact[phone]', formData.phone);
      form.append('openingHours[open]', formData.openingHours);

      form.append('subCategoryId', formData.subCategory);
      form.append('categoryId', formData.category);

      if (formData.badges) {
        form.append('badges', formData.badges);
      }

      form.append(
        'status',
        formData.status === 'approved' ? 'active' : 'inactive'
      );

      images.forEach(file => form.append('images', file));

      await productApi.update(shopId, form);
      toast.success('Shop updated successfully');
      onBack();
    } catch {
      toast.error('Update failed');
    }
  };

  /* -------------------- IMAGES -------------------- */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () =>
        setImagePreviews(prev => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ScrollArea className="h-screen">
        <div className="max-w-4xl mx-auto p-4">
          <Card className="p-6 space-y-6">

            {/* SHOP NAME */}
            <div>
              <Label>Shop Name</Label>
              <Input value={formData.name} onChange={e => handleChange('name', e.target.value)} />
            </div>

            {/* SUBCATEGORY */}
            <div>
              <Label>Subcategory</Label>
              <Select
                value={formData.subCategory}
                onValueChange={(value) => {
                  const matched = subCategories.find(s => s.id === value);
                  setFormData(prev => ({
                    ...prev,
                    subCategory: value,
                    category: matched?.categoryId || '',
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {subCategories.map(sub => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* BADGE */}
            <div>
              <Label>Badge (optional)</Label>
              <Select value={formData.badges} onValueChange={v => handleChange('badges', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select badge" />
                </SelectTrigger>
                <SelectContent>
                  {['new','popular','featured','upcoming','trending','exclusive'].map(b => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* OWNER / PHONE / ADDRESS / DESC / HOURS */}
            <Input placeholder="Owner" value={formData.owner} onChange={e => handleChange('owner', e.target.value)} />
            <Input placeholder="Phone" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} />
            <Textarea placeholder="Address" value={formData.address} onChange={e => handleChange('address', e.target.value)} />
            <Textarea placeholder="Description" value={formData.description} onChange={e => handleChange('description', e.target.value)} />
            <Input placeholder="Opening Hours" value={formData.openingHours} onChange={e => handleChange('openingHours', e.target.value)} />

            {/* IMAGES */}
            <Button variant="outline" onClick={() => document.getElementById('img')?.click()}>
              <Upload className="w-4 h-4 mr-2" /> Upload Images
            </Button>
            <input id="img" type="file" hidden multiple onChange={handleImageUpload} />

            <div className="grid grid-cols-3 gap-3">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative">
                  <img src={src} className="h-24 w-full object-cover rounded" />
                  <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* STATUS */}
            <Select value={formData.status} onValueChange={v => handleChange('status', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-blue-600" onClick={handleSubmit}>
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
