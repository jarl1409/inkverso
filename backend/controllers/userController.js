// /home/jarl1409/proyectos/inkverso/backend/controllers/userController.js
const User = require("../models/user");

// Crear usuario
exports.createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    const { password, __v, ...safe } = user.toObject();
    return res.status(201).json(safe);
  } catch (err) {
    return next(err);
  }
};

// Listar todos los usuarios
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password -__v");
    return res.json(users);
  } catch (err) {
    return next(err);
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;  
    const user = await User.findById(id, "-password -__v");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

// Actualizar usuario por ID
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true, select: "-password -__v" }
    );
    if (!updated) return res.status(404).json({ message: "Usuario no encontrado" });
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
};

// Eliminar usuario por ID
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Usuario no encontrado" });
    return res.json({ message: "Usuario eliminado" });
  } catch (err) {
    return next(err);
  }
};
