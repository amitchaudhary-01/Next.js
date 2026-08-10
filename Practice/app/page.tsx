'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, Home, Store, MapPin, Search, PhoneCall, 
  Bed, Bath, Square, ShieldCheck, UserCheck, 
  Key, FileText, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation'; 
import PropertyCategories from '@/component/PropertyCategories';
import NewsAndArticles from '@/component/NewsAndArticles';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('All Properties');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of properties per page

  const router = useRouter();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/room/getroom`);
        const data = await res.json();
        if (res.ok && data.success) {
          setProperties(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Reset pagination to page 1 whenever active filter tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const categories = [
    { name: 'Apartment', count: '6 Properties', icon: <Building2 className="w-6 h-6 text-orange-500" /> },
    { name: 'Commercial', count: '4 Properties', icon: <Store className="w-6 h-6 text-orange-500" /> },
    { name: 'Sale Shop', count: '3 Properties', icon: <Home className="w-6 h-6 text-orange-500" /> },
    { name: 'Room', count: '5 Properties', icon: <Building2 className="w-6 h-6 text-orange-500" /> },
    { name: 'Villa', count: '8 Properties', icon: <Home className="w-6 h-6 text-orange-500" /> },
  ];

  const handleCategoryClick = (categoryName: string) => {
    console.log("Selected Category:", categoryName);
  };

  const filteredProperties = properties.filter((property: any) => {
    if (activeTab === 'All Properties') return true;
    return property.status === activeTab;
  });

  // Calculate items for current page pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden relative selection:bg-orange-500 selection:text-white">
      
      {/* Background Ambient Modern Glow Effects (Light Version) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-orange-500 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <header className="relative px-4 md:px-12 pt-8 pb-20">
        <div 
  data-aos="fade-down"
  className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative bg-cover bg-center min-h-[500px] flex flex-col justify-between p-6 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200/80 backdrop-blur-sm"
  style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600')` }}
>
          <div data-aos="fade-right" data-aos-delay="200" className="text-center md:text-left max-w-2xl">
            <span className="text-orange-700 text-xs font-bold tracking-widest uppercase bg-orange-500/20 px-3.5 py-1.5 rounded-full border border-orange-500/30 backdrop-blur-md shadow-inner">
              NOW TRUSTED
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-4 leading-tight tracking-tight drop-shadow-md">
              Perfect Firm For Selling Or Leasing Houses, Flats, And Rooms
            </h1>
          </div>

          <div data-aos="fade-in" data-aos-delay="600" className="flex flex-wrap gap-6 text-xs text-slate-800 mt-6 items-center">
            <span className="bg-white/70 px-3.5 py-2 rounded-xl border border-slate-300 backdrop-blur-md shadow-sm font-medium">✔ Over 2K Properties.</span>
            <span className="bg-white/70 px-3.5 py-2 rounded-xl border border-slate-300 backdrop-blur-md shadow-sm font-medium">✔ 46,759 people lease</span>
            <span className="text-amber-800 font-bold bg-white/70 px-3.5 py-2 rounded-xl border border-amber-400/40 backdrop-blur-md shadow-sm">★ 4.8 Trusted by People</span>
          </div>
        </div>
      </header>

      {/* Property Categories Component */}
      <div className="relative z-10">
        <PropertyCategories categories={categories} onCategoryClick={handleCategoryClick} />
      </div>

      {/* Welcome Section */}
      <section className="py-20 px-4 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div data-aos="fade-right" className="space-y-6">
          <span className="text-orange-600 text-xs font-bold uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">Worldwide Properties</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Welcome To Our Luxurious Properties, With All The Conveniences.
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We provide world-class real estate services, helping you buy, sell, and lease luxury homes, apartments, and commercial spaces tailored to your lifestyle.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-orange-500/30 transition">
              <div className="p-2 bg-orange-500/10 text-orange-600 rounded-xl"><ShieldCheck className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Verified Listings</h4>
                <p className="text-xs text-slate-600 mt-1">Every property is thoroughly vetted for authenticity.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-orange-500/30 transition">
              <div className="p-2 bg-orange-500/10 text-orange-600 rounded-xl"><UserCheck className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Expert Agents</h4>
                <p className="text-xs text-slate-600 mt-1">Professional guidance at every step of your journey.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-orange-500/30 transition">
              <div className="p-2 bg-orange-500/10 text-orange-600 rounded-xl"><Key className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Instant Moving</h4>
                <p className="text-xs text-slate-600 mt-1">Quick paperwork and fast key handover process.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-orange-500/30 transition">
              <div className="p-2 bg-orange-500/10 text-orange-600 rounded-xl"><FileText className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Transparent Deals</h4>
                <p className="text-xs text-slate-600 mt-1">Clear contracts with no hidden fees or charges.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition shadow-[0_4px_20px_rgba(249,115,22,0.3)]">
              Explore Properties
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-600">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Call Us Anytime</span>
                <span className="font-bold text-sm text-slate-900">+977 9821005569</span>
              </div>
            </div>
          </div>
        </div>

        <div data-aos="fade-left" className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-blue-500 rounded-3xl blur-xl opacity-20"></div>
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800" 
              alt="Luxury home" 
              className="w-full object-cover transform hover:scale-105 transition duration-700"
            />
          </div>
        </div>
      </section>

      {/* Comfort Living Solution */}
      <section className="py-20 px-4 md:px-12 max-w-7xl mx-auto relative z-10">
        <div data-aos="fade-up" className="text-center mb-10">
          <span className="text-orange-600 text-xs font-bold uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">Explore Villas</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3">Comfort Living Solution</h2>
        </div>

        {/* Filter Tabs */}
        <div data-aos="fade-up" data-aos-delay="100" className="flex justify-center gap-2 mb-12 overflow-x-auto pb-2">
          {['All Properties', 'For Sale', 'For Lease', 'For Rent'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold transition backdrop-blur-md ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_4px_15px_rgba(249,115,22,0.3)] border border-orange-400/30' 
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Property Grid with Real Backend Data */}
        {loading ? (
          <div className="text-center py-16 text-slate-500 bg-white rounded-3xl border border-slate-200 shadow-sm">Loading properties...</div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-16 text-slate-500 bg-white rounded-3xl border border-slate-200 shadow-sm">No properties available.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {currentProperties.map((property: any, idx) => (
                <div 
                  key={property._id || idx} 
                  data-aos="fade-up"
                  data-aos-delay={(idx % 4) * 100}
                  onClick={() => router.push(`/rooms/${property._id}`)}
                  className="bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden group hover:border-orange-500/50 transition duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.06)] cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600'} 
                        alt={property.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                      <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-orange-600 font-bold px-3 py-1.5 rounded-xl text-sm border border-slate-200 shadow-md">
                        ${property.price}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-orange-600 transition">{property.title}</h3>
                      <p className="text-xs text-slate-600 flex items-center gap-1.5 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" /> {property.location}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <div className="flex justify-between items-center text-xs text-slate-600 pt-3 border-t border-slate-100">
                      <span className="flex items-center gap-1"><Square className="w-3.5 h-3.5 text-orange-600" /> {property.sqft} Sq Ft</span>
                      <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-orange-600" /> {property.beds} Beds</span>
                      <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-orange-600" /> {property.baths} Baths</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-xl bg-white text-slate-700 border border-slate-200 hover:border-orange-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl text-xs font-semibold transition ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_4px_15px_rgba(249,115,22,0.3)] border border-orange-400/30'
                        : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-xl bg-white text-slate-700 border border-slate-200 hover:border-orange-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <div className="relative z-10">
        <NewsAndArticles/>
      </div>

    </div>
  );
}