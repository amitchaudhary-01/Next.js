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
    <div className="min-h-screen bg-[#111827] text-gray-100 font-sans overflow-x-hidden">
      
      {/* Hero Section */}
      <header className="relative bg-[#111827] px-4 md:px-12 pt-8 pb-20">
        <div 
          data-aos="fade-down"
          className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative bg-cover bg-center min-h-[500px] flex flex-col justify-between p-6 md:p-12 shadow-2xl"
          style={{ backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.6), rgba(17, 24, 39, 0.7)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600')` }}
        >
          <div data-aos="fade-right" data-aos-delay="200" className="text-center md:text-left max-w-2xl">
            <span className="text-orange-400 text-xs font-bold tracking-widest uppercase bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              NOW TRUSTED
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-4 leading-tight">
              Perfect Firm For Selling Or Leasing Houses, Flats, And Rooms
            </h1>
          </div>

          {/* <div data-aos="fade-up" data-aos-delay="400" className="bg-[#1f2937]/95 backdrop-blur-md p-6 rounded-2xl shadow-xl mt-8 border border-gray-700">
            <div className="flex gap-6 mb-4 text-sm font-medium text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="property-type" defaultChecked className="text-orange-500 focus:ring-orange-500" /> For Lease
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="property-type" className="text-orange-500 focus:ring-orange-500" /> For Rent
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="property-type" className="text-orange-500 focus:ring-orange-500" /> For Sale
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input 
                type="text" 
                placeholder="Enter Keyword..." 
                className="bg-[#111827] border border-gray-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500" 
              />
              <select className="bg-[#111827] border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-orange-500">
                <option>Property Type</option>
              </select>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Location" 
                  className="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 pr-10" 
                />
                <MapPin className="w-4 h-4 text-gray-400 absolute right-3 top-3.5" />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition">
                <Search className="w-4 h-4" /> Search Property
              </button>
            </div>
          </div> */}

          <div data-aos="fade-in" data-aos-delay="600" className="flex flex-wrap gap-6 text-xs text-gray-300 mt-6 items-center">
            <span>✔ Over 2K Properties.</span>
            <span>✔ 46,759 people lease</span>
            <span className="text-yellow-400 font-semibold">★ 4.8 Trusted by People</span>
          </div>
        </div>
      </header>

      {/* Property Categories Component */}
      <PropertyCategories categories={categories} onCategoryClick={handleCategoryClick} />

      {/* Welcome Section */}
      <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div data-aos="fade-right" className="space-y-6">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">Worldwide Properties</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Welcome To Our Luxurious Properties, With All The Conveniences.
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            We provide world-class real estate services, helping you buy, sell, and lease luxury homes, apartments, and commercial spaces tailored to your lifestyle.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg"><ShieldCheck className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-sm text-white">Verified Listings</h4>
                <p className="text-xs text-gray-400 mt-1">Every property is thoroughly vetted for authenticity.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg"><UserCheck className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-sm text-white">Expert Agents</h4>
                <p className="text-xs text-gray-400 mt-1">Professional guidance at every step of your journey.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg"><Key className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-sm text-white">Instant Moving</h4>
                <p className="text-xs text-gray-400 mt-1">Quick paperwork and fast key handover process.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg"><FileText className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-sm text-white">Transparent Deals</h4>
                <p className="text-xs text-gray-400 mt-1">Clear contracts with no hidden fees or charges.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg text-sm transition">
              Explore Properties
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Call Us Anytime</span>
                <span className="font-bold text-sm text-white">+977 9821005569</span>
              </div>
            </div>
          </div>
        </div>

        <div data-aos="fade-left" className="relative">
          <div className="rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800" 
              alt="Luxury home" 
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Comfort Living Solution */}
      <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
        <div data-aos="fade-up" className="text-center mb-8">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">Explore Villas</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">Comfort Living Solution</h2>
        </div>

        {/* Filter Tabs */}
        <div data-aos="fade-up" data-aos-delay="100" className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {['All Properties', 'For Sale', 'For Lease', 'For Rent'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition ${
                activeTab === tab 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-[#1f2937] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Property Grid with Real Backend Data */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading properties...</div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No properties available.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {currentProperties.map((property: any, idx) => (
                <div 
                  key={property._id || idx} 
                  data-aos="fade-up"
                  data-aos-delay={(idx % 4) * 100}
                  onClick={() => router.push(`/rooms/${property._id}`)}
                  className="bg-[#1f2937] border border-gray-800 rounded-2xl overflow-hidden group hover:border-orange-500/50 transition shadow-lg cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600'} 
                        alt={property.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                      />
                      <span className="absolute bottom-3 left-3 bg-[#111827]/90 text-orange-400 font-bold px-3 py-1 rounded-lg text-sm border border-gray-700">
                        ${property.price}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-white text-base mb-1">{property.title}</h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
                        <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" /> {property.location}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <div className="flex justify-between items-center text-xs text-gray-300 pt-3 border-t border-gray-800">
                      <span className="flex items-center gap-1"><Square className="w-3.5 h-3.5 text-orange-500" /> {property.sqft} Sq Ft</span>
                      <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-orange-500" /> {property.beds} Beds</span>
                      <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-orange-500" /> {property.baths} Baths</span>
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
                  className="p-2.5 rounded-xl bg-[#1f2937] text-gray-300 border border-gray-800 hover:border-orange-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl text-xs font-semibold transition ${
                      currentPage === page
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-[#1f2937] text-gray-400 hover:text-white border border-gray-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-xl bg-[#1f2937] text-gray-300 border border-gray-800 hover:border-orange-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <NewsAndArticles/>


    </div>
  );
}