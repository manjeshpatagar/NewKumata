"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { authApi } from "@/lib/api/authApi";

/* --------------------------
   TYPES
---------------------------*/
export interface Shop {
  id: string;
  name: string;
  category: string;
  status: "pending" | "approved" | "rejected";
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
  status: "pending" | "approved" | "rejected" | "live" | "expired";
  owner: string;
  submittedDate: string;
  description?: string;
  price?: string;
  phone?: string;
  location?: string;
  image?: string;
  featured?: boolean;
  sponsored?: boolean;
  duration?: "1day" | "3days" | "1week" | "1month";
  expiryDate?: string;
  approvedDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "shopowner" | "admin";
  status: "active" | "blocked";
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
  adminUser: User | null;

  shops: Shop[];
  ads: Ad[];
  users: User[];
  stats: AdminStats;

  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => void;

  approveShop: (id: string) => void;
  rejectShop: (id: string) => void;
  addShop: (shop: Omit<Shop, "id" | "submittedDate">) => void;
  editShop: (id: string, shop: Partial<Shop>) => void;
  deleteShop: (id: string) => void;

  approveAd: (id: string) => void;
  approveAdWithPrice: (id: string, price: number) => void;
  rejectAd: (id: string) => void;
  addAd: (ad: Omit<Ad, "id" | "submittedDate" | "status">) => void;
  editAd: (id: string, ad: Partial<Ad>) => void;
  deleteAd: (id: string) => void;
  markAdAsPaid: (id: string) => void;

  blockUser: (id: string) => void;
  unblockUser: (id: string) => void;
}

/* -----------------------------------------
   CONTEXT INITIALIZATION
------------------------------------------*/
const AdminContext = createContext<AdminContextType | undefined>(undefined);

/* -----------------------------------------
   PROVIDER
------------------------------------------*/
export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState<User | null>(null);

  /* -----------------------------------------
     LOAD ADMIN FROM LOCALSTORAGE + COOKIE
  ------------------------------------------*/
  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");

    if (token && user) {
      setIsAdminLoggedIn(true);
      setAdminUser(JSON.parse(user));
    }
  }, []);

  /* -----------------------------------------
     LOGIN
  ------------------------------------------*/
  const adminLogin = async (email: string, password: string) => {
    try {
      const res = await authApi.login(email, password);

      if (res.data.role !== "admin") return false;

      const token = res.token;

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(res.data));

      document.cookie = `adminToken=${token}; Path=/; Max-Age=86400; SameSite=Lax`;

      setIsAdminLoggedIn(true);
      setAdminUser(res.data);

      return true;
    } catch (e) {
      return false;
    }
  };

  /* -----------------------------------------
     LOGOUT
  ------------------------------------------*/
  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    document.cookie = "adminToken=; Max-Age=0; Path=/";

    setIsAdminLoggedIn(false);
    setAdminUser(null);
  };

  /* -----------------------------------------
     MOCK DATA (DEMO)
  ------------------------------------------*/
  const [shops, setShops] = useState<Shop[]>([
    {
      id: "1",
      name: "Rajesh General Store",
      category: "Grocery",
      status: "approved",
      owner: "Rajesh Kumar",
      submittedDate: "2025-10-01",
      phone: "+91 9876543210",
      address: "Main Road, Kumta",
      description: "Your daily needs store",
      openingHours: "8 AM - 9 PM",
    },
  ]);

  const [ads, setAds] = useState<Ad[]>([
    {
      id: "1",
      title: "Honda Activa 2020",
      category: "Bikes",
      status: "approved",
      owner: "Ramesh",
      submittedDate: "2025-10-10",
      price: "₹45,000",
      phone: "987654321",
      location: "Kumta",
      featured: true,
      duration: "1month",
      approvedDate: "2025-10-11",
      expiryDate: "2025-11-10",
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh@email.com",
      role: "shopowner",
      status: "active",
      joinedDate: "2025-09-15",
    },
  ]);

  const stats: AdminStats = {
    totalShops: shops.length,
    totalAds: ads.length,
    totalUsers: users.length,
    pendingShops: shops.filter((s) => s.status === "pending").length,
    pendingAds: ads.filter((a) => a.status === "pending").length,
    totalEvents: 3,
  };

  /* -----------------------------------------
     SHOP OPERATIONS
  ------------------------------------------*/
  const approveShop = (id: string) =>
    setShops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "approved" } : s))
    );

  const rejectShop = (id: string) =>
    setShops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "rejected" } : s))
    );

  const addShop = (shop: Omit<Shop, "id" | "submittedDate">) =>
    setShops((prev) => [
      {
        ...shop,
        id: Date.now().toString(),
        submittedDate: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);

  const editShop = (id: string, update: Partial<Shop>) =>
    setShops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...update } : s))
    );

  const deleteShop = (id: string) =>
    setShops((prev) => prev.filter((s) => s.id !== id));

  /* -----------------------------------------
     AD OPERATIONS
  ------------------------------------------*/
  const approveAd = (id: string) => {
    const ad = ads.find((a) => a.id === id);
    if (!ad) return;

    const now = new Date();
    let expiry = new Date(now);

    if (ad.duration === "1day") expiry.setDate(now.getDate() + 1);
    if (ad.duration === "3days") expiry.setDate(now.getDate() + 3);
    if (ad.duration === "1week") expiry.setDate(now.getDate() + 7);
    if (ad.duration === "1month") expiry.setMonth(now.getMonth() + 1);

    setAds((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: "approved",
              approvedDate: now.toISOString().split("T")[0],
              expiryDate: expiry.toISOString().split("T")[0],
            }
          : a
      )
    );
  };

  const approveAdWithPrice = (id: string) => approveAd(id);

  const rejectAd = (id: string) =>
    setAds((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "rejected" } : a))
    );

  const addAd = (ad: Omit<Ad, "id" | "submittedDate" | "status">) =>
    setAds((prev) => [
      {
        ...ad,
        id: Date.now().toString(),
        submittedDate: new Date().toISOString().split("T")[0],
        status: "pending",
      },
      ...prev,
    ]);

  const editAd = (id: string, update: Partial<Ad>) =>
    setAds((prev) => prev.map((a) => (a.id === id ? { ...a, ...update } : a)));

  const deleteAd = (id: string) =>
    setAds((prev) => prev.filter((a) => a.id !== id));

  const markAdAsPaid = (id: string) => approveAd(id);

  /* -----------------------------------------
     USER OPERATIONS
  ------------------------------------------*/
  const blockUser = (id: string) =>
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "blocked" } : u))
    );

  const unblockUser = (id: string) =>
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "active" } : u))
    );

  /* -----------------------------------------
     RETURN PROVIDER
  ------------------------------------------*/
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

/* -----------------------------------------
   HOOK
------------------------------------------*/
export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}
