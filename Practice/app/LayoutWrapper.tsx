'use client';

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide Navbar and Footer on auth pages and ANY admin sub-route
  const hideNavbarFooter = 
    pathname === '/login' || 
    pathname === '/register' || 
    pathname?.startsWith('/admin');

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <main className="flex-1 flex flex-col">{children}</main>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}