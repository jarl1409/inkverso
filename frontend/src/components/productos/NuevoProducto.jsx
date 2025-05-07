import React, { useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "@config/axios";

import { useNavigate } from "react-router-dom";

export default function NuevoProducto() {
  const history = useNavigate();

  const [producto, setProducto] = useState({
    name: "",
    price: "",
  });

  const [archivo, setArchivo] = useState("");

  // leer los datos del formulario
  const leerInformacionProducto = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  // coloca la img en el state
  const leerArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };

  // Almacena los productos en la base de datos
  const agregarProducto = async (e) => {
    e.preventDefault();
    // crear fromData
    const formData = new FormData();
    formData.append("name", producto.name);
    formData.append("price", producto.price);
    formData.append("img", archivo);
    try {
      const res = await clienteAxios.post("/productos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        Swal.fire("Agregado Correctamente", res.data.mensaje, "success");
      }
      history("/productos");
    } catch (error) {
      console.log(error);
      // lanzar alerta
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Vuelve a intentarlo",
      });
    }
  };

  return (
    <>
      <h2>Nuevo Producto</h2>

      <form onSubmit={agregarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="name"
            onChange={leerInformacionProducto}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            onChange={leerInformacionProducto}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input type="file" name="img" onChange={leerArchivo} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Producto"
          />
        </div>
      </form>
    </>
  );
}
