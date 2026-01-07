import { Link } from "react-router";

function LoginPage() {
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

          <form className="auth-form" noValidate>
            <label>
              Email
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>
            <label>
              Mật khẩu
              <input
                type="password"
                placeholder="********"
                autoComplete="current-password"
              />
            </label>

            <button
              type="submit"
              className="btn btn--primary btn--block btn--lg"
            >
              Đăng nhập
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
