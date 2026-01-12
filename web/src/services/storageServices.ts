import type {
  Storage,
  StorageListResponse,
  StorageResponse,
} from "../types/storageTypes";

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

export async function fetchStorages(params?: {
  q?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.q) searchParams.set("q", params.q);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  const response = await fetch(buildUrl("/api/storages", searchParams));
  if (!response.ok) {
    throw new Error("Không thể tải danh sách lưu trữ");
  }

  const payload = await response.json();

  // Backend sometimes returns the array directly, sometimes wraps it in { data: [...] }.
  // Normalize to always return an array of Storages.
  if (Array.isArray(payload)) return payload as Storage[];
  if (payload && Array.isArray(payload.data)) return payload.data as Storage[];

  return [] as Storage[];
}

export async function fetchStorageById(id: string | number) {
  const response = await fetch(buildUrl(`/api/storages/${id}`));
  if (!response.ok) {
    throw new Error("Không tìm thấy lưu trữ");
  }

  const payload = await response.json();
  // Backend may return the Storage directly or wrap it in { data: storage }
  if (payload && payload.data) return payload.data as Storage;
  return payload as Storage;
}
