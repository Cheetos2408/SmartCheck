import { useState } from "react";
import { INITIAL_PATIENTS, initials } from "./data";
import AuthScreen       from "./AuthScreen";
import PatientList      from "./PatientList";
import PatientProfile   from "./PatientProfile";
import AddPatientModal  from "./AddPatientModal";
import "./index.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [patients,    setPatients]    = useState(INITIAL_PATIENTS);
  const [selectedId,  setSelectedId]  = useState(null);
  const [showAdd,     setShowAdd]     = useState(false);
  const [scanning,    setScanning]    = useState(false);

  const selectedPatient = patients.find((p) => p.id === selectedId);

  // Update issued status for a single medication
  const handleIssue = (patientId, medId) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId
          ? { ...p, medications: p.medications.map((m) => m.id === medId ? { ...m, issued: true } : m) }
          : p
      )
    );
  };

  // Simulate QR scan — pick a random patient
  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      const rand = patients[Math.floor(Math.random() * patients.length)];
      setSelectedId(rand.id);
      setScanning(false);
    }, 1200);
  };

  // ── Not logged in → show auth screen ─────────────────
  if (!currentUser) {
    return <AuthScreen onLogin={setCurrentUser} />;
  }

  // ── Main app ──────────────────────────────────────────
  return (
    <div className="app">

      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">＋</div>
            <span className="logo-text">SmartCheck</span>
          </div>

          <div className="header-actions">
            {/* Current user */}
            <div className="header-user">
              <div className="header-avatar">{initials(currentUser.name)}</div>
              <span className="header-user-name">{currentUser.name}</span>
            </div>

            {/* QR scan button — only on list page */}
            {!selectedPatient && (
              <button className="btn-icon btn-scan" onClick={handleScan} disabled={scanning}>
                {scanning ? (
                  <><span className="spin">⟳</span><span>Скан...</span></>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3"  y="3"  width="5" height="5" rx="1"/>
                      <rect x="16" y="3"  width="5" height="5" rx="1"/>
                      <rect x="3"  y="16" width="5" height="5" rx="1"/>
                      <line x1="16" y1="16" x2="21" y2="16"/>
                      <line x1="16" y1="21" x2="21" y2="21"/>
                      <line x1="18.5" y1="16" x2="18.5" y2="21"/>
                    </svg>
                    <span>Сканировать QR</span>
                  </>
                )}
              </button>
            )}

            {/* Back button — only on profile page */}
            {selectedPatient && (
              <button className="btn-icon btn-back" onClick={() => setSelectedId(null)}>
                ← Назад
              </button>
            )}

            {/* Logout */}
            <button
              className="btn-icon btn-logout"
              onClick={() => { setCurrentUser(null); setSelectedId(null); }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>Выйти</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="app-main">
        {selectedPatient ? (
          <PatientProfile
            patient={selectedPatient}
            onIssue={(medId) => handleIssue(selectedPatient.id, medId)}
          />
        ) : (
          <PatientList
            patients={patients}
            onSelect={setSelectedId}
            onAdd={() => setShowAdd(true)}
          />
        )}
      </main>

      {/* Add patient modal */}
      {showAdd && (
        <AddPatientModal
          onClose={() => setShowAdd(false)}
          onSave={(p) => setPatients((prev) => [...prev, p])}
        />
      )}
    </div>
  );
}