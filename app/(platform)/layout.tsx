export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Workio</h2>
        <nav className="space-y-3">
          <a href="/dashboard" className="block hover:text-pink-400">
            Dashboard
          </a>
          <a href="/settings" className="block hover:text-pink-400">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
