import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import { useCarrito } from "../../context/CartContext";
import { PrivateRoutes } from "../../routes";
import { getErrorMessage } from "../../utils/error";

interface BookDetail {
  _id: string;
  titulo: string;
  autor: string;
  descripcion: string;
  precio: number;
  imagenURL: string;
}

export default function LibroDetalle() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [libro, setLibro] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    if (!id) return;

    async function loadLibro() {
      try {
        const { data } = await api.get<BookDetail>(`/libros/${id}`);
        setLibro(data);
      } catch (err) {
        const mensaje = getErrorMessage(err);
        console.error("Error al cargar libro:", mensaje);
      } finally {
        setLoading(false);
      }
    }

    loadLibro();
  }, [id]);

  if (loading) return <p>Cargando libro…</p>;
  if (!libro) return <p>Libro no encontrado.</p>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Detalles */}
        <div className="lg:max-w-lg lg:self-end">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {libro.titulo}
          </h1>
          <p className="mt-1 text-lg text-gray-900">
            ${libro.precio.toLocaleString()}
          </p>
          <p className="mt-4 text-sm text-gray-700 italic">
            Autor: {libro.autor}
          </p>

          <section aria-labelledby="description-heading" className="mt-6">
            <h2 id="description-heading" className="sr-only">
              Sinopsis
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>{libro.descripcion}</p>
            </div>
          </section>

          {user?.rol === "cliente" && (
            <button
              onClick={() => {
                if (!libro) return;
                agregarAlCarrito({
                  id: libro._id,
                  titulo: libro.titulo,
                  precio: libro.precio,
                  cantidad: 1,
                  imagenURL: libro.imagenURL,
                });
              }}
              className="mt-6 w-full bg-yellow-100 text-yellow-800 
                         px-4 py-3 rounded-md hover:bg-yellow-200"
            >
              Agregar al carrito
            </button>
          )}

          {user?.rol === "administrador" && (
            <button
              onClick={() => {
                // Redirige al formulario de edición
                navigate(PrivateRoutes.editarLibro(libro._id));
              }}
              className="mt-6 w-full bg-blue-100 text-blue-800 
                         px-4 py-3 rounded-md hover:bg-blue-200"
            >
              Editar libro
            </button>
          )}
        </div>

        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="w-full aspect-square overflow-hidden rounded-lg bg-gray-100 shadow flex items-center justify-center">
            <img
              src={libro.imagenURL}
              alt={`Portada de ${libro.titulo}`}
              className="h-full w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
