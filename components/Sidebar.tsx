"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Box, ChevronDownCircle, ChevronRightCircle, FileText, ListCheck, LucideIcon, PieChart, Shield, Home, Users, CheckSquare, Folder, BarChart2, BoxIcon, Settings, LogOut, Menu, X } from "lucide-react";

interface NavItem {
  href?: string;
  label: string;
  icon: LucideIcon;
  children?: NavItem[];
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleSidebar = () => setOpen(!open);

  const links: NavItem[] = [
    { href: "/overview", label: "Overview", icon: Home },
    {
      label: "Master",
      icon: BoxIcon,
      children: [
        // { href: "/master/account", label: "Account", icon: User },
        { href: "/master/project", label: "Project", icon: ListCheck },
        { href: "/master/unit", label: "Unit", icon: Box },
        { href: "/master/role", label: "Role", icon: Shield },
      ],
    },
    { href: "/teams", label: "Teams", icon: Users },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/projects", label: "Projects", icon: Folder },
    { href: "/documents", label: "Documents", icon: FileText },
    { href: "/report", label: "Report", icon: PieChart },
    { href: "/auditTrail", label: "AuditTrail", icon: BarChart2 },
  ];

  const others: NavItem[] = [
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/logout", label: "Logout", icon: LogOut },
  ];

  const renderLink = (item: NavItem) => {
    // using startsWith untuk memeriksa kecocokan URL
    const isActive = item.href && pathname.startsWith(item.href);

    if (item.children) {
      const isSubOpen = openSubmenu === item.label;

      // cek if salah satu child aktif, open submenu secara otomatis
      const isAnyChildActive = item.children.some((child) => child.href && pathname.startsWith(child.href));

      return (
        <div key={item.label}>
          <button
            onClick={() => setOpenSubmenu(isSubOpen ? null : item.label)}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-3xl font-medium transition ${isSubOpen || isAnyChildActive ? "bg-gray-100 text-red-500" : "hover:bg-gray-100 hover:text-red-500"}`}
          >
            <div className="flex items-center gap-2">
              <item.icon size={18} /> {item.label}
            </div>
            {isSubOpen || isAnyChildActive ? <ChevronDownCircle size={16} /> : <ChevronRightCircle size={16} />}
          </button>
          {(isSubOpen || isAnyChildActive) && (
            <div className="pl-8 mt-2 space-y-2">
              {item.children!.map((child) => (
                <Link key={child.href} href={child.href!} className={`flex items-center gap-2 px-4 py-3 rounded-3xl font-medium transition ${pathname.startsWith(child.href!) ? "btn-primary" : "hover:bg-gray-50 hover:text-red-500"}`}>
                  <child.icon size={16} /> {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link key={item.href} href={item.href!} className={`flex items-center gap-2 px-4 py-3 rounded-3xl font-medium transition ${isActive ? "btn-primary" : "hover:bg-gray-100 hover:text-red-500"}`}>
        <item.icon size={18} /> {item.label}
      </Link>
    );
  };

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div className="md:hidden sticky top-0 z-50 bg-white shadow flex justify-between items-center px-4 py-3">
        <Image src="/logo.png" alt="Workio Logo" width={90} height={90} />
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-100 transition">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && <nav className="md:hidden bg-white px-4 py-3 space-y-2 shadow">{[...links, ...others].map(renderLink)}</nav>}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex md:flex-col md:w-60 md:h-screen md:sticky md:top-0 bg-white p-5 custom-scroll">
        <div className="flex justify-left pb-6">
          <Image src="/logo.png" alt="Workio Logo" width={100} height={120} priority />
        </div>

        <nav className="text-sm space-y-8 flex-1 overflow-y-auto custom-scroll">
          <div>
            <p className="uppercase text-gray-400 text-xs mb-3">General</p>
            <div className="space-y-4">{links.map(renderLink)}</div>
          </div>

          <div>
            <p className="uppercase text-gray-400 text-xs mb-3">Others</p>
            <div className="space-y-4">{others.map(renderLink)}</div>
          </div>
        </nav>
      </aside>
    </>
  );
}
