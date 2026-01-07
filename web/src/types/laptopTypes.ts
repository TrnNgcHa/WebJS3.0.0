export interface Laptop {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  cpu_id: number;
  gpu_id: number;
  ram_id: number;
  storage_id: number;
  created_at: string;
  updated_at: string;
}

export interface LaptopListResponse {
  success: boolean;
  number: number;
  data: Laptop[];
}

export interface LaptopResponse {
  success: boolean;
  data: Laptop;
}
