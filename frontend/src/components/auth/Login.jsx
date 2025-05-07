import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import clienteAxios from "@config/axios";

// context
import { CRMContext } from "../../context/CRMContext";

export default function Login() {
  const [auth, setAuth] = useContext(CRMContext);
  const navigate = useNavigate();

  const [credenciales, setCredenciales] = useState({});
  const leerDatos = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await clienteAxios.post(
        "/iniciar-sesion",
        credenciales
      );
      const { token } = respuesta.data;
      localStorage.setItem("token", token);

      setAuth({ token, auth: true });

      Swal.fire({
        title: "Iniciando Sesion",
        text: "haz iniciado sesion",
        icon: "success",
      });

      navigate("/");
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: error.response.data.mensaje,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: "Hubo un error",
        });
      }
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <div className="contenedor-formulario">
        <form onSubmit={iniciarSesion}>
          <div className="campo">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Ingresar Email"
              required
              onChange={leerDatos}
            />
          </div>
          <div className="campo">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Ingresar password"
              required
              onChange={leerDatos}
            />
          </div>
          <input
            type="submit"
            value="iniciar Sesion"
            className="btn btn-verde btn-block"
          />
        </form>
      </div>
    </div>
  );
}
