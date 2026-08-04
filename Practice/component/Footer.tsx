import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0b0f19] pt-16 pb-8 px-4 md:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 pb-12 border-b border-gray-800">
        
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-2xl font-black text-white">Veedoo</h3>
          <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
            Mauris ac orci dignissim convallis sem et id orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra.
          </p>
          <div className="flex space-x-3 pt-2">
            <div className="w-8 h-8 rounded-full bg-[#1f2937] flex items-center justify-center text-gray-300 hover:bg-orange-500 hover:text-white cursor-pointer transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#1f2937] flex items-center justify-center text-gray-300 hover:bg-orange-500 hover:text-white cursor-pointer transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#1f2937] flex items-center justify-center text-gray-300 hover:bg-orange-500 hover:text-white cursor-pointer transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" fill="none" stroke="currentColor" strokeWidth="2"></line></svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#1f2937] flex items-center justify-center text-gray-300 hover:bg-orange-500 hover:text-white cursor-pointer transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="#" className="hover:text-orange-500 transition">Home Page</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Property Listing</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">About Our Firm</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">News & Articles</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Contact Us</a></li>
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

        <div>
          <h4 className="font-bold text-white text-sm mb-4">Newsletter</h4>
          <p className="text-xs text-gray-400 mb-4">Subscribe for updates on our latest properties.</p>
          <div className="space-y-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500" 
            />
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg text-xs transition">
              Subscribe
            </button>
          </div>
        </div>

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