"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { checkUserToken, UserRole } from '@/app/lib/tokenChecker';

interface AuthContextType {
  userRole: UserRole | null;
  setUserRole: React.Dispatch<React.SetStateAction<UserRole | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode; 
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  // Inisialisasi userRole menggunakan token pengguna saat komponen dimount
  useEffect(() => {
    const initializeUserRole = async () => {
      const role = await checkUserToken();
      setUserRole(role);
    };

    initializeUserRole();
  }, []);

  // console.log('User role:', userRole);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
export { UserRole };

