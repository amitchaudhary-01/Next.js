import type { Metadata } from "next";
// import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import ContactPage from "@/component/contact-page";

// Same font trio as the About page, for a consistent type system.
// If you have a root app/layout.tsx, consider moving this font setup
// there once instead of repeating it per-page — see the note below.
// const fraunces = Fraunces({
//   subsets: ["latin"],
//   weight: ["400", "500", "600"],
//   style: ["normal", "italic"],
//   variable: "--font-display",
// });

// const inter = Inter({
//   subsets: ["latin"],
//   weight: ["400", "500", "600"],
//   variable: "--font-body",
// });

// const plexMono = IBM_Plex_Mono({
//   subsets: ["latin"],
//   weight: ["400", "500"],
//   variable: "--font-mono",
// });

export const metadata: Metadata = {
  title: "Contact — Waypoint",
  description:
    "Get in touch with the Waypoint team — questions, feedback, or help getting set up.",
};

export default function Page() {
  return (
    <main
    //   className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-[family-name:var(--font-body)]`}
    >
      <ContactPage />
    </main>
  );
}