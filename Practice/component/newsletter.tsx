"use client"
import React, { useState } from 'react';

const Newsletter = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div>
      <h4 className="font-bold text-orange-600 text-sm mb-4">Newsletter</h4>
      <p className="text-xs text-gray-400 mb-4">Subscribe for updates on our latest properties.</p>
      
      {isSubmitted ? (
        <div className="bg-[#1f2937] border border-gray-700 rounded-lg p-3 text-center">
          <p className="text-xs font-semibold text-green-600 mb-1"> You're on the list!</p>
          <p className="text-[11px] text-orange-400">Thanks for subscribing. Check your inbox soon.</p>
        </div>
      ) : (
        <div className="space-y-2">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500" 
          />
          <button 
            onClick={() => setIsSubmitted(true)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg text-xs transition"
          >
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
};

export default Newsletter;