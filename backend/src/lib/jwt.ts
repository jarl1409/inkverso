// src/lib/jwt.ts
import jwt, { type SignOptions, type Secret } from "jsonwebtoken";

type Rol = "cliente" | "administrador";
type JwtPayload = { id: string; rol: Rol; tv: number };

/** Asegura que las env existan (y ayuda a TS a inferir tipos correctos) */
function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Falta variable de entorno: ${name}`);
  return v;
}

/** Convierte un env string a tipo aceptado por expiresIn */
function getExpires(envValue: string | undefined, fallback: SignOptions["expiresIn"]): SignOptions["expiresIn"] {
  // Si quieres restringir a plantillas tipo "15m", "7d", déjalo tal cual con el cast:
  return (envValue ?? fallback) as SignOptions["expiresIn"];
  // Alternativa sin casts: devuelve un número de segundos
  // if (!envValue) return typeof fallback === "number" ? fallback : 900; // 15 min
  // return msToSeconds(envValue); // implementar si deseas parsear "15m" -> 900
}

const ACCESS_TTL: SignOptions["expiresIn"]  = getExpires(process.env.ACCESS_TOKEN_TTL, "15m");
const REFRESH_TTL: SignOptions["expiresIn"] = getExpires(process.env.REFRESH_TOKEN_TTL, "30d");

const ACCESS_SECRET: Secret  = requireEnv("JWT_SECRET");
const REFRESH_SECRET: Secret = requireEnv("JWT_REFRESH_SECRET");

export function signAccessToken(user: { id: string; rol: Rol; tokenVersion: number }) {
  const payload: JwtPayload = { id: user.id, rol: user.rol, tv: user.tokenVersion };
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_TTL });
}

export function signRefreshToken(user: { id: string; tokenVersion: number }) {
  const payload = { id: user.id, tv: user.tokenVersion };
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_TTL });
}
