// /cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/cliente-api/components/productos/Productos.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "@config/axios";
import { CRMContext } from "../../context/CRMContext";

import Producto from "./Producto";
import Spinner from "../layout/Spinner";

const Productos = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [auth] = useContext(CRMContext);

  // useEffect para consultar a la API cuando cargue
  useEffect(() => {
    if (!auth.token) {
      navigate("/iniciar-sesion");
      return;
    }

    // Query a la API
    const ConsultarAPI = async () => {
      try {
        const productosConsulta = await clienteAxios.get("/productos", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setProductos(productosConsulta.data);
      } catch (error) {
        // Error con authorizacion
        if (error.response && error.response.status === 401) {
          navigate("/iniciar-sesion");
        }
      }
    };
    ConsultarAPI();
  }, [auth.token, navigate]);

  // spinner de carga
  if (!productos.length) return <Spinner />;

  return (
    <>
      <h2>Productos</h2>
      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map((producto) => (
          <Producto key={producto._id} producto={producto} />
        ))}
      </ul>
    </>
  );
};

export default Productos;
