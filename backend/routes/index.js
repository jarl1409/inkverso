// /cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/restapis/routes/index.js

const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productoController = require("../controllers/productoController");
const pedidosController = require("../controllers/pedidosController");
const usuariosController = require("../controllers/usuariosController");

const auth = require("../middleware/auth");

// Agregar nuevos clientes vía POST
router.post("/clientes",auth, clienteController.nuevoCliente);

// Muestra todos los clientes
router.get("/clientes", auth, clienteController.mostrarClientes);

// Muestra un cliente por medio de su ID
router.get("/clientes/:idCliente",auth, clienteController.mostrarCliente);

// Actualiza un cliente por medio de ID
router.put("/clientes/:idCliente",auth, clienteController.actualizarCliente);

// Eliminar un cliente de la DB Por ID
router.delete("/clientes/:idCliente",auth, clienteController.eliminarCliente);

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
router.delete("/productos/:idProducto",auth, productoController.eliminarProducto);

// Busqueda de productos
router.post("/productos/busqueda/:query",auth, productoController.buscarProducto);

// Pedidos

// Crear  nuevo  pedido
router.post("/pedidos/nuevo/:idUsuario",auth, pedidosController.nuevoPedido);

// Ver  todos los  pedidos
router.get("/pedidos",auth, pedidosController.mostrarPedidos);

// Ver pedido por id
router.get("/pedidos/:idPedido",auth, pedidosController.mostrarPedido);

// Actualizar pedidos
router.put("/pedidos/:idPedido",auth, pedidosController.actualizarPedido);

// eliminar pedido por id
router.delete("/pedidos/:idPedido",auth, pedidosController.eliminarPedido);

// Usuario
router.post("/crear-cuenta", usuariosController.registrarUsuario);
router.post("/iniciar-sesion", usuariosController.autenticarUsuarios);

module.exports = router;
