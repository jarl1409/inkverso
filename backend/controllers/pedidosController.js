// /cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/restapis/controllers/pedidosController.js

const { json } = require("express");
const Pedidos = require("../models/pedidos");

exports.nuevoPedido = async (req, res, next) => {
  const pedido = new Pedidos(req.body);
  try {
    await pedido.save();
    res.json({ mesaje: "se agrego un nuevo pedido" });
  } catch (error) {
    console.log(error);
    next();
  }
};

//  muestra todos los pedidos

exports.mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedidos.find({}).populate("cliente").populate({
      path: "pedido.producto",
      model: "Productos",
    });
    res.json(pedidos);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.mostrarPedido = async (req, res, next) => {
  const pedido = await Pedidos.findById(req.params.idPedido)
    .populate("cliente")
    .populate({
      path: "pedido.producto",
      model: "Productos",
    });
  if (!pedido) {
    res.json({ mensaje: "ese pedido no existe" });
    return next();
  }

  res.json(pedido);
};

// Actualizar el pedido con el id
exports.actualizarPedido = async (req, res, next) => {
  try {
    let pedido = await Pedidos.findByIdAndUpdate(
      { _id: req.params.idPedido },
      req.body,
      {
        new: true,
      }
    )
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Productos",
      });
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Eliminar un producto por id
exports.eliminarPedido = async (req, res, next) => {
  try {
    pedido = await Pedidos.findOneAndDelete({ _id: req.params.idPedido });
    res.json({ mensaje: "se ha eliminado el pedido" });
  } catch (error) {
    console.log(error);
    next();
  }
};
