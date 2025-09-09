import React from "react";
import NextTopLoader from "nextjs-toploader";

export default function TopLoaderWrapper() {
  return (
    <NextTopLoader
      color="#4f3534"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
    />
  );
}
