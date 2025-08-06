import { Router } from "express";
import Joi from "joi";

import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { validar } from "../middlewares/validationMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

import {
  listarLibros,
  obtenerLibro,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
} from "../controllers/libroController";


const router = Router();

// Schema de validación (no incluimos imagenURL porque la maneja Multer)
const schemaLibro = Joi.object({
  titulo: Joi.string().required(),
  autor: Joi.string().allow(""),
  descripcion: Joi.string().allow(""),
  precio: Joi.number().required(),
  stock: Joi.number().required(),
  categoria: Joi.string().allow(""),
});

// Rutas públicas
router.get("/", listarLibros);
router.get("/:id", obtenerLibro);

// Rutas que requieren admin: creación de libro con subida de imagen
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("imagenURL"), // Multer recibe el archivo en el campo 'imagenURL'
  validar(schemaLibro), // Validamos resto de campos
  crearLibro
);

// Rutas que requieren admin: actualización de libro (opcionalmente con nueva imagen)
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("imagenURL"),
  validar(schemaLibro),
  actualizarLibro
);

// Eliminar libro
router.delete("/:id", authMiddleware, adminMiddleware, eliminarLibro);

export default router;
