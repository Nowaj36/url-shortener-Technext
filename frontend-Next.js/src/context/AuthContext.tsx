"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import apiClient from "@/lib/api-client";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Logout function to be used in context
  const logout = useCallback(() => {
    Cookies.remove("access_token");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/");
  }, [router]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("access_token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        // Backend to get user profile
        const { data } = await apiClient.get("/auth/me");
        setUser(data);
        setIsAuthenticated(true);
      } catch (error: any) {
        // if token invalid or expired, logout
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);