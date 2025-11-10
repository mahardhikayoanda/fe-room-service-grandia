import { FileStorageType } from "./global";

export interface CategoryType {
  uuid: string;
  name: string;
  product_count: number;
  photo: FileStorageType;
}
