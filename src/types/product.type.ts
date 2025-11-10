import { FileStorageType } from "./global";

export interface ProductType {
  uuid: string;
  name: string;
  description: string;
  price: number;
  is_available: boolean;
  is_recommended: boolean;
  sold_count: number;
  is_best_seller: boolean;
  image: FileStorageType;
}

export interface ProductDetailType {
  uuid: string;
  name: string;
  photo: FileStorageType;
}
