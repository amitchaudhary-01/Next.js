import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-slate-50 text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="mx-auto flex max-w-5xl flex-col items-center justify-center px-6 py-20 text-center md:py-32">
        <span className="mb-4 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-700">
           Next.js 15 & Tailwind CSS Ready
        </span>
        
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Build modern web apps <br />
          <span className="bg-gradient-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent">
            faster than ever before.
          </span>
        </h1>
        
        <p className="mt-6 max-w-2xl  text-slate-600">
          A scalable, production-ready starting point for your next big project. 
          Powered by React Server Components and modern Tailwind layout patterns.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/products"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-md transition hover:bg-blue-700"
          >
            Explore Products
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            Contact Sales
          </Link>
        </div>
      </section>

      {/* 2. FEATURES GRID */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Our App?</h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            
            {/* Feature 1 */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
              <div className="mb-4 text-2xl"></div>
              <h3 className="mb-2 text-xl font-semibold">Lightning Fast</h3>
              <p className="text-sm text-slate-600">
                Optimized server components and static generation for peak performance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
              <div className="mb-4 text-2xl"></div>
              <h3 className="mb-2 text-xl font-semibold">Secure & Reliable</h3>
              <p className="text-sm text-slate-600">
                Built-in routing security, clean environment management, and type safety.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
              <div className="mb-4 text-2xl"></div>
              <h3 className="mb-2 text-xl font-semibold">Fully Responsive</h3>
              <p className="text-sm text-slate-600">
                Looks great on mobile devices, tablets, and desktop screens right away.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CALL TO ACTION (CTA) */}
      <section className="w-full bg-blue-600 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="mt-3 text-blue-100">
            Join thousands of developers building faster with our platform.
          </p>
          <div className="mt-6">
            <Link
              href="/login"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 shadow transition hover:bg-blue-50"
            >
              Create Your Account
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}