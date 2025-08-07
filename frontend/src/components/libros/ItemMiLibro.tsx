import { Link } from "react-router-dom";
import { useState } from "react";

import { useFormatter } from "../../context/FormatterContext";
import api from "../../utils/api";
import { PrivateRoutes } from "../../routes";
import { getErrorMessage } from "../../utils/error";

export interface DisplayBook {
  id: string;
  title: string;
  author: string;
  price: number;
  imagenURL: string;
  description: string;
}

export interface Order {
  number: string;
  invoiceHref: string;
  createdDate: string;
  createdDatetime: string;
  deliveredDate: string;
  deliveredDatetime: string;
  total: string;
  books: DisplayBook[];
}

interface ItemMiLibroProps {
  orders: Order[];
}

export default function ItemMiLibro({ orders }: ItemMiLibroProps) {
  const [submitting, setSubmitting] = useState(false);
  const formatter = useFormatter();

  const eliminar = async (bookId: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este libro?")) {
      return;
    }
    setSubmitting(true);
    try {
      // Llamada DELETE a /admin/libros/:id
      await api.delete(`/admin/libros/${bookId}`);
      // Refrescar la página o volver a cargar la lista
      window.location.reload();
    } catch (err) {
      const mensaje = getErrorMessage(err)
      console.error(mensaje)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
        {orders.map((order) => (
          <div
            key={order.number}
            className="border-t border-b border-gray-200 bg-white shadow-xs sm:rounded-lg sm:border"
          >
            <h4 className="sr-only">Items</h4>
            <ul role="list" className="divide-y divide-gray-200">
              {order.books.map((book) => (
                <li key={book.id} className="p-4 sm:p-6">
                  <div className="flex items-center sm:items-start">
                    <div className="w-20 h-20 shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:w-40 sm:h-40 flex items-center justify-center">
                      <img
                        src={book.imagenURL}
                        alt={book.title}
                        className="h-full w-auto"
                      />
                    </div>
                    <div className="ml-6 flex-1 text-sm">
                      <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                        <div>
                          <h5>{book.title}</h5>
                          <p className="font-light text-xs">{book.author}</p>
                        </div>
                        <p className="mt-2 sm:mt-0 text-xl">
                          {formatter.format(book.price)}
                        </p>
                      </div>
                      <p className="hidden text-gray-500 text-xs sm:mt-2 sm:block">
                        {book.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 sm:flex sm:justify-end">
                    <div className="mt-6 flex items-center divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                      <div className="flex flex-1 justify-center pr-4">
                        <Link
                          to={PrivateRoutes.editarLibro(book.id)}
                          className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                        >
                          Editar publicación
                        </Link>
                      </div>
                      <div className="flex flex-1 justify-center pl-4">
                        <button
                          onClick={() => eliminar(book.id)}
                          disabled={submitting}
                          className="whitespace-nowrap text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
                        >
                          {submitting ? "Eliminando..." : "Eliminar libro"}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
