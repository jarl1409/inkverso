// src/pages/admin/MisLibros.tsx
import ItemMiLibro, { type Order } from "../../components/libros/ItemMiLibro";

import { BookOpenIcon } from "@heroicons/react/24/outline";

const orders: Order[] = [
  {
    number: "WU88191111",
    invoiceHref: "#",
    createdDate: "Jul 6, 2021",
    createdDatetime: "2021-07-06",
    deliveredDate: "July 12, 2021",
    deliveredDatetime: "2021-07-12",
    total: "$160.00",
    books: [
      {
        id: 1,
        title: "Cuentos de los Hermanos Grimm",
        author: "Jacob Grimm",
        price: 35,
        coverUrl: "/images/portadasLibros/Imagen-1.png",
        description:
          "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
      },
    ],
  },
  // Más órdenes...
];

const stats = [
  { name: "Libros vendidos", stat: "21" },
  { name: "Ganancias", stat: "$58.16" },
  { name: "Gastos", stat: "$24.57" },
];
export default function MisLibros() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-10">
          <div className="flex items-center space-x-2">
            <BookOpenIcon className="w-10 h-auto text-yellow-800" />
            <h1 className="text-yellow-800 text-3xl font-bold">Mis Libros</h1>
          </div>

          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md shadow"
          >
            Publicar Libro
          </button>
        </div>
        <h3 className=" text-base font-semibold text-gray-900">Últimos 30 días</h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-500">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <section
        aria-labelledby="recent-heading"
        className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 id="recent-heading" className="sr-only">
          Recent orders
        </h2>
        <ItemMiLibro orders={orders} />
      </section>
    </>
  );
}
