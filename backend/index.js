// /cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/restapis/index.js

require("dotenv").config({ path: "variables.env" });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes"); // Tu router con todas las rutas

// Conectar con MongoDB
mongoose
  .connect(process.env.DB_URL, {})
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((error) => console.error("❌ Error al conectar con MongoDB:", error));

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// CORS
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) => {
    const existe = whiteList.includes(origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};
app.use(cors(corsOptions));

// Rutas de la aplicación
app.use("/", routes);

// Iniciar servidor
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5000;
app.listen(port, host, () => {
  console.log(`Servidor funcionando en http://${host}:${port}`);
});
