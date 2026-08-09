import {
  MapPin,
  Bed,
  Bath,
  Square,
  Home,
  Building2,
  DollarSign,
  PhoneCall,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import RoomEnquiryForm from "@/component/room-enquiry-form";

interface RoomData {
  _id: string;
  title: string;
  category: string;
  images: string[];
  location: string;
  price: number;
  description: string;
  beds: number;
  baths: number;
  sqft: number;
  status: string;
}

async function getRoom(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/room/${id}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  if (!res.ok || !data.success) return null;
  return data.data as RoomData;
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const room = await getRoom(id);

  if (!room) {
    return (
      <div className="min-h-screen bg-[#111827] flex flex-col items-center justify-center px-4 py-20 text-center">
        <Building2 className="w-12 h-12 text-orange-500 mb-4" />
        <h1 className="text-2xl font-bold text-white">Room Not Found</h1>
        <p className="text-sm text-gray-400 mt-2 mb-8">
          The property you are looking for does not exist or may have been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg text-sm transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Properties
        </Link>
      </div>
    );
  }

  const images = room.images?.length ? room.images : [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
  ];

  return (
    <div className="min-h-screen bg-[#111827] text-gray-100 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#1f2937] border border-gray-800 rounded-2xl overflow-hidden">
              <div className="relative h-96 overflow-hidden">
                <img
                  src={images[0]}
                  alt={room.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#111827]/90 text-orange-400 font-bold px-3 py-1 rounded-lg text-sm border border-gray-700">
                  {room.status}
                </span>
                <span className="absolute top-4 right-4 bg-orange-500 text-white font-bold px-4 py-2 rounded-lg text-lg shadow-lg">
                  ${room.price}
                </span>
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-3 border-t border-gray-800">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative h-20 overflow-hidden rounded-lg ${
                        idx === 0 ? "ring-2 ring-orange-500" : ""
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${room.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#1f2937] border border-gray-800 rounded-2xl p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-orange-500 font-semibold mb-2 flex items-center gap-1">
                    <Home className="w-3.5 h-3.5" /> {room.category}
                  </p>
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {room.title}
                  </h1>
                </div>
              </div>

              <p className="text-sm text-gray-400 flex items-center gap-1 mb-6">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" /> {room.location}
              </p>

              <div className="grid grid-cols-3 gap-4 py-5 border-y border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                    <Bed className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Beds</p>
                    <p className="font-bold text-white">{room.beds}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                    <Bath className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Baths</p>
                    <p className="font-bold text-white">{room.baths}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                    <Square className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Sq Ft</p>
                    <p className="font-bold text-white">{room.sqft}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-bold text-white mb-4">Description</h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {room.description || "No description provided for this property."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1f2937] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-orange-500" /> Price Details
              </h3>
              <div className="flex items-end justify-between pb-5 border-b border-gray-800">
                <span className="text-3xl font-extrabold text-orange-400">
                  ${room.price}
                </span>
                <span className="text-xs text-gray-400">{room.status}</span>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" /> Verified Listing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" /> {room.category} Property
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" /> No Hidden Fees
                </li>
              </ul>
            </div>

            <div className="bg-[#1f2937] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-orange-500" /> Contact Agent
              </h3>
              <div className="flex items-center gap-3 pb-5 border-b border-gray-800">
                <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Property Agent</p>
                  <p className="text-xs text-gray-400">+977 9821005569</p>
                </div>
              </div>
              <a
                href="tel:+9779821005569"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg text-sm transition"
              >
                <PhoneCall className="w-4 h-4" /> Call Now
              </a>
            </div>

            <RoomEnquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
