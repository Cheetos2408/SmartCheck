import { useState } from "react";
import { initials } from "./data";

export default function PatientProfile({ patient, onIssue }) {
  const [confirming, setConfirming] = useState(null);

  const allIssued   = patient.medications.every((m) => m.issued);
  const issuedCount = patient.medications.filter((m) => m.issued).length;

  const handleConfirm = (id) => {
    setConfirming(id);
    setTimeout(() => { onIssue(id); setConfirming(null); }, 600);
  };

  const fields = [
    { label: "Диагноз",           value: patient.diagnosis },
    { label: "Дата поступления",  value: patient.admittedDate || "—" },
    { label: "Лечащий врач",      value: patient.doctor       || "—" },
    { label: "Телефон",           value: patient.phone        || "—" },
    { label: "Аллергии",          value: patient.allergies    || "Нет" },
  ];

  return (
    <div className="profile-page">

      {/* Hero */}
      <div className="profile-hero">
        <div className="profile-avatar">{initials(patient.name)}</div>
        <div>
          <div className="profile-name">{patient.name}</div>
          <div className="profile-tags">
            <span className="tag tag--room">🏥 {patient.room}</span>
            {patient.age > 0   && <span className="tag tag--age">{patient.age} лет</span>}
            {patient.bloodType && <span className="tag tag--blood">🩸 {patient.bloodType}</span>}
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="info-grid">
        {fields.map((f) => (
          <div className="info-card" key={f.label}>
            <div className="info-label">{f.label}</div>
            <div className="info-value">{f.value}</div>
          </div>
        ))}
      </div>

      {/* Medications */}
      <div className="meds-section">
        <div className="meds-header">
          <span className="meds-title">Назначения</span>
          <span className={`badge badge--${allIssued ? "ok" : "pend"}`}>
            {issuedCount}/{patient.medications.length}
          </span>
        </div>

        {allIssued && (
          <div className="all-done-banner">✓ Все препараты выданы</div>
        )}

        <ul className="meds-list">
          {patient.medications.map((med) => (
            <li key={med.id} className={`med-item${med.issued ? " med-item--issued" : ""}`}>
              <div className="med-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                  <path d="M14 14h3v3m0 0h3m-3 0v3"/>
                </svg>
              </div>

              <div className="med-info">
                <div className="med-name">{med.name}</div>
                <div className="med-meta">
                  <span className="med-dosage">{med.dosage}</span>
                  <span className="med-time">🕐 {med.time}</span>
                </div>
              </div>

              {med.issued ? (
                <div className="issued-check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              ) : (
                <button
                  className={`issue-btn${confirming === med.id ? " issue-btn--loading" : ""}`}
                  onClick={() => handleConfirm(med.id)}
                  disabled={!!confirming}
                >
                  {confirming === med.id ? <span className="spin">⟳</span> : "Выдать"}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}