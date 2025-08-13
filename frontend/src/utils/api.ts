// src/utils/api.ts
import axios from "axios";

// Marca local para evitar bucle de reintentos
type ConfigWithRetry = axios.AxiosRequestConfig & { _retry?: boolean };

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // necesario para enviar/recibir la cookie 'jid'
});

// Función helper para verificar si es un error de Axios
const isAxiosError = (error: any): error is axios.AxiosError => {
  return error && error.isAxiosError === true;
};

// Inyecta el access token actual en cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = { ...(config.headers ?? {}), Authorization: `Bearer ${token}` };
  }
  return config;
});

// Evita tormenta de refresh: una sola llamada concurrente
let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (!isAxiosError(error) || !error.response || !error.config) {
      return Promise.reject(error);
    }

    const resp = error.response;
    const original = error.config as ConfigWithRetry;

    // Access expirado → intenta refrescar UNA vez
    if (resp.status === 401 && !original._retry) {
      original._retry = true;
      
      try {
        if (!refreshPromise) {
          // Hacemos el refresh una sola vez y compartimos la promesa
          refreshPromise = (async () => {
            const r = await api.post<{ token: string }>("/auth/refresh");
            const newToken = r.data.token;
            
            // 1) Actualiza YA defaults y storage (evita race conditions)
            localStorage.setItem("token", newToken);
            api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
            
            // 2) Notifica al AuthContext para sincronizar estado
            window.dispatchEvent(new CustomEvent("auth:token", { detail: { token: newToken } }));
            
            return newToken;
          })();
        }

        const newToken = await refreshPromise;
        refreshPromise = null;

        // Reintenta la request original con el token nuevo
        original.headers = { ...(original.headers ?? {}), Authorization: `Bearer ${newToken}` };
        return api(original);
      } catch (e) {
        refreshPromise = null;
        // Refresh falló → cerrar sesión; el AuthContext navega a /login
        window.dispatchEvent(new CustomEvent("auth:logout"));
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;