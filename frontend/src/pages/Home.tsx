import { useState, useEffect } from "react";

import type { Book } from "../types/Book";
import { obtenerLibros } from "../services/libros";
import LibrosGrid from "../components/libros/LibrosGrid";
import Spinner from "../components/ui/Spinner";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibros = async () => {
      setLoading(true);
      try {
        const { libros } = await obtenerLibros();
        setBooks(libros);
      } catch (err) {
        console.error("Error cargando libros:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLibros();
  }, []);

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
        {loading ? <Spinner /> : <LibrosGrid books={books} perPage={24} />}
      </section>
    </>
  );
}
