"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Box, ChevronDownCircle, ChevronRightCircle, FileText, ListCheck, LucideIcon, PieChart, Shield, Home, Users, CheckSquare, Folder, BarChart2, BoxIcon, Settings, LogOut, Menu, X, User } from "lucide-react";

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

  const topbarRef = useRef<HTMLDivElement | null>(null);
  const [topOffset, setTopOffset] = useState<number>(0);

  const toggleSidebar = () => setOpen((v) => !v);

  // close sidebar when route changes (navigasi selesai)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // measure topbar height so the fixed mobile menu sits right below it
  useEffect(() => {
    const measure = () => {
      if (topbarRef.current) {
        setTopOffset(topbarRef.current.offsetHeight || 0);
      } else {
        setTopOffset(0);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // prevent body scroll when mobile menu open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prev || "";
    }
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  const links: NavItem[] = [
    { href: "/overview", label: "Overview", icon: Home },
    {
      label: "Master",
      icon: BoxIcon,
      children: [
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
    const isActive = item.href && pathname.startsWith(item.href);

    if (item.children) {
      const isSubOpen = openSubmenu === item.label;
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
      {/* MOBILE TOPBAR*/}
      <div ref={topbarRef} className="md:hidden sticky top-0 z-50 bg-white shadow flex justify-between items-center px-4 py-3">
        <Image src="/logo.png" alt="Workio Logo" width={90} height={90} />
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-100 transition">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav role="navigation" aria-hidden={!open} className={`md:hidden fixed inset-0 z-40 bg-white overflow-y-auto ${open ? "block" : "hidden"}`} style={{ paddingTop: topOffset }}>
        <div className="px-4 py-6 space-y-6">
          <Link href="/profile" className="block mb-3">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-100">
              <div className="w-12 h-12 flex-shrink-0 rounded-full bg-slate-200 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 font-semibold text-base">Firda Rosiana</span>
                <span className="text-gray-700 text-sm">Software Developer</span>
              </div>
            </div>
          </Link>

          {/* Menu Links */}
          <div className="space-y-2">{[...links, ...others].map(renderLink)}</div>
        </div>
      </nav>

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
