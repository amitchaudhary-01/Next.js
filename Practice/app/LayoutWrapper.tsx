'use client';

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Add any routes here where you want to hide the Navbar and Footer
  const hideNavbarFooter = pathname === '/login' || pathname === '/register';

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <main className="flex-1 flex flex-col">{children}</main>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}