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
  ClipboardList,
  ChevronDown,
} from "lucide-react";

// ─── Nav structure ────────────────────────────────────────────────────────────

interface NavChild {
  href: string;
  label: string;
}

interface NavItem {
  href?: string;
  label: string;
  icon: React.ElementType;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Inicio", icon: Home },
  {
    label: "Forms",
    icon: ClipboardList,
    children: [
      { href: "/dashboard/forms/piloto", label: "Piloto" },
    ],
  },
  { href: "/dashboard/formularios", label: "Formularios", icon: FileText },
  { href: "/dashboard/pipeline", label: "Pipeline", icon: LayoutGrid },
  { href: "/dashboard/mautic", label: "Mautic", icon: Send },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/configuracion", label: "Configuración", icon: Settings },
];

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Inicio",
  "/dashboard/forms/piloto": "Forms · Piloto",
  "/dashboard/formularios": "Formularios",
  "/dashboard/pipeline": "Pipeline",
  "/dashboard/mautic": "Mautic",
  "/dashboard/analytics": "Analytics",
  "/dashboard/configuracion": "Configuración",
};

const SIDEBAR_KEY = "xanael_sidebar_collapsed";
const LOGIN_TS_KEY = "xanael_login_ts";
const FORMS_OPEN_KEY = "xanael_forms_open";

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
  const [formsOpen, setFormsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedCollapsed = localStorage.getItem(SIDEBAR_KEY);
    if (savedCollapsed === "true") setCollapsed(true);
    // Auto-open Forms group if on a forms route
    const savedFormsOpen = localStorage.getItem(FORMS_OPEN_KEY);
    if (savedFormsOpen === "true" || pathname.startsWith("/dashboard/forms")) {
      setFormsOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
        else router.push("/login");
      });
  }, [router]);

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

  function toggleForms() {
    setFormsOpen((prev) => {
      const next = !prev;
      localStorage.setItem(FORMS_OPEN_KEY, String(next));
      return next;
    });
  }

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
        <nav className="flex-1 px-2 space-y-0.5 mt-1">
          {navItems.map((item) => {
            // Group item with children
            if (item.children) {
              const Icon = item.icon;
              const isGroupActive = pathname.startsWith("/dashboard/forms");

              return (
                <div key={item.label}>
                  {/* Group header */}
                  <button
                    onClick={collapsed ? undefined : toggleForms}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 py-2.5 text-sm rounded-md transition-colors hover:bg-white/10 ${
                      isGroupActive ? "bg-white/10" : ""
                    } ${collapsed ? "justify-center px-0" : "px-4"}`}
                  >
                    <Icon size={18} className="shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronDown
                          size={14}
                          className={`text-white/40 transition-transform duration-200 ${
                            formsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>

                  {/* Children */}
                  {!collapsed && formsOpen && (
                    <div className="ml-4 mt-0.5 space-y-0.5">
                      {item.children.map((child) => {
                        const isActive = pathname.startsWith(child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`flex items-center gap-2 py-2 px-4 text-sm rounded-md transition-colors hover:bg-white/10 ${
                              isActive ? "bg-white/10 text-white" : "text-white/70"
                            }`}
                          >
                            <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Regular link
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href!);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href!}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 py-2.5 text-sm rounded-md transition-colors hover:bg-white/10 ${
                  isActive ? "bg-white/10" : ""
                } ${collapsed ? "justify-center px-0" : "px-4"}`}
              >
                <Icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Version */}
        <div className={`py-4 ${collapsed ? "text-center" : "px-5"}`}>
          <span className="text-xs text-white/30">{collapsed ? "v1" : "v1.0.0"}</span>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
          <h1 className="text-sm font-semibold text-[#1A1A1A]">
            {getPageTitle(pathname)}
          </h1>

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
