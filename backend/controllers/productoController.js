// /home/jarl1409/cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/restapis/controllers/productoController.js
const Productos = require("../models/productos");

const multer = require("multer");
const shortid = require("shortid");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato no válido"));
    }
  },
};

// Pasar la configiguración y el campo
const upload = multer(configuracionMulter).single("img");

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error });
    }
    return next();
  });
};

// Agregar un nuevo producto
exports.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body);
  try {
    if (req.file.filename) {
      producto.img = req.file.filename;
    }
    await producto.save();
    res.json({ mensaje: "Se ha agregado un producto" });
  } catch (error) {
    console.log(error);
    next();
  }
};

// Muestra todos los productos

exports.mostrarProductos = async (req, res, next) => {
  try {
    const productos = await Productos.find({});
    res.json(productos);
  } catch (error) {
    console.log(erro);
    next();
  }
};

// Muestra producto por id
exports.mostrarProducto = async (req, res, next) => {
  const producto = await Productos.findById(req.params.idProducto);
  if (!producto) {
    res.json({ mensaje: "Ese producto no existe" });
    return next();
  }
  // Mostrar producto
  res.json(producto);
};

// Actializa  un  producto
exports.actualizarProducto = async (req, res, next) => {
  try {
    let nuevoProducto = req.body;

    if (req.file) {
      nuevoProducto.img = req.file.filename;
    } else {
      let productoAnterior = await Productos.findById(req.params.idProducto);
      nuevoProducto.img = productoAnterior.img;
    }

    let producto = await Productos.findByIdAndUpdate(
      { _id: req.params.idProducto },
      nuevoProducto,
      { new: true }
    );
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Elimina  un  producto  por ID

exports.eliminarProducto = async (req, res, next) => {
  try {
    await Productos.findByIdAndDelete({ _id: req.params.idProducto });
    res.json({ mensaje: "El producto ha sido eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.buscarProducto = async (req, res, next) => {
  try {
    // Obtener el query
    const { query } = req.params;
    const producto = await Productos.find({ name: new RegExp(query, "i") });
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};
