// /cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/cliente-api/components/layout/Header.js

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CRMContext } from "../../context/CRMContext";

const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(CRMContext);

  const cerrarSesion = () => {
    setAuth({
      token: "",
      auth: false,
    });
    localStorage.setItem("token", "");
    navigate("/iniciar-sesion");
  };
  return (
    <>
      <header className="barra">
        <div className="contenedor">
          <div className="contenido-barra">
            <h1>CRM - Administrador de Clientes</h1>
            {auth.auth ? (
              <button
                type="button"
                className="btn btn-rojo"
                onClick={cerrarSesion}
              >
                <i className="far fa-times-circle"></i>
                Cerrar sesion
              </button>
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
