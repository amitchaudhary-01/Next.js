'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewsAndArticles() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/getnews`);
        const data = await res.json();
        
        // Updated check: checking res.ok and data.data directly
        if (res.ok && data.data) {
          setArticles(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading articles...</div>;
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div data-aos="fade-up" className="text-center mb-12">
        <span className="text-orange-500 text-3xl font-bold uppercase tracking-widest">
          News & Insights
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-black mt-1">
          Recent Articles & Updates
        </h2>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article: any, idx: number) => {
          const formattedDate = article.createdAt 
            ? new Date(article.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              }) 
            : '';

          return (
            <div
              key={article._id || idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              onClick={() => router.push(`/news/${article._id}`)}
              className="bg-[#1f2937] border border-gray-800 rounded-2xl overflow-hidden group hover:border-orange-500/50 transition shadow-lg cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Article Image & Publisher Badge */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.headline}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-orange-500 text-white font-semibold px-3 py-1 rounded-lg text-xs">
                    {article.publisher}
                  </span>
                </div>

                {/* Content Body */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-orange-500" /> {article.author}
                    </span>
                    {formattedDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-orange-500" /> {formattedDate}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-base md:text-lg mb-2 group-hover:text-orange-400 transition">
                    {article.headline}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 line-clamp-2 leading-relaxed">
                    {article.description}
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
          );
        })}
      </div>
    </section>
  );
}