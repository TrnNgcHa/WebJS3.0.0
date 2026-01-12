export interface Storage {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  storage_type: string;
  interface_type: string;
  capacity: number;
  created_at: string;
  updated_at: string;
}

export interface StorageListResponse {
  success: boolean;
  number: number;
  data: Storage[];
}

export interface StorageResponse {
  success: boolean;
  data: Storage;
}
