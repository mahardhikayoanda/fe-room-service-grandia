import { latitude, longitude, radius } from "@/constants";

/**
 * Hotel Grandia location coordinates
 */
export const HOTEL_LOCATION = {
  latitude: latitude,
  longitude: longitude,
};

/**
 * Maximum allowed distance from hotel in kilometers
 */
export const MAX_DISTANCE_KM = radius;

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

/**
 * Convert degrees to radians
 */
function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Check if user is within allowed radius of hotel
 * @param userLat User's latitude
 * @param userLon User's longitude
 * @returns true if within radius, false otherwise
 */
export function isWithinHotelRadius(userLat: number, userLon: number): boolean {
  const distance = calculateDistance(
    userLat,
    userLon,
    HOTEL_LOCATION.latitude,
    HOTEL_LOCATION.longitude
  );

  // Console log for debugging
  console.log("=== GEOLOCATION DEBUG ===");
  console.log("User Location:", {
    latitude: userLat,
    longitude: userLon,
  });
  console.log("Hotel Location:", {
    latitude: HOTEL_LOCATION.latitude,
    longitude: HOTEL_LOCATION.longitude,
  });
  console.log(`Distance: ${distance.toFixed(2)} km`);
  console.log(`Max Allowed: ${MAX_DISTANCE_KM} km`);
  console.log(
    `Within Radius: ${distance <= MAX_DISTANCE_KM ? "✅ YES" : "❌ NO"}`
  );
  console.log("========================");

  return distance <= MAX_DISTANCE_KM;
}

/**
 * Get user's current location
 * @returns Promise with user's coordinates
 */
export function getUserLocation(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords);
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

/**
 * Storage keys for QR verification
 */
export const QR_STORAGE_KEY = "room_qr_string";
export const QR_VERIFIED_KEY = "qr_verified";
export const ROOM_DATA_KEY = "room_data";
export const ROOM_UUID_KEY = "room_uuid";

/**
 * Save QR string to sessionStorage
 */
export function saveQRString(qrString: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(QR_STORAGE_KEY, qrString);
    sessionStorage.setItem(QR_VERIFIED_KEY, "true");
  }
}

/**
 * Save room data to sessionStorage
 */
export function saveRoomData(roomData: any): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(ROOM_DATA_KEY, JSON.stringify(roomData));
    sessionStorage.setItem(ROOM_UUID_KEY, roomData.uuid);
  }
}

/**
 * Get room data from sessionStorage
 */
export function getRoomData(): any | null {
  if (typeof window !== "undefined") {
    const data = sessionStorage.getItem(ROOM_DATA_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
}

/**
 * Get room UUID from sessionStorage
 */
export function getRoomUUID(): string | null {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(ROOM_UUID_KEY);
  }
  return null;
}

/**
 * Get QR string from sessionStorage
 */
export function getQRString(): string | null {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(QR_STORAGE_KEY);
  }
  return null;
}

/**
 * Check if QR is verified
 */
export function isQRVerified(): boolean {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(QR_VERIFIED_KEY) === "true";
  }
  return false;
}

/**
 * Clear QR verification data
 */
export function clearQRVerification(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(QR_STORAGE_KEY);
    sessionStorage.removeItem(QR_VERIFIED_KEY);
    sessionStorage.removeItem(ROOM_DATA_KEY);
    sessionStorage.removeItem(ROOM_UUID_KEY);
  }
}
