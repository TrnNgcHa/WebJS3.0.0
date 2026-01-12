import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { fetchGpuById } from "src/services/gpuServices";
import type { Gpu } from "../types/gpuTypes";
import { formatCurrency } from "../ultis/number";

function GpuDetail() {
  const { id } = useParams();
  const [gpu, setGpu] = useState<Gpu | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let ignore = false;
    setIsLoading(true);
    fetchGpuById(id)
      .then((data) => {
        if (ignore) return;
        setGpu(data);
        setError(null);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err instanceof Error ? err.message : "Không thể tải dữ liệu");
      })
      .finally(() => !ignore && setIsLoading(false));

    return () => {
      ignore = true;
    };
  }, [id]);

  if (isLoading) {
    return <p className="state state--loading">Đang tải thông tin...</p>;
  }

  if (error || !gpu) {
    return (
      <div className="state state--error">
        {error ?? "GPU không tồn tại"}
        <div>
          <Link to="/products" className="btn btn--ghost">
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page page--detail">
      <Link to="/products" className="back-link">
        ← Danh sách sản phẩm
      </Link>
      <div className="detail-card">
        <div>
          <p className="eyebrow">{gpu.brand ?? "GPU"}</p>
          <h1>{gpu.name}</h1>
          <p className="detail-card__price">{formatCurrency(gpu.price)}</p>
          <ul className="spec-list">
            <li>
              <span>CUDA Cores</span>
              <strong>{gpu.cuda_core}</strong>
            </li>
            <li>
              <span>Base Clock</span>
              <strong>{gpu.base_clock}MHz</strong>
            </li>
            <li>
              <span>VRAM</span>
              <strong>{gpu.vram}GB</strong>
            </li>
            <li>
              <span>PCIe Gen</span>
              <strong>{gpu.pcie}</strong>
            </li>
            <li>
              <span>Tồn kho</span>
              <strong>{gpu.stock} sản phẩm</strong>
            </li>
          </ul>
          <div className="cta-stack">
            <a className="btn btn--primary btn--lg" href="tel:19006868">
              Liên hệ đặt hàng
            </a>
            <a
              className="btn btn--secondary btn--lg"
              href="https://zalo.me/19006868"
            >
              Chat Zalo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GpuDetail;
