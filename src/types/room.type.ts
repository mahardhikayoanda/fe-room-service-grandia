export interface RoomType {
  name: string;
}

export interface ServiceType {
  uuid: string;
  name: string;
  description: string;
  start_at: string;
  finish_at: string;
  is_available: number;
}

export interface PromoType {
  uuid: string;
  name: string;
  description: string;
  discount_percentage?: number;
  discount_amount?: number;
  start_at: string;
  finish_at: string;
  is_available: number;
}

export interface RoomType {
  uuid: string;
  room_number: string;
  location: string;
  room_type: RoomType;
  services: ServiceType[];
  promos: PromoType[];
}

export interface RoomLoginResponse {
  success: boolean;
  message: string;
  data: RoomType;
}

export interface RoomLoginRequest {
  qr_string: string;
}
