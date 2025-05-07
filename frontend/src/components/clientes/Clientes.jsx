import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';
import Spinner from '../layout/Spinner';
import { CRMContext } from '../../context/CRMContext';

export default function Clientes() {
  const navigate = useNavigate();
  const [clientes, guardarClientes] = useState([]);
  const [auth] = useContext(CRMContext);

  useEffect(() => {
    // Si no hay token, redirige a login
    if (!auth.token) {
      return navigate('/iniciar-sesion');
    }

    const consultarAPI = async () => {
      try {
        const { data } = await clienteAxios.get('/clientes', {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        guardarClientes(data);
      } catch (error) {
        // Si recibimos un error de autenticación o servidor
        if (error.response && error.response.status === 401) {
          navigate('/iniciar-sesion');
        } else {
          console.error(error);
        }
      }
    };

    consultarAPI();
  }, [auth.token, navigate]);

  // Mientras carga
  if (!clientes.length) return <Spinner />;

  return (
    <>
      <h2>Clientes</h2>
      <Link to="/clientes/nuevo" className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle" /> Nuevo Cliente
      </Link>
      <ul className="listado-clientes">
        {clientes.map(c => (
          <Cliente key={c._id} cliente={c} />
        ))}
      </ul>
    </>
  );
}
