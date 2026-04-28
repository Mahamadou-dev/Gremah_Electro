import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const ADMIN_STORAGE_KEY = 'gremah_admin_auth';
const ADMIN_CREDENTIALS = {
  email: 'admin@gremah.com',
  password: 'admin123'
};

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.token === 'gremah-admin-token-2026') {
          setIsAdmin(true);
        }
      }
    } catch {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const token = 'gremah-admin-token-2026';
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify({ token, email }));
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Identifiants incorrects' };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    setIsAdmin(false);
  }, []);

  const contextValue = useMemo(() => ({
    isAdmin,
    isLoading,
    login,
    logout
  }), [isAdmin, isLoading, login, logout]);

  return (
    <AdminAuthContext.Provider value={contextValue}>
      {children}
    </AdminAuthContext.Provider>
  );
};

AdminAuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth doit être utilisé dans un AdminAuthProvider');
  }
  return context;
};

export default AdminAuthContext;
