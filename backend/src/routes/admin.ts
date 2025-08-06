import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import {
  listarLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
} from "../controllers/libroController";

import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

// Prefix: /api/admin
router.use(authMiddleware, adminMiddleware);

// --- Gestión de libros ---
// GET /api/admin/libros
router.get("/libros", listarLibros);

// Crear, actualizar y eliminar libro
router.post("/libros", upload.single("imagenURL"), crearLibro);
router.put("/libros/:id", upload.single("imagenURL"), actualizarLibro);
router.delete("/libros/:id", eliminarLibro);


// --- Gestión de usuarios ---
router.get("/usuarios", async (_req, res) => {
  try {
    const usuarios = await Usuario.find().select("-passwordHash");
    return res.json(usuarios);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
});
router.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Usuario.findByIdAndDelete(id);
    return res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensaje: "Error al eliminar usuario" });
  }
});


export default router;
