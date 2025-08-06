import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { Usuario, IUsuario } from "../models/Usuario";
import { generarToken } from "../utils/generarToken";

export const registro = async (req: Request, res: Response) => {
  //  Ahora también desestructuramos "rol" (opcional, por defecto 'cliente')
  const { nombre, email, password, rol } = req.body as {
    nombre: string;
    email: string;
    password: string;
    rol?: "cliente" | "administrador";
  };

  try {
    //  Verificar si existe usuario con ese email
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El email ya está registrado" });
    }

    //  Encriptar password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
 
    //  Validar rol (si viene, debe ser 'cliente' o 'administrador'; si no viene, se asume 'cliente')
    let rolFinal: "cliente" | "administrador" = "cliente";
    if (rol) {
      if (rol !== "cliente" && rol !== "administrador") {
        return res.status(400).json({ mensaje: "Rol no válido" });
      }
      rolFinal = rol;
    }

    //  Crear usuario con el rol especificado (o por defecto 'cliente')
    const nuevoUsuario: IUsuario = new Usuario({
      nombre,
      email,
      passwordHash,
      rol: rolFinal,
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

    //  Generar token (incluye el rol dentro del payload)
    const token = generarToken({
      id: usuario._id.toString(),
      rol: usuario.rol,
    });

    return res.json({
      token,
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
