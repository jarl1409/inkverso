import { React } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import clienteAxios from "@config/axios";


export default function Cliente({ cliente }) {
  const { _id, nombre, apellido, empresa, email, telefono } = cliente;

  const eliminarCliente = async (idCliente) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Estás seguro?",
      text: "Un cliente eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const res = await clienteAxios.delete(`/clientes/${idCliente}`);
        swalWithBootstrapButtons.fire({
          title: "Eliminado!",
          text: res.data.mensaje,
          icon: "success",
        });
      } catch (error) {
        console.error(error);
        swalWithBootstrapButtons.fire({
          title: "Error",
          text: "Hubo un problema al eliminar el cliente",
          icon: "error",
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelado",
        text: "El cliente no se ha eliminado :)",
        icon: "error",
      });
    }
  };

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p className="nombre">
          {nombre} {apellido}
        </p>
        <p className="empresa">{empresa}</p>
        <p>{email}</p>
        <p>Tel: {telefono}</p>
      </div>
      <div className="acciones">
        <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Cliente
        </Link>

        <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
          <i className="fas fa-plus"></i>
          Nuevo pedido
        </Link>

        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarCliente(_id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
}
