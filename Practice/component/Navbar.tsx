"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Home as HomeIcon,
  MapPin,
  Phone,
  Menu,
  X,
  Shield,
  LogOut,
  LogIn,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Custom SVG Icons for Social Media
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage");
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`, {
        method: "GET",
        credentials: "include",
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);

      toast.success("Logged out successfully");

      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  // Prevent server/client hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* ================= TOP UTILITY BAR ================= */}
      <div className="border-b border-slate-200 bg-slate-300 px-3 py-2 text-slate-600 sm:px-4 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          
          {/* Contact Information */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs md:gap-x-6">
            <span className="flex items-center gap-1 whitespace-nowrap">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-orange-600" />
              <span>Rupandehi, Butwal, Nepal</span>
            </span>

            <span className="flex items-center gap-1 whitespace-nowrap">
              <Phone className="h-3.5 w-3.5 shrink-0 text-orange-600" />
              <span>+977 9821005569</span>
            </span>
          </div>

          {/* Time and Social Icons */}
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span className="hidden text-xs lg:inline">
              Mon to Sat: 09:00 to 23:00
            </span>

            <div className="flex items-center gap-3">
              <FacebookIcon className="h-4 w-4 cursor-pointer transition-all duration-300 hover:scale-110 hover:text-orange-600" />

              <TwitterIcon className="h-4 w-4 cursor-pointer transition-all duration-300 hover:scale-110 hover:text-orange-600" />

              <InstagramIcon className="h-4 w-4 cursor-pointer transition-all duration-300 hover:scale-110 hover:text-orange-600" />

              <LinkedinIcon className="h-4 w-4 cursor-pointer transition-all duration-300 hover:scale-110 hover:text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <nav className="border-b border-slate-200 bg-gray-400 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8 xl:px-12">
          
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 font-bold text-white shadow-md shadow-orange-500/20 transition group-hover:scale-105">
              <HomeIcon className="h-5 w-5" />
            </div>

            <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Vee<span className="text-orange-600">doo</span>
            </span>
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <div className="hidden items-center gap-4 text-sm font-medium text-slate-700 lg:flex xl:gap-7 2xl:gap-8">
            <Link
              href="/"
              className="group relative whitespace-nowrap py-2 transition-colors duration-300 hover:text-orange-600"
            >
              Home
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-orange-500 transition-all duration-300 ease-out group-hover:w-full" />
            </Link>

            <Link
              href="/getroom"
              className="group relative whitespace-nowrap py-2 transition-colors duration-300 hover:text-orange-600"
            >
              Rooms
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-orange-500 transition-all duration-300 ease-out group-hover:w-full" />
            </Link>

            <Link
              href="/contact"
              className="group relative whitespace-nowrap py-2 transition-colors duration-300 hover:text-orange-600"
            >
              Contact
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-orange-500 transition-all duration-300 ease-out group-hover:w-full" />
            </Link>

            <Link
              href="/about"
              className="group relative whitespace-nowrap py-2 transition-colors duration-300 hover:text-orange-600"
            >
              About
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-orange-500 transition-all duration-300 ease-out group-hover:w-full" />
            </Link>

            <Link
              href="/news"
              className="group relative whitespace-nowrap py-2 transition-colors duration-300 hover:text-orange-600"
            >
              News & Article
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-orange-500 transition-all duration-300 ease-out group-hover:w-full" />
            </Link>

            {/* Admin Dashboard */}
            {user?.role === "admin" && (
              <Link
                href="/admin/dashboard"
                className="group relative flex items-center gap-1 whitespace-nowrap py-2 font-semibold text-orange-700 transition-colors duration-300 hover:text-orange-600"
              >
                <Shield className="h-4 w-4" />

                <span>Admin Dashboard</span>

                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-orange-600 transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            )}
          </div>

          {/* ================= DESKTOP AUTH ================= */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-500/20"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}
          </div>

          {/* ================= MOBILE / TABLET MENU BUTTON ================= */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              aria-label={
                mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* ================= MOBILE / TABLET MENU ================= */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 px-4 pb-4 pt-3 sm:px-6 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 text-sm font-medium text-slate-700">
              
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 transition hover:bg-orange-50 hover:text-orange-600"
              >
                Home
              </Link>

              <Link
                href="/getroom"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 transition hover:bg-orange-50 hover:text-orange-600"
              >
                Rooms
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 transition hover:bg-orange-50 hover:text-orange-600"
              >
                Contact
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 transition hover:bg-orange-50 hover:text-orange-600"
              >
                About
              </Link>

              <Link
                href="/news"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 transition hover:bg-orange-50 hover:text-orange-600"
              >
                News & Article
              </Link>

              {/* Admin Dashboard */}
              {user?.role === "admin" && (
                <Link
                  href="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2.5 font-semibold text-orange-700 transition hover:bg-orange-100"
                >
                  <Shield className="h-4 w-4" />
                  Admin Dashboard
                </Link>
              )}

              {/* Mobile Authentication */}
              <div className="mt-2 border-t border-slate-200 pt-3">
                {user ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-500/20"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;