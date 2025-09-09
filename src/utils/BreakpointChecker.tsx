"use client";

// utils/hooks/useIsMobile.ts
import { useEffect, useState } from "react";

/**
 * Hook untuk mendeteksi apakah pengguna menggunakan perangkat mobile.
 * @returns {boolean} true jika lebar layar <= 768px (mobile)
 */
export const isMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Fungsi untuk mengecek ukuran layar
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Anggap 768px sebagai breakpoint mobile
    };

    // Cek saat pertama kali component dipasang
    checkScreenSize();

    // Tambahkan event listener untuk menangani perubahan ukuran layar
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener saat komponen unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return isMobile;
};
