// Server Component — updated with room finder specific data arrays and AOS attributes implemented

const waypoints = [
  {
    tag: "RF·01",
    year: "2021",
    title: "Started with a frustrating search",
    body: "Finding a reliable apartment took weeks of calling unresponsive agents and sorting through outdated, misleading listings.",
  },
  {
    tag: "RF·02",
    year: "2022",
    title: "Verified listings network",
    body: "Property owners and verified brokers joined the platform to provide accurate, up-to-date room and property availability.",
  },
  {
    tag: "RF·03",
    year: "2024",
    title: "End-to-end booking & leasing",
    body: "Integrated digital contracts and secure deposits made renting, selling, and leasing completely seamless.",
  },
  {
    tag: "RF·04",
    year: "2026",
    title: "The modern room finder",
    body: "Thousands of users daily discover, rent, sell, lease, and book properties seamlessly across regions.",
  },
];

const stats = [
  { number: "1,200+", label: "Active Listings" },
  { number: "850+", label: "Verified Landlords" },
  { number: "15K", label: "Successful Bookings" },
  { number: "99%", label: "Satisfaction Rate" },
];

const features = [
  { 
    title: "Rent", 
    description: "Browse verified long-term residential spaces and apartments tailored to your budget." 
  },
  { 
    title: "Sell", 
    description: "List properties directly to active buyers with streamlined digital paperwork." 
  },
  { 
    title: "Lease", 
    description: "Secure flexible commercial or residential lease agreements with clear terms." 
  },
  { 
    title: "Book", 
    description: "Reserve short-term stays or inspection slots instantly with zero friction." 
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ---------- Hero / Header Section ---------- */}
      <section className="relative overflow-hidden bg-white px-6 py-20 text-orange-400 sm:px-10 lg:px-16 text-center">
        <div className="relative mx-auto max-w-3xl" data-aos="fade-down" data-aos-duration="800">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[#C9A227]">
            HOME &gt; COMPANY &gt; ABOUT US
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-orange-400">
            About Us
          </h1>
        </div>
      </section>

      {/* ---------- Main Split Section (Image Grid + Content & Mission/Vision/Strategy) ---------- */}
      <section className="bg-white px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Image Collage with Overlapping Box */}
          <div className="relative" data-aos="fade-right" data-aos-duration="1000">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg shadow-md aspect-[4/3]" data-aos="zoom-in" data-aos-delay="100">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" 
                    alt="Team collaborating" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-lg shadow-md aspect-[4/5]" data-aos="zoom-in" data-aos-delay="200">
                  <img 
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80" 
                    alt="Engineering sync" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="overflow-hidden rounded-lg shadow-md aspect-[4/5]" data-aos="zoom-in" data-aos-delay="300">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80" 
                    alt="Discussion" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Overlapping Dark Accent Box matching layout */}
                <div className="bg-[#12202B] text-white p-6 rounded-lg shadow-xl text-center" data-aos="fade-up" data-aos-delay="400">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-wide">
                    Find Your Space, Your Way.
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Intro & Mission / Vision / Strategy */}
          <div className="space-y-8" data-aos="fade-left" data-aos-duration="1000">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Let your next home begin today.
              </h2>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                Our room finder platform is built to connect seekers with verified spaces seamlessly. Finding a place shouldn&apos;t be stressful or filled with hidden surprises. We keep renters, buyers, and property owners completely aligned.
              </p>
            </div>

            <div className="space-y-6 border-t border-gray-100 pt-6">
              <div data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-base font-semibold text-gray-900">Our Mission</h3>
                <p className="mt-1 text-sm text-gray-600">
                  To eliminate listing friction and provide transparent, verified property options for every budget and lifestyle.
                </p>
              </div>

              <div data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-base font-semibold text-gray-900">Our Vision</h3>
                <p className="mt-1 text-sm text-gray-600">
                  A real estate ecosystem where discovering, leasing, or buying a room is fast, secure, and entirely trustworthy.
                </p>
              </div>

              <div data-aos="fade-up" data-aos-delay="300">
                <h3 className="text-base font-semibold text-gray-900">Our Strategy</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Building intuitive search and booking tools that bridge the gap between reliable owners and eager seekers.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ---------- Statistics Counter Bar ---------- */}
      <section className="bg-[#12202B] text-white py-14 px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="space-y-1" 
              data-aos="zoom-in" 
              data-aos-delay={index * 100}
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-[#C9A227]">{stat.number}</p>
              <p className="text-xs uppercase tracking-widest text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Why Choose Us / Core Values Section ---------- */}
      <section className="bg-gray-50 py-20 px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-semibold" data-aos="fade-down">Why Choose Us</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900" data-aos="fade-up">As always, partners grow with you.</h2>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-[#C9A227] mb-4 font-bold text-lg">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Timeline / Route Section ---------- */}
      <section className="bg-orange-300 px-6 py-24 sm:px-10 lg:px-16 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em] text-black" data-aos="fade-down">
            Our route so far
          </p>

          <ol className="relative mt-14 space-y-16 border-l border-dashed border-[#4FA9A0]/40 pl-10">
            {waypoints.map((wp, index) => (
              <li 
                key={wp.tag} 
                className="relative"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <span
                  className="absolute -left-[3.05rem] top-1 h-3 w-3 rounded-full border-2 border-[#4FA9A0] bg-[#0a0b0b]"
                  aria-hidden="true"
                />
                <div className="flex items-baseline gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] text-[#f6f8f7]">
                    {wp.tag}
                  </span>
                  <span className="font-[family-name:var(--font-display)] italic text-[#fdfcfa]">
                    {wp.year}
                  </span>
                </div>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-[#080808]">
                  {wp.title}
                </h3>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#f6f7f7]">
                  {wp.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- CTA Section ---------- */}
      <section className="bg-white px-6 py-20 text-center sm:px-10 lg:px-16 border-t border-gray-800">
        <div data-aos="zoom-in" data-aos-duration="800">
          <p className="mx-auto max-w-xl font-[family-name:var(--font-display)] text-2xl italic text-orange-400">
            Give your property search a place to call home.
          </p>
          <a
            href="/login"
            className="mt-8 inline-block rounded-sm bg-[#C9A227] px-7 py-3 font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.15em] text-[#12202B] transition-colors hover:bg-[#e0b62c]"
          >
            Find a room now
          </a>
        </div>
      </section>
    </>
  );
}