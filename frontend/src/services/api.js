import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

// Aseguramos que TODAS las solicitudes usen cookies de sesión
axios.defaults.withCredentials = true;


export default api;
