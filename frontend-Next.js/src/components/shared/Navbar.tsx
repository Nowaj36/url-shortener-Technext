"use client";

import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

const Navbar = () => {
  // user authentication state from context
  const { isAuthenticated, user, logout, isLoading } = useAuthContext();

  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Shortly
        </Link>

        <nav className="flex items-center space-x-6">
          {/* if user is not authenticated */}
          {!isLoading && !isAuthenticated && (
            <>
              <Link href="/login" className="text-gray-600 hover:text-black">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Sign up Free
              </Link>
            </>
          )}

          {/* if user is authenticated */}
          {!isLoading && isAuthenticated && (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                Hi, {user?.name || user?.email}
              </span>
              <button
                onClick={logout}
                className="text-sm text-red-500 hover:text-red-700 border border-red-200 px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;