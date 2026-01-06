"use client";

import AuthForm from "@/components/ui/AuthForm";

export default function RegisterPage() {
  const handleRegister = (data: any) => {
    console.log("Registering with:", data);
    // Add registration logic here
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">
      <AuthForm type="register" onSubmit={handleRegister} />
    </section>
  );
}