export interface Ram {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  capacity: number;
  gen: string;
  speed: number;
  created_at: string;
  updated_at: string;
}

export interface RamListResponse {
  success: boolean;
  number: number;
  data: Ram[];
}

export interface RamResponse {
  success: boolean;
  data: Ram;
}
