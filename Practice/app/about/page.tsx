import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import AboutPage from "@/component/about-page";

// Display face: characterful serif, used sparingly for the headline + waypoint dates.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

// Body face: quiet, highly readable workhorse.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

// Utility face: for the coordinate-style waypoint labels ("WP·01").
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

// This is a Server Component (no "use client"), so it renders on the
// server for every request — no extra config needed for SSR under the
// App Router. Add `export const dynamic = "force-dynamic"` below only
// if you need to opt out of static optimization / force per-request
// rendering (e.g. reading cookies/headers).

export const metadata: Metadata = {
  title: "About — Waypoint",
  description:
    "Waypoint keeps a shared, searchable record of why engineering decisions were made — so context never gets lost between commits.",
};

export default function Page() {
  return (
    <main
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-[family-name:var(--font-body)]`}
    >
      <AboutPage />
    </main>
  );
}
