"use client";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import axios from "axios";
import { API_BASE } from "../utils/api";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post(
      `${API_BASE}/auth/login`,
      new URLSearchParams({ username: email, password }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    const access = res.data.access_token;
    localStorage.setItem("token", access);
    setToken(access);
  };

  const register = async (email: string, password: string) => {
    const res = await axios.post(
      `${API_BASE}/auth/register`,
      new URLSearchParams({ username: email, password }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    const access = res.data.access_token;
    localStorage.setItem("token", access);
    setToken(access);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ token, login, register, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
