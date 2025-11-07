# Room Data Global State - Usage Guide

## 📋 Overview

Room data sekarang disimpan di global state dan sessionStorage setelah QR verification berhasil. Data mencakup informasi kamar, layanan yang tersedia, dan promo.

## 🔐 Backend Integration

### API Endpoint

```
POST /room/login
```

### Request Body

```json
{
  "roomQRString": "ROOM_QR_STRING_FROM_QR_CODE"
}
```

### Response

```json
{
  "success": true,
  "message": "Room successfully logged in.",
  "data": {
    "uuid": "019a5814-2089-711d-8fd5-9e608e424c91",
    "room_number": "001",
    "location": "Floor 1",
    "room_type": {
      "name": "Standard"
    },
    "services": [
      {
        "uuid": "019a52c7-7ec2-71ef-ab84-9568820487ca",
        "name": "Food and Beverages",
        "description": "Food and Beverages Service",
        "start_at": "2025-11-07T00:00:00.000000Z",
        "finish_at": "2025-11-07T23:59:59.000000Z",
        "is_available": 1
      }
    ],
    "promos": []
  }
}
```

## 🎯 Usage in Components

### Access Room Data

```typescript
"use client";

import { useRoom } from "@/providers/RoomProvider";

export default function MyComponent() {
  const { roomData, roomUUID } = useRoom();

  if (!roomData) {
    return <div>Loading room data...</div>;
  }

  return (
    <div>
      <h1>Room {roomData.room_number}</h1>
      <p>UUID: {roomUUID}</p>
      <p>Type: {roomData.room_type.name}</p>
      <p>Location: {roomData.location}</p>

      <h2>Available Services:</h2>
      <ul>
        {roomData.services.map((service) => (
          <li key={service.uuid}>
            {service.name} - {service.is_available ? "Available" : "Unavailable"}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Update Room Data (if needed)

```typescript
const { setRoomData } = useRoom();

// Update room data
setRoomData(newRoomData);
```

## 📦 Storage Functions

### Save Room Data

```typescript
import { saveRoomData } from "@/utils/geolocation";

saveRoomData({
  uuid: "019a5814-2089-711d-8fd5-9e608e424c91",
  room_number: "001",
  // ... other room data
});
```

### Get Room Data

```typescript
import { getRoomData, getRoomUUID } from "@/utils/geolocation";

// Get full room data
const roomData = getRoomData();

// Get only room UUID
const roomUUID = getRoomUUID();
```

### Clear Room Data

```typescript
import { clearQRVerification } from "@/utils/geolocation";

// This clears QR string, verification status, AND room data
clearQRVerification();
```

## 🔄 Verification Flow

1. **User scans QR code** → `/qr-verify?qr=ROOM_QR_STRING`
2. **System checks geolocation** → Must be within 5km of hotel
3. **System calls backend API** → `POST /room/login` with QR string
4. **Backend validates QR** → Returns room data if valid
5. **System saves data** → To sessionStorage and global state
6. **Redirect to home** → User can now access all features

## 🎨 Room Data Structure

```typescript
interface RoomData {
  uuid: string; // Room unique identifier
  room_number: string; // Room number (e.g., "001")
  location: string; // Room location (e.g., "Floor 1")
  room_type: {
    name: string; // Room type (e.g., "Standard", "Deluxe")
  };
  services: Service[]; // Available services
  promos: Promo[]; // Available promos
}

interface Service {
  uuid: string;
  name: string;
  description: string;
  start_at: string; // ISO datetime
  finish_at: string; // ISO datetime
  is_available: number; // 1 = available, 0 = unavailable
}

interface Promo {
  uuid: string;
  name: string;
  description: string;
  discount_percentage?: number;
  discount_amount?: number;
  start_at: string;
  finish_at: string;
  is_available: number;
}
```

## 🔐 Security Features

### SessionStorage

- Room data disimpan di sessionStorage (hilang saat close browser)
- Room UUID tersimpan terpisah untuk quick access
- Auto clear saat user logout

### API Validation

- Backend memvalidasi QR string
- Backend return room data yang sesuai dengan QR
- QR string dikirim di header setiap API request

### Geolocation Check

- User harus dalam radius 5km dari hotel
- Location check sebelum API call
- Prevent access dari luar hotel

## 🚨 Error Handling

### Invalid QR Code

```typescript
{
  "success": false,
  "message": "Invalid QR code or room not found"
}
```

### Expired QR Code

```typescript
{
  "success": false,
  "message": "QR code has expired"
}
```

### Room Not Available

```typescript
{
  "success": false,
  "message": "Room is not available for service"
}
```

## 📱 Example: Show Room Services

```typescript
"use client";

import { useRoom } from "@/providers/RoomProvider";
import { Box, Typography, Chip } from "@mui/material";

export default function RoomServices() {
  const { roomData } = useRoom();

  if (!roomData) return null;

  return (
    <Box>
      <Typography variant="h6">Available Services</Typography>
      {roomData.services.map((service) => (
        <Box key={service.uuid} sx={{ mb: 2 }}>
          <Typography variant="subtitle1">{service.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {service.description}
          </Typography>
          <Chip
            label={service.is_available ? "Available" : "Unavailable"}
            color={service.is_available ? "success" : "default"}
            size="small"
          />
        </Box>
      ))}
    </Box>
  );
}
```

## 📝 Notes

1. Room data otomatis load dari sessionStorage saat app start
2. Room data persist selama browser/tab tidak ditutup
3. Room UUID tersedia di global state untuk quick access
4. Semua API request otomatis include room QR string di header
5. Backend bertanggung jawab validasi room access di setiap request

## 🐛 Troubleshooting

### Room data tidak tersimpan

```typescript
// Check sessionStorage
console.log(sessionStorage.getItem("room_data"));
console.log(sessionStorage.getItem("room_uuid"));
```

### Room data tidak ter-load

```typescript
// Force reload dari storage
import { getRoomData } from "@/utils/geolocation";
const data = getRoomData();
setRoomData(data);
```

### Clear semua data

```typescript
import { clearQRVerification } from "@/utils/geolocation";
clearQRVerification();
window.location.href = "/qr-verify";
```
