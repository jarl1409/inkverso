// /home/jarl1409/proyectos/inkverso/backend/controllers/bookController.js
const Book = require("../models/books");

const path = require("path");
const fs = require("fs");
const multer = require("multer");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${shortid.generate()}.${ext}`);
  },
});
const fileFilter = (req, file, cb) => {
  const ok = ["image/jpeg", "image/png"].includes(file.mimetype);
  cb(ok ? null : new Error("Formato no válido"), ok);
};
const upload = multer({ storage, fileFilter }).single("img");

// Sube un portada
exports.uploadCover = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      // si falla, devolvemos 400 y cortamos cadena
      return res.status(400).json({ mensaje: err.message });
    }
    next();
  });
};

// Agregar un nuevo libro
exports.createBook = async (req, res, next) => {
  // console.log("req.file:", req.file);
  // console.log("req.body:", req.body);

  try {
    const book = new Book(req.body);
    if (req.file) {
      book.img = req.file.filename;
      // console.log("Asignando img =", book.img);
    }
    await book.save();
    return res.status(201).json(book);
  } catch (error) {
    return next(error);
  }
};

// Muestra todos los libros
exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find({});
    return res.json(books);
  } catch (error) {
    return next(error);
  }
};

// Muestra libro por id
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Libro no encontrado" });
    res.json(book);
  } catch (error) {
    return next(error);
  }
};

// Actializar libro

exports.updateBook = async (req, res, next) => {
  try {
    // Variable donde se almacenan los datos del objeto
    const data = { ...req.body };

    // Si se sube una portada se le asigna la nueva portada
    if (req.file) {
      data.img = req.file.filename;

      // Buscamos el libro viejo para saber qué imagen borrar
      const oldBook = await Book.findById(req.params.id);
      // console.log(oldBook);

      if (oldBook && oldBook.img) {
        const oldPath = path.join(__dirname, "..", "uploads", oldBook.img);
        // console.log(oldPath);

        // Borramos la portada anterior
        fs.unlink(oldPath, (err) => {
          if (err)
            console.warn("No se pudo borrar portada vieja:", err.message);
        });
      }
    } else {
      // Si no hay nueva portada se vuelve asignar la misma portada
      const oldBook = await Book.findById(req.params.id);
      if (oldBook) data.img = oldBook.img;
    }

    // Busca el libro que se quiere actualizar y se agregan lo cambiado
    const updated = await Book.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      // Si no encuentra un libro envia un error
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    }
    // Responde con el libro actualizado
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};

// Elimina  un  libro

exports.deleteBook = async (req, res, next) => {
  try {
    const deleted = await Book.findByIdAndDelete({ _id: req.params.id }); // Crea variable de borrado que borra un libro

    // Si no encuentra un libro muestra un error
    if (!deleted) {
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    } else {
      // Si lo encuentra manda un mensaje de eliminado con el nomnre del libro
      res.json({
        mensaje: `El libro ${deleted.name}  ha sido eliminado`,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Filtro de productos por nombre, author y categoria
exports.searchBook = async (req, res, next) => {
  try {
    // Extraer la palabra o frase que busca el usuario
    const { query } = req.params;

    //  Crear una expresión regular insensible a mayúsculas
    const regex = new RegExp(query, "i");

    //  Ejecutar la búsqueda en MongoDB usando un OR lógico
    const results = await Book.find({
      $or: [
        { name: regex }, // nombre del libro
        { author: regex }, // autor
        { category: regex }, // categoría/género
      ],
    });

    //  Devolver los resultados
    return res.json(results);
  } catch (error) {
    //  Pasar errores al manejador de Express
    return next(error);
  }
};
