// src/hooks/useAdminAuth.ts

import { useState, useEffect, useCallback } from 'react';

interface AdminAuthData {
  authenticated: boolean;
  timestamp: number;
  expires: number;
}

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Check if current auth is valid
  const checkAuthStatus = useCallback(() => {
    try {
      const authData = localStorage.getItem('srq_admin_auth');
      
      if (!authData) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return false;
      }

      const parsed: AdminAuthData = JSON.parse(authData);
      const now = Date.now();

      // Check if auth has expired
      if (now > parsed.expires) {
        localStorage.removeItem('srq_admin_auth');
        setIsAuthenticated(false);
        setIsLoading(false);
        return false;
      }

      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Error checking auth status:', error);
      localStorage.removeItem('srq_admin_auth');
      setIsAuthenticated(false);
      setIsLoading(false);
      return false;
    }
  }, []);

  // Initialize auth check
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Auto-check auth every minute
  useEffect(() => {
    const interval = setInterval(() => {
      checkAuthStatus();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [checkAuthStatus]);

  // Handle authentication request
  const requestAuth = useCallback(() => {
    setShowAuthModal(true);
  }, []);

  // Handle authentication result
  const handleAuthResult = useCallback((success: boolean) => {
    setShowAuthModal(false);
    if (success) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle logout
  const logout = useCallback(() => {
    localStorage.removeItem('srq_admin_auth');
    setIsAuthenticated(false);
    setShowAuthModal(false);
  }, []);

  // Get remaining time
  const getRemainingTime = useCallback(() => {
    try {
      const authData = localStorage.getItem('srq_admin_auth');
      if (!authData) return 0;

      const parsed: AdminAuthData = JSON.parse(authData);
      const remaining = parsed.expires - Date.now();
      return Math.max(0, remaining);
    } catch {
      return 0;
    }
  }, []);

  // Format remaining time
  const getFormattedRemainingTime = useCallback(() => {
    const remaining = getRemainingTime();
    if (remaining <= 0) return '0m';

    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));

    if (hours > 0) {
      return `${hours}j ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }, [getRemainingTime]);

  return {
    isAuthenticated,
    isLoading,
    showAuthModal,
    requestAuth,
    handleAuthResult,
    logout,
    closeAuthModal: () => setShowAuthModal(false),
    getRemainingTime,
    getFormattedRemainingTime,
    refreshAuth: checkAuthStatus
  };
};