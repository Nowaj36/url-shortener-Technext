"use client";

import AuthForm from "@/components/ui/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const { register, isLoading } = useAuth();
    
  const handleRegister = async (data: any) => {
    console.log("Registering with:", data);
    try {
        await register(data);
        toast.success("Registration successful!");
    } catch (error) {
        console.error("Registration failed:", error);
        toast.error("Registration failed.", );
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">
      <AuthForm type="register" onSubmit={handleRegister} />
    </section>
  );
}