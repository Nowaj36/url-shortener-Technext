import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* FIXED SIDEBAR */}
      <aside className="w-64 shrink-0 fixed inset-y-0 left-0 bg-white border-r z-20">
        <Sidebar />
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 ml-64 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
