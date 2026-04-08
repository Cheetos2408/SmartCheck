import { useState } from "react";
import { MOCK_USERS, uid } from "./data";

export default function AuthScreen({ onLogin }) {
  const [tab, setTab]     = useState("login");
  const [users, setUsers] = useState(MOCK_USERS);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass,  setLoginPass]  = useState("");
  const [loginErr,   setLoginErr]   = useState("");

  // Register state
  const [regName,  setRegName]  = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass,  setRegPass]  = useState("");
  const [regPass2, setRegPass2] = useState("");
  const [regRole,  setRegRole]  = useState("Врач");
  const [regErr,   setRegErr]   = useState("");
  const [regOk,    setRegOk]    = useState(false);

  const handleLogin = () => {
    setLoginErr("");
    const user = users.find(
      (u) => u.email === loginEmail.trim() && u.password === loginPass
    );
    if (!user) { setLoginErr("Неверный email или пароль"); return; }
    onLogin(user);
  };

  const handleRegister = () => {
    setRegErr("");
    if (!regName.trim())               { setRegErr("Введите ФИО"); return; }
    if (!regEmail.includes("@"))       { setRegErr("Введите корректный email"); return; }
    if (regPass.length < 6)            { setRegErr("Пароль минимум 6 символов"); return; }
    if (regPass !== regPass2)          { setRegErr("Пароли не совпадают"); return; }
    if (users.find((u) => u.email === regEmail.trim())) {
      setRegErr("Пользователь с таким email уже существует"); return;
    }
    const newUser = {
      id: uid(), name: regName.trim(),
      email: regEmail.trim(), password: regPass, role: regRole,
    };
    setUsers((prev) => [...prev, newUser]);
    setRegOk(true);
    setTimeout(() => {
      setTab("login");
      setLoginEmail(regEmail.trim());
      setRegOk(false);
    }, 1500);
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">＋</div>
          <span className="auth-logo-text">SmartCheck</span>
        </div>
        <h1 className="auth-title">Медицинская система</h1>
        <p className="auth-subtitle">Управление пациентами и препаратами</p>

        <div className="auth-tabs">
          <button
            className={`auth-tab${tab === "login" ? " active" : ""}`}
            onClick={() => { setTab("login"); setLoginErr(""); }}
          >
            Вход
          </button>
          <button
            className={`auth-tab${tab === "register" ? " active" : ""}`}
            onClick={() => { setTab("register"); setRegErr(""); setRegOk(false); }}
          >
            Регистрация
          </button>
        </div>

        {tab === "login" && (
          <>
            {loginErr && <div className="auth-error">{loginErr}</div>}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input" type="email" placeholder="doctor@clinic.uz"
                value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Пароль</label>
              <input
                className="form-input" type="password" placeholder="••••••"
                value={loginPass} onChange={(e) => setLoginPass(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <button className="btn-primary" onClick={handleLogin}>
              Войти в систему
            </button>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center", marginTop: "14px" }}>
              Демо: doctor@clinic.uz / 123456
            </p>
          </>
        )}

        {tab === "register" && (
          <>
            {regErr && <div className="auth-error">{regErr}</div>}
            {regOk  && <div className="auth-success">✓ Аккаунт создан! Выполняем вход...</div>}
            <div className="form-group">
              <label className="form-label">ФИО</label>
              <input
                className="form-input" placeholder="Иванов Иван Иванович"
                value={regName} onChange={(e) => setRegName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input" type="email" placeholder="name@clinic.uz"
                value={regEmail} onChange={(e) => setRegEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Должность</label>
              <select className="select-input" value={regRole} onChange={(e) => setRegRole(e.target.value)}>
                {["Врач", "Медсестра", "Фармацевт", "Администратор"].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Пароль</label>
                <input
                  className="form-input" type="password" placeholder="••••••"
                  value={regPass} onChange={(e) => setRegPass(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Повторите</label>
                <input
                  className="form-input" type="password" placeholder="••••••"
                  value={regPass2} onChange={(e) => setRegPass2(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn-primary" style={{ marginTop: "20px" }}
              onClick={handleRegister} disabled={regOk}
            >
              {regOk ? "Создаём аккаунт..." : "Зарегистрироваться"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}