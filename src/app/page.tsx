"use client";

import RoomInformationDrawer from "./_components/RoomInformationDrawer";
import HeroSection from "./_containers/HeroSection";
import OurPromoSection from "./_containers/OurPromoSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <HeroSection />
      <OurPromoSection />
      <div className="absolute bottom-0 w-full">
        <RoomInformationDrawer />
      </div>
    </div>
  );
}
