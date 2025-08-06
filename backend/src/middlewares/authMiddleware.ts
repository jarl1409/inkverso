import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { Usuario } from "../models/Usuario";

/**
 * Extiende la interfaz Request de Express para incluir
 * la propiedad `user` que se inyecta una vez validado el token.
 */
export interface AuthRequest extends Request {
  /**
   * Objeto con la información del usuario autenticado
   * – `id`: identificador único del usuario en la base de datos.
   * – `rol`: rol del usuario, puede ser "cliente" o "administrador".
   */
  user?: {
    id: string;
    rol: "cliente" | "administrador";
  };
}

/**
 * Middleware de autenticación que:
 * 1. Verifica que exista un header Authorization con formato "Bearer <token>".
 * 2. Decodifica y valida el JWT usando la clave secreta de entorno.
 * 3. Comprueba que el usuario aún exista en la base de datos.
 * 4. Inyecta en `req.user` la información del payload para usarla en rutas protegidas.
 * 5. Llama a `next()` para continuar con la siguiente función de la cadena.
 *
 * En caso de error, responde con el código HTTP adecuado:
 * - 401 Unauthorized si falta el token o es inválido.
 * - 404 Not Found si el usuario ya no existe.
 *
 * @param req  Petición Express extendida con AuthRequest.
 * @param res  Respuesta Express.
 * @param next Función para pasar al siguiente middleware/controlador.
 */
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // 1. Extraer header Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    // Si no viene o no está en el formato esperado
    return res.status(401).json({ mensaje: "Token no proveído" });
  }

  // 2. Obtener el token tras la palabra "Bearer"
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verificar y decodificar el JWT
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      rol: "cliente" | "administrador";
    };

    // 4. (Busqueda de usuarios) Validar que el usuario exista en la base de datos
    const usuario = await Usuario.findById(payload.id);
    if (!usuario) {
      // El usuario pudo haber sido eliminado o desactivado
      return res.status(404).json({ mensaje: "Usuario no existe" });
    }

    // 5. Inyectar información del usuario autenticado en la petición
    req.user = {
      id: payload.id,
      rol: payload.rol,
    };

    // 6. Continuar con el siguiente middleware/controlador
    next();
  } catch (err) {
    console.error("Error validando JWT:", err);
    // Token inválido o expirado
    return res.status(401).json({ mensaje: "Token inválido" });
  }
};
