import { useState } from "react";
import { initials } from "./data";

export default function PatientList({ patients, onSelect, onAdd }) {
  const [search, setSearch] = useState("");

  const filtered = patients.filter((p) =>
    [p.name, p.room, p.diagnosis].some((s) =>
      s.toLowerCase().includes(search.toLowerCase())
    )
  );

  const allDone   = (m) => m.every((x) => x.issued);
  const doneCount = patients.filter((p) => allDone(p.medications)).length;

  return (
    <div className="list-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Пациенты</h1>
          <p className="page-subtitle">
            {new Date().toLocaleDateString("ru-RU", {
              weekday: "long", day: "numeric", month: "long",
            })}
          </p>
        </div>
        <button className="btn-icon btn-add" onClick={onAdd}>
          <span style={{ fontSize: "17px", lineHeight: 1 }}>+</span>
          <span>Добавить пациента</span>
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-chip">
          <span className="stat-num">{patients.length}</span>
          <span className="stat-label">Всего</span>
        </div>
        <div className="stat-chip stat-chip--ok">
          <span className="stat-num">{doneCount}</span>
          <span className="stat-label">Готово</span>
        </div>
        <div className="stat-chip stat-chip--pend">
          <span className="stat-num">{patients.length - doneCount}</span>
          <span className="stat-label">Ожидают</span>
        </div>
      </div>

      <div className="search-bar">
        <span className="search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        <input
          className="search-input"
          placeholder="Поиск по имени, палате или диагнозу..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{search ? "🔍" : "🏥"}</div>
          <div className="empty-title">{search ? "Пациенты не найдены" : "Список пуст"}</div>
          <div className="empty-text">
            {search ? "Попробуйте изменить параметры поиска" : "Добавьте первого пациента"}
          </div>
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map((p) => {
            const done  = allDone(p.medications);
            const count = p.medications.filter((m) => m.issued).length;
            const total = p.medications.length;
            const pct   = total ? Math.round((count / total) * 100) : 0;

            return (
              <div
                key={p.id}
                className={`patient-card${done ? " patient-card--done" : ""}`}
                onClick={() => onSelect(p.id)}
              >
                <div className="card-top">
                  <div className={`card-avatar${done ? " card-avatar--done" : ""}`}>
                    {initials(p.name)}
                  </div>
                  <span className={`badge badge--${done ? "ok" : "pend"}`}>
                    {done ? "✓ Выдано" : "Ожидает"}
                  </span>
                </div>

                <div>
                  <div className="card-name">{p.name}</div>
                  <div className="card-meta">
                    <span>🏥 {p.room}</span>
                    {p.age > 0   && <span>{p.age} лет</span>}
                    {p.bloodType && <span>🩸 {p.bloodType}</span>}
                  </div>
                  <div className="card-diagnosis">{p.diagnosis}</div>
                </div>

                <div className="progress-wrap">
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="progress-label">{count}/{total} препаратов</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}