// src/components/clientes/Nuevocliente.jsx

import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import clienteAxios from "@config/axios";
import { CRMContext } from "../../context/CRMContext";

export default function Nuevocliente() {
  const navigate = useNavigate();
  const [auth] = useContext(CRMContext);

  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  // Leer datos del formulario
  const handleActualizarState = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  // Validar formulario antes de enviar
  const validarCliente = () => {
    const { nombre, apellido, empresa, email, telefono } = cliente;
    return (
      !nombre.length ||
      !apellido.length ||
      !empresa.length ||
      !email.length ||
      !telefono.length
    );
  };

  // Envía el formulario al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await clienteAxios.post(
        "/clientes",
        cliente,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      Swal.fire({
        title: "Se agregó el cliente",
        text: res.data.mensaje,
        icon: "success",
      });

      navigate("/");
    } catch (error) {
      if (error.response) {
        // Errores de validación o servidor
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text:
            error.response.data.mensaje ||
            "Ocurrió un error inesperado en el servidor",
        });
        if (error.response.status === 401) {
          // Token inválido o expirado
          navigate("/iniciar-sesion");
        }
      } else {
        // Falla de red
        Swal.fire({
          icon: "error",
          title: "Error de red",
          text: "No se pudo conectar al servidor",
        });
      }
    }
  };

  return (
    <>
      <h2>Crear un nuevo cliente</h2>

      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={handleActualizarState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={handleActualizarState}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={handleActualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={handleActualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={handleActualizarState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  );
}
