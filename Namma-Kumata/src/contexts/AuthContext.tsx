'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
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
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  continueAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  /* ------------ REGISTER API ----------- */
  const register = async (data: any) => {
    console.log("📝 Register Request Payload:", data);
    console.log("📤 Sending Request: /register POST");

    const res = await axiosClient.post("/auth/register", data);

    localStorage.setItem("token", res.data.token);
    setUser(res.data.data);
  };

  /* ------------ LOGIN API ----------- */
  const login = async (email: string, password: string) => {
    console.log("🔐 Logging in:", email);

    const res = await axiosClient.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    setUser(res.data.data);
  };

  const continueAsGuest = () => setIsGuest(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsGuest(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isGuest,
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
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
