"use client";
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
  addShop: (shop: Omit<Shop, "id" | "submittedDate">) => void;
  editShop: (id: string, shop: Partial<Shop>) => void;
  deleteShop: (id: string) => void;


  approveAd: (id: string) => void;
  approveAdWithPrice: (id: string, price: number) => void;
  rejectAd: (id: string) => void;
  addAd: (ad: Omit<Ad, "id" | "submittedDate" | "status">) => void;
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
/* -----------------------------------------
   CONTEXT INITIALIZATION
------------------------------------------*/
const AdminContext = createContext<AdminContextType | undefined>(undefined);

/* -----------------------------------------
   PROVIDER START
------------------------------------------*/
/* -----------------------------------------
   PROVIDER START
------------------------------------------*/
export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(null);

  /* -----------------------------------------
     LOAD ADMIN FROM COOKIE + LOCAL STORAGE
  ------------------------------------------*/
  useEffect(() => {
    const browser = typeof window !== "undefined";
    if (!browser) return;

    const localToken = localStorage.getItem("adminToken");
    const cookieToken = document.cookie
      ?.split("; ")
      ?.find((row) => row.startsWith("adminToken="))
      ?.split("=")?.[1];

    const finalToken = localToken || cookieToken;
    const storedUser = localStorage.getItem("adminUser");

    if (finalToken && storedUser) {
      setIsAdminLoggedIn(true);
      setAdminUser(JSON.parse(storedUser));
    }
  }, []);

  /* -----------------------------------------
     ADMIN LOGIN — STORE TOKEN (LOCAL + COOKIE)
  ------------------------------------------*/
  const adminLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await authApi.login(email, password);

      if (res.data.role !== "admin") return false;

      const token = res.token;

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(res.data));

      // Save cookie for SSR
      document.cookie = `adminToken=${token}; Path=/; Max-Age=86400; SameSite=Lax;`;

      setAdminUser(res.data);
      setIsAdminLoggedIn(true);

      return true;
    } catch (err) {
      return false;
    }
  };

  /* -----------------------------------------
     ADMIN LOGOUT — REMOVE TOKEN (LOCAL + COOKIE)
  ------------------------------------------*/
  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    document.cookie = "adminToken=; Max-Age=0; Path=/;";

    setIsAdminLoggedIn(false);
    setAdminUser(null);
  };

  /* -----------------------------------------
     MOCK SHOPS / ADS / USERS (your existing data)
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
    pendingShops: shops.filter((s) => s.status === "pending").length,
    pendingAds: ads.filter((a) => a.status === "pending").length,
    totalEvents: 3,
  };

  /* -----------------------------------------
     SHOP OPERATIONS
  ------------------------------------------*/
  const approveShop = (id: string) =>
    setShops(
      shops.map((s) => (s.id === id ? { ...s, status: "approved" } : s))
    );

  const rejectShop = (id: string) =>
    setShops(
      shops.map((s) => (s.id === id ? { ...s, status: "rejected" } : s))
    );
  const rejectShop = (id: string) =>
    setShops(
      shops.map((s) => (s.id === id ? { ...s, status: "rejected" } : s))
    );

  const addShop = (shop: Omit<Shop, "id" | "submittedDate">) => {
    setShops([
      {
        ...shop,
        id: Date.now().toString(),
        submittedDate: new Date().toISOString().split("T")[0],
      },
      ...shops,
    ]);
  const addShop = (shop: Omit<Shop, "id" | "submittedDate">) => {
    setShops([
      {
        ...shop,
        id: Date.now().toString(),
        submittedDate: new Date().toISOString().split("T")[0],
      },
      ...shops,
    ]);
  };

  const editShop = (id: string, update: Partial<Shop>) =>
    setShops(shops.map((s) => (s.id === id ? { ...s, ...update } : s)));
  const editShop = (id: string, update: Partial<Shop>) =>
    setShops(shops.map((s) => (s.id === id ? { ...s, ...update } : s)));

  const deleteShop = (id: string) => setShops(shops.filter((s) => s.id !== id));

  /* -----------------------------------------
     AD OPERATIONS
  ------------------------------------------*/
  const deleteShop = (id: string) => setShops(shops.filter((s) => s.id !== id));

  /* -----------------------------------------
     AD OPERATIONS
  ------------------------------------------*/
  const approveAd = (id: string) => {
    const now = new Date();
    const ad = ads.find((a) => a.id === id);
    const now = new Date();
    const ad = ads.find((a) => a.id === id);
    if (!ad) return;

    let expiry = new Date(now);
    if (ad.duration === "1day") expiry.setDate(now.getDate() + 1);
    if (ad.duration === "3days") expiry.setDate(now.getDate() + 3);
    if (ad.duration === "1week") expiry.setDate(now.getDate() + 7);
    if (ad.duration === "1month") expiry.setMonth(now.getMonth() + 1);
    let expiry = new Date(now);
    if (ad.duration === "1day") expiry.setDate(now.getDate() + 1);
    if (ad.duration === "3days") expiry.setDate(now.getDate() + 3);
    if (ad.duration === "1week") expiry.setDate(now.getDate() + 7);
    if (ad.duration === "1month") expiry.setMonth(now.getMonth() + 1);

    setAds(
      ads.map((a) =>
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
    setAds(
      ads.map((a) =>
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
  const approveAdWithPrice = (id: string) => approveAd(id);

  const rejectAd = (id: string) =>
    setAds(ads.map((a) => (a.id === id ? { ...a, status: "rejected" } : a)));
  const rejectAd = (id: string) =>
    setAds(ads.map((a) => (a.id === id ? { ...a, status: "rejected" } : a)));

  const addAd = (ad: Omit<Ad, "id" | "submittedDate" | "status">) => {
    setAds([
      {
        ...ad,
        id: Date.now().toString(),
        submittedDate: new Date().toISOString().split("T")[0],
        status: "pending",
      },
      ...ads,
    ]);
  const addAd = (ad: Omit<Ad, "id" | "submittedDate" | "status">) => {
    setAds([
      {
        ...ad,
        id: Date.now().toString(),
        submittedDate: new Date().toISOString().split("T")[0],
        status: "pending",
      },
      ...ads,
    ]);
  };

  const editAd = (id: string, update: Partial<Ad>) =>
    setAds(ads.map((a) => (a.id === id ? { ...a, ...update } : a)));
  const editAd = (id: string, update: Partial<Ad>) =>
    setAds(ads.map((a) => (a.id === id ? { ...a, ...update } : a)));

  const deleteAd = (id: string) => setAds(ads.filter((a) => a.id !== id));
  const deleteAd = (id: string) => setAds(ads.filter((a) => a.id !== id));

  const markAdAsPaid = (id: string) => approveAd(id);

  /* -----------------------------------------
     USER OPERATIONS
  ------------------------------------------*/
  const blockUser = (id: string) =>
    setUsers(users.map((u) => (u.id === id ? { ...u, status: "blocked" } : u)));
  const markAdAsPaid = (id: string) => approveAd(id);

  /* -----------------------------------------
     USER OPERATIONS
  ------------------------------------------*/
  const blockUser = (id: string) =>
    setUsers(users.map((u) => (u.id === id ? { ...u, status: "blocked" } : u)));

  const unblockUser = (id: string) =>
    setUsers(users.map((u) => (u.id === id ? { ...u, status: "active" } : u)));

  /* -----------------------------------------
     PROVIDER RETURN
  ------------------------------------------*/
  const unblockUser = (id: string) =>
    setUsers(users.map((u) => (u.id === id ? { ...u, status: "active" } : u)));

  /* -----------------------------------------
     PROVIDER RETURN
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

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}
