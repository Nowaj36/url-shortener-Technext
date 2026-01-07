"use client";

import toast from "react-hot-toast";
import AuthForm from "@/components/ui/AuthForm";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login, isLoading } = useAuth();

  const handleLogin = async (data: any) => {
    try {
      await login(data);
      toast.success("Logged in successfully!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <section className="flex items-center justify-center bg-gray-50 px-4 my-5">
      <div className="w-full max-w-md space-y-4">

        <AuthForm type="login" onSubmit={handleLogin} />

        {isLoading && (
          <p className="text-center text-sm text-gray-400">Authenticating...</p>
        )}
      </div>
    </section>
  );
}