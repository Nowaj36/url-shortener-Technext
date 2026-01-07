import { useState } from "react";
import Cookies from "js-cookie";
import apiClient from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name?: string;
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated, setUser } = useAuthContext();
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const { data } = await apiClient.post("/auth/login", credentials);
      
      // Access token set in cookie
      Cookies.set("access_token", data.accessToken, { 
        secure: true, 
        sameSite: "strict",
        expires: 60 / 1440 // 1 hour
      });

      setIsAuthenticated(true);
      // Fetch user profile after login
      const profileResponse = await apiClient.get("/auth/me");
      setUser(profileResponse.data);

      router.replace("/dashboard");
      router.refresh();
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      throw new Error(message); 
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    try {
      await apiClient.post("/auth/register", credentials);
      
      router.push("/login");
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      Cookies.remove("access_token");
      router.push("/login");
    }
  };

  return { login, register, logout, isLoading };
};