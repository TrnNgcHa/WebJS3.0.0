import type { Cpu, CpuListResponse, CpuResponse } from "../types/cpuTypes";

// Lấy API URL từ biến môi trường, fallback về relative path nếu không có
const apiBase =
  (import.meta.env.VITE_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
  "";

const buildUrl = (path: string, searchParams?: URLSearchParams) => {
  const query = searchParams?.toString();
  if (query && query.length > 0) {
    return `${apiBase}${path}?${query}`;
  }
  return `${apiBase}${path}`;
};

export async function fetchCpus(params?: {
  q?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.q) searchParams.set("q", params.q);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  const response = await fetch(buildUrl("/api/cpus", searchParams));
  if (!response.ok) {
    throw new Error("Không thể tải danh sách CPU");
  }

  const payload = await response.json();

  // Backend sometimes returns the array directly, sometimes wraps it in { data: [...] }.
  // Normalize to always return an array of CPUs.
  if (Array.isArray(payload)) return payload as Cpu[];
  if (payload && Array.isArray(payload.data)) return payload.data as Cpu[];

  return [] as Cpu[];
}

export async function fetchCpuById(id: string | number) {
  const response = await fetch(buildUrl(`/api/cpus/${id}`));
  if (!response.ok) {
    throw new Error("Không tìm thấy CPU");
  }

  const payload = await response.json();
  // Backend may return the CPU directly or wrap it in { data: cpu }
  if (payload && payload.data) return payload.data as Cpu;
  return payload as Cpu;
}
