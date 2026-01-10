import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { fetchLaptopById } from "../services/laptopServices";
import type { Laptop } from "../types/laptopTypes";
import { formatCurrency } from "../ultis/number";
import Navbar from "src/components/Navbar";

function LaptopDetail() {
  const { id } = useParams();
  const [laptop, setLaptop] = useState<Laptop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let ignore = false;
    setIsLoading(true);
    fetchLaptopById(id)
      .then((data) => {
        if (ignore) return;
        setLaptop(data);
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

  if (error || !laptop) {
    return (
      <div className="state state--error">
        {error ?? "Laptop không tồn tại"}
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
      <Navbar />
      <Link to="/products" className="back-link">
        ← Danh sách sản phẩm
      </Link>
      <div className="detail-card">
        <div>
          <p className="eyebrow">{laptop.brand ?? "Laptop cao cấp"}</p>
          <h1>{laptop.name}</h1>
          <p className="detail-card__price">{formatCurrency(laptop.price)}</p>
          <ul className="spec-list">
            <li>
              <span>CPU</span>
              <Link to={`/products/cpu/${laptop.cpu_id}`} target="_blank">
                <strong>{laptop.cpu_name}</strong>
              </Link>
            </li>
            <li>
              <span>GPU</span>
              <strong>{laptop.gpu_name}</strong>
            </li>
            <li>
              <span>RAM</span>
              <strong>{laptop.ram_name}</strong>
            </li>
            <li>
              <span>Lưu trữ</span>
              <strong>{laptop.storage_name}</strong>
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

export default LaptopDetail;
