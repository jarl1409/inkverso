import { useNavigate } from "react-router-dom";
import axios from "axios";

const navigate= useNavigate()
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  // headers: { "Content-Type": "multipart/form-data" },
});

api.interceptors.request.use( config => {
  const token = localStorage.getItem("token");
  if (token) {
    // Axios inferirá que config.headers existe
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Limpia localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirige a login
      navigate("/login")
      // window.location.href = "/login"; comentado para ver si este era el error de rutas en el frontend
    }

    return Promise.reject(error);
  }
);

export default api;
