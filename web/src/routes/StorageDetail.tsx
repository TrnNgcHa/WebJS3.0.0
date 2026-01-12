import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { fetchStorageById } from "src/services/storageServices";
import type { Storage } from "../types/storageTypes";
import { formatCurrency } from "../ultis/number";

function StorageDetail() {
  const { id } = useParams();
  const [storage, setStorage] = useState<Storage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let ignore = false;
    setIsLoading(true);
    fetchStorageById(id)
      .then((data) => {
        if (ignore) return;
        setStorage(data);
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

  if (error || !storage) {
    return (
      <div className="state state--error">
        {error ?? "Lưu trữ không tồn tại"}
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
          <p className="eyebrow">{storage.brand ?? "Thiết bị lưu trữ"}</p>
          <h1>{storage.name}</h1>
          <p className="detail-card__price">{formatCurrency(storage.price)}</p>
          <ul className="spec-list">
            <li>
              <span>Loại</span>
              <strong>{storage.storage_type}</strong>
            </li>
            <li>
              <span>Giao tiếp</span>
              <strong>{storage.interface_type}</strong>
            </li>
            <li>
              <span>Dung lượng</span>
              <strong>{storage.capacity}GB</strong>
            </li>
            <li>
              <span>Tồn kho</span>
              <strong>{storage.stock} sản phẩm</strong>
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

export default StorageDetail;
