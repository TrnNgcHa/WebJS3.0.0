import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page page--narrow">
      <section className="section auth-page">
        <div className="auth-card">
          <div className="auth-card__header">
            <p className="eyebrow">Đăng nhập</p>
            <h1 className="auth-card__title">Chào mừng quay lại</h1>
            <p className="auth-card__subtitle">
              Đăng nhập để quản lý đơn hàng, thiết bị và cấu hình doanh nghiệp.
            </p>
          </div>

          {error && (
            <div className="auth-form__error">
              <p style={{ color: "#dc3545", marginBottom: "1rem" }}>
                ❌ {error}
              </p>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label>
              Email
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Mật khẩu
              <input
                type="password"
                placeholder="********"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn--primary btn--block btn--lg"
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>

            <div className="auth-form__footer">
              Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
