// /cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/restapis/models/pedidos.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
  cliente: {
    type: Schema.ObjectId,
    ref: "Clientes",
  },
  pedido : [
    {
      producto: {
        type: Schema.ObjectId,
        ref: "Productos",
      },
      cantidad: Number,
    },
  ],
  total: { type: Number },
});

module.exports = mongoose.model("Pedidos", pedidosSchema);
