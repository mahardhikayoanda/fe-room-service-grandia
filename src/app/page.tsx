"use client";

import RoomInformationDrawer from "./_components/RoomInformationDrawer";
import HeroSection from "./_containers/HeroSection";
import OurPromoSection from "./_containers/OurPromoSection";

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      <HeroSection />
      <OurPromoSection />
      <div className="fixed bottom-0 left-0 right-0">
        <RoomInformationDrawer />
      </div>
    </div>
  );
}
