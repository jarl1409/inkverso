// /home/jarl1409/cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/cliente-api/src/components/pedidos/FormBuscarProducto.jsx
import React from "react";

export default function FormBuscarProducto(props) {
  return (
    <>
      <form onSubmit={props.buscarProducto}>
        <legend>Busca un Producto y agrega una cantidad</legend>

        <div className="campo">
          <label>Productos:</label>
          <input
            type="text"
            placeholder="Nombre Productos"
            name="productos"
            onChange={props.leerDatosBusqueda}
          />
        </div>
        <input
          type="submit"
          className="btn btn-azul btn-block"
          value="buscar producto"
        />
      </form>
    </>
  );
}
