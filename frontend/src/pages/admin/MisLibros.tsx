import { useState, useEffect } from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import type { Book } from "../../types/Book";
import ItemMiLibro, { type Order } from "../../components/libros/ItemMiLibro";
import { obtenerLibrosAdmin } from "../../services/libros";
import { PrivateRoutes } from "../../routes";
import Spinner from "../../components/ui/Spinner";
import { getErrorMessage } from "../../utils/error";


export default function MisLibros() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerLibrosAdmin()
      .then(({ libros }) => {
        const ods: Order[] = libros.map((b: Book) => ({
          number: (b as any)._id.toString(),
          invoiceHref: "#",
          createdDate: new Date().toLocaleDateString(),
          createdDatetime: (b as any).createdDatetime ?? "",
          deliveredDate: "-",
          deliveredDatetime: "",
          total: `$${b.precio}`,
          books: [
            {
              id: (b as any)._id.toString(),
              title: b.titulo,
              author: b.autor,
              price: b.precio,
              imagenURL: b.imagenURL,
              description: b.descripcion,
            },
          ],
        }));
        setOrders(ods);
      })
      .catch((err) => {
        const mensaje = getErrorMessage(err)
        setError( mensaje);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-10">
          <div className="flex items-center space-x-2">
            <BookOpenIcon className="w-10 h-auto text-yellow-800" />
            <h1 className="text-yellow-800 text-3xl font-bold">Mis Libros</h1>
          </div>
          <Link
            to={PrivateRoutes.crearLibro}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md shadow"
          >
            Publicar Libro
          </Link>
        </div>
      </div>
      <section
        aria-labelledby="recent-heading"
        className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 id="recent-heading" className="sr-only">
          Mis publicaciones
        </h2>
        <ItemMiLibro orders={orders} />
      </section>
    </>
  );
}
