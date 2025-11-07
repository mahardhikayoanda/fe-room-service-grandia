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
    // Skip check for qr-verify page
    if (pathname === "/qr-verify") {
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

  // Show nothing while checking (prevents flash of content)
  if (isChecking && pathname !== "/qr-verify") {
    return null;
  }

  return (
    <QRContext.Provider value={{ qrString, isVerified }}>
      {children}
    </QRContext.Provider>
  );
}
