import Link from "next/link";
import React from "react";
import { 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Users, 
  CheckCircle2 
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden px-4 pt-16 pb-20 text-center sm:px-6 md:pt-28 md:pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50/50 to-transparent" />
        
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-xs backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            Over 1,200+ verified rooms available this month
          </div>
          
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Find your next home <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              without the hidden fees.
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg md:text-xl">
            Discover affordable furnished rooms, verified roommates, and secure lease agreements in prime city locations.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/products"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/25 transition hover:bg-blue-700 sm:w-auto"
            >
              <span>Explore Products</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 sm:w-auto"
            >
              Contact Sales
            </Link>
          </div>

          {/* Social Proof Subtext */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 sm:gap-6">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 100% ID-verified hosts & guests</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Secure deposit protection</span>
          </div>
        </div>
      </section>

      {/* 2. METRICS BANNER */}
      <section id="metrics" className="border-y border-slate-100 bg-slate-50/50 py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            <div>
              <p className="text-2xl font-extrabold text-slate-900 sm:text-4xl">4,500+</p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">Happy Tenants Housed</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900 sm:text-4xl">50+</p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">Neighborhoods Covered</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900 sm:text-4xl">$0</p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">Brokerage Fees</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900 sm:text-4xl">4.9/5</p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">Average User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES GRID */}
      <section id="features" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-600">Why Choose RoomStay</h2>
            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Designed for safe and stress-free room rentals
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            
            {/* Feature 1 */}
            <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-xs transition hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900 sm:text-xl">Verified Listings</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Every room is physically inspected and verified to match listing photos, ensuring zero surprises when you move in.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-xs transition hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900 sm:text-xl">Secure Payments</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Pay rent and deposits securely through our escrow platform. Your funds are protected until you safely receive your room keys.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-xs transition hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900 sm:text-xl">Compatible Roommates</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Use our built-in preference matching system to find roommates who match your lifestyle, study habits, and cleanliness expectations.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION (CTA) */}
      <section className="bg-slate-900 py-16 px-4 text-center text-white sm:py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
            Ready to find your ideal room?
          </h2>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Sign up today to message verified landlords and schedule your room viewings instantly.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/login"
              className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/25 transition hover:bg-blue-500"
            >
              Create Your Account
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}