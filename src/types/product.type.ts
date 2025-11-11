import { FileStorageType } from "./global";

export interface ProductType {
  uuid: string;
  name: string;
  description: string;
  selling_price: number;
  base_price: number;
  is_available: boolean;
  is_recommended: boolean;
  sold_count: number;
  is_best_seller: boolean;
  image: FileStorageType;
}

export interface ProductDetailType {
  uuid: string;
  name: string;
  description: string;
  base_price: number;
  selling_price: number;
  is_available: boolean;
  is_recommended: boolean;
  is_best_seller: boolean;
  sold_count: number;
  image: FileStorageType;
  modifiers: ProductModifierType[];
}

export interface ProductModifierType {
  uuid: string;
  name: string;
  is_required: boolean;
  can_choose_multiple: boolean;
  modifier_items: ProductModifierItemType[];
}

export interface ProductModifierItemType {
  uuid: string;
  name: string;
}
