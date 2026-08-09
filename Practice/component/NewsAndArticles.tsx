'use client';

import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewsAndArticles() {
  const router = useRouter();

  // Sample static articles (or you can fetch these from your backend API)
  const articles = [
    {
      _id: '1',
      title: 'Top 10 Interior Design Trends Shaping Modern Homes in 2026',
      excerpt: 'Discover the latest minimalist layouts, sustainable materials, and smart home integrations dominating luxury villas.',
      category: 'Design Trends',
      author: 'Admin',
      date: 'June 12, 2026',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600',
    },
    {
      _id: '2',
      title: 'A Complete Guide to Leasing Commercial Real Estate Spaces',
      excerpt: 'Everything you need to know about negotiation tactics, lease structures, and hidden overheads before signing.',
      category: 'Commercial',
      author: 'Sarah Jenkins',
      date: 'May 28, 2026',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
    },
    {
      _id: '3',
      title: 'Why Investing in Suburban Properties is on the Rise',
      excerpt: 'An analysis of shift patterns as remote workers seek larger living spaces outside bustling metropolitan areas.',
      category: 'Real Estate Market',
      author: 'Michael Chang',
      date: 'May 14, 2026',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
    },
  ];

  return (
    <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div data-aos="fade-up" className="text-center mb-12">
        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">
          News & Insights
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
          Recent Articles & Updates
        </h2>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article, idx) => (
          <div
            key={article._id}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
            onClick={() => router.push(`/news/${article._id}`)}
            className="bg-[#1f2937] border border-gray-800 rounded-2xl overflow-hidden group hover:border-orange-500/50 transition shadow-lg cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Article Image & Category Badge */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-orange-500 text-white font-semibold px-3 py-1 rounded-lg text-xs">
                  {article.category}
                </span>
              </div>

              {/* Content Body */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-orange-500" /> {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" /> {article.date}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base md:text-lg mb-2 group-hover:text-orange-400 transition">
                  {article.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            {/* Read More Link */}
            <div className="p-6 pt-0">
              <div className="flex items-center gap-1 text-xs font-semibold text-orange-500 group-hover:translate-x-1 transition-transform w-fit pt-4 border-t border-gray-800">
                Read More <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}