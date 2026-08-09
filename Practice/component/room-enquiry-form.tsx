"use client";

import { useState } from "react";
import { Calendar, CheckCircle2, Loader2 } from "lucide-react";

export default function RoomEnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="bg-[#1f2937] border border-gray-800 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-orange-500" /> Book a Visit
      </h3>
      {submitted ? (
        <div className="text-center py-6">
          <CheckCircle2 className="w-10 h-10 text-orange-500 mx-auto mb-3" />
          <p className="text-sm font-semibold text-white">Enquiry Sent!</p>
          <p className="text-xs text-gray-400 mt-1">
            Our agent will get back to you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg bg-[#111827] border border-gray-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-lg bg-[#111827] border border-gray-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500"
          />
          <textarea
            placeholder="Message (optional)"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full resize-none rounded-lg bg-[#111827] border border-gray-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
              </>
            ) : (
              "Send Enquiry"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
