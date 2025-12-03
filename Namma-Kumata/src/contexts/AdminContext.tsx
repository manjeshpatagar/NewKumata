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
  // Payment fields - COMMENTED OUT FOR FUTURE USE
  // paymentStatus: 'unpaid' | 'paid';
  // adminPrice?: number;
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
  addAd: (ad: Omit<Ad, 'id' | 'submittedDate' | 'status' | 'paymentStatus'>) => void;
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
    { 
      id: '2', 
      name: 'Kumta Medical Store', 
      category: 'Medical', 
      status: 'approved', 
      owner: 'Dr. Shetty', 
      submittedDate: '2025-10-03',
      phone: '+91 9876543211',
      address: 'Hospital Road, Kumta',
      description: 'Pharmacy with 24/7 service',
      openingHours: '24 Hours'
    },
    { 
      id: '3', 
      name: 'New Electronics Shop', 
      category: 'Electronics', 
      status: 'pending', 
      owner: 'Anil Naik', 
      submittedDate: '2025-10-14',
      phone: '+91 9876543212',
      address: 'Market Street, Kumta',
      description: 'Latest electronics and gadgets',
      openingHours: '10:00 AM - 8:00 PM'
    },
    { 
      id: '4', 
      name: 'Premium Furniture', 
      category: 'Furniture', 
      status: 'approved', 
      owner: 'Priya M', 
      submittedDate: '2025-10-05',
      phone: '+91 9876543213',
      address: 'Temple Road, Kumta',
      description: 'Quality furniture for your home',
      openingHours: '9:00 AM - 7:00 PM'
    },
    { 
      id: '5', 
      name: 'Quick Mart', 
      category: 'Grocery', 
      status: 'pending', 
      owner: 'Suresh Rao', 
      submittedDate: '2025-10-13',
      phone: '+91 9876543214',
      address: 'Bus Stand Road, Kumta',
      description: 'Quick shopping for daily essentials',
      openingHours: '7:00 AM - 10:00 PM'
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
    { 
      id: '2', 
      title: '2BHK House for Rent', 
      category: 'Home Rentals', 
      status: 'approved',
      owner: 'Priya S', 
      submittedDate: '2025-10-08',
      description: 'Spacious 2BHK with parking',
      price: '₹8,000/month',
      phone: '+91 9876543216',
      location: 'Kumta',
      sponsored: true,
      duration: '1month',
      expiryDate: '2025-11-08',
      approvedDate: '2025-10-09'
    },
    { 
      id: '3', 
      title: 'iPhone 12 64GB', 
      category: 'Electronics', 
      status: 'pending',
      owner: 'Amit Patel', 
      submittedDate: '2025-10-14',
      description: 'iPhone 12 in excellent condition',
      price: '₹35,000',
      phone: '+91 9876543217',
      location: 'Kumta',
      duration: '1week'
    },
    { 
      id: '4', 
      title: 'Maruti Swift 2018', 
      category: 'Cars', 
      status: 'pending',
      owner: 'Krishna M', 
      submittedDate: '2025-10-13',
      description: 'Well maintained Maruti Swift VXI',
      price: '₹4,50,000',
      phone: '+91 9876543218',
      location: 'Kumta',
      duration: '1month'
    },
    { 
      id: '5', 
      title: 'Sofa Set 3+2', 
      category: 'Furniture', 
      status: 'approved',
      owner: 'Deepa R', 
      submittedDate: '2025-10-09',
      description: 'Premium quality sofa set',
      price: '₹25,000',
      phone: '+91 9876543219',
      location: 'Kumta',
      duration: '1month',
      expiryDate: '2025-11-09',
      approvedDate: '2025-10-10'
    },
    { 
      id: '6', 
      title: 'Royal Enfield Classic 350', 
      category: 'Bikes', 
      status: 'approved',
      owner: 'Ramesh Kumar', 
      submittedDate: '2025-11-04',
      description: 'Excellent condition Royal Enfield Classic 350, well maintained with all service records',
      price: '₹1,25,000',
      phone: '+91 9876543220',
      location: 'Kumta',
      duration: '1month',
      expiryDate: '2025-12-04',
      approvedDate: '2025-11-05'
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Rajesh Kumar', email: 'rajesh@email.com', role: 'shopowner', status: 'active', joinedDate: '2025-09-15' },
    { id: '2', name: 'Priya Shetty', email: 'priya@email.com', role: 'user', status: 'active', joinedDate: '2025-09-20' },
    { id: '3', name: 'Anil Naik', email: 'anil@email.com', role: 'shopowner', status: 'active', joinedDate: '2025-10-01' },
    { id: '4', name: 'Suresh Rao', email: 'suresh@email.com', role: 'user', status: 'blocked', joinedDate: '2025-10-05' },
    { id: '5', name: 'Deepa R', email: 'deepa@email.com', role: 'user', status: 'active', joinedDate: '2025-10-10' },
  ]);

  const stats: AdminStats = {
    totalShops: shops.length,
    totalAds: ads.length,
    totalUsers: users.length,
    pendingShops: shops.filter(s => s.status === 'pending').length,
    pendingAds: ads.filter(a => a.status === 'pending').length,
    totalEvents: 3,
  };

  // Admin Authentication
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    // Mock admin credentials - in production, this would call an API
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

  // Shop Management
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

  // Ad Management
  const approveAd = (id: string) => {
    // Auto-approve and set expiry date based on duration
    const ad = ads.find(a => a.id === id);
    if (!ad) return;

    const now = new Date();
    let expiryDate = new Date(now);
    
    // Calculate expiry date based on duration
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

  // DEPRECATED - Kept for backward compatibility, now just calls approveAd
  const approveAdWithPrice = (id: string, price: number) => {
    // For now, just approve the ad without payment
    approveAd(id);
    /* PAYMENT SYSTEM - COMMENTED OUT FOR FUTURE USE
    const ad = ads.find(a => a.id === id);
    if (!ad || !ad.duration) {
      setAds(ads.map(a => a.id === id ? { ...a, status: 'approved' as const, adminPrice: price, paymentStatus: 'unpaid' as const, approvedDate: new Date().toISOString().split('T')[0] } : a));
      return;
    }

    // Calculate expiry date based on duration (will be set when payment is made)
    setAds(ads.map(a => a.id === id ? { 
      ...a, 
      status: 'approved' as const, 
      adminPrice: price, 
      paymentStatus: 'unpaid' as const,
      approvedDate: new Date().toISOString().split('T')[0]
    } : a));
    */
  };

  const rejectAd = (id: string) => {
    setAds(ads.map(a => a.id === id ? { ...a, status: 'rejected' as const } : a));
  };

  const addAd = (ad: Omit<Ad, 'id' | 'submittedDate' | 'status' | 'paymentStatus'>) => {
    const newAd: Ad = {
      ...ad,
      id: Date.now().toString(),
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'pending' as const,
      // paymentStatus: 'unpaid' as const, // Commented out - no payment system for now
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
    if (!ad || !ad.duration) {
      setAds(ads.map(a => a.id === id ? { ...a, paymentStatus: 'paid' as const } : a));
      return;
    }

    // Calculate expiry date based on duration
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
      paymentStatus: 'paid' as const,
      expiryDate: expiryDate.toISOString().split('T')[0]
    } : a));
  };

  // User Management
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