// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const routes = require("./routes");

const app = express();

// Crear la carpeta uploads si no existe
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}


// Conexión a MongoDB 
mongoose
  .connect("mongodb://127.0.0.1:27017/inkverso", {})
  .then(() =>
    console.log("✅ Conectado a MongoDB en mongodb://127.0.0.1:27017/inkverso")
  )
  .catch((err) => {
    console.error("❌ Error al conectar con MongoDB:", err.message);
    process.exit(1);
  });

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use(cors()); // CORS abierto en local
app.use("/uploads", express.static(uploadsDir));

// Rutas de la aplicación (prefijo /api)
app.use("/api", routes);

// Inicio del servidor
const PORT = 5000;
const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
});





