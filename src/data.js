// ── Helpers ──────────────────────────────────────────
export const uid = () => Math.random().toString(36).slice(2, 9);

export const initials = (name) =>
  name.trim().split(" ").slice(0, 2).map((n) => n[0]?.toUpperCase() || "").join("");

// ── Mock users ────────────────────────────────────────
export const MOCK_USERS = [
  { id: 1, name: "Иванова Светлана Васильевна", email: "doctor@clinic.uz", password: "123456", role: "Врач" },
  { id: 2, name: "Садыков Алишер Рустамович",  email: "nurse@clinic.uz",  password: "123456", role: "Медсестра" },
];

// ── Mock patients ─────────────────────────────────────
export const INITIAL_PATIENTS = [
  {
    id: 1, name: "Азимов Бахтиёр Рустамович",
    room: "Палата 201", age: 54,
    diagnosis: "Гипертоническая болезнь II ст.",
    bloodType: "A(II) Rh+", admittedDate: "03.04.2026",
    phone: "+998 90 123-45-67", allergies: "Нет", doctor: "Иванова С.В.",
    medications: [
      { id: "m1", name: "Амлодипин",      dosage: "5 мг",   time: "08:00", issued: false },
      { id: "m2", name: "Лизиноприл",     dosage: "10 мг",  time: "08:00", issued: false },
      { id: "m3", name: "Аспирин Кардио", dosage: "100 мг", time: "12:00", issued: true  },
    ],
  },
  {
    id: 2, name: "Джумаева Малика Хасановна",
    room: "Палата 115", age: 38,
    diagnosis: "Сахарный диабет 2 типа",
    bloodType: "B(III) Rh−", admittedDate: "05.04.2026",
    phone: "+998 91 234-56-78", allergies: "Пенициллин", doctor: "Садыков А.Р.",
    medications: [
      { id: "m4", name: "Метформин", dosage: "500 мг", time: "07:30", issued: true },
      { id: "m5", name: "Гликлазид", dosage: "30 мг",  time: "07:30", issued: true },
      { id: "m6", name: "Омепразол", dosage: "20 мг",  time: "20:00", issued: true },
    ],
  },
  {
    id: 3, name: "Касымов Тимур Фаррухович",
    room: "Палата 308", age: 67,
    diagnosis: "ИБС. Стабильная стенокардия",
    bloodType: "O(I) Rh+", admittedDate: "01.04.2026",
    phone: "+998 93 345-67-89", allergies: "Нет", doctor: "Иванова С.В.",
    medications: [
      { id: "m7", name: "Бисопролол",    dosage: "5 мг",   time: "08:00",          issued: false },
      { id: "m8", name: "Аторвастатин",  dosage: "20 мг",  time: "21:00",          issued: false },
      { id: "m9", name: "Нитроглицерин", dosage: "0.5 мг", time: "по требованию",  issued: false },
    ],
  },
  {
    id: 4, name: "Умарова Зарина Шавкатовна",
    room: "Палата 210", age: 29,
    diagnosis: "Внебольничная пневмония",
    bloodType: "AB(IV) Rh+", admittedDate: "06.04.2026",
    phone: "+998 94 456-78-90", allergies: "Нет", doctor: "Садыков А.Р.",
    medications: [
      { id: "m10", name: "Амоксициллин", dosage: "500 мг", time: "08:00", issued: false },
      { id: "m11", name: "Амброксол",    dosage: "30 мг",  time: "08:00", issued: false },
    ],
  },
];

export const BLOOD_TYPES = [
  "O(I) Rh+","O(I) Rh−","A(II) Rh+","A(II) Rh−",
  "B(III) Rh+","B(III) Rh−","AB(IV) Rh+","AB(IV) Rh−",
];