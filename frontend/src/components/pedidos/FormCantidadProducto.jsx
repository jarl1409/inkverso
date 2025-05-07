import React from "react";

export default function FormCantidadProducto(props) {
  const {
    producto,
    index,
    restarProductos,
    sumarProductos,
    eliminarProductoPedido,
  } = props;

  return (
    <li>
      <div className="texto-producto">
        <p className="nombre">{producto.name}</p>
        <p className="precio">${producto.price}</p>
      </div>
      <div className="acciones">
        <div className="contenedor-cantidad">
          <i
            className="fas fa-minus"
            onClick={() => {
              restarProductos(index);
            }}
          >
            -
          </i>
          <p>{producto.cantidad}</p>
          <i
            className="fas fa-plus"
            onClick={() => {
              sumarProductos(index);
            }}
          >
            +
          </i>
        </div>
        <button
          onClick={() => eliminarProductoPedido(producto.producto)}
          type="button"
          className="btn btn-rojo"
        >
          <i className="fas fa-minus-circle"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
}
