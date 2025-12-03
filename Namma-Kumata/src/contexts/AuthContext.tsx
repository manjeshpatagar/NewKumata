'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { axiosClient } from "@/lib/api/axiosClient";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "shopowner" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isAuthLoading: boolean;                      // ⭐ added
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  continueAsGuest: () => void;
  logout: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);   // ⭐ added

  /* ---------------- LOAD USER IF TOKEN EXISTS ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("token");

    // No token → stop loading
    if (!token) {
      setIsAuthLoading(false);
      return;
    }

    // Validate token + load user
    axiosClient
      .get("/auth/me")
      .then((res) => {
        console.log("🟢 Loaded profile:", res.data.data);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log("❌ Error loading profile:", err?.response?.data || err);
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => {
        setIsAuthLoading(false);   // ⭐ allows Router to start protecting pages
      });
  }, []);

  /* ---------------- REGISTER API ---------------- */
  const register = async (data: any) => {
    const res = await axiosClient.post("/auth/register", data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.data);
  };

  /* ---------------- LOGIN API ---------------- */
  const login = async (email: string, password: string) => {
    const res = await axiosClient.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.data);
  };

  const continueAsGuest = () => setIsGuest(true);

  const logout = () => {
    const token = localStorage.getItem("token");

    if (!token && !user) {
      console.log("⚠️ Logout blocked: No active user session.");
      return false;
    }

    localStorage.removeItem("token");
    setUser(null);
    setIsGuest(false);
    console.log("✅ User logged out successfully");
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isGuest,
        isAuthLoading,      // ⭐ added
        login,
        register,
        continueAsGuest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
