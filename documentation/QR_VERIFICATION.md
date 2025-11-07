# QR Verification & Geolocation System

Sistem keamanan untuk memastikan user hanya bisa mengakses Grandia Room Service jika:

1. Melakukan scan QR code dari kamar hotel
2. Berada dalam radius 1km dari Hotel Grandia

## 📍 Lokasi Hotel

- **Latitude**: -6.9010152
- **Longitude**: 107.5997433
- **Radius**: 1 kilometer

## 🔐 Cara Kerja

### 1. User Flow

1. User scan QR code yang ada di kamar hotel
2. QR code berisi URL: `https://yoursite.com/qr-verify?qr=ROOM_QR_STRING`
3. System meminta izin lokasi dari browser
4. System validasi apakah user dalam radius 1km dari hotel
5. Jika valid, QR string disimpan di sessionStorage dan user diredirect ke home
6. Semua API request akan include `room-qr-string` di header

### 2. Security Features

- ✅ QR string disimpan di sessionStorage (hilang saat close tab/browser)
- ✅ Geolocation check dengan Haversine formula
- ✅ Client-side protection dengan QRVerificationProvider
- ✅ Auto redirect ke /qr-verify jika belum verified
- ✅ QR string otomatis dikirim di setiap API request header

## 📁 File Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout with QRVerificationProvider
│   └── qr-verify/
│       └── page.tsx                  # QR verification page
├── providers/
│   └── QRVerificationProvider.tsx    # Context provider for QR verification
├── utils/
│   └── geolocation.ts                # Utility functions for location & QR
├── libs/react-query/service/
│   └── fetchHelper.ts                # API helper with QR header
└── middleware.tsx                     # Next.js middleware

```

## 🛠️ Utility Functions

### Geolocation Functions

```typescript
// Get user's current location
const coords = await getUserLocation();

// Check if within hotel radius
const isNear = isWithinHotelRadius(userLat, userLon);

// Calculate distance between two points
const distance = calculateDistance(lat1, lon1, lat2, lon2);
```

### QR Storage Functions

```typescript
// Save QR string to sessionStorage
saveQRString("ROOM_QR_STRING");

// Get QR string from sessionStorage
const qr = getQRString();

// Check if QR is verified
const verified = isQRVerified();

// Clear QR verification (logout)
clearQRVerification();
```

## 🎯 Usage

### Generate QR Code

QR code harus contain URL dengan format:

```
https://yoursite.com/qr-verify?qr=UNIQUE_ROOM_STRING
```

Contoh:

```
https://grandia-room-service.com/qr-verify?qr=ROOM_120_TOKEN_ABC123
```

### Access QR String in Component

```typescript
"use client";

import { useQRVerification } from "@/providers/QRVerificationProvider";

export default function MyComponent() {
  const { qrString, isVerified } = useQRVerification();

  return (
    <div>
      {isVerified && <p>QR: {qrString}</p>}
    </div>
  );
}
```

### Manual Clear QR (Logout)

```typescript
import { clearQRVerification } from "@/utils/geolocation";

function handleLogout() {
  clearQRVerification();
  window.location.href = "/qr-verify";
}
```

## 🔧 Configuration

Ubah konfigurasi di `src/utils/geolocation.ts`:

```typescript
// Hotel location
export const HOTEL_LOCATION = {
  latitude: -6.9010152,
  longitude: 107.5997433,
};

// Maximum distance (in kilometers)
export const MAX_DISTANCE_KM = 1;

// Storage keys
export const QR_STORAGE_KEY = "room_qr_string";
export const QR_VERIFIED_KEY = "qr_verified";
```

## 📱 Testing

### Test dengan koordinat palsu (Development only)

Untuk testing, Anda bisa temporary modify `isWithinHotelRadius` function:

```typescript
// DEVELOPMENT ONLY - Always return true
export function isWithinHotelRadius(userLat: number, userLon: number): boolean {
  return true; // Skip distance check for testing
}
```

### Test QR URL

```
http://localhost:3000/qr-verify?qr=TEST_ROOM_120
```

## 🚨 Error Handling

### Location Permission Denied

```
"Location permission denied. Please enable location access in your browser settings."
```

### Outside Hotel Radius

```
"You must be within 1km radius of Hotel Grandia to access this service."
```

### Missing QR Parameter

```
"QR code parameter is missing. Please scan the QR code from your room."
```

## 🔄 Session Management

- **SessionStorage**: QR string disimpan di sessionStorage
- **Auto clear**: Data hilang otomatis saat:
  - User close tab
  - User close browser
  - User manual clear
- **No expiry**: Selama tab/browser tidak ditutup, QR tetap valid

## 📡 API Integration

Setiap API request otomatis include header:

```
room-qr-string: ROOM_QR_STRING
```

Backend bisa validate QR string dari header ini.

## 🎨 UI Components

### QR Verify Page Features

- Loading state dengan CircularProgress
- Success state dengan CheckCircle icon
- Error state dengan AlertCircle icon
- Retry button untuk error case
- Auto redirect ke home setelah success
- Informasi tentang requirement (QR + Location)

## 🔐 Security Notes

1. **SessionStorage**: Data tidak persist setelah close browser
2. **HTTPS Required**: Geolocation API requires HTTPS in production
3. **Client-side only**: QR validation full di client, backend harus validate header
4. **No cookie**: Tidak menggunakan cookie, jadi tidak ada CSRF issue

## 📝 TODO / Improvements

- [ ] Add backend QR validation endpoint
- [ ] Add QR expiry time (optional)
- [ ] Add retry limit untuk prevent brute force
- [ ] Add analytics untuk track verification attempts
- [ ] Add fallback untuk browser tanpa geolocation support
- [ ] Add map display untuk show user location vs hotel

## 🐛 Troubleshooting

### QR String tidak tersimpan

- Check browser console untuk error
- Pastikan sessionStorage enabled
- Clear cache dan coba lagi

### Location tidak terdeteksi

- Pastikan HTTPS enabled (required untuk geolocation)
- Check browser location permission
- Coba di device yang support GPS

### Selalu redirect ke /qr-verify

- Check sessionStorage di DevTools (Application tab)
- Pastikan ada `room_qr_string` dan `qr_verified`
- Jika tidak ada, scan QR lagi

## 📞 Support

Jika ada issue atau pertanyaan, silakan contact tim developer.
