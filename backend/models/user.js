// /cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/restapis/models/clientes.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    nombre: { type: String, trim: true },
    apellido: { type: String, trim: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: { type: String, require: true },
    telefono: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema, "users");
