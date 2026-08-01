import Link from 'next/link';
import React from 'react';
import { Home as HomeIcon } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-xs backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20 transition group-hover:scale-105">
            <HomeIcon className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Room<span className="text-blue-600">Stay</span>
          </span>
        </Link>

        {/* Main Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-slate-600 sm:gap-8">
          <Link href="/" className="transition hover:text-blue-600">
            Home
          </Link>
          <Link href="/products" className="transition hover:text-blue-600">
            Products
          </Link>
          <Link href="/contact" className="transition hover:text-blue-600">
            Contact
          </Link>
          <Link href="/about" className="transition hover:text-blue-600">
            About
          </Link>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link 
            href="/login" 
            className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
          >
            Login
          </Link>
          <Link 
            href="/logout" 
            className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-100"
          >
            Logout
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;