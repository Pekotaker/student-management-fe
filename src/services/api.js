import axios from "axios";

const API_URL = "http://localhost:8000";

// ---------- Auth Routes ----------

export async function registerUser(payload) {
  return axios.post(`${API_URL}/users/register`, payload);
}

export async function loginUser(payload) {
  return axios.post(`${API_URL}/users/login`, payload);
}

export async function registerAdmin(payload) {
  return axios.post(`${API_URL}/admin/register`, payload);
}

export async function loginAdmin(payload) {
  return axios.post(`${API_URL}/admin/login`, payload);
}

// ---------- Admin Routes ----------

export async function assignTeacherToClass(data, token) {
  return axios.post(`${API_URL}/admin/assign-teacher-to-class`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function createSchedule(data, token) {
  return axios.post(`${API_URL}/admin/create-schedule`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ---------- Teacher Routes ----------

export async function addTeacherScore(data, token) {
  return axios.post(`${API_URL}/teachers/add-score`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getTeacherStudents(teacherId, token) {
  return axios.get(`${API_URL}/teachers/students/${teacherId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ---------- Student Routes ----------

export async function getStudentScores(userId, token) {
  return axios.get(`${API_URL}/students/scores/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getStudentSchedule(userId, token) {
  return axios.get(`${API_URL}/students/schedule/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// Add more as needed
