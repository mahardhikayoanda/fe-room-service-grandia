import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          process.env.NEXT_PUBLIC_API_URL?.split("//")[1]?.split("/")[0] || "",
      },
      {
        protocol: "http",
        hostname:
          process.env.NEXT_PUBLIC_API_URL?.split("//")[1]?.split("/")[0] || "",
      },
    ],
  },
};

export default nextConfig;
