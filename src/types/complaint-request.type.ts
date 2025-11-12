import { FileStorageType } from "./global";

export interface ComplaintRequestType {
  uuid: string;
  report_number: string;
  name: string;
  phone_number: string;
  remark: string;
  created_at: string;
  room: RoomDataType;
  car_images: CarImageType[];
  car_status_trackers: CarStatusTracker[];
}

export interface RoomDataType {
  room_number: string;
  location: string;
  room_type: RoomTypeType;
}

export interface RoomTypeType {
  name: string;
}

export interface CarImageType {
  photo: FileStorageType;
}

export interface CarStatusTracker {
  created_at: string;
  status: StatusType;
}

export interface StatusType {
  value: string;
  label: string;
}
