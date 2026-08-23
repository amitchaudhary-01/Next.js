'use client';

import { useEffect, useState } from "react";
import { Building2, Plus, Trash2, RefreshCw, X, MapPin, Tag } from "lucide-react";
import toast from "react-hot-toast";
import Pagination from "@/component/pagination";

interface Room {
  _id: string;
  title: string;
  price: number;
  category?: string;
  location?: string;
  image?: string;
  status?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  description?: string;
  capacity?: number;
}

export default function ManageRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page

  // Add Room Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [newRoom, setNewRoom] = useState({
    title: "",
    category: "",
    location: "",
    price: "",
    image: "",
    status: "For Rent",
    beds: "",
    baths: "",
    sqft: "",
    description: "",
  });

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/room/getroom`, 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch rooms");
      }

      setRooms(data.data || data.rooms || []);
    } catch (error) {
      console.error("Fetch rooms error:", error);
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Handle Room Deletion
  const handleDeleteRoom = async (roomId?: string) => {
    if (!roomId) return;
    
    if (!window.confirm("Are you sure you want to delete this room?")) {
      return;
    }

    try {
      setActionLoadingId(roomId);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/room/room/${roomId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && (data.success !== false)) {
        toast.success("Room deleted successfully");
        setRooms((prev) => {
          const updated = prev.filter((room) => room._id !== roomId);
          // Adjust page if current page becomes empty
          const totalPages = Math.ceil(updated.length / itemsPerPage) || 1;
          if (currentPage > totalPages) {
            setCurrentPage(totalPages);
          }
          return updated;
        });
      } else {
        toast.error(data.message || "Failed to delete room");
      }
    } catch (error) {
      toast.error("Error connecting to server");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Handle Add Room Submission
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreateLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/room/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: newRoom.title,
          category: newRoom.category,
          location: newRoom.location,
          price: Number(newRoom.price),
          image: newRoom.image,
          status: newRoom.status,
          beds: Number(newRoom.beds) || 1,
          baths: Number(newRoom.baths) || 1,
          sqft: Number(newRoom.sqft) || 0,
          description: newRoom.description,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && (data.success !== false)) {
        toast.success("Room created successfully");
        setNewRoom({
          title: "",
          category: "",
          location: "",
          price: "",
          image: "",
          status: "For Rent",
          beds: "",
          baths: "",
          sqft: "",
          description: "",
        });
        setIsAddModalOpen(false);
        fetchRooms();
      } else {
        toast.error(data.message || "Failed to create room");
      }
    } catch (error) {
      toast.error("Error connecting to server");
    } finally {
      setCreateLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Pagination computations
  const totalItems = rooms.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRooms = rooms.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-4">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-orange-600" />
          <p className="text-sm text-slate-500">Loading rooms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl p-4">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-700">Failed to load rooms</h2>
          <p className="mt-1 text-sm text-red-600">{error}</p>
          <button
            onClick={fetchRooms}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 relative p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Manage Rooms & Properties</h1>
          <p className="mt-1 text-sm text-slate-500">View, add, and manage listed spaces.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={fetchRooms}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-blue-400 hover:text-white cursor-pointer shadow-xs"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 cursor-pointer shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Room
          </button>
        </div>
      </div>

      {/* Metrics Card */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 shrink-0">
          <Building2 className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <p className="text-sm text-slate-500">Total Rooms</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">{rooms.length}</p>
        </div>
      </div>

      {/* Rooms List / Table container */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {rooms.length === 0 ? (
          <div className="py-16 text-center px-4">
            <Building2 className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <h3 className="font-semibold text-slate-700">No rooms found</h3>
            <p className="mt-1 text-sm text-slate-400">Get started by adding a new room entry.</p>
          </div>
        ) : (
          <>
            {/* Mobile Card View (< md) */}
            <div className="block md:hidden divide-y divide-slate-100">
              {currentRooms.map((room) => (
                <div key={room._id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {room.image ? (
                        <img src={room.image} alt={room.title} className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 font-bold text-orange-600 border border-orange-200 shrink-0">
                          <Building2 className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <span className="font-semibold text-slate-900 block text-sm">{room.title}</span>
                        <span className="text-xs font-semibold text-slate-900">${room.price}</span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                      room.status === "For Sale" 
                        ? "bg-purple-50 text-purple-700 border border-purple-200" 
                        : "bg-orange-50 text-orange-700 border border-orange-200"
                    }`}>
                      {room.status || "For Rent"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                      <Tag className="w-3 h-3 text-slate-400" />
                      {room.category || "N/A"}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {room.location || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className="text-xs text-slate-400 line-clamp-1 flex-1 pr-2">{room.description || "No description"}</span>
                    <button
                      onClick={() => handleDeleteRoom(room._id)}
                      disabled={actionLoadingId === room._id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-medium transition-all disabled:opacity-50 cursor-pointer shrink-0"
                    >
                      {actionLoadingId === room._id ? (
                        <div className="w-3.5 h-3.5 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View (>= md) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Title</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Location</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {currentRooms.map((room) => (
                    <tr key={room._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {room.image ? (
                            <img src={room.image} alt={room.title} className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 font-bold text-orange-600 border border-orange-200 shrink-0">
                              <Building2 className="w-5 h-5" />
                            </div>
                          )}
                          <div>
                            <span className="font-semibold text-slate-900 block">{room.title}</span>
                            <span className="text-xs text-slate-400 line-clamp-1">{room.description || "No description"}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-slate-700 text-xs font-medium px-2.5 py-1 bg-slate-100 rounded-md">
                          <Tag className="w-3 h-3 text-slate-400" />
                          {room.category || "N/A"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-slate-600 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {room.location || "N/A"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          room.status === "For Sale" 
                            ? "bg-purple-50 text-purple-700 border border-purple-200" 
                            : "bg-orange-50 text-orange-700 border border-orange-200"
                        }`}>
                          {room.status || "For Rent"}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-medium text-slate-900">
                        ${room.price}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteRoom(room._id)}
                          disabled={actionLoadingId === room._id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 rounded-lg text-xs font-medium transition-all disabled:opacity-50 cursor-pointer"
                          title="Delete Room"
                        >
                          {actionLoadingId === room._id ? (
                            <div className="w-3.5 h-3.5 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination component integration */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={(size) => {
                setItemsPerPage(size);
                setCurrentPage(1);
              }}
            />
          </>
        )}
      </div>

      {/* Add Room Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-4 sm:p-6 shadow-xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Add New Room</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRoom} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Room Title *</label>
                  <input
                    type="text"
                    placeholder="Cozy Studio Apartment"
                    value={newRoom.title}
                    onChange={(e) => setNewRoom({ ...newRoom, title: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Category *</label>
                  <input
                    type="text"
                    placeholder="Apartment, Villa, Studio..."
                    value={newRoom.category}
                    onChange={(e) => setNewRoom({ ...newRoom, category: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Location *</label>
                  <input
                    type="text"
                    placeholder="Butwal, Nepal"
                    value={newRoom.location}
                    onChange={(e) => setNewRoom({ ...newRoom, location: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    placeholder="500"
                    value={newRoom.price}
                    onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Image URL *</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newRoom.image}
                    onChange={(e) => setNewRoom({ ...newRoom, image: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Listing Status *</label>
                  <select
                    value={newRoom.status}
                    onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white"
                  >
                    <option value="For Rent">For Rent</option>
                    <option value="For Sale">For Sale</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Beds</label>
                  <input
                    type="number"
                    placeholder="2"
                    value={newRoom.beds}
                    onChange={(e) => setNewRoom({ ...newRoom, beds: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Baths</label>
                  <input
                    type="number"
                    placeholder="1"
                    value={newRoom.baths}
                    onChange={(e) => setNewRoom({ ...newRoom, baths: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Sqft</label>
                  <input
                    type="number"
                    placeholder="850"
                    value={newRoom.sqft}
                    onChange={(e) => setNewRoom({ ...newRoom, sqft: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Description</label>
                <textarea
                  placeholder="Highlight key features, amenities, neighborhood details..."
                  rows={3}
                  value={newRoom.description}
                  onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-full sm:w-auto rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  className="w-full sm:w-auto rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {createLoading && (
                    <div className="w-3.5 h-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  )}
                  Create Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}