// /home/jarl1409/proyectos/inkverso/backend/routes/index.js

const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController");
const pedidosController = require("../controllers/pedidosController");

const auth = require("../middleware/auth");

// RUTAS DE USERS
router.get("/users", auth, userController.getUsers);
router.get("/users/:id", auth, userController.getUserById);
router.post("/users", auth, userController.createUser);
router.put("/users/:id", auth, userController.updateUser);
router.delete("/users/:id", auth, userController.deleteUser);

/**
 * Rutas para books
 */

// Agregar books
router.post(
  "/books",
  auth,
  bookController.uploadCover,
  bookController.createBook
);

// Mostrar books
router.get("/books", auth, bookController.getBooks);

// Mostrar book por ID
router.get("/books/:id", auth, bookController.getBookById);

//  Actualizar book por id
router.put(
  "/books/:id",
  auth,
  bookController.uploadCover,
  bookController.updateBook
);

// Eliminar book
router.delete(
  "/books/:id",
  auth,
  bookController.deleteBook
);

// Busqueda de book
router.post(
  "/books/busqueda/:query",
  auth,
  bookController.searchBook
);

// Pedidos

// Crear  nuevo  pedido
router.post("/pedidos/nuevo/:idUsuario", auth, pedidosController.nuevoPedido);

// Ver  todos los  pedidos
router.get("/pedidos", auth, pedidosController.mostrarPedidos);

// Ver pedido por id
router.get("/pedidos/:idPedido", auth, pedidosController.mostrarPedido);

// Actualizar pedidos
router.put("/pedidos/:idPedido", auth, pedidosController.actualizarPedido);

// eliminar pedido por id
router.delete("/pedidos/:idPedido", auth, pedidosController.eliminarPedido);

module.exports = router;
