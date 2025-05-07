const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  nombre: {
    type: String,
    require: "Agrega Tu Nombre",
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Usuarios", usuariosSchema);
