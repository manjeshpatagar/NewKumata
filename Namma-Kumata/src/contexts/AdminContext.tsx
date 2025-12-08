'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authApi } from '../lib/api/authApi'; // <-- using your existing authApi

// ------- TYPES -------
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

// ---------------- CONTEXT ----------------
const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(null);

  // ***********************
  // RESTORE ADMIN ON REFRESH
  // ***********************
  useEffect(() => {
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('admin_name');
    const email = localStorage.getItem('admin_email');

    if (role === 'admin' && name && email) {
      setIsAdminLoggedIn(true);
      setAdminUser({ name, email });
    }
  }, []);

  // ***********************
  // REAL ADMIN LOGIN (using backend)
  // ***********************
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await authApi.login(email, password);

      const { token, data } = res;

      if (data.role !== 'admin') {
        return false; // not admin
      }

      // Save auth data
      localStorage.setItem('token', token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('admin_name', data.name);
      localStorage.setItem('admin_email', data.email);

      setIsAdminLoggedIn(true);
      setAdminUser({ email: data.email, name: data.name });

      return true;
    } catch (error) {
      console.error("Admin Login Error:", error);
      return false;
    }
  };

  // ***********************
  // ADMIN LOGOUT
  // ***********************
  const adminLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('admin_name');
    localStorage.removeItem('admin_email');

    setIsAdminLoggedIn(false);
    setAdminUser(null);
  };

  // ***********************
  // EXISTING MOCKED SHOP / ADS / USER DATA (unchanged)
  // ***********************
  const [shops, setShops] = useState<Shop[]>([
    // ... (your full mock shops list unchanged)
  ]);

  const [ads, setAds] = useState<Ad[]>([
    // ... (your full mock ads list unchanged)
  ]);

  const [users, setUsers] = useState<User[]>([
    // ... (your full mock users list unchanged)
  ]);

  const stats: AdminStats = {
    totalShops: shops.length,
    totalAds: ads.length,
    totalUsers: users.length,
    pendingShops: shops.filter(s => s.status === 'pending').length,
    pendingAds: ads.filter(a => a.status === 'pending').length,
    totalEvents: 3,
  };

  // ***********************
  // SHOP MANAGEMENT (same as before)
  // ***********************
  const approveShop = (id: string) => {
    setShops(shops.map(s => s.id === id ? { ...s, status: 'approved' } : s));
  };

  const rejectShop = (id: string) => {
    setShops(shops.map(s => s.id === id ? { ...s, status: 'rejected' } : s));
  };

  const addShop = (shop: Omit<Shop, 'id' | 'submittedDate'>) => {
    const newShop: Shop = {
      ...shop,
      id: Date.now().toString(),
      submittedDate: new Date().toISOString().split('T')[0],
    };
    setShops([newShop, ...shops]);
  };

  const editShop = (id: string, update: Partial<Shop>) => {
    setShops(shops.map(s => (s.id === id ? { ...s, ...update } : s)));
  };

  const deleteShop = (id: string) => {
    setShops(shops.filter(s => s.id !== id));
  };

  // ***********************
  // ADS MANAGEMENT (unchanged)
  // ***********************
  const approveAd = (id: string) => {
    const ad = ads.find(a => a.id === id);
    if (!ad) return;

    const now = new Date();
    let expiry = new Date(now);

    if (ad.duration) {
      switch (ad.duration) {
        case '1day': expiry.setDate(now.getDate() + 1); break;
        case '3days': expiry.setDate(now.getDate() + 3); break;
        case '1week': expiry.setDate(now.getDate() + 7); break;
        case '1month': expiry.setMonth(now.getMonth() + 1); break;
      }
    }

    setAds(
      ads.map(a =>
        a.id === id
          ? {
              ...a,
              status: 'approved',
              approvedDate: now.toISOString().split('T')[0],
              expiryDate: expiry.toISOString().split('T')[0],
            }
          : a
      )
    );
  };

  const approveAdWithPrice = (id: string, price: number) => {
    approveAd(id);
  };

  const rejectAd = (id: string) => {
    setAds(ads.map(a => (a.id === id ? { ...a, status: 'rejected' } : a)));
  };

  const addAd = (ad: Omit<Ad, 'id' | 'submittedDate' | 'status'>) => {
    const newAd: Ad = {
      ...ad,
      id: Date.now().toString(),
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setAds([newAd, ...ads]);
  };

  const editAd = (id: string, update: Partial<Ad>) => {
    setAds(ads.map(a => (a.id === id ? { ...a, ...update } : a)));
  };

  const deleteAd = (id: string) => {
    setAds(ads.filter(a => a.id !== id));
  };

  const markAdAsPaid = (id: string) => {
    const ad = ads.find(a => a.id === id);
    if (!ad) return;

    const now = new Date();
    let expiry = new Date(now);

    if (ad.duration) {
      switch (ad.duration) {
        case '1day': expiry.setDate(now.getDate() + 1); break;
        case '3days': expiry.setDate(now.getDate() + 3); break;
        case '1week': expiry.setDate(now.getDate() + 7); break;
        case '1month': expiry.setMonth(now.getMonth() + 1); break;
      }
    }

    setAds(
      ads.map(a =>
        a.id === id
          ? {
              ...a,
              expiryDate: expiry.toISOString().split('T')[0],
            }
          : a
      )
    );
  };

  // ***********************
  // USER MANAGEMENT (unchanged)
  // ***********************
  const blockUser = (id: string) => {
    setUsers(users.map(u => (u.id === id ? { ...u, status: 'blocked' } : u)));
  };

  const unblockUser = (id: string) => {
    setUsers(users.map(u => (u.id === id ? { ...u, status: 'active' } : u)));
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

// Hook
export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
}
