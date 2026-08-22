'use client';

import React from 'react';

interface Category {
  name: string;
  count: string;
  icon: React.ReactNode;
}

interface PropertyCategoriesProps {
  categories: Category[];
  onCategoryClick?: (categoryName: string) => void;
}

export default function PropertyCategories({ categories, onCategoryClick }: PropertyCategoriesProps) {
  return (
    <section className="py-6 px-4 md:px-12 max-w-7xl mx-auto">
      <div data-aos="fade-up" className="text-center mb-10">
        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">Simple Listing</span>
        <h2 className="text-2xl md:text-3xl font-bold text-black mt-1">Search By Property Requirement</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.map((cat, idx) => (
          <div 
            key={idx} 
            data-aos="zoom-in"
            data-aos-delay={idx * 100}
            onClick={() => onCategoryClick && onCategoryClick(cat.name)}
            className="bg-white border border-orange-800 hover:border-orange-500 p-6 rounded-2xl text-center transition cursor-pointer group"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              {cat.icon}
            </div>
            <h3 className="font-bold text-orange-500 text-sm">{cat.name}</h3>
            <p className="text-xs text-gray-400 mt-1">{cat.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
}