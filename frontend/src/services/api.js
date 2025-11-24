import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // ❗ No enviar Authorization en login o register
  if (
    !config.url.includes("auth/login") &&
    !config.url.includes("auth/register")
  ) {
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
