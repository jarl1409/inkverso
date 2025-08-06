import {
  CheckIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

import { useCarrito } from "../context/CartContext";
import { PrivateRoutes } from "../routes";

export default function Cart() {
  const navigate = useNavigate();

  const { carrito, removerDelCarrito, actualizarCantidad } = useCarrito();

  const subtotal = carrito.reduce(
    (acc, libro) => acc + libro.precio * libro.cantidad,
    0
  );
  const envio = carrito.length > 0 ? 15600 : 0;
  const impuestos = carrito.length > 0 ? subtotal * 0.15 : 0;
  const total = subtotal + envio + impuestos;

  return (
    <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Carrito de Libros
      </h1>

      <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <h2 id="cart-heading" className="sr-only">
            Libros en tu carrito
          </h2>

          {carrito.length === 0 ? (
            <p className="text-gray-500 mt-6">Tu carrito está vacío.</p>
          ) : (
            <ul
              role="list"
              className="divide-y divide-gray-200 border-t border-b border-gray-200"
            >
              {carrito.map((libro) => (
                <li key={libro.id} className="flex py-6 sm:py-10">
                  <div className="shrink-0">
                    <img
                      src={libro.imagenURL}
                      alt={`Portada de ${libro.titulo}`}
                      className="size-24 rounded-md object-cover sm:size-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800">
                          {libro.titulo}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${libro.precio.toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="inline-grid w-full max-w-16 grid-cols-1">
                          <select
                            value={libro.cantidad}
                            onChange={(e) =>
                              actualizarCantidad(
                                libro.id,
                                Number(e.target.value)
                              )
                            }
                            className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          >
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          />
                        </div>

                        <div className="absolute top-0 right-0">
                          <button
                            type="button"
                            onClick={() => removerDelCarrito(libro.id)}
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Eliminar</span>
                            <XMarkIconMini
                              aria-hidden="true"
                              className="size-5"
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      <CheckIcon className="size-5 shrink-0 text-green-500" />
                      <span>Disponible</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Resumen */}
        <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 className="text-lg font-medium text-gray-900">
            Resumen del pedido
          </h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">
                ${subtotal.toFixed(2)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                Envío
                <QuestionMarkCircleIcon className="ml-2 size-4 text-gray-400" />
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                ${envio.toFixed(2)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-sm text-gray-600">Impuestos estimados</dt>
              <dd className="text-sm font-medium text-gray-900">
                ${impuestos.toFixed(2)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">Total</dt>
              <dd className="text-base font-medium text-gray-900">
                ${total.toFixed(2)}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => navigate(PrivateRoutes.checkout)}
              disabled={carrito.length === 0}
              className="w-full rounded-md bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Finalizar compra
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
