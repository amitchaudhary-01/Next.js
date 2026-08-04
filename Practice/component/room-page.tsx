"use client";

import { useState } from "react";

export default function CreateRoomPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    pricePerNight: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        pricePerNight: Number(formData.pricePerNight),
      }),
    });

    if (res.ok) {
      alert("Room published successfully!");
      setFormData({ title: "", description: "", location: "", pricePerNight: "", image: "" });
    } else {
      alert("Error publishing room.");
    }
    setLoading(false);
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
          placeholder="Location (e.g., Kathmandu, Nepal)"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          className="w-full rounded-lg border p-3 text-sm"
        />
        <input
          type="number"
          placeholder="Price per night ($)"
          value={formData.pricePerNight}
          onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
          required
          className="w-full rounded-lg border p-3 text-sm"
        />
        <input
          type="text"
          placeholder="Image URL (Unsplash or direct image link)"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
          className="w-full rounded-lg border p-3 text-sm"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
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