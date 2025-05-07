// /cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/cliente-api/components/clientes/EditarCliente.jsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

import clienteAxios from "@config/axios";


export default function EditarCliente() {
  // // Obetener id
  const { id } = useParams();

  const history = useNavigate();

  // Query para obtener los datos del cliente
  const consultarApi = async () => {
    const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);

    // Imprimir datos en el state del form
    setCliente(clienteConsulta.data);
  };

  // envia una peticion por axios para actualizar el cliente
  const actualizarCliente = (e) => {
    e.preventDefault();
    // enviar peticion por axios
    clienteAxios
      .put(`/clientes/${cliente._id}`, cliente)
      .then((res) => {
        // Aquí entras cuando el servidor responde con un código 2XX
        Swal.fire({
          title: "Se edito el cliente",
          text: res.data.mensaje, // "Se agregó un nuevo cliente" o similar
          icon: "success",
        });
        history("/");
      })
      .catch((error) => {
        // Aquí entras si el servidor responde con un código de error (4XX / 5XX)
        // o si hubo un problema de red
        if (error.response) {
          // error.response.status podría ser 400, 409, 500, etc.
          Swal.fire({
            icon: "error",
            title: "Hubo un error",
            text:
              error.response.data.mensaje ||
              "Ocurrió un error inesperado en el servidor",
          });
        } else {
          // Este caso es por si no hay respuesta del servidor (p. ej., error de red)
          Swal.fire({
            icon: "error",
            title: "Error de red",
            text: "No se pudo conectar al servidor",
          });
        }
      });
  };

  useEffect(() => {
    consultarApi();
  }, []);

  //  cliente = state, guardarCliente = Funcion para guardar State
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  // Leer datos del formulario
  const handleActualizarState = (e) => {
    // Almacenar lo que el usuario escribe en el state
    setCliente({
      // copiar lo que hay en cliente para reescribir
      ...cliente,
      // Distruccion del objeto cliente
      [e.target.name]: e.target.value,
    });
  };

  // validar formulario
  const validarCliente = () => {
    const { nombre, apellido, empresa, email, telefono } = cliente;
    // revisar que las propiedades del cliente tengan contenido
    let valido =
      !nombre.length ||
      !apellido.length ||
      !empresa.length ||
      !email.length ||
      !telefono.length;

    // retorna true o false
    return valido;
  };

  return (
    <>
      <h2>Editar un cliente</h2>

      <form onSubmit={actualizarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={handleActualizarState}
            value={cliente.nombre}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={handleActualizarState}
            value={cliente.apellido}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={handleActualizarState}
            value={cliente.empresa}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={handleActualizarState}
            value={cliente.email}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={handleActualizarState}
            value={cliente.telefono}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Cambios"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  );
}
