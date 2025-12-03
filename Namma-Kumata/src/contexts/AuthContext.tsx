'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'shopowner' | 'admin';
  shopName?: string;
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
  // Start with no user logged in
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call an API
    setUser({
      id: '1',
      name: 'Ramesh Kumar',
      email: email,
      role: 'admin',
    });
    setIsGuest(false);
  };

  const register = async (userData: any) => {
    // Mock registration - in production, this would call an API
    setUser({
      id: Math.random().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      shopName: userData.shopName,
    });
    setIsGuest(false);
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setUser(null);
  };

  const logout = () => {
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
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
