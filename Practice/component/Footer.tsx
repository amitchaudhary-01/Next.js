import React from 'react';
import Newsletter from './newsletter';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="bg-[#192951] pt-16 pb-8 px-4 md:px-12 border-t border-gray-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 pb-12 border-b border-gray-800">
        
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-2xl font-black text-white">Veedoo</h3>
          <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
            Veedoo is an innovative real estate platform designed to help you find your dream properties, commercial spaces, and luxury homes effortlessly.
          </p>
          <div className="flex space-x-3 pt-2">
  {/* Facebook */}
  <a
    href="#"
    aria-label="Facebook"
    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f2937] text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:text-white"
  >
    <FaFacebookF className="h-4 w-4" />
  </a>

  {/* X / Twitter */}
  <a
    href="#"
    aria-label="X / Twitter"
    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f2937] text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:text-white"
  >
    <FaXTwitter className="h-4 w-4" />
  </a>

  {/* Instagram */}
  <a
    href="#"
    aria-label="Instagram"
    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f2937] text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:text-white"
  >
    <FaInstagram className="h-4 w-4" />
  </a>

  {/* LinkedIn */}
  <a
    href="#"
    aria-label="LinkedIn"
    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f2937] text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:text-white"
  >
    <FaLinkedinIn className="h-4 w-4" />
  </a>
</div>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="/" className="hover:text-orange-500 transition">Home Page</a></li>
            <li><a href="/getroom" className="hover:text-orange-500 transition">Property Listing</a></li>
            <li><a href="/about" className="hover:text-orange-500 transition">About Our Firm</a></li>
            <li><a href="/news" className="hover:text-orange-500 transition">News & Articles</a></li>
            <li><a href="/contact" className="hover:text-orange-500 transition">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-4">Property Types</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="#" className="hover:text-orange-500 transition">Apartment Suites</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Commercial Spaces</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Sale Shops</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Town Ships</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Luxury Villas</a></li>
          </ul>
        </div>

        {/* Imported Newsletter Component */}
        <Newsletter />

      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Veedoo Real Estate. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;