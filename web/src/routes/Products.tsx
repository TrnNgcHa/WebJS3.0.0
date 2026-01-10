import { useState } from "react";
import LaptopGrid from "../components/LaptopGrid";
import CpuGrid from "src/components/CpuGrid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type ProductCategory = "laptop" | "cpu";

function ProductsPage() {
  const [activeCategory, setActiveCategory] =
    useState<ProductCategory>("laptop");

  return (
    <div className="page page--narrow">
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "20px",
        }}
      >
        {/* Sidebar */}
        <aside className="sidebar">
          <ul className="sidebar__list">
            <li className="sidebar__item">
              <button
                className={`sidebar__button ${activeCategory === "laptop" ? "sidebar__button--active" : ""}`}
                onClick={() => setActiveCategory("laptop")}
              >
                Laptop
              </button>
            </li>
            <li className="sidebar__item">
              <button
                className={`sidebar__button ${activeCategory === "cpu" ? "sidebar__button--active" : ""}`}
                onClick={() => setActiveCategory("cpu")}
              >
                CPU
              </button>
            </li>
            <li className="sidebar__item">
              <button className="sidebar__button">GPU</button>
            </li>
            <li className="sidebar__item">
              <button className="sidebar__button">RAM</button>
            </li>
            <li className="sidebar__item">
              <button className="sidebar__button">Ổ cứng</button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <div style={{ gridColumnStart: "4", gridColumnEnd: "12" }}>
          <section className="section">
            <div className="section__header">
              <p className="eyebrow">
                {activeCategory === "laptop"
                  ? "Danh mục laptop"
                  : "Danh mục CPU"}
              </p>
              <h1>Kho sản phẩm cập nhật theo ngày</h1>
              <p className="section__subtitle">
                Toàn bộ máy đã được burn-in, stress test và vệ sinh. Giá hiển
                thị đã bao gồm VAT.
              </p>
            </div>
          </section>

          {activeCategory === "laptop" ? <LaptopGrid /> : <CpuGrid />}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductsPage;
