// /home/jarl1409/cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/cliente-api/config/axios.js
import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "http://localhost:5000",
});

export default clienteAxios;
