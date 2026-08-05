import type { Metadata } from "next";
import AboutPage from "@/component/about-page";





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
    <main>
      <AboutPage />
    </main>
  );
}
