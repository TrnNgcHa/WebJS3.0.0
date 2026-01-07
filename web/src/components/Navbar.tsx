import { Link, NavLink } from "react-router";

const navLinks = [
  { to: "/", label: "Trang chủ" },
  { to: "/products", label: "Sản phẩm" },
  { to: "/contact", label: "Liên hệ" },
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__logo">
          NewWorld<span>Tech</span>
        </Link>
        <p className="navbar__tagline">Laptop chuẩn doanh nghiệp</p>
      </div>
      <nav className="navbar__links">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              ["navbar__link", isActive ? "navbar__link--active" : ""]
                .filter(Boolean)
                .join(" ")
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="navbar__cta">
        <Link to="/login" className="btn btn--ghost">
          Đăng nhập
        </Link>
        <Link to="/register" className="btn btn--primary">
          Đăng ký
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
