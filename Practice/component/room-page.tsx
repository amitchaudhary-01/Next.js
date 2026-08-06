"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Home, MapPin, DollarSign, Image as ImageIcon, Bed, Bath, Maximize, FileText, Loader2, Sparkles } from "lucide-react";

export default function CreateRoomPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    images: "",
    location: "",
    price: "",
    description: "",
    beds: "",
    baths: "",
    sqft: "",
    status: "For Rent",
  });
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve the saved token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to publish a room.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/v1/room/list", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Pass token properly here
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          beds: Number(formData.beds),
          baths: Number(formData.baths),
          sqft: Number(formData.sqft),
          images: [formData.images],
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Room published successfully!");
        setFormData({
          title: "",
          category: "",
          images: "",
          location: "",
          price: "",
          description: "",
          beds: "",
          baths: "",
          sqft: "",
          status: "For Rent",
        });
      } else {
        toast.error(data.message || "Error publishing room.");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="min-h-screen bg-slate-50/50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        
        {/* Header Title Area */}
        <div className="text-center mb-10" data-aos="fade-down">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[#C9A227] font-semibold">
            Property Manager
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            List a New Property
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill out the information below to publish your room, apartment, or villa to seekers.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12 relative" data-aos="fade-up">
          <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-[#12202B] text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5" /> Verified Listing
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title & Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 font-semibold mb-2">
                  Room Title <span className="text-[#C9A227]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Home className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Cozy Studio Apartment"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 py-3.5 text-gray-900 text-sm outline-none focus:border-[#C9A227] focus:bg-white focus:ring-2 focus:ring-[#C9A227]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 font-semibold mb-2">
                  Category <span className="text-[#C9A227]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Apartment, Villa, Studio..."
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-gray-900 text-sm outline-none focus:border-[#C9A227] focus:bg-white focus:ring-2 focus:ring-[#C9A227]/20 transition-all"
                />
              </div>
            </div>

            {/* Location & Price Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 font-semibold mb-2">
                  Location <span className="text-[#C9A227]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Butwal, Nepal"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 py-3.5 text-gray-900 text-sm outline-none focus:border-[#C9A227] focus:bg-white focus:ring-2 focus:ring-[#C9A227]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 font-semibold mb-2">
                  Price ($ / Month or Total) <span className="text-[#C9A227]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <DollarSign className="w-4 h-4" />
                  </span>
                  <input
                    type="number"
                    placeholder="500"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 py-3.5 text-gray-900 text-sm outline-none focus:border-[#C9A227] focus:bg-white focus:ring-2 focus:ring-[#C9A227]/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Image URL & Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-gray-600 font-semibold mb-2">
                  Image URL <span className="text-[#C9A227]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <ImageIcon className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.images}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 py-3.5 text-gray-900 text-sm outline-none focus:border-[#C9A227] focus:bg-white focus:ring-2 focus:ring-[#C9A227]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 font-semibold mb-2">
                  Listing Status <span className="text-[#C9A227]">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-gray-900 text-sm outline-none focus:border-[#C9A227] focus:bg-white focus:ring-2 focus:ring-[#C9A227]/20 transition-all"
                >
                  <option value="For Rent">For Rent</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Lease">For Lease</option>
                </select>
              </div>
            </div>

            {/* Specs Grid: Beds, Baths, Sqft */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 font-semibold mb-2 flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-[#C9A227]" /> Beds
                </label>
                <input
                  type="number"
                  placeholder="2"
                  value={formData.beds}
                  onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-gray-900 text-sm outline-none focus:border-[#C9A227] focus:bg-white focus:ring-2 focus:ring-[#C9A227]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 font-semibold mb-2 flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-[#C9A227]" /> Baths
                </label>
                <input
                  type="number"
                  placeholder="1"
                  value={formData.baths}
                  onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-gray-900 text-sm outline-none focus:border-[#C9A227] focus:bg-white focus:ring-2 focus:ring-[#C9A227]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 font-semibold mb-2 flex items-center gap-1">
                  <Maximize className="w-3.5 h-3.5 text-[#C9A227]" /> Sqft
                </label>
                <input
                  type="number"
                  placeholder="850"
                  value={formData.sqft}
                  onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-gray-900 text-sm outline-none focus:border-[#C9A227] focus:bg-white focus:ring-2 focus:ring-[#C9A227]/20 transition-all"
                />
              </div>
            </div>

            {/* Description Area */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-600 font-semibold mb-2 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-[#C9A227]" /> Description
              </label>
              <textarea
                placeholder="Highlight key features, amenities, neighborhood details..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-gray-900 text-sm outline-none focus:border-[#C9A227] focus:bg-white focus:ring-2 focus:ring-[#C9A227]/20 transition-all"
              />
            </div>

            {/* Action Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9A227] py-4 font-semibold text-[#12202B] shadow-md hover:bg-[#e0b62c] focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing Room...</span>
                  </>
                ) : (
                  <span>Publish Room Listing</span>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}