"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateRoomPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    images: "", // Storing as comma-separated text or single string for input convenience
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
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/v1/room/getroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          beds: Number(formData.beds),
          baths: Number(formData.baths),
          sqft: Number(formData.sqft),
          images: [formData.images], // Wrapping string into an array to match backend schema type [String]
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast("Room published successfully!");
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
        toast(data.message || "Error publishing room.");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-bold">List a New Room</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Room Title (e.g., Cozy Studio Apartment)"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full rounded-lg border p-3 text-sm"
        />
        <input
          type="text"
          placeholder="Category (e.g., Apartment, Villa)"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
          className="w-full rounded-lg border p-3 text-sm"
        />
        <input
          type="text"
          placeholder="Location (e.g., Butwal, Nepal)"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          className="w-full rounded-lg border p-3 text-sm"
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
          className="w-full rounded-lg border p-3 text-sm"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.images}
          onChange={(e) => setFormData({ ...formData, images: e.target.value })}
          required
          className="w-full rounded-lg border p-3 text-sm"
        />
        <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            placeholder="Beds"
            value={formData.beds}
            onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
            required
            className="w-full rounded-lg border p-3 text-sm"
          />
          <input
            type="number"
            placeholder="Baths"
            value={formData.baths}
            onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
            required
            className="w-full rounded-lg border p-3 text-sm"
          />
          <input
            type="number"
            placeholder="Sqft"
            value={formData.sqft}
            onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
            required
            className="w-full rounded-lg border p-3 text-sm"
          />
        </div>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full rounded-lg border p-3 text-sm bg-white"
        >
          <option value="For Rent">For Rent</option>
          <option value="For Sale">For Sale</option>
          <option value="For Lease">For Lease</option>
        </select>
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full rounded-lg border p-3 text-sm h-28"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Room"}
        </button>
      </form>
    </div>
  );
}