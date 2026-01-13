import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router";

function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!userName || !email || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu không trùng khớp");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);

    try {
      await register(email, userName, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng ký thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page page--narrow">
      <section className="section auth-page">
        <div className="auth-card">
          <div className="auth-card__header">
            <p className="eyebrow">Đăng ký</p>
            <h1 className="auth-card__title">Tạo tài khoản mới</h1>
            <p className="auth-card__subtitle">
              Chỉ mất chưa tới 1 phút để bắt đầu trải nghiệm hệ sinh thái
              NewWorldTech.
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
              Họ và tên
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                autoComplete="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </label>
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              Nhập lại mật khẩu
              <input
                type="password"
                placeholder="********"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn--primary btn--block btn--lg"
            >
              {isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </button>

            <div className="auth-form__footer">
              Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default RegisterPage;
