// /cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/restapis/models/producto.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productosSchema = new Schema({
  name: { type: String, trim: true },
  price: { type: Number },
  img: { type: String },
});

module.exports = mongoose.model("Productos", productosSchema);
