import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "@config/axios";
import DetallesPedido from "./DetallesPedido";
import Spinner from "../layout/Spinner";
import { CRMContext } from "../../context/CRMContext";

const Pedidos = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [auth] = useContext(CRMContext);

  useEffect(() => {
    // Si no tenemos token, redirige al login
    if (!auth.token) {
      navigate("/iniciar-sesion");
      return;
    }

    // Función que consulta los pedidos
    const consultarAPI = async () => {
      try {
        const { data } = await clienteAxios.get("/pedidos", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setPedidos(data);
      } catch (error) {
        console.error(error);
        // Si da un 401 (token inválido o caducado), redirige
        if (error.response && error.response.status === 401) {
          navigate("/iniciar-sesion");
        }
      }
    };

    consultarAPI();
  }, [auth.token, navigate]);

  if (!pedidos.length) return <Spinner />;

  return (
    <>
      <h2>Pedidos</h2>
      <ul className="listado-pedidos">
        {pedidos.map((pedido) => (
          <DetallesPedido key={pedido._id} pedido={pedido} />
        ))}
      </ul>
    </>
  );
};

export default Pedidos;
