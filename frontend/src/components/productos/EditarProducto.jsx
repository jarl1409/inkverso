import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import clienteAxios from "@config/axios";

import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";

export default function EditarProducto() {
  const history = useNavigate()

  // obtener ID
  const { id } = useParams();

  // producto = state y funcion para actualizar
  const [producto, setProducto] = useState({
    name: "",
    price: "",
    img: "",
  });

  const [archivo, setArchivo] = useState("");

  // cuando el componente carga
  useEffect(() => {
    // consultar api para traer el productoa editar
    const consultaAPI = async () => {
      const productoConsulta = await clienteAxios.get(`/productos/${id}`);
      setProducto(productoConsulta.data);
    };
    consultaAPI();
  }, []);

  // leer los datos del formulario
  const leerInformacionProducto = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };
  // Edita un producto en la base de datos
  const editarProducto = async (e) => {
    e.preventDefault();
    // crear fromData
    const formData = new FormData();
    formData.append("name", producto.name);
    formData.append("price", producto.price);
    formData.append("img", archivo);
    
    try {
      const res = await clienteAxios.put(`/productos/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        Swal.fire("Editado Correctamente", res.data.mensaje, "success");
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

  // coloca la img en el state
  const leerArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };

  // extraer los valores del state

  const { name, price, img } = producto;

  return (
    <>
      <h2>Editar producto</h2>

      <form onSubmit={editarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="name"
            onChange={leerInformacionProducto}
            defaultValue={name}
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
            defaultValue={price}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          {img ? (
            <img
              src={`http://localhost:5000/${img}`}
              alt="imagen"
              width="300"
            ></img>
          ) : null}
          <input type="file" name="img" onChange={leerArchivo} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Editar Producto"
          />
        </div>
      </form>
    </>
  );
}
