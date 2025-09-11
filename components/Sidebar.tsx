"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Users, CheckSquare, Folder, BarChart2, User, Settings, LogOut, Menu, X } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setOpen(!open);

  const links = [
    { href: "/overview", label: "Overview", icon: Home },
    { href: "/teams", label: "Teams", icon: Users },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/projects", label: "Projects", icon: Folder },
    // { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/reports", label: "Reports", icon: BarChart2 },
  ];

  const others = [
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/logout", label: "Logout", icon: LogOut },
  ];

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div className="md:hidden sticky top-0 z-50 bg-white shadow flex justify-between items-center px-4 py-3">
        <Image src="/logo.png" alt="Workio Logo" width={60} height={60} />
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-100 transition">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <nav className="md:hidden bg-white px-4 py-3 space-y-2 shadow">
          {[...links, ...others].map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-2 px-2 py-2 rounded transition ${pathname === href ? "bg-gray-100 text-red-500 font-medium" : "hover:bg-gray-50"}`}>
              <Icon size={18} /> {label}
            </Link>
          ))}
        </nav>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex md:flex-col md:w-60 md:h-screen md:sticky md:top-0 bg-white p-5">
        <div className="flex justify-left pb-6">
          <Image src="/logo.png" alt="Workio Logo" width={100} height={120} priority />
        </div>

        <nav className="text-sm space-y-8 flex-1 overflow-y-auto">
          <div>
            <p className="uppercase text-gray-400 text-xs mb-3">General</p>
            <div className="space-y-4">
              {links.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className={`flex items-center gap-2 px-4 py-3 rounded-3xl font-medium transition ${pathname === href ? "btn-primary" : "hover:bg-gray-100 hover:text-red-500"}`}>
                  <Icon size={18} /> {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="uppercase text-gray-400 text-xs mb-3">Others</p>
            <div className="space-y-4">
              {others.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className={`flex items-center gap-2 px-4 py-3 rounded-3xl font-medium transition ${pathname === href ? "btn-primary" : "hover:bg-gray-100 hover:text-red-500"}`}>
                  <Icon size={18} /> {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
