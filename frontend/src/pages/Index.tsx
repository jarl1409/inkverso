import { useState, useEffect } from "react";

import type { Book } from "../types/Book";
import { obtenerLibros } from "../services/libros";
import BookGrid from "../components/libros/LibrosGrid";
import Spinner from "../components/ui/Spinner";


export default function Index() {
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
    <div className="bg-white min-h-screen">
      <header>
        {/* Hero */}
        <div className="relative bg-gray-900">
          <div aria-hidden className="absolute inset-0 overflow-hidden">
            <img
              src="/images/HeroImage.png"
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gray-900 opacity-50" />

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
