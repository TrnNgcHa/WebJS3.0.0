export interface Cpu {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  cores: number;
  threads: number;
  base_clock: number;
  igpu: string;
  created_at: string;
  updated_at: string;
}

export interface CpuListResponse {
  success: boolean;
  number: number;
  data: Cpu[];
}

export interface CpuResponse {
  success: boolean;
  data: Cpu;
}
