export interface Laptop {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
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
