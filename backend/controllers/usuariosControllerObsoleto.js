const Usuarios = require("../models/usuarios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registrarUsuario = async (req, res) => {
  // leer los datos de usuario y colocarlos en Usuario
  const usuario = new Usuarios(req.body);
  usuario.password = await bcrypt.hash(req.body.password, 12);
  try {
    await usuario.save();
    res.json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error" });
  }
};

exports.autenticarUsuarios = async (req, res, next) => {
  // buscar usuario
  const { email, password } = req.body;
  const usuario = await Usuarios.findOne({ email });
  if (!usuario) {
    await res.status(401).json({ mensaje: "ese usuario no existe" });
    next();
  } else {
    if (!bcrypt.compareSync(password, usuario.password)) {
      await res.status(401).json({ mensaje: "Password incorrecto" });
      next();
    } else {
      const token = jwt.sign(
        {
          email: usuario.email,
          nombre: usuario.nombre,
          _id: usuario._id,
        },
        "LLAVESECRETA",
        {
          expiresIn: "1hr",
        }
      );
      res.json({ token });
    }
  }
};
