// /home/jarl1409/proyectos/inkverso/backend/src/controllers/libroController.ts
import { Request, Response } from "express";

import { Libro, ILibro } from "../models/Libro";

// Listar todos los libros (paginado opcionalmente)
export const listarLibros = async (req: Request, res: Response) => {
  try {
    // Busca todos los libros sin skip ni limit
    const libros: ILibro[] = await Libro.find();
    const total: number = libros.length;

    // Devuelve array completo y total
    return res.json({ libros, total });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener libros' });
  }
};

// Obtener un libro por ID
export const obtenerLibro = async (req: Request, res: Response) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    }
    return res.json(libro);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al obtener libro" });
  }
};

// Crear un libro (solo admin)
export const crearLibro = async (req: Request, res: Response) => {
  console.log(">> req.file:", req.file);
  console.log(">> req.body:", req.body);
  const { titulo, autor, descripcion, precio, stock, categoria } = req.body;
  let imagenURL = req.body.imagenURL;
  if (req.file) {
    // ruta pública: /uploads/<filename>
    imagenURL = `/uploads/${req.file.filename}`;
  }
  try {
    const nuevoLibro: ILibro = new Libro({
      titulo,
      autor,
      descripcion,
      precio,
      stock,
      imagenURL,
      categoria,
    });

    await nuevoLibro.save();
    return res.status(201).json(nuevoLibro);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al crear libro" });
  }
};

// Actualizar un libro (solo admin)
export const actualizarLibro = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const libroActualizado = await Libro.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!libroActualizado) {
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    }
    return res.json(libroActualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al actualizar libro" });
  }
};

// Eliminar un libro (solo admin)
export const eliminarLibro = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const libroBorrado = await Libro.findByIdAndDelete(id);
    if (!libroBorrado) {
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    }
    return res.json({ mensaje: "Libro eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al eliminar libro" });
  }
};
