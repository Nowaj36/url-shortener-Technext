"use client";
import Link from "next/link";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: any) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const isLogin = type === "login";

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white border rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? "Welcome Back" : "Create an Account"}
      </h2>
      
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit({}); }}>
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" placeholder="John Doe" className="w-full px-4 py-2 border rounded-lg outline-none" />
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" placeholder="name@company.com" className="w-full px-4 py-2 border rounded-lg outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg outline-none" />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link href={isLogin ? "/register" : "/login"} className="text-blue-600 font-medium hover:underline">
          {isLogin ? "Sign up" : "Log in"}
        </Link>
      </p>
    </div>
  );
}