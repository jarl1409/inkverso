import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar, { type NavPage } from "../components/layout/Navbar";
import BookGrid from "../components/libros/LibrosGrid";
import Spinner from "../components/ui/Spinner";
import type { Book } from "../types/Book";
import {
  Cog6ToothIcon,
  ClockIcon,
  BookOpenIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

const navigation: NavPage[] = [
  { name: "Configuración", href: "/configuracion", Icon: Cog6ToothIcon },
  { name: "Historial de Compras", href: "/historial", Icon: ClockIcon },
  { name: "Mis libros", href: "/mis-libros", Icon: BookOpenIcon },
  { name: "Libros", href: "/", Icon: ArchiveBoxIcon },
];

const mockBooks: Book[] = [
  {
    id: 1,
    title: "Cuentos de los Hermanos Grimm",
    author: "Jacob Grimm",
    price: 35,
    coverUrl: "/images/portadasLibros/Imagen-1.png",
  },
  {
    id: 2,
    title: "Las Aventuras de Sherlock Holmes",
    author: "Arthur Conan Doyle",
    price: 65,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 3,
    title: "Alicia en el País de las Maravillas",
    author: "Lewis Carroll",
    price: 73,
    coverUrl: "/images/portadasLibros/Imagen.png",
  },
  {
    id: 4,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 5,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-1.png",
  },
  {
    id: 6,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
  },
  {
    id: 7,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 8,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-1.png",
  },
  {
    id: 9,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
  },
  {
    id: 10,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 11,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
  },
  {
    id: 12,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 13,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 14,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
  },
  {
    id: 15,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 16,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 17,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
  },
  {
    id: 18,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 19,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 20,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
  },
  {
    id: 21,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 22,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 23,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
  },
  {
    id: 24,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 25,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 26,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
  },
  {
    id: 27,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 28,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 29,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
  },
  {
    id: 30,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 31,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
  {
    id: 32,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
  },
  {
    id: 33,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
  },
];

export default function Index() {
  const { pathname } = useLocation();
  const [books] = useState<Book[]>(mockBooks);
  const loading = books.length === 0;

  // Sólo pasamos las páginas que no coinciden con la ruta actual
  const pagesToShow = navigation.filter((p) => p.href !== pathname);

  return (
    <div className="bg-white min-h-screen">
      <header>
        {/* Hero */}
        <div className="relative bg-gray-900">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <img
              src="/images/HeroImage.png"
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gray-900 opacity-50" />

          <Navbar pages={pagesToShow} />

          <div className="relative px-6 py-10 text-center sm:text-left lg:px-0">
            <div className="mx-auto flex max-w-5xl flex-col sm:flex-row items-center gap-6">
              <img
                src="/images/logoInkverso.png"
                alt="Logo Inkverso Decorado"
                className="h-56 w-auto lg:h-[400px]"
              />
              <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-extralight leading-snug lg:max-w-2xl">
                Somos una{" "}
                <strong className="font-bold">tienda de libros</strong> que
                busca adaptarse a los nuevos hábitos de consumo digital.
              </h3>
            </div>
          </div>
        </div>
      </header>

      <main className="pb-10">
        {loading ? <Spinner /> : <BookGrid books={books} perPage={24} />}
      </main>
    </div>
  );
}
