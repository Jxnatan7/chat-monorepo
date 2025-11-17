import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useAuthStore, User } from "../stores/authStore";
import axiosClient from "@/api/axiosClient";

type AuthContextData = {
  user: User | null;
  token: string | null;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  houseId: string | null;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const houseId = useAuthStore((s) => s.houseId);
  const setToken = useAuthStore((s) => s.setToken);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const register = useAuthStore((s) => s.register);

  useEffect(() => {
    if (token) {
      axiosClient.defaults.headers.common = {
        ...(axiosClient.defaults.headers.common || {}),
        Authorization: `Bearer ${token}`,
      };
    } else {
      if (axiosClient.defaults.headers && axiosClient.defaults.headers.common) {
        delete axiosClient.defaults.headers.common.Authorization;
      }
    }
  }, [token]);

  const value: AuthContextData = {
    user,
    token,
    houseId,
    setToken,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth precisa ser usado dentro de um AuthProvider");
  }
  return context;
};

export default AuthProvider;
