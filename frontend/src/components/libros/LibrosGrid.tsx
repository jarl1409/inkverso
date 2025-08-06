import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

import type { Book } from "../../types/Book";
import { useFormatter } from "../../context/FormatterContext";

interface Props {
  books: Book[];
  perPage?: number;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const LibrosGrid: React.FC<Props> = ({ books, perPage = 24 }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(books.length / perPage);
  const formatter = useFormatter();

  // Calcula qué libros mostrar en esta página
  const start = (page - 1) * perPage;
  const pageBooks = books.slice(start, start + perPage);

  // Para el listado de números de página
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="">
      <div>
        <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <h2 className="sr-only">Libros</h2>
          <div className="bg-yellow-800">
            <h2 className="font-bold text-4xl text-center text-white py-5 mt-6">
              Libros Disponibles
            </h2>
          </div>
          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {pageBooks.map((book) => (
              <Link
                key={book._id}
                to={`/libros/${book._id}`}
                className="group relative border-r border-b border-gray-200 p-4 sm:p-6"
              >
                <div className="w-full aspect-square rounded-lg bg-gray-200 overflow-hidden">
                  <img
                    src={book.imagenURL}
                    alt={book.titulo}
                    className="h-full w-auto mx-auto group-hover:opacity-75"
                  />
                </div>
                <div className="pt-10 pb-4 text-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    {book.titulo}
                  </h3>
                  <div className="mt-1 text-sm text-gray-500 italic">
                    {book.autor}
                  </div>
                  <p className="mt-4 text-base font-medium text-gray-900">
                    {formatter.format(book.precio)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        {/* Paginación */}
        <nav
          aria-label="Paginación de libros"
          className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-6"
        >
          {/* Previous */}
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={classNames(
              "inline-flex items-center border-t-2 pt-4 pr-1 text-sm font-medium",
              page === 1
                ? "border-transparent text-gray-300 cursor-not-allowed"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            )}
          >
            <ArrowLongLeftIcon
              aria-hidden="true"
              className="mr-3 h-5 w-5 text-gray-400"
            />
            Anterior
          </button>

          {/* Números de página (ocultos en sm, visibles en md+) */}
          <div className="hidden md:flex space-x-1 -mt-px">
            {pages.map((pg) => (
              <button
                key={pg}
                onClick={() => setPage(pg)}
                aria-current={pg === page ? "page" : undefined}
                className={classNames(
                  "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium",
                  pg === page
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                {pg}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={classNames(
              "inline-flex items-center border-t-2 pt-4 pl-1 text-sm font-medium",
              page === totalPages
                ? "border-transparent text-gray-300 cursor-not-allowed"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            )}
          >
            Siguiente
            <ArrowLongRightIcon
              aria-hidden="true"
              className="ml-3 h-5 w-5 text-gray-400"
            />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default LibrosGrid;
