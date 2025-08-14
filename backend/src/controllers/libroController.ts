// /home/jarl1409/proyectos/inkverso/backend/src/controllers/libroController.ts
import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
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
  
  try {
    let imagenURL = "";
    
    if (req.file) {
      // Con Cloudinary, la URL ya está disponible en req.file.path
      imagenURL = req.file.path;
      console.log(">> Imagen subida a Cloudinary:", imagenURL);
    }

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
  const updates = { ...req.body };

  try {
    // Si se subió una nueva imagen
    if (req.file) {
      // Obtener el libro actual para eliminar la imagen anterior
      const libroActual = await Libro.findById(id);
      
      if (libroActual?.imagenURL && libroActual.imagenURL.includes('cloudinary.com')) {
        // Extraer el public_id de la URL de Cloudinary para eliminar la imagen anterior
        const publicId = extractPublicIdFromUrl(libroActual.imagenURL);
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
            console.log("Imagen anterior eliminada de Cloudinary:", publicId);
          } catch (error) {
            console.warn("Error al eliminar imagen anterior:", error);
          }
        }
      }
      
      // Asignar la nueva URL de Cloudinary
      updates.imagenURL = req.file.path;
      console.log(">> Nueva imagen subida a Cloudinary:", req.file.path);
    }

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
    const libro = await Libro.findById(id);
    
    if (!libro) {
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    }

    console.log("🗑️ Eliminando libro:", libro.titulo);
    console.log("🖼️ URL de imagen a eliminar:", libro.imagenURL);

    // Eliminar imagen de Cloudinary si existe
    if (libro.imagenURL && libro.imagenURL.includes('cloudinary.com')) {
      const publicId = extractPublicIdFromUrl(libro.imagenURL);
      console.log("🔑 Public ID extraído:", publicId);
      
      if (publicId) {
        try {
          const deleteResult = await cloudinary.uploader.destroy(publicId);
          console.log("📤 Resultado de eliminación en Cloudinary:", deleteResult);
          
          if (deleteResult.result === 'ok') {
            console.log("✅ Imagen eliminada exitosamente de Cloudinary");
          } else if (deleteResult.result === 'not found') {
            console.warn("⚠️ Imagen no encontrada en Cloudinary (puede haber sido eliminada previamente)");
          } else {
            console.warn("⚠️ Resultado inesperado al eliminar imagen:", deleteResult);
          }
        } catch (error) {
          console.error("❌ Error al eliminar imagen de Cloudinary:", error);
          // Continuamos con la eliminación del libro aunque falle la eliminación de la imagen
        }
      } else {
        console.warn("⚠️ No se pudo extraer el public_id de la URL, saltando eliminación de imagen");
      }
    } else {
      console.log("ℹ️ No hay imagen de Cloudinary para eliminar");
    }

    // Eliminar el libro de la base de datos
    await Libro.findByIdAndDelete(id);
    console.log("✅ Libro eliminado de la base de datos");
    
    return res.json({ mensaje: "Libro eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar libro:", error);
    return res.status(500).json({ mensaje: "Error al eliminar libro" });
  }
};

// Función auxiliar para extraer el public_id de una URL de Cloudinary
const extractPublicIdFromUrl = (url: string): string | null => {
  try {
    console.log("🔍 Intentando extraer public_id de URL:", url);
    
    // Para URLs de Cloudinary con transformaciones:
    // https://res.cloudinary.com/cloud-name/image/upload/w_400,h_600,c_fill,q_auto,f_webp/v123456/Libros/libro-timestamp-name.webp
    
    // Para URLs simples:
    // https://res.cloudinary.com/cloud-name/image/upload/v123456/Libros/libro-timestamp-name.webp
    
    // Patrón más específico para capturar todo después de la versión
    const matchWithTransform = url.match(/\/upload\/[^\/]*\/v\d+\/(.+?)(?:\.(jpg|jpeg|png|webp|gif))?$/i);
    if (matchWithTransform) {
      const publicId = matchWithTransform[1];
      console.log("✅ Public ID extraído (con transformaciones):", publicId);
      return publicId;
    }
    
    // Patrón para URLs sin transformaciones
    const matchSimple = url.match(/\/upload\/v\d+\/(.+?)(?:\.(jpg|jpeg|png|webp|gif))?$/i);
    if (matchSimple) {
      const publicId = matchSimple[1];
      console.log("✅ Public ID extraído (simple):", publicId);
      return publicId;
    }
    
    console.warn("❌ No se pudo extraer public_id de la URL");
    return null;
  } catch (error) {
    console.error("❌ Error extrayendo public_id:", error);
    return null;
  }
};