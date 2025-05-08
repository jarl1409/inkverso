// /cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/restapis/controllers/clienteController.js

const Clientes = require("../models/clientes");

exports.nuevoCliente = async (req, res) => {
  try {
    const cliente = new Clientes(req.body);
    await cliente.save();
    res.json({ mensaje: "Se agregó un nuevo cliente" });
  } catch (error) {
    console.error("❌ Error al agregar cliente:", error);
    return res.status(400).json({
      mensaje: "Ese cliente ya está registrado",
    });
  }
};

// Muestra todos los clientes

exports.mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({});
    res.json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Muestra un cliente por ID

exports.mostrarCliente = async (req, res, next) => {
  const cliente = await Clientes.findById(req.params.idCliente);

  if (!cliente) {
    res.json({ mesaje: "Ese cliente no existe" });
    next();
  }
  res.json(cliente);
};

// Actualizar cliente por ID

exports.actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findOneAndUpdate(
      { _id: req.params.idCliente },
      req.body,
      {
        new: true,
      }
    );
    res.json(cliente);
  } catch (error) {
    res.send(error);
    next();
  }
};

// Eliminar un cliente de la DB por ID
exports.eliminarCliente = async (req, res, next) => {
  try {
    await Clientes.findByIdAndDelete({ _id: req.params.idCliente });
    res.json({ mensaje: "El cliente fue eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};
