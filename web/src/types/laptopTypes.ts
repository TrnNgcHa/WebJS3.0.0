export interface Laptop {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  cpu_id: number;
  cpu_name: string;
  gpu_id: number;
  gpu_name: string;
  ram_id: number;
  ram_name: string;
  storage_id: number;
  storage_name: string;
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
