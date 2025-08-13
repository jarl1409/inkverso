// src/utils/api.ts
import axios, { isAxiosError, type InternalAxiosRequestConfig } from "axios";

// Tipo local para marcar reintentos (sin augmentar axios)
type ConfigWithRetry<D = unknown> = InternalAxiosRequestConfig<D> & { _retry?: boolean };

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // necesario para enviar/recibir la cookie 'jid'
});

// Inyecta el access token actual en cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = { ...(config.headers ?? {}), Authorization: `Bearer ${token}` };
  }
  return config;
});

// Serializa el refresh para evitar tormenta de peticiones
let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    // Si no es un error de axios, o no trae response/config, no intentamos refresh
    if (!isAxiosError(error) || !error.response || !error.config) {
      return Promise.reject(error);
    }

    const resp = error.response;
    const original = error.config as ConfigWithRetry | undefined;

    // Access expirado → intenta refrescar UNA sola vez y reintenta la request original
    if (resp.status === 401 && original && !original._retry) {
      original._retry = true;
      try {
        if (!refreshPromise) {
          refreshPromise = (async () => {
            const r = await api.post<{ token: string }>("/auth/refresh");
            const newToken = r.data.token;

            // ACTUALIZA YA mismo los defaults y el storage
            localStorage.setItem("token", newToken);
            api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

            // Notifica al AuthContext para actualizar estado y storage
            window.dispatchEvent(new CustomEvent("auth:token", { detail: { token: newToken } }));

            return newToken;
          })();
        }

        const newToken = await refreshPromise;
        refreshPromise = null;

        original.headers = { ...(original.headers ?? {}), Authorization: `Bearer ${newToken}` };
        return api(original); // reintenta la request original
      } catch (e) {
        refreshPromise = null;
        // Refresh falló → cerrar sesión (el AuthContext navega a /login)
        window.dispatchEvent(new CustomEvent("auth:logout"));
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
