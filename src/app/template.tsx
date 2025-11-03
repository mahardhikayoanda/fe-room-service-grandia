"use client";

import PageTransition from "@/components/framer-motion/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition variant="fade" speed="slow">
      {children}
    </PageTransition>
  );
}
