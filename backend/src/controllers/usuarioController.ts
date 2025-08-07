import { Response } from "express";
import bcrypt from "bcryptjs";
import { AuthRequest } from "../middlewares/authMiddleware";
import { IUsuario, Usuario } from "../models/Usuario";

/** Lista todos los usuarios (solo administradores) */
export async function listarUsuarios(req: AuthRequest, res: Response) {
  try {
    const usuarios = await Usuario.find()
      .select("nombre email rol fechaRegistro")
      .lean();
    return res.json(usuarios);
  } catch (err) {
    console.error("Error al listar usuarios:", err);
    return res.status(500).json({ message: "Error al obtener usuarios" });
  }
}

/** Obtiene el perfil del usuario autenticado */
export async function perfilUsuario(req: AuthRequest, res: Response) {
  try {
    const usuario = await Usuario.findById(req.user!.id)
      .select("-passwordHash")
      .lean();
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.json(usuario);
  } catch (err) {
    console.error("Error interno al obtener perfil:", err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

/** Obtiene un usuario por ID (solo administradores) */
export async function obtenerUsuario(req: AuthRequest, res: Response) {
  try {
    const usuario = await Usuario.findById(req.params.id)
      .select("nombre email rol fechaRegistro")
      .lean();
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.json(usuario);
  } catch (err) {
    console.error("Error al obtener usuario:", err);
    return res.status(500).json({ message: "Error al obtener usuario" });
  }
}

/** Actualiza el rol de un usuario (solo administradores) */
export async function actualizarRolUsuario(req: AuthRequest, res: Response) {
  const { rol } = req.body;
  if (!["cliente", "administrador"].includes(rol)) {
    return res.status(400).json({ message: "Rol inválido" });
  }
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { $set: { rol } },
      { new: true, select: "nombre email rol fechaRegistro" }
    ).lean();
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.json(usuario);
  } catch (err) {
    console.error("Error al actualizar rol:", err);
    return res.status(500).json({ message: "Error al actualizar rol" });
  }
}

/** Elimina un usuario por ID (solo administradores) */
export async function eliminarUsuario(req: AuthRequest, res: Response) {
  try {
    const eliminado = await Usuario.findByIdAndDelete(req.params.id).lean();
    if (!eliminado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.json({ message: "Usuario eliminado", id: eliminado._id });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    return res.status(500).json({ message: "Error al eliminar usuario" });
  }
}

/** Actualiza el perfil del usuario autenticado */
export async function actualizarPerfil(req: AuthRequest, res: Response) {
  try {
    const allowed = ["nombre", "email", "birthDate"] as const;
    const updates: Partial<Pick<IUsuario, typeof allowed[number]>> = {};

    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const usuario = await Usuario.findByIdAndUpdate(
      req.user!.id,
      { $set: updates },
      { new: true, runValidators: true }
    )
      .select("-passwordHash")
      .lean();

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.json(usuario);
  } catch (err: any) {
    console.error("Error actualizando perfil:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Ocurrió un error al actualizar el perfil" });
  }
}

/** Cambia la contraseña del usuario autenticado */
export async function cambiarContrasenia(req: AuthRequest, res: Response) {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Datos de contraseña inválidos" });
  }

  try {
    const usuario = (await Usuario.findById(req.user!.id)
      .select("+passwordHash")) as IUsuario | null;

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      usuario.passwordHash
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña actual incorrecta" });
    }

    usuario.passwordHash = await bcrypt.hash(newPassword, 10);
    await usuario.save();

    return res.json({ message: "Contraseña actualizada con éxito" });
  } catch (err) {
    console.error("Error al cambiar contraseña:", err);
    return res.status(500).json({ message: "Error interno al cambiar contraseña" });
  }
}
