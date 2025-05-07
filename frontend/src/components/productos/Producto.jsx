import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

export default function Producto({ producto }) {
  const { _id, name, price, img } = producto;

  const eliminarProducto = async (id) => {
    const result = await Swal.fire({
      title: "Estas seguro?",
      text: "Un producto eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const res = await clienteAxios.delete(`/productos/${id}`);
        await Swal.fire({
          title: "Eliminado!",
          text: res.data.mensaje,
          icon: "success",
        });
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        await Swal.fire({
          title: "Error",
          text: "Ocurrió un error al eliminar el producto.",
          icon: "error",
        });
      }
    }
  };

  return (
    <li className="producto">
      <div className="info-producto">
        <p className="nombre">{name}</p>
        <p className="precio">${price} </p>
        {img ? (
          <img src={`http://localhost:5000/${img}`} alt={`imagen de ${name}`} />
        ) : null}
      </div>
      <div className="acciones">
        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Producto
        </Link>

        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarProducto(_id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
}
