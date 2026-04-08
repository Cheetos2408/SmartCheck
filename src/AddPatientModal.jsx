import { useState } from "react";
import { uid, BLOOD_TYPES } from "./data";

export default function AddPatientModal({ onClose, onSave }) {
  const today = new Date().toLocaleDateString("ru-RU");

  const [form, setForm] = useState({
    name: "", age: "", room: "", bloodType: "",
    diagnosis: "", phone: "", allergies: "", doctor: "",
    admittedDate: today,
  });

  const [meds, setMeds] = useState([
    { id: uid(), name: "", dosage: "", time: "" },
  ]);

  const [err, setErr] = useState("");

  const setF    = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const addMed  = () => setMeds((m) => [...m, { id: uid(), name: "", dosage: "", time: "" }]);
  const removeMed  = (id) => setMeds((m) => m.filter((x) => x.id !== id));
  const setMedF = (id, k, v) => setMeds((m) => m.map((x) => (x.id === id ? { ...x, [k]: v } : x)));

  const handleSave = () => {
    setErr("");
    if (!form.name.trim())      { setErr("Введите ФИО пациента"); return; }
    if (!form.room.trim())      { setErr("Укажите палату"); return; }
    if (!form.diagnosis.trim()) { setErr("Введите диагноз"); return; }
    const validMeds = meds.filter((m) => m.name.trim());
    if (!validMeds.length)      { setErr("Добавьте хотя бы один препарат"); return; }

    onSave({
      id: uid(),
      ...form,
      age: parseInt(form.age) || 0,
      medications: validMeds.map((m) => ({ ...m, issued: false })),
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">

        <div className="modal-header">
          <span className="modal-title">➕ Новый пациент</span>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {err && <div className="auth-error">{err}</div>}

          <p className="form-section-title">Личные данные</p>

          <div className="form-group">
            <label className="form-label">ФИО *</label>
            <input className="form-input" placeholder="Иванов Иван Иванович"
              value={form.name} onChange={(e) => setF("name", e.target.value)} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Возраст</label>
              <input className="form-input" type="number" min="0" max="120" placeholder="45"
                value={form.age} onChange={(e) => setF("age", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Группа крови</label>
              <select className="select-input" value={form.bloodType} onChange={(e) => setF("bloodType", e.target.value)}>
                <option value="">— не указана —</option>
                {BLOOD_TYPES.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Палата *</label>
              <input className="form-input" placeholder="Палата 201"
                value={form.room} onChange={(e) => setF("room", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Дата поступления</label>
              <input className="form-input" placeholder={today}
                value={form.admittedDate} onChange={(e) => setF("admittedDate", e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Телефон</label>
              <input className="form-input" placeholder="+998 90 000-00-00"
                value={form.phone} onChange={(e) => setF("phone", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Лечащий врач</label>
              <input className="form-input" placeholder="Иванова С.В."
                value={form.doctor} onChange={(e) => setF("doctor", e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Диагноз *</label>
            <input className="form-input" placeholder="Гипертоническая болезнь II ст."
              value={form.diagnosis} onChange={(e) => setF("diagnosis", e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Аллергии</label>
            <input className="form-input" placeholder="Нет / Пенициллин / Аспирин"
              value={form.allergies} onChange={(e) => setF("allergies", e.target.value)} />
          </div>

          <p className="form-section-title">Назначенные препараты</p>

          {meds.map((med) => (
            <div className="med-row" key={med.id}>
              <div className="med-row-fields">
                <input className="form-input" placeholder="Название"
                  value={med.name} onChange={(e) => setMedF(med.id, "name", e.target.value)} />
                <input className="form-input" placeholder="Дозировка"
                  value={med.dosage} onChange={(e) => setMedF(med.id, "dosage", e.target.value)} />
                <input className="form-input" placeholder="Время"
                  value={med.time} onChange={(e) => setMedF(med.id, "time", e.target.value)} />
              </div>
              {meds.length > 1 && (
                <button className="med-row-remove" onClick={() => removeMed(med.id)}>×</button>
              )}
            </div>
          ))}

          <button className="btn-add-med" onClick={addMed}>
            <span style={{ fontSize: "18px", lineHeight: 1 }}>+</span> Добавить препарат
          </button>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Отмена</button>
          <button className="btn-save" onClick={handleSave}>Сохранить</button>
        </div>

      </div>
    </div>
  );
}