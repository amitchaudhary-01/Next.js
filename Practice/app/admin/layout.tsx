"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Home,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      toast.error("Please login to access the admin area");
      router.replace("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      if (user.role !== "admin") {
        toast.error("Access denied: Admin only area");
        router.replace("/");
        return;
      }

      setAdminName(user.name || "Admin");
      setIsAuthorized(true);
    } catch (error) {
      console.error("Invalid user data:", error);

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    router.replace("/login");
  };

  const navLinks = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Manage Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Properties / Rooms",
      href: "/admin/properties",
      icon: Home,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
          <p className="mt-4 text-sm text-slate-500">
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 p-2 rounded-xl text-white shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>

            <span className="font-bold text-lg tracking-wide text-slate-900">
              Veedoo Admin
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-700 cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;

            const isActive =
              pathname === link.href ||
              (link.href !== "/admin/dashboard" &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-orange-600 text-white shadow-md shadow-orange-600/10"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="w-5 h-5" />

                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />

            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:pl-64">

        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-6 shadow-sm">

          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-600 hover:text-slate-900 p-2 cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden lg:block">
            <h1 className="text-sm font-semibold text-slate-700">
              Control Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-slate-400">
                Logged in as
              </p>

              <p className="text-sm font-bold text-slate-900">
                {adminName}
              </p>
            </div>

            <div className="h-9 w-9 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 font-bold shadow-sm">
              {adminName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-10 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}