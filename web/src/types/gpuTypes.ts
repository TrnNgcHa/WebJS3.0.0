export interface Gpu {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  cuda_core: number;
  base_clock: number;
  vram: number;
  pcie: number;
  created_at: string;
  updated_at: string;
}

export interface GpuListResponse {
  success: boolean;
  number: number;
  data: Gpu[];
}

export interface GpuResponse {
  success: boolean;
  data: Gpu;
}
