"use client";

import NotificationManager from "@/components/NotifiactionManager";
import Sidebar from "@/components/Sidebar";
import { User, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // split URL jadi array ["overview", "platform", "detail"]
  const segments = pathname.split("/").filter((segment) => segment !== "");

  // format segment biar readable
  const formatSegment = (segment: string) => segment.charAt(0).toUpperCase() + segment.slice(1);

  return (
    <div className="flex min-h-screen flex-col md:flex-row rounded-2xl-l">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white p-5 m-5 lg:m-6 rounded-2xl">
          <nav className="text-gray-600 text-sm flex items-center space-x-2">
            {segments.map((segment, index) => {
              const href = "/" + segments.slice(0, index + 1).join("/");
              const isLast = index === segments.length - 1;

              return (
                <div key={index} className="flex items-center space-x-2">
                  {!isLast ? (
                    <Link href={href} className="hover:underline">
                      {formatSegment(segment)}
                    </Link>
                  ) : (
                    <span className="font-extrabold text-xl text-slate-900">{formatSegment(segment)}</span>
                  )}

                  {!isLast && <ChevronRight className="w-4 h-4 text-gray-400" />}
                </div>
              );
            })}
          </nav>

          <div className="items-center space-x-3 hidden md:flex">
            <span className="text-slate-900 font-medium">Firda Rosiana</span>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200">
              <Link href="/profile" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 transition">
                <User className="w-5 h-5 text-gray-700" />
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 px-5 pb-5 lg:px-6 lg:pb-6">
          {children}
          <NotificationManager />
        </main>
      </div>
    </div>
  );
}
