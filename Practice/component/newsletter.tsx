import React from 'react';

const Newsletter = () => {
  return (
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
  );
};

export default Newsletter;