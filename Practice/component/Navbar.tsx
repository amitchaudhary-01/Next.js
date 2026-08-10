'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, MapPin, Phone, Menu, X } from 'lucide-react';

// Custom SVG Icons for Social Media
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent server/client render mismatches during hydration
  if (!isMounted) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Top Utility Bar */}
      <div className="bg-slate-100 text-xs py-2 px-4 md:px-12 flex justify-between items-center border-b border-slate-200 text-slate-600">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-orange-600" /> Rupandehi, Butwal, Nepal</span>
          <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-orange-600" /> +977 9821005569</span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="hidden sm:inline">Mon to Sat: 09:00 to 23:00</span>
          <div className="hidden md:flex items-center space-x-3">
            <FacebookIcon className="w-3.5 h-3.5 hover:text-orange-600 cursor-pointer" />
            <TwitterIcon className="w-3.5 h-3.5 hover:text-orange-600 cursor-pointer" />
            <InstagramIcon className="w-3.5 h-3.5 hover:text-orange-600 cursor-pointer" />
            <LinkedinIcon className="w-3.5 h-3.5 hover:text-orange-600 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="border-b border-slate-200 bg-gray-300 px-4 py-3 shadow-sm backdrop-blur-md sm:px-6 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          
          {/* Brand / Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20 transition group-hover:scale-105">
              <HomeIcon className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Vee<span className="text-orange-600">doo</span>
            </span>
          </Link>

          {/* Main Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <Link href="/" className="text-orange-600 transition hover:text-orange-500">
              Home
            </Link>
            <Link href="/getroom" className="transition hover:text-orange-600">
              Rooms
            </Link>
            <Link href="/contact" className="transition hover:text-orange-600">
              Contact
            </Link>
            <Link href="/about" className="transition hover:text-orange-600">
              About
            </Link>
            <Link href="/news" className="transition hover:text-orange-600">
              News & Article
            </Link>
          </div>

          {/* Auth Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-3 sm:gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-slate-600 transition hover:text-orange-600"
            >
              Login
            </Link>
            <Link 
              href="/login" 
              className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-500/20"
            >
              Logout
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-700 focus:outline-none">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4 flex flex-col space-y-3 text-sm font-medium text-slate-700">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-orange-600 transition">
              Home
            </Link>
            <Link href="/getroom" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-orange-600">
              Rooms
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-orange-600">
              Contact
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-orange-600">
              About
            </Link>
            <Link href="/news" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-orange-600">
              News & Article
            </Link>
            <div className="pt-2 flex items-center gap-3 border-t border-slate-200">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:text-orange-600">
                Login
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-1.5 text-rose-600">
                Logout
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;