"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { axiosClient } from "@/lib/api/axiosClient";

/* --------------------------
   TYPES
---------------------------*/
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
  isAuthLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  continueAsGuest: () => void;
  logout: () => boolean;
}

/* --------------------------
   CONTEXT
---------------------------*/
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* --------------------------
   PROVIDER
---------------------------*/
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  /* ------------------------------------------------
     AUTO LOAD USER FROM COOKIE OR LOCALSTORAGE
  -------------------------------------------------*/
  useEffect(() => {
    const browser = typeof window !== "undefined";
    if (!browser) {
      setIsAuthLoading(false);
      return;
    }

    const localToken = localStorage.getItem("token");

    // Read token from cookies
    const cookieToken = document.cookie
      ?.split("; ")
      ?.find((c) => c.startsWith("token="))
      ?.split("=")?.[1];

    const token = localToken || cookieToken;

    if (!token) {
      setIsAuthLoading(false);
      return;
    }

    axiosClient
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        document.cookie = "token=; Max-Age=0; Path=/;";
        setUser(null);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  }, []);

  /* ------------------------------------------------
     REGISTER
  -------------------------------------------------*/
  const register = async (data: any) => {
    const res = await axiosClient.post("/auth/register", data);

    const token = res.data.token;

    // Store in localStorage
    localStorage.setItem("token", token);

    // Store in cookies for SSR
    document.cookie = `token=${token}; Path=/; Max-Age=86400; SameSite=Lax;`;

    setUser(res.data.data);
  };

  /* ------------------------------------------------
     LOGIN
  -------------------------------------------------*/
  const login = async (email: string, password: string) => {
    const res = await axiosClient.post("/auth/login", { email, password });

    const token = res.data.token;

    // Store in localStorage & cookies
    localStorage.setItem("token", token);
    document.cookie = `token=${token}; Path=/; Max-Age=86400; SameSite=Lax;`;

    setUser(res.data.data);
  };

  /* ------------------------------------------------
     GUEST MODE
  -------------------------------------------------*/
  const continueAsGuest = () => setIsGuest(true);

  /* ------------------------------------------------
     LOGOUT
  -------------------------------------------------*/
  const logout = () => {
    if (!localStorage.getItem("token") && !user) return false;

    // Remove both
    localStorage.removeItem("token");
    document.cookie = "token=; Max-Age=0; Path=/;";

    setUser(null);
    setIsGuest(false);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isGuest,
        isAuthLoading,
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
