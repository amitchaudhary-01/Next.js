'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AosProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false, // Ensures animations replay when scrolling up and down
      easing: 'ease-out-cubic',
    });
  }, []);

  return <>{children}</>;
}