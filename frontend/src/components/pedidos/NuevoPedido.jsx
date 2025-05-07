// /home/jarl1409/cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/cliente-api/src/components/pedidos/NuevoPedido.jsx

import { React, useState, useEffect } from "react";
import clienteAxios from "@config/axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from "./FormCantidadProducto";
import Swal from "sweetalert2";

export default function NuevoPedido() {
  // extraer id del cliente
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [cliente, setCliente] = useState({});

  const [busqueda, setbusqueda] = useState("");

  const [productos, setProductos] = useState([]);

  const [total, setTotal] = useState(0);

  // Actualizar cuando cambie el componente
  useEffect(() => {
    const consultarAPI = async () => {
      const resultado = await clienteAxios.get(`/clientes/${id}`);
      setCliente(resultado.data);
    };
    consultarAPI();
  }, [id]); // sólo cuando cambie el id del cliente

  // Actualizar cuando cambie el array de productos
  // (Evitando que se vuelva hacer una peticion a la DB solo para actualizar el componente)
  useEffect(() => {
    // si no hay productos, total = 0
    if (!productos.length) {
      setTotal(0);
      return;
    }
    // recálculo con reduce
    const nuevoTotal = productos.reduce(
      (acumulado, producto) => acumulado + producto.cantidad * producto.price,
      0
    );
    setTotal(nuevoTotal);
  }, [productos]); // cada vez que cambie el array de productos

  // Buscar producto y que salgan todos los resultados similares

  const buscarProducto = async (e) => {
    e.preventDefault();

    // desestructuramos solo la data
    const { data: resultados } = await clienteAxios.post(
      `/productos/busqueda/${busqueda}`
    );

    if (resultados.length > 0) {
      // mapeamos cada resultado para añadirle id y cantidad inicial
      const encontrados = resultados.map((item) => ({
        ...item,
        producto: item._id,
        cantidad: 0,
        linea: `${item._id}-${Date.now()}`, // clave única por línea
      }));
      // filtro solo los que NO estén ya en estado productos
      const nuevos = encontrados.filter(
        (item) => !productos.some((p) => p.producto === item.producto)
      );
      // guardamos **todos** los encontrados en el estado `productos`
      setProductos((prev) => [...prev, ...nuevos]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Sin coincidencias",
        text: "No se ha encontrado ningún producto",
      });
    }
  };

  // almacenar datos en input de busqueda
  const leerDatosBusqueda = (e) => {
    setbusqueda(e.target.value);
  };

  const restarProductos = (i) => {
    // Copia del producto
    const todosProductos = [...productos];
    // Validar si esta en 0 no seguir restando
    if (todosProductos[i].cantidad === 0) return;

    // Si no esta en 0 restar cantidad
    todosProductos[i].cantidad--;
    // Actualizar en el state
    setProductos(todosProductos);
  };

  const sumarProductos = (i) => {
    // Copia del producto
    const todosProductos = [...productos];
    // Incremento de cantidad
    todosProductos[i].cantidad++;
    // Actualizar en el state
    setProductos(todosProductos);
  };

  const eliminarProductoPedido = (id) => {
    const todosProductos = productos.filter(
      (producto) => producto.producto !== id
    );
    setProductos(todosProductos);
  };

  // Realiza el pedido en la DB
  const realizarPedido = async (e) => {
    e.preventDefault();

    // Objeto de pedido
    const pedido = {
      cliente: id,
      pedido: productos,
      total: total,
    };
    // almacenar en DB
    const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);
    if (resultado.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Correto",
        text: resultado.data.mensaje,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Vuelva a intentarlo",
      });
    }
    // redireccionar
    navigate("/pedidos");
  };

  return (
    <>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>
          {cliente.nombre} {cliente.apellido}
        </p>
      </div>

      <FormBuscarProducto
        buscarProducto={buscarProducto}
        leerDatosBusqueda={leerDatosBusqueda}
      />

      <ul className="resumen">
        {productos.map((producto, index) => (
          <FormCantidadProducto
            key={producto.linea + "-" + index}
            producto={producto}
            index={index}
            restarProductos={restarProductos}
            sumarProductos={sumarProductos}
            eliminarProductoPedido={eliminarProductoPedido}
          />
        ))}
      </ul>
      <p className="total">
        Total a pagar: <span>${total}</span>
      </p>

      {total > 0 ? (
        <form onSubmit={realizarPedido}>
          <input
            type="submit"
            value="realizar pedido"
            className="btn btn-verde btn-block"
          />
        </form>
      ) : null}
    </>
  );
}
