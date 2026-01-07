import LaptopGrid from "../components/LaptopGrid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProductsPage() {
  return (
    <div className="page page--narrow">
      <Navbar />
      <section className="section">
        <div className="section__header">
          <p className="eyebrow">Danh mục laptop</p>
          <h1>Kho sản phẩm cập nhật theo ngày</h1>
          <p className="section__subtitle">
            Toàn bộ máy đã được burn-in, stress test và vệ sinh. Giá hiển thị đã
            bao gồm VAT.
          </p>
        </div>
      </section>

      <LaptopGrid />
      <Footer />
    </div>
  );
}

export default ProductsPage;
