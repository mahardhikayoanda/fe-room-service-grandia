/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next/client";

import { getQueryCLient } from "../providers";
import { apiVersion, baseURL, xClientVersion } from "@/constants";
import { getQRString } from "@/utils/geolocation";

// In-memory cache for QR string (persists during the entire session/tab lifecycle)
// This cache will be cleared when tab/browser is closed (same as sessionStorage)
let cachedQRString: string | null = null;

/**
 * Get QR string from in-memory cache (fast access)
 * Reads from sessionStorage only once and caches in memory
 */
function getCachedQRString(): string {
  // If cache is empty, read from sessionStorage and cache it
  if (cachedQRString === null) {
    cachedQRString = getQRString();

    // Debug log
    if (cachedQRString) {
      console.log(cachedQRString);
    } else {
      console.warn("⚠️ QR String not found in sessionStorage");
    }
  }

  return cachedQRString || "";
}

/**
 * Force refresh QR string cache from sessionStorage
 * Call this after successful QR verification to update the cache
 */
export function refreshQRCache(): void {
  cachedQRString = getQRString();
  console.log("🔄 QR String cache refreshed:", cachedQRString);
}

/**
 * Clear QR string cache
 * Call this when user logs out or QR verification is cleared
 */
export function clearQRCache(): void {
  cachedQRString = null;
  console.log("🗑️ QR String cache cleared");
}

// Expose clearQRCache to window for cross-module access
if (typeof window !== "undefined") {
  (window as any).__clearQRCache = clearQRCache;
}

interface ResponseWrapper<T> {
  data: T;
  success: boolean;
  message: string;
}

const fetchHelper = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: BodyInit | null | any,
  headers?: Record<string, string>
) => {
  try {
    const headerInit: Record<string, string> = headers || {};
    let body: BodyInit | null = null;

    if (data instanceof FormData) {
      body = data;
    } else {
      headerInit["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const response = await axios.request({
      url: `${baseURL}${apiVersion}${url}`,
      method,
      data: body,
      headers: {
        Authorization: `Bearer ${getCookie("token") || ""}`,
        "x-client-version": xClientVersion,
        "room-qr-string": getCachedQRString(),
        ...headerInit,
      },
    });

    return response.data;
  } catch (err: any) {
    const pathname = window?.location?.pathname;
    const queryClient = getQueryCLient();
    // log error to console
    console.error("Error in fetchHelper:", err);

    // Handle 401 Unauthorized error
    if (
      err.response.status === 401 &&
      url !== "/login" &&
      url !== "/register" &&
      url !== "/" &&
      url === "/profile/your-order/"
    ) {
      deleteCookie("token");
      window.location.href = `/login${pathname ? `?fallback=${pathname}` : ""}`;

      queryClient.cancelQueries();
    }
    throw err;
  }
};

export default fetchHelper;
