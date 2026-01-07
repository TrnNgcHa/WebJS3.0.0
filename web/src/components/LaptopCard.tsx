import { Link } from "react-router";
import { formatCurrency } from "../ultis/number";
import type { Laptop } from "../types/laptopTypes";

type LaptopCardProps = {
  laptop: Laptop;
};

function LaptopCard({ laptop }: LaptopCardProps) {
  return (
    <article className="laptop-card">
      <div className="laptop-card__badge">{laptop.brand ?? "Laptop"}</div>
      <h3>
        <Link to={`/products/${laptop.id}`} className="laptop-card__name">
          {laptop.name}
        </Link>
      </h3>
      <div className="laptop-card__price">
        <span>{formatCurrency(laptop.price)}</span>
        <Link to={`/products/${laptop.id}`} className="btn btn--ghost">
          Chi tiết
        </Link>
      </div>
    </article>
  );
}

export default LaptopCard;
