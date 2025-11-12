"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isQRVerified, getQRString } from "@/utils/geolocation";

interface QRContextType {
  qrString: string | null;
  isVerified: boolean;
}

const QRContext = createContext<QRContextType>({
  qrString: null,
  isVerified: false,
});

export const useQRVerification = () => useContext(QRContext);

// Paths that don't require QR verification
const PUBLIC_PATHS = [
  "/qr-verify",
  "/food-beverage/cart/", // Tracking order page (dynamic route)
  "/customer-service/", // Tracking complaint page (dynamic route)
];

export function QRVerificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [qrString, setQrString] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Skip check for public pages
    const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

    if (isPublicPath) {
      setIsChecking(false);
      return;
    }

    // Check if QR is verified
    const verified = isQRVerified();
    const qr = getQRString();

    setIsVerified(verified);
    setQrString(qr);

    // Redirect to QR verify page if not verified
    if (!verified || !qr) {
      router.push("/qr-verify");
    } else {
      setIsChecking(false);
    }
  }, [pathname, router]);

  // Check if current path is public
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  // Show nothing while checking (prevents flash of content)
  // But allow public paths to show immediately
  if (isChecking && !isPublicPath) {
    return null;
  }

  return (
    <QRContext.Provider value={{ qrString, isVerified }}>
      {children}
    </QRContext.Provider>
  );
}
