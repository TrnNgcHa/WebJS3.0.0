import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { fetchCpuById } from "src/services/cpuServices";
import type { Cpu } from "../types/cpuTypes";
import { formatCurrency } from "../ultis/number";

function CpuDetail() {
  const { id } = useParams();
  const [cpu, setCpu] = useState<Cpu | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let ignore = false;
    setIsLoading(true);
    fetchCpuById(id)
      .then((data) => {
        if (ignore) return;
        setCpu(data);
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

  if (error || !cpu) {
    return (
      <div className="state state--error">
        {error ?? "CPU không tồn tại"}
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
          <p className="eyebrow">{cpu.brand ?? "Laptop cao cấp"}</p>
          <h1>{cpu.name}</h1>
          <p className="detail-card__price">{formatCurrency(cpu.price)}</p>
          <ul className="spec-list">
            <li>
              <span>CPU</span>
              <strong>cpu</strong>
            </li>
            <li>
              <span>GPU</span>
              <strong>gpu</strong>
            </li>
            <li>
              <span>RAM</span>
              <strong>ram</strong>
            </li>
            <li>
              <span>Lưu trữ</span>
              <strong>drive</strong>
            </li>
          </ul>
          <div className="cta-stack">
            <a className="btn btn--primary btn--lg" href="tel:19006868">
              Đặt mua ngay
            </a>
            <Link className="btn btn--ghost btn--lg" to="/contact">
              Nhận báo giá doanh nghiệp
            </Link>
          </div>
        </div>
        <div className="detail-card__info">
          <h3>Điểm nổi bật</h3>
          <p>
            Dòng máy được ưa chuộng bởi hiệu năng ổn định, thiết kế gọn nhẹ và
            thời lượng pin bền bỉ. Phù hợp cho lập trình viên, designer và đội
            marketing thường xuyên di chuyển.
          </p>
          <div className="badge-list">
            <span>Bảo hành 24 tháng</span>
            <span>Giao nhanh 2h</span>
            <span>Hỗ trợ online 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CpuDetail;
