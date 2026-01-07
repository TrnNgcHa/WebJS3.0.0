import { Link } from "react-router";

function RegisterPage() {
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

          <form className="auth-form" noValidate>
            <label>
              Họ và tên
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                autoComplete="name"
              />
            </label>
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
                autoComplete="new-password"
              />
            </label>
            <label>
              Nhập lại mật khẩu
              <input
                type="password"
                placeholder="********"
                autoComplete="new-password"
              />
            </label>

            <button
              type="submit"
              className="btn btn--primary btn--block btn--lg"
            >
              Đăng ký
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
