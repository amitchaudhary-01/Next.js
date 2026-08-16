import React from 'react';
import Newsletter from './newsletter';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  { name: "Facebook", icon: FaFacebookF, href: "https://facebook.com" },
  { name: "X / Twitter", icon: FaXTwitter, href: "https://twitter.com" },
  { name: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
  { name: "LinkedIn", icon: FaLinkedinIn, href: "https://linkedin.com" },
];

const quickLinks = [
  { label: "Home Page", href: "/" },
  { label: "Property Listing", href: "/getroom" },
  { label: "About Our Firm", href: "/about" },
  { label: "News & Articles", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

const propertyTypes = [
  { label: "Apartment Suites", href: "/properties/apartment-suites" },
  { label: "Commercial Spaces", href: "/properties/commercial-spaces" },
  { label: "Sale Shops", href: "/properties/sale-shops" },
  { label: "Townships", href: "/properties/townships" },
  { label: "Luxury Villas", href: "/properties/luxury-villas" },
];

const Footer = () => {
  return (
    <footer className="bg-[#192951] pt-16 pb-8 px-4 md:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 pb-12 border-b border-gray-800">
        
        {/* Brand & Socials Section */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-2xl font-black text-white tracking-wide">Veedoo</h3>
          <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
            Veedoo is an innovative real estate platform designed to help you find your dream properties, commercial spaces, and luxury homes effortlessly.
          </p>
          
          <div className="flex space-x-3 pt-2">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f2937] text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:text-white"
                >
                  <IconComponent className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="font-bold text-white text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-orange-500 transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Property Types Section */}
        <div>
          <h4 className="font-bold text-white text-sm mb-4">Property Types</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            {propertyTypes.map((prop) => (
              <li key={prop.label}>
                <a href={prop.href} className="hover:text-orange-500 transition-colors">
                  {prop.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Imported Newsletter Component */}
        <Newsletter />

      </div>

      {/* Bottom Copyright & Legal Links */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} Veedoo Real Estate. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;