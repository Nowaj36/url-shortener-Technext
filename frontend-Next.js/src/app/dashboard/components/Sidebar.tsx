"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Create Short URL", href: "/dashboard/create" },
  { name: "URL List", href: "/dashboard/urls" },
  { name: "Analytics", href: "/dashboard/analytics" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 text-xl font-semibold">
        Shortify
      </div>

      <nav className="px-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-lg text-sm
                ${
                  active
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
