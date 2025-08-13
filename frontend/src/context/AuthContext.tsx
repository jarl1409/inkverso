import { getErrorMessage } from "../utils/error";
import api from "../utils/api";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
interface User {
  id: string;
  nombre: string;
  email: string;
  rol: "cliente" | "administrador";
}

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { nombre: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate(); // ⬅️ nuevo

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as User) : null;
  });

  const isAuthenticated = Boolean(token);

  // Persistencia de token y cabecera Authorization por defecto
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Persistencia de usuario
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // ⬇️ Escucha eventos del interceptor: nuevo token y logout
  useEffect(() => {
    const onNewToken = (e: Event) => {
      const detail = (e as CustomEvent<{ token: string }>).detail;
      if (detail?.token) setToken(detail.token);
    };

    const onLogout = () => {
      setToken(null);
      setUser(null);
      navigate("/login", { replace: true });
    };

    window.addEventListener("auth:token", onNewToken as EventListener);
    window.addEventListener("auth:logout", onLogout);

    return () => {
      window.removeEventListener("auth:token", onNewToken as EventListener);
      window.removeEventListener("auth:logout", onLogout);
    };
  }, [navigate]);
  // ⬆️ fin listeners

  async function login(email: string, password: string) {
    try {
      const res = await api.post<{ token: string; usuario: User }>("/auth/login", {
        email,
        password,
      });
      setToken(res.data.token);
      setUser(res.data.usuario);
    } catch (error: unknown) {
      const mensaje = getErrorMessage(error);
      throw new Error(mensaje);
    }
  }

  async function register({ nombre, email, password }: { nombre: string; email: string; password: string }) {
    try {
      await api.post("/auth/registro", { nombre, email, password });
      await login(email, password);
    } catch (error: unknown) {
      const mensaje = getErrorMessage(error);
      throw new Error(mensaje);
    }
  }

  async function logout() {
  try {
    // borra la cookie 'jid' en el backend con los mismos flags
    await api.post("/auth/logout");
  } catch {
    // no pasa nada si falla; igual limpiamos cliente
  } finally {
    setToken(null);
    setUser(null);
    // si ya tienes listeners de auth:logout, también podrías emitir el evento:
    // window.dispatchEvent(new CustomEvent("auth:logout"));
    // pero con navigate aquí es suficiente:
    // (asegúrate de tener useNavigate arriba en este provider)
    navigate("/login", { replace: true });
  }
}


  return (
    <AuthContext.Provider value={{ token, isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
