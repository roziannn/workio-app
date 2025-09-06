import Sidebar from "@/components/Sidebar";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-blue-50 flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 md:ml-0 p-6">{children}</main>
    </div>
  );
}
