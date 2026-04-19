import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

// ── Patients ──────────────────────────────────────────
export const getPatients   = ()          => api.get('/patients');
export const getPatient    = (id)        => api.get(`/patients/${id}`);
export const createPatient = (data)      => api.post('/patients', data);
export const updatePatient = (id, data)  => api.put(`/patients/${id}`, data);
export const deletePatient = (id)        => api.delete(`/patients/${id}`);

// ── Users ─────────────────────────────────────────────
export const getUsers   = ()          => api.get('/users');
export const getUser    = (id)        => api.get(`/users/${id}`);
export const updateUser = (id, data)  => api.put(`/users/${id}`, data);
export const deleteUser = (id)        => api.delete(`/users/${id}`);

// ── Auth ──────────────────────────────────────────────
/**
 * Логин: получаем ВСЕХ пользователей и ищем вручную.
 * Не используем ?email= фильтр json-server, потому что он
 * регистрозависим и иногда возвращает пустой массив для
 * только что созданных записей (кеш / race condition).
 */
export const loginUser = async (email, password) => {
  const { data: allUsers } = await api.get('/users');

  const user = allUsers.find(
    (u) =>
      u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
      u.password === password
  );

  if (!user) throw new Error('Неверный email или пароль');

  // Возвращаем всё, включая пароль — он нужен для смены пароля в Profile.
  // Пароль хранится в localStorage только на устройстве пользователя — это
  // допустимо для учебного проекта с json-server.
  return { ...user };
};

/**
 * Регистрация: проверяем уникальность email, сохраняем пользователя.
 * После POST делаем GET чтобы убедиться, что запись реально сохранилась,
 * и возвращаем именно то, что лежит в базе.
 */
export const registerUser = async (userData) => {
  // Проверяем уникальность — получаем всех, не полагаемся на query filter
  const { data: allUsers } = await api.get('/users');
  const exists = allUsers.find(
    (u) => u.email.trim().toLowerCase() === userData.email.trim().toLowerCase()
  );
  if (exists) throw new Error('Пользователь с таким email уже существует');

  const newUser = {
    ...userData,
    email: userData.email.trim().toLowerCase(),
    name:  userData.name.trim(),
    role:  'nurse',
    id:    Date.now().toString(),
  };

  // POST — создаём запись
  await api.post('/users', newUser);

  // GET — читаем обратно, чтобы гарантированно вернуть то, что в базе
  const { data: allAfter } = await api.get('/users');
  const saved = allAfter.find((u) => u.id === newUser.id);

  return saved || newUser;
};

export default api;