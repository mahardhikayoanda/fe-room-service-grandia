"use client";

import RoomInformation from "./_components/RoomInformation";
import HeroSection from "./_containers/HeroSection";
import OurPromoSection from "./_containers/OurPromoSection";

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      <HeroSection />
      <OurPromoSection />
      <div className="max-w-sm w-full fixed bottom-0 left-1/2 -translate-x-1/2">
        <RoomInformation />
      </div>
    </div>
  );
}
