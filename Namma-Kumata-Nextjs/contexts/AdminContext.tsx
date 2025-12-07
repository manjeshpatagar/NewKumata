'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Shop {
  id: string;
  name: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  owner: string;
  submittedDate: string;
  phone?: string;
  address?: string;
  description?: string;
  image?: string;
  openingHours?: string;
}

export interface Ad {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected' | 'live' | 'expired';
  owner: string;
  submittedDate: string;
  description?: string;
  price?: string;
  phone?: string;
  location?: string;
  image?: string;
  featured?: boolean;
  sponsored?: boolean;
  duration?: '1day' | '3days' | '1week' | '1month';
  expiryDate?: string;
  approvedDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'shopowner' | 'admin';
  status: 'active' | 'blocked';
  joinedDate: string;
}

interface AdminStats {
  totalShops: number;
  totalAds: number;
  totalUsers: number;
  pendingShops: number;
  pendingAds: number;
  totalEvents: number;
}

interface AdminContextType {
  isAdminLoggedIn: boolean;
  adminUser: { email: string; name: string } | null;
  shops: Shop[];
  ads: Ad[];
  users: User[];
  stats: AdminStats;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
  approveShop: (id: string) => void;
  rejectShop: (id: string) => void;
  addShop: (shop: Omit<Shop, 'id' | 'submittedDate'>) => void;
  editShop: (id: string, shop: Partial<Shop>) => void;
  deleteShop: (id: string) => void;
  approveAd: (id: string) => void;
  approveAdWithPrice: (id: string, price: number) => void;
  rejectAd: (id: string) => void;
  addAd: (ad: Omit<Ad, 'id' | 'submittedDate' | 'status'>) => void;
  editAd: (id: string, ad: Partial<Ad>) => void;
  deleteAd: (id: string) => void;
  markAdAsPaid: (id: string) => void;
  blockUser: (id: string) => void;
  unblockUser: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(null);

  const [shops, setShops] = useState<Shop[]>([
    { 
      id: '1', 
      name: 'Rajesh General Store', 
      category: 'Grocery', 
      status: 'approved', 
      owner: 'Rajesh Kumar', 
      submittedDate: '2025-10-01',
      phone: '+91 9876543210',
      address: 'Main Road, Kumta',
      description: 'Your daily needs store with fresh groceries',
      openingHours: '8:00 AM - 9:00 PM'
    },
  ]);

  const [ads, setAds] = useState<Ad[]>([
    { 
      id: '1', 
      title: 'Honda Activa 2020', 
      category: 'Bikes', 
      status: 'approved',
      owner: 'Ramesh K', 
      submittedDate: '2025-10-10',
      description: 'Well maintained Honda Activa',
      price: '₹45,000',
      phone: '+91 9876543215',
      location: 'Kumta',
      featured: true,
      duration: '1month',
      expiryDate: '2025-11-10',
      approvedDate: '2025-10-11'
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Rajesh Kumar', email: 'rajesh@email.com', role: 'shopowner', status: 'active', joinedDate: '2025-09-15' },
  ]);

  const stats: AdminStats = {
    totalShops: shops.length,
    totalAds: ads.length,
    totalUsers: users.length,
    pendingShops: shops.filter(s => s.status === 'pending').length,
    pendingAds: ads.filter(a => a.status === 'pending').length,
    totalEvents: 3,
  };

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    if (email === 'admin@nammakumta.com' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      setAdminUser({ email, name: 'Admin User' });
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
  };

  const approveShop = (id: string) => {
    setShops(shops.map(s => s.id === id ? { ...s, status: 'approved' as const } : s));
  };

  const rejectShop = (id: string) => {
    setShops(shops.map(s => s.id === id ? { ...s, status: 'rejected' as const } : s));
  };

  const addShop = (shop: Omit<Shop, 'id' | 'submittedDate'>) => {
    const newShop: Shop = {
      ...shop,
      id: Date.now().toString(),
      submittedDate: new Date().toISOString().split('T')[0],
    };
    setShops([newShop, ...shops]);
  };

  const editShop = (id: string, shopUpdate: Partial<Shop>) => {
    setShops(shops.map(s => s.id === id ? { ...s, ...shopUpdate } : s));
  };

  const deleteShop = (id: string) => {
    setShops(shops.filter(s => s.id !== id));
  };

  const approveAd = (id: string) => {
    const ad = ads.find(a => a.id === id);
    if (!ad) return;

    const now = new Date();
    let expiryDate = new Date(now);
    
    if (ad.duration) {
      switch (ad.duration) {
        case '1day':
          expiryDate.setDate(now.getDate() + 1);
          break;
        case '3days':
          expiryDate.setDate(now.getDate() + 3);
          break;
        case '1week':
          expiryDate.setDate(now.getDate() + 7);
          break;
        case '1month':
          expiryDate.setMonth(now.getMonth() + 1);
          break;
      }
    }

    setAds(ads.map(a => a.id === id ? { 
      ...a, 
      status: 'approved' as const,
      approvedDate: new Date().toISOString().split('T')[0],
      expiryDate: ad.duration ? expiryDate.toISOString().split('T')[0] : undefined
    } : a));
  };

  const approveAdWithPrice = (id: string, price: number) => {
    approveAd(id);
  };

  const rejectAd = (id: string) => {
    setAds(ads.map(a => a.id === id ? { ...a, status: 'rejected' as const } : a));
  };

  const addAd = (ad: Omit<Ad, 'id' | 'submittedDate' | 'status'>) => {
    const newAd: Ad = {
      ...ad,
      id: Date.now().toString(),
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'pending' as const,
    };
    setAds([newAd, ...ads]);
  };

  const editAd = (id: string, adUpdate: Partial<Ad>) => {
    setAds(ads.map(a => a.id === id ? { ...a, ...adUpdate } : a));
  };

  const deleteAd = (id: string) => {
    setAds(ads.filter(a => a.id !== id));
  };

  const markAdAsPaid = (id: string) => {
    const ad = ads.find(a => a.id === id);
    if (!ad || !ad.duration) return;

    const now = new Date();
    let expiryDate = new Date(now);
    
    switch (ad.duration) {
      case '1day':
        expiryDate.setDate(now.getDate() + 1);
        break;
      case '3days':
        expiryDate.setDate(now.getDate() + 3);
        break;
      case '1week':
        expiryDate.setDate(now.getDate() + 7);
        break;
      case '1month':
        expiryDate.setMonth(now.getMonth() + 1);
        break;
    }

    setAds(ads.map(a => a.id === id ? { 
      ...a, 
      expiryDate: expiryDate.toISOString().split('T')[0]
    } : a));
  };

  const blockUser = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: 'blocked' as const } : u));
  };

  const unblockUser = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: 'active' as const } : u));
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        adminUser,
        shops,
        ads,
        users,
        stats,
        adminLogin,
        adminLogout,
        approveShop,
        rejectShop,
        addShop,
        editShop,
        deleteShop,
        approveAd,
        approveAdWithPrice,
        rejectAd,
        addAd,
        editAd,
        deleteAd,
        markAdAsPaid,
        blockUser,
        unblockUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

