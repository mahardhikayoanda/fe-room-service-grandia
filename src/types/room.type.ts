import { BasicRelationType, FileStorageType } from "./global";

export interface RoomDataType {
  uuid: string;
  room_number: string;
  location: string;
  room_type: RoomCategoryType;
  services: ServiceType[];
  promos: PromoType[];
}

export interface RoomCategoryType {
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
  is_available: boolean;
  promo_type: string;
  promo_menu: BasicRelationType;
  promo_product: BasicRelationType;
  minimum_transaction: string;
  discount_nominal: string;
  discount_percentage: string;
  group: GroupType;
  photo: FileStorageType;
}

export interface GroupType {
  value: string;
  label: string;
}

export interface RoomLoginResponse {
  success: boolean;
  message: string;
  data: RoomDataType;
}

export interface RoomLoginRequest {
  qr_string: string;
}
