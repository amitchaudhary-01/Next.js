// Server Component — no client JS required for this page.
// Placeholder copy for "Waypoint", a decision-log tool for engineering
// teams. Swap the copy, dates, and links for your own product.

const waypoints = [
  {
    tag: "WP·01",
    year: "2021",
    title: "Started from a bad Friday",
    body: "A production rollback took four hours to understand and ten minutes to fix, because nobody could remember why a setting had been changed six months earlier. Waypoint began as a script to log that one decision.",
  },
  {
    tag: "WP·02",
    year: "2022",
    title: "First hundred teams",
    body: "Engineering teams started using Waypoint to attach a short 'why' to pull requests, incidents, and architecture changes — searchable later, without digging through chat history.",
  },
  {
    tag: "WP·03",
    year: "2024",
    title: "Built for the whole lifecycle",
    body: "Decisions now link forward and back: a waypoint can reference the incident that caused it and the pull request that resolved it, so the trail stays connected.",
  },
  {
    tag: "WP·04",
    year: "2026",
    title: "Where we are today",
    body: "Thousands of teams use Waypoint to keep context attached to their codebase, not scattered across tools that forget.",
  },
];

const values = [
  {
    title: "Context over ceremony",
    body: "We'd rather a decision get logged in one sentence than not logged at all. Waypoint is built to be faster than not doing it.",
  },
  {
    title: "Say what changed, and why",
    body: "A log that only says what happened is a diff. We push for the why, because that's the part that disappears first.",
  },
  {
    title: "Built by people who got paged",
    body: "Every person on the team has carried an on-call phone. We design for the version of you that's debugging at 2am.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-[#12202B] px-6 py-28 text-[#EDEEE9] sm:px-10 lg:px-16">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
          viewBox="0 0 1200 600"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-20 500 C 220 420, 320 560, 520 440 S 860 220, 1220 260"
            stroke="#4FA9A0"
            strokeWidth="2"
            strokeDasharray="2 10"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative mx-auto max-w-3xl">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[#C9A227]">
            About Waypoint
          </p>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl italic leading-[1.15] text-[#F7F5F0] sm:text-5xl lg:text-6xl">
            Context shouldn&apos;t require archaeology.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#C7D0D6]">
            Waypoint is a shared log for the decisions engineering teams
            make — the ones that are obvious on a Tuesday and completely
            mysterious eight months later.
          </p>
        </div>
      </section>

      {/* ---------- Mission ---------- */}
      <section className="bg-[#F7F5F0] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[#8A7B3F]">
            Our mission
          </p>
          <p className="mt-5 font-[family-name:var(--font-display)] text-2xl leading-snug text-[#14202B] sm:text-3xl">
            We think the most expensive sentence in software is &ldquo;I
            don&apos;t remember why we did it that way.&rdquo; Waypoint
            exists to make that sentence rare.
          </p>
        </div>
      </section>

      {/* ---------- Story / route timeline (signature element) ---------- */}
      <section className="bg-[#0F1B24] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[#C9A227]">
            Our route so far
          </p>

          <ol className="relative mt-14 space-y-16 border-l border-dashed border-[#4FA9A0]/40 pl-10">
            {waypoints.map((wp) => (
              <li key={wp.tag} className="relative">
                <span
                  className="absolute -left-[3.05rem] top-1 h-3 w-3 rounded-full border-2 border-[#4FA9A0] bg-[#0F1B24]"
                  aria-hidden="true"
                />
                <div className="flex items-baseline gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] text-[#4FA9A0]">
                    {wp.tag}
                  </span>
                  <span className="font-[family-name:var(--font-display)] italic text-[#C9A227]">
                    {wp.year}
                  </span>
                </div>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-[#F7F5F0]">
                  {wp.title}
                </h3>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#C7D0D6]">
                  {wp.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Values ---------- */}
      <section className="bg-[#F7F5F0] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[#8A7B3F]">
            How we work
          </p>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title}>
                <h3 className="font-[family-name:var(--font-display)] text-lg text-[#14202B]">
                  {v.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#3E4A52]">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-[#12202B] px-6 py-20 text-center sm:px-10 lg:px-16">
        <p className="mx-auto max-w-xl font-[family-name:var(--font-display)] text-2xl italic text-[#F7F5F0]">
          Give your team&apos;s decisions a place to live.
        </p>
        <a
          href="/signup"
          className="mt-8 inline-block rounded-sm bg-[#C9A227] px-7 py-3 font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.15em] text-[#12202B] transition-colors hover:bg-[#e0b62c]"
        >
          Start for free
        </a>
      </section>
    </>
  );
}
