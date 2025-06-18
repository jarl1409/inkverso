// src/pages/Home.tsx
import { useState } from "react";
import BookGrid from "../components/libros/LibrosGrid";
import Spinner from "../components/ui/Spinner";
import type { Book } from "../types/Book";

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

export default function Home() {
  const [books] = useState<Book[]>(mockBooks);
  const loading = books.length === 0;

  return (
    <>
      {/* Hero */}
      <header className="relative bg-gray-900">
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <img
            src="/images/HeroImage.png"
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 bg-gray-900 opacity-50" />
        </div>
        <div className="relative px-6 py-10 text-center sm:text-left max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <img
            src="/images/logoInkverso.png"
            alt="Logo Inkverso"
            className="h-56 w-auto lg:h-[400px]"
          />
          <h1 className="text-white text-3xl lg:text-4xl font-extralight">
            Somos una <strong className="font-bold">tienda de libros</strong>{" "}
            que se adapta al consumo digital.
          </h1>
        </div>
      </header>

      {/* Grid de Libros */}
      <section className="pb-10">
        {loading ? <Spinner /> : <BookGrid books={books} perPage={24} />}
      </section>
    </>
  );
}
