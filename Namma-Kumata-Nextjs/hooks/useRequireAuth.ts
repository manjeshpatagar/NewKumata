import { useAuth } from '../contexts/AuthContext';
import { useCallback } from 'react';

export function useRequireAuth() {
  const { isAuthenticated, isGuest } = useAuth();

  const requireAuth = useCallback((callback: () => void, onNavigateToLogin: () => void) => {
    if (!isAuthenticated && !isGuest) {
      // User is not logged in, redirect to login
      onNavigateToLogin();
      return false;
    }
    // User is authenticated, execute the callback
    callback();
    return true;
  }, [isAuthenticated, isGuest]);

  return { requireAuth, isAuthenticated, isGuest };
}
