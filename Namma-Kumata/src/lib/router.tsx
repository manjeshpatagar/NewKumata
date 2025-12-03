'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

interface RouterContextType {
  pathname: string;
  searchParams: URLSearchParams;
  push: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  forward: () => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState('/');
  const [searchParams, setSearchParams] = useState(new URLSearchParams());
  const [history, setHistory] = useState<string[]>(['/']);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Parse URL on mount
  useEffect(() => {
    const path = window.location.pathname || '/';
    const params = new URLSearchParams(window.location.search);
    setPathname(path);
    setSearchParams(params);
  }, []);

  const push = useCallback((path: string) => {
    const [pathOnly, search] = path.split('?');
    const params = new URLSearchParams(search || '');
    
    setPathname(pathOnly);
    setSearchParams(params);
    
    // Update browser URL without reloading
    window.history.pushState({}, '', path);
    
    // Add to history
    setHistory(prev => [...prev.slice(0, historyIndex + 1), path]);
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const replace = useCallback((path: string) => {
    const [pathOnly, search] = path.split('?');
    const params = new URLSearchParams(search || '');
    
    setPathname(pathOnly);
    setSearchParams(params);
    
    window.history.replaceState({}, '', path);
  }, []);

  const back = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const path = history[newIndex];
      const [pathOnly, search] = path.split('?');
      const params = new URLSearchParams(search || '');
      
      setPathname(pathOnly);
      setSearchParams(params);
      setHistoryIndex(newIndex);
      
      window.history.pushState({}, '', path);
    }
  }, [history, historyIndex]);

  const forward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const path = history[newIndex];
      const [pathOnly, search] = path.split('?');
      const params = new URLSearchParams(search || '');
      
      setPathname(pathOnly);
      setSearchParams(params);
      setHistoryIndex(newIndex);
      
      window.history.pushState({}, '', path);
    }
  }, [history, historyIndex]);

  const value = {
    pathname,
    searchParams,
    push,
    replace,
    back,
    forward,
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within RouterProvider');
  }
  return context;
}

export function usePathname() {
  const { pathname } = useRouter();
  return pathname;
}

export function useSearchParams() {
  const { searchParams } = useRouter();
  return searchParams;
}
