"use client";

import AuthForm from "@/components/ui/AuthForm";

export default function LoginPage() {
  const handleLogin = (data: any) => {
    console.log("Logging in with:", data);
    // Add login logic here
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">
      <AuthForm type="login" onSubmit={handleLogin} />
    </section>
  );
}