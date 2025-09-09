"use client";

import Sidebar from "@/components/Sidebar";
import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Split URL jadi array ["overview", "platform", "detail"]
  const segments = pathname.split("/").filter((segment) => segment !== "");

  // Capitalize tiap segment biar rapi
  const formatSegment = (segment: string) => segment.charAt(0).toUpperCase() + segment.slice(1);

  return (
    <div className="flex min-h-screen flex-col md:flex-row rounded-2xl-l">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white p-5 m-6 rounded-2xl">
          {/* <header className="sticky top-0 z-50 flex items-center justify-between bg-white p-5 m-6 rounded-2xl shadow-sm"> */}
          <nav className="text-gray-600 text-sm">
            <ol className="flex space-x-2">
              {segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/");
                const isLast = index === segments.length - 1;

                return (
                  <li key={index} className="flex space-x-2">
                    {isLast ? (
                      <span className="font-extrabold text-xl text-slate-900">{formatSegment(segment)}</span>
                    ) : (
                      <a href={href} className="hover:underline">
                        {formatSegment(segment)}
                      </a>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="flex items-center space-x-3">
            <span className="text-slate-900 font-medium">Firda Rosiana</span>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200">
              <User className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </header>

        <main className="flex-1 px-6">{children}</main>
      </div>
    </div>
  );
}
