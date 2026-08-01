import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-400 px-6 py-4">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        
        {/* Brand / Logo */}
        <h1 className="text-xl font-bold text-red-500">
          Icon
        </h1>

        {/* Main Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link href="/" className="transition hover:text-blue-500">
            Home
          </Link>
          <Link href="/products" className="transition hover:text-blue-500">
            Products
          </Link>
          <Link href="/contact" className="transition hover:text-blue-500">
            Contact
          </Link>
          <Link href="/about" className="transition hover:text-blue-500">
            About
          </Link>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="font-medium hover:text-green-600">
            Login
          </Link>
          <Link href="/logout" className="font-medium hover:text-red-600">
            Logout
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;