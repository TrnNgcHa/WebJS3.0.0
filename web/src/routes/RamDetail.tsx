import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { fetchRamById } from "src/services/ramServices";
import type { Ram } from "../types/ramTypes";
import { formatCurrency } from "../ultis/number";

function RamDetail() {
  const { id } = useParams();
  const [ram, setRam] = useState<Ram | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let ignore = false;
    setIsLoading(true);
    fetchRamById(id)
      .then((data) => {
        if (ignore) return;
        setRam(data);
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

  if (error || !ram) {
    return (
      <div className="state state--error">
        {error ?? "RAM không tồn tại"}
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
          <p className="eyebrow">{ram.brand ?? "RAM"}</p>
          <h1>{ram.name}</h1>
          <p className="detail-card__price">{formatCurrency(ram.price)}</p>
          <ul className="spec-list">
            <li>
              <span>Dung lượng</span>
              <strong>{ram.capacity}GB</strong>
            </li>
            <li>
              <span>Thế hệ</span>
              <strong>{ram.gen}</strong>
            </li>
            <li>
              <span>Tốc độ</span>
              <strong>{ram.speed}MHz</strong>
            </li>
            <li>
              <span>Tồn kho</span>
              <strong>{ram.stock} sản phẩm</strong>
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

export default RamDetail;
