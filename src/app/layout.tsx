import TopLoaderWrapper from "@/components/TopLoaderWrapper";
import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import ToastWrapper from "@/components/ToastWrapper";
import Providers from "./providers";
import ThemeProvider from "./ThemeProvider";
import { QRVerificationProvider } from "@/providers/QRVerificationProvider";
import { RoomProvider } from "@/providers/RoomProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grandia Hotel Room Service",
  description: "A room service application for hotels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <TopLoaderWrapper />
          <ToastWrapper />
          <Providers>
            <RoomProvider>
              <QRVerificationProvider>
                <main className="min-h-screen flex flex-col justify-center items-center">
                  <div className="max-w-sm min-h-screen text-primary-text-color">
                    <ThemeProvider>{children}</ThemeProvider>
                  </div>
                </main>
              </QRVerificationProvider>
            </RoomProvider>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
