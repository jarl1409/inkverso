import { Router } from "express";
import {
  listarUsuarios,
  perfilUsuario,
  obtenerUsuario,
  actualizarRolUsuario,
  eliminarUsuario,
  actualizarPerfil,
  cambiarContrasenia,
} from "../controllers/usuarioController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, listarUsuarios);
router.get("/perfil", authMiddleware, perfilUsuario);
router.get("/:id", authMiddleware, adminMiddleware, obtenerUsuario);

router.put("/:id/rol", authMiddleware, adminMiddleware, actualizarRolUsuario);
router.delete("/:id", authMiddleware, adminMiddleware, eliminarUsuario);

router.put("/perfil", authMiddleware, actualizarPerfil);
router.put("/cambiar-contrasena", authMiddleware, cambiarContrasenia);

export default router;
