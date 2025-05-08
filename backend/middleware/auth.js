// /home/jarl1409/cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/restapis/middleware/auth.js

// Autorizacion por el header
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  console.log("→ Headers recibidos:", req.headers);

  // autorizacion por el header
  const authHeader = req.get("Authorization");
  console.log("→ authHeader:", authHeader);

  if (!authHeader) {
    console.warn("⚠ No JWT, pero saltando auth en desarrollo");
    return next();
  }

  // ARREGLAR EL AUTH MAS ADELANTE

  // if (!authHeader) {
  //   const error = new Error("No autenticado, no hat JWT");
  //   error.statusCode = 401;
  //   throw error;
  // }

  //   obtener el token y verificarlo
  const token = authHeader.split(" ")[1];
  let revisartoken;

  try {
    revisartoken = jwt.verify(token, "LLAVESECRETA");
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  // si el token valido pero hubo algun error

  if (!revisartoken) {
    const error = new Error("Token invalido");
    error.statusCode = 401;
    throw error;
  }
  next();
};
