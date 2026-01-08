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
      <ul>
        <li>CPU: {laptop.cpu_name}</li>
        <li>GPU: {laptop.gpu_name}</li>
        <li>RAM: {laptop.ram_name}</li>
        <li>Dung lượng: {laptop.storage_name}</li>
      </ul>
      <div className="laptop-card__price">
        <span>{formatCurrency(laptop.price)}</span>
        <Link to={`/products/${laptop.id}`}>
          <i className="bi bi-cart-fill"></i>
        </Link>
      </div>
    </article>
  );
}

export default LaptopCard;
