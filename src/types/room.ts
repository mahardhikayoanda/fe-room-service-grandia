export interface RoomType {
  name: string;
}

export interface Service {
  uuid: string;
  name: string;
  description: string;
  start_at: string;
  finish_at: string;
  is_available: number;
}

export interface Promo {
  uuid: string;
  name: string;
  description: string;
  discount_percentage?: number;
  discount_amount?: number;
  start_at: string;
  finish_at: string;
  is_available: number;
}

export interface RoomData {
  uuid: string;
  room_number: string;
  location: string;
  room_type: RoomType;
  services: Service[];
  promos: Promo[];
}

export interface RoomLoginResponse {
  success: boolean;
  message: string;
  data: RoomData;
}

export interface RoomLoginRequest {
  qr_string: string;
}
