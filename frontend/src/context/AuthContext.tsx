import axios from "axios";
import api from "../utils/api";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

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
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as User) : null;
  });

  const isAuthenticated = Boolean(token);

  // token persistente  y establece encabezado predeterminado
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Informacion de usuario persistente
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  async function login(email: string, password: string) {
    try {
      const res = await api.post<{ token: string; usuario: User }>(
        "/auth/login",
        { email, password }
      );
      setToken(res.data.token);
      setUser(res.data.usuario);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const mensaje =
          error.response?.data?.mensaje || "Error del servidor";
        throw new Error(mensaje);
      }
      throw new Error("Error inesperado");
    }
  }

  async function register({ nombre, email, password }: { nombre: string; email: string; password: string; }) {
    try {
      await api.post(
        "/auth/registro",
        { nombre, email, password }
      );
      // Después de registrarse exitosamente, inicie sesión para obtener el token
      await login(email, password);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const mensaje =
          error.response?.data?.mensaje || "Error registrando usuario";
        throw new Error(mensaje);
      }
      throw new Error("Error inesperado");
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
