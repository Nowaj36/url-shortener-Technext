import Link from "next/link";

const Navbar = () => {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">Shortly</Link>
        <nav className="space-x-6">
          <Link href="/login" className="text-gray-600 hover:text-black">Login</Link>
          <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Sign up Free
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;