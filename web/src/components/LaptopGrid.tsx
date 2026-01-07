import { useEffect, useMemo, useState } from "react";
import LaptopCard from "./LaptopCard";
import type { Laptop } from "../types/laptopTypes";
import { fetchLaptops } from "../services/laptopServices";

type SortKey = "price-asc" | "price-desc" | "name";

function LaptopGrid() {
  const [items, setItems] = useState<Laptop[]>([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("price-asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    fetchLaptops({ q: query })
      .then((data) => {
        if (ignore) return;
        setItems(data);
        setError(null);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
      })
      .finally(() => !ignore && setIsLoading(false));

    return () => {
      ignore = true;
    };
  }, [query]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
  }, [items, sortBy]);

  return (
    <section className="laptop-grid">
      <div className="laptop-grid__toolbar">
        <input
          type="search"
          placeholder="Tìm theo tên, CPU..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as SortKey)}
        >
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
          <option value="name">Tên (A-Z)</option>
        </select>
      </div>
      {isLoading && <p className="state state--loading">Đang tải dữ liệu...</p>}
      {error && <p className="state state--error">{error}</p>}
      {!isLoading && !error && sortedItems.length === 0 && (
        <p className="state">Không tìm thấy sản phẩm phù hợp.</p>
      )}
      <div className="laptop-grid__items">
        {sortedItems.map((item) => (
          <LaptopCard key={item.id} laptop={item} />
        ))}
      </div>
    </section>
  );
}

export default LaptopGrid;
