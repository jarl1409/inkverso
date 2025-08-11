// src/controllers/authController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

import { Usuario, IUsuario } from "../models/Usuario";
import { generarToken } from "../utils/generarToken";

const isProd = process.env.NODE_ENV === "production";

// Fail-fast si faltan secrets
if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET no está definido");
}
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as Secret;

// Helper para firmar refresh tokens
function generarRefreshToken(payload: { id: string; tv?: number }) {
  const ttl = (process.env.REFRESH_TOKEN_TTL ?? "30d") as SignOptions["expiresIn"];
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: ttl });
}

// Helper centralizado para setear la cookie de refresh
function setRefreshCookie(res: Response, value: string) {
  res.cookie("jid", value, {
    httpOnly: true,
    secure: isProd,       // obligatorio en producción (HTTPS)
    sameSite: "none",     // imprescindible para cross-site (Vercel <-> Render)
    path: "/api/auth/refresh",
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días
  });
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
      // tokenVersion: 0, // si tu esquema lo tiene
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
    const usuario = (await Usuario.findOne({ email }).select("+passwordHash")) as IUsuario | null;
    if (!usuario) return res.status(400).json({ mensaje: "Credenciales inválidas" });

    const esMatch = await bcrypt.compare(password, usuario.passwordHash);
    if (!esMatch) return res.status(400).json({ mensaje: "Credenciales inválidas" });

    // Access token (corto)
    const token = generarToken({
      id: usuario._id.toString(),
      rol: usuario.rol,
    });

    // Refresh token (largo) en cookie httpOnly
    const tokenVersion = (usuario as any).tokenVersion ?? 0;
    const refreshToken = generarRefreshToken({ id: usuario._id.toString(), tv: tokenVersion });
    setRefreshCookie(res, refreshToken); // <-- usar helper con SameSite=None

    return res.json({
      token, // <- nombre consistente con refresh
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

export const refresh = async (req: Request, res: Response) => {
  const tokenCookie = req.cookies?.jid;
  if (!tokenCookie) return res.status(401).json({ mensaje: "No refresh token" });

  try {
    const payload = jwt.verify(tokenCookie, REFRESH_SECRET) as { id: string; tv?: number };
    const usuario = await Usuario.findById(payload.id);
    if (!usuario) return res.status(401).json({ mensaje: "Usuario no existe" });

    const dbTV = (usuario as any).tokenVersion ?? 0;
    if (payload.tv != null && payload.tv !== dbTV) {
      return res.status(401).json({ mensaje: "Refresh inválido" });
    }

    // Nuevo access + rotación de refresh
    const token = generarToken({ id: usuario._id.toString(), rol: usuario.rol });
    const newRefresh = generarRefreshToken({ id: usuario._id.toString(), tv: dbTV });
    setRefreshCookie(res, newRefresh);

    return res.json({ token }); // mismo nombre que en login
  } catch (e) {
    return res.status(401).json({ mensaje: "Refresh inválido" });
  }
};
