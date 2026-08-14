'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: string;
  recyclingScore: number;
  totalScans: number;
  totalCo2SavedKg: number;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Load stored token & user on mount
    const savedToken = localStorage.getItem('ecovision_token');
    const savedUser = localStorage.getItem('ecovision_user');
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('ecovision_token');
        localStorage.removeItem('ecovision_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/login', {
        email,
        password,
      });

      if (res.data?.success && res.data?.data?.accessToken) {
        const { accessToken, user: userData } = res.data.data;
        setToken(accessToken);
        setUser(userData);
        localStorage.setItem('ecovision_token', accessToken);
        localStorage.setItem('ecovision_user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Authentication error:', err.response?.data?.error || err.message);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('ecovision_token');
    localStorage.removeItem('ecovision_user');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
