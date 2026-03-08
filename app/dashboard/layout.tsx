"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  FileText,
  LayoutGrid,
  Send,
  BarChart3,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
} from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Inicio", icon: Home },
  { href: "/dashboard/formularios", label: "Formularios", icon: FileText },
  { href: "/dashboard/pipeline", label: "Pipeline", icon: LayoutGrid },
  { href: "/dashboard/mautic", label: "Mautic", icon: Send },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/configuracion", label: "Configuracion", icon: Settings },
];

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Inicio",
  "/dashboard/formularios": "Formularios",
  "/dashboard/pipeline": "Pipeline",
  "/dashboard/mautic": "Mautic",
  "/dashboard/analytics": "Analytics",
  "/dashboard/configuracion": "Configuracion",
};

const SIDEBAR_KEY = "xanael_sidebar_collapsed";
const LOGIN_TS_KEY = "xanael_login_ts";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  for (const [path, title] of Object.entries(PAGE_TITLES)) {
    if (pathname.startsWith(path) && path !== "/dashboard") return title;
  }
  return "Dashboard";
}

interface SessionUser {
  email: string;
  name: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load sidebar state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_KEY);
    if (saved === "true") setCollapsed(true);
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
        else router.push("/login");
      });
  }, [router]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  const toggleSidebar = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_KEY, String(next));
      return next;
    });
  }, []);

  async function handleLogout() {
    sessionStorage.removeItem(LOGIN_TS_KEY);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="flex h-screen bg-[#F0F4F2]">
      {/* Sidebar */}
      <aside
        className="flex-shrink-0 bg-[#1A4A3A] text-white flex flex-col transition-all duration-300 ease-in-out"
        style={{ width: collapsed ? 64 : 240 }}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between px-4 py-5">
          {collapsed ? (
            <Image
              src="/images/favicon/favicon-96x96.png"
              alt="XANAEL"
              width={32}
              height={32}
              className="mx-auto brightness-0 invert"
            />
          ) : (
            <Image
              src="/images/logo/logo.webp"
              alt="XANAEL"
              width={140}
              height={40}
              className="brightness-0 invert"
            />
          )}
          {!collapsed && (
            <button
              onClick={toggleSidebar}
              className="text-white/40 hover:text-white transition-colors ml-2"
              title="Colapsar sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          )}
        </div>

        {/* Expand button when collapsed */}
        {collapsed && (
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center py-2 text-white/40 hover:text-white transition-colors"
            title="Expandir sidebar"
          >
            <PanelLeftOpen size={18} />
          </button>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-1 mt-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(link.href);
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                title={collapsed ? link.label : undefined}
                className={`flex items-center gap-3 py-2.5 text-sm rounded-md transition-colors hover:bg-white/10 ${
                  isActive ? "bg-white/10" : ""
                } ${collapsed ? "justify-center px-0" : "px-4"}`}
              >
                <Icon size={18} />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Version */}
        <div className={`py-4 ${collapsed ? "text-center" : "px-5"}`}>
          <span className="text-xs text-white/30">
            {collapsed ? "v1" : "v1.0.0"}
          </span>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
          {/* Page title */}
          <h1 className="text-sm font-semibold text-[#1A1A1A]">
            {getPageTitle(pathname)}
          </h1>

          {/* Avatar dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center justify-center rounded-md bg-[#1A4A3A] text-white text-xs font-medium cursor-pointer hover:bg-[#153D30] transition-colors"
              style={{ width: 32, height: 32 }}
            >
              {user ? getInitials(user.name) : "··"}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                {user && (
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-[#1A1A1A]">{user.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-500 transition-colors"
                >
                  <LogOut size={14} />
                  Cerrar sesion
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
