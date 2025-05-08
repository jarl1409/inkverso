// /cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/restapis/routes/index.js

const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const productoController = require("../controllers/productoController");
const pedidosController = require("../controllers/pedidosController");

const auth = require("../middleware/auth");

// RUTAS DE USERS
router.get("/users", auth, userController.getUsers);
router.get("/users/:id", auth, userController.getUserById);
router.post("/users", auth, userController.createUser);
router.put("/users/:id", auth, userController.updateUser);
router.delete("/users/:id", auth, userController.deleteUser);

/**
 * Rutas para productos
 */

// Agregar producto
router.post(
  "/productos",
  auth,
  productoController.subirArchivo,
  productoController.nuevoProducto
);

// Mostrar productos
router.get("/productos", auth, productoController.mostrarProductos);

// Mostrar productos por ID
router.get("/productos/:idProducto", auth, productoController.mostrarProducto);

//  Actualizar productos por id
router.put(
  "/productos/:idProducto",
  auth,
  productoController.subirArchivo,
  productoController.actualizarProducto
);

// Eliminar productos
router.delete(
  "/productos/:idProducto",
  auth,
  productoController.eliminarProducto
);

// Busqueda de productos
router.post(
  "/productos/busqueda/:query",
  auth,
  productoController.buscarProducto
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
