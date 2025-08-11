import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // ⬅️ NUEVO

import { Usuario, IUsuario } from "../models/Usuario";
import { generarToken } from "../utils/generarToken";

const isProd = process.env.NODE_ENV === "production";

// Helper mínimo para firmar refresh tokens (usa JWT_REFRESH_SECRET)
function generarRefreshToken(payload: { id: string; tv?: number }) {
  const ttl = process.env.REFRESH_TOKEN_TTL || "30d"; // opcional
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: ttl });
}

export const registro = async (req: Request, res: Response) => {
  const { nombre, email, password, rol } = req.body as {
    nombre: string;
    email: string;
    password: string;
    rol?: "cliente" | "administrador";
  };

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El email ya está registrado" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let rolFinal: "cliente" | "administrador" = "cliente";
    if (rol) {
      if (rol !== "cliente" && rol !== "administrador") {
        return res.status(400).json({ mensaje: "Rol no válido" });
      }
      rolFinal = rol;
    }

    const nuevoUsuario: IUsuario = new Usuario({
      nombre,
      email,
      passwordHash,
      rol: rolFinal,
      // tokenVersion opcional: si tu esquema lo tiene, no pasa nada si no.
      // tokenVersion: 0,
    });
    await nuevoUsuario.save();

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const usuario = (await Usuario.findOne({ email }).select(
      "+passwordHash"
    )) as IUsuario | null;
    if (!usuario) {
      return res.status(400).json({ mensaje: "Credenciales inválidas" });
    }

    const esMatch = await bcrypt.compare(password, usuario.passwordHash);
    if (!esMatch) {
      return res.status(400).json({ mensaje: "Credenciales inválidas" });
    }

    // Access token (tu función actual; mantiene el nombre "token" para no romper el front)
    const token = generarToken({
      id: usuario._id.toString(),
      rol: usuario.rol,
    });

    // ⬇️ REFRESH TOKEN en cookie httpOnly (nuevo)
    const tokenVersion = (usuario as any).tokenVersion ?? 0; // por si aún no implementas tokenVersion
    const refreshToken = generarRefreshToken({
      id: usuario._id.toString(),
      tv: tokenVersion,
    });

    res.cookie("jid", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      path: "/api/auth/refresh",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días
    });

    return res.json({
      token, // ⬅️ mantenido tal cual
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

// ⬇️ NUEVO: endpoint de refresh (usa cookie "jid" y devuelve nuevo access token)
export const refresh = async (req: Request, res: Response) => {
  const tokenCookie = req.cookies?.jid;
  if (!tokenCookie) return res.status(401).json({ mensaje: "No refresh token" });

  try {
    const payload = jwt.verify(tokenCookie, process.env.JWT_REFRESH_SECRET!) as {
      id: string;
      tv?: number;
      iat: number;
      exp: number;
    };

    const usuario = await Usuario.findById(payload.id);
    if (!usuario) return res.status(401).json({ mensaje: "Usuario no existe" });

    // Si implementas tokenVersion en el modelo, valida aquí:
    const dbTV = (usuario as any).tokenVersion ?? 0;
    if (payload.tv != null && payload.tv !== dbTV) {
      return res.status(401).json({ mensaje: "Refresh inválido" });
    }

    // Nuevo access
    const newAccess = generarToken({
      id: usuario._id.toString(),
      rol: usuario.rol,
    });

    // Rotamos refresh (buena práctica)
    const newRefresh = generarRefreshToken({ id: usuario._id.toString(), tv: dbTV });
    res.cookie("jid", newRefresh, {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      path: "/api/auth/refresh",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    return res.json({ accessToken: newAccess });
  } catch (error) {
    return res.status(401).json({ mensaje: "Refresh inválido" });
  }
};
