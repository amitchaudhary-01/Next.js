import ContactForm from "@/component/contact-form";

const channels = [
  {
    tag: "WP·GEN",
    label: "General",
    value: "hello@waypoint.dev",
    href: "mailto:hello@waypoint.dev",
  },
  {
    tag: "WP·SUP",
    label: "Support",
    value: "support@waypoint.dev",
    href: "mailto:support@waypoint.dev",
  },
  {
    tag: "WP·SLS",
    label: "Sales",
    value: "sales@waypoint.dev",
    href: "mailto:sales@waypoint.dev",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-[#12202B] px-6 py-24 text-[#EDEEE9] sm:px-10 lg:px-16">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
          viewBox="0 0 1200 600"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-20 100 C 220 180, 320 40, 520 160 S 860 380, 1220 340"
            stroke="#4FA9A0"
            strokeWidth="2"
            strokeDasharray="2 10"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative mx-auto max-w-3xl">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[#C9A227]">
            Contact
          </p>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl italic leading-[1.15] text-[#F7F5F0] sm:text-5xl">
            Send us a signal.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#C7D0D6]">
            Question about your account, a bug worth flagging, or just want
            to talk through whether Waypoint fits your team — this reaches
            a real person, usually within a day.
          </p>
        </div>
      </section>

      {/* ---------- Form + direct channels ---------- */}
      <section className="bg-[#F7F5F0] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-[1.3fr_1fr]">
          <ContactForm />

          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[#8A7B3F]">
              Direct channels
            </p>
            <ul className="mt-6 space-y-6">
              {channels.map((c) => (
                <li key={c.tag}>
                  <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] text-[#4FA9A0]">
                    {c.tag}
                  </span>
                  <p className="mt-1 text-sm text-[#3E4A52]">{c.label}</p>
                  <a
                    href={c.href}
                    className="font-[family-name:var(--font-display)] text-lg text-[#14202B] underline decoration-[#C9A227] decoration-2 underline-offset-4 hover:text-[#12202B]"
                  >
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-[#14202B]/10 pt-6">
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[#8A7B3F]">
                Response time
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#3E4A52]">
                We reply within one business day. For urgent production
                issues, use support@waypoint.dev — those get triaged first.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}