import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  PopoverGroup,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
  Cog6ToothIcon,
  ClockIcon,
  BookOpenIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

import BookGrid from "../components/libros/LibrosGrid";
import Spinner from "../components/layout/Spinner";
import type { Book } from "../types/Book";
// import { CRMContext } from "../context/CRMContext";
// import clienteAxios from "../config/axios";

const navigation = {
  pages: [
    { name: "Configuración", href: "/configuracion", Icon: Cog6ToothIcon },
    { name: "Historial de Compras", href: "/historial", Icon: ClockIcon },
    { name: "Mis libros", href: "/mis-libros", Icon: BookOpenIcon },
    { name: "Libros", href: "/", Icon: ArchiveBoxIcon },
  ],
};

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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // filtramos el que coincide con la ruta actual
  const visiblePages = navigation.pages.filter((p) => p.href !== pathname);

  // Estado de libros
  const [books] = useState<Book[]>(mockBooks);

  const loading = books.length === 0;

  // Contexto de auth
  //   const [auth] = useContext(CRMContext);

  //   // Al montar, si hay token, consulta API de libros
  //   useEffect(() => {
  //     if (!auth.token) {
  //       setLoading(false);
  //       return;
  //     }
  //     const fetchBooks = async () => {
  //       try {
  //         const { data } = await clienteAxios.get<Book[]>("/libros", {
  //           headers: { Authorization: `Bearer ${auth.token}` },
  //         });
  //         setBooks(data);
  //       } catch (err) {
  //         console.error("Error cargando libros:", err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchBooks();
  //   }, [auth.token]);

  return (
    <div className="bg-white min-h-screen">
      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {visiblePages.map((page) => {
                const Icon = page.Icon;
                return (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 flex items-center p-2 font-medium text-gray-900"
                    >
                      <Icon className="h-5 w-5 mr-2" aria-hidden="true" />
                      <span>{page.name}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Hero section */}
      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            alt=""
            src="/images/HeroImage.png"
            className="size-full object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50"
        />

        {/* Navigation */}
        <header className="relative z-10">
          <nav aria-label="Top">
            {/* Secondary navigation */}
            <div className="bg-white/10 backdrop-blur-md backdrop-filter">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div>
                  <div className="flex h-16 items-center justify-between">
                    {/* Logo (lg+) */}
                    <div className="hidden lg:flex lg:flex-1 lg:items-center">
                      <a href="#">
                        <span className="sr-only">Inkverso</span>
                        <img
                          alt=""
                          src="/images/logoInkversoSinDecoracionBlanco.png"
                          className="h-15 w-auto"
                        />
                      </a>
                      <p className="font-bold text-white px-2">Inkverso</p>
                    </div>

                    <div className="hidden h-full lg:flex">
                      {/* Flyout menus */}
                      <PopoverGroup className="inset-x-0 bottom-0 px-4">
                        <div className="flex h-full justify-center space-x-8">
                          {visiblePages.map((page) => {
                            const Icon = page.Icon;
                            return (
                              <a
                                key={page.name}
                                href={page.href}
                                className="flex items-center text-sm font-medium text-white hover:text-indigo-300"
                              >
                                <Icon
                                  className="h-5 w-5 mr-1"
                                  aria-hidden="true"
                                />
                                {page.name}
                              </a>
                            );
                          })}
                        </div>
                      </PopoverGroup>
                    </div>

                    {/* Mobile menu and search (lg-) */}
                    <div className="flex flex-1 items-center lg:hidden">
                      <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-ml-2 p-2 text-white"
                      >
                        <span className="sr-only">Open menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                      </button>
                    </div>

                    {/* Logo (lg-) */}
                    <a href="#" className="lg:hidden">
                      <span className="sr-only">Inkverso</span>
                      <img
                        alt=""
                        src="/images/logoInkversoSinDecoracionBlanco.png"
                        className="h-15 w-auto"
                      />
                    </a>

                    <div className="flex flex-1 items-center justify-end">
                      <div className="flex items-center lg:ml-8">
                        {/* Cart */}
                        <div className="ml-4 flow-root lg:ml-8">
                          <a
                            href="#"
                            className="group -m-2 flex items-center p-2"
                          >
                            <ShoppingBagIcon
                              aria-hidden="true"
                              className="size-6 shrink-0 text-white"
                            />
                            <span className="sr-only">
                              items in cart, view bag
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <div className="relative px-6 py-10 text-center sm:text-left lg:px-0">
          <div className="mx-auto flex max-w-5xl flex-col sm:flex-row items-center gap-6">
            <img
              src="/images/logoInkverso.png"
              alt="Logo Inkverso Decorado"
              className="h-50 w-auto lg:h-[400px]"
            />

            <h3 className="text-white text-2xl sm:text-2xl lg:text-4xl font-extralight leading-snug lg:max-w-2xl">
              Somos una <strong className="font-bold">tienda de libros</strong>{" "}
              que busca adaptarse a los nuevos hábitos de consumo digital.
            </h3>
          </div>
        </div>
      </div>

      <main className="pb-10">
        {loading ? <Spinner /> : <BookGrid books={books} perPage={24} />}
      </main>

      <footer className="bg-[#6f3e0d] text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-4">
          <div className="flex items-center justify-center md:justify-start">
            <img
              src="/images/logoInkversoSinDecoracionBlanco.png"
              alt="Inkverso"
              className="w-32 md:w-40 lg:w-30 h-auto"
            />
          </div>

          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-semibold text-lg">Sobre Inkverso</h3>
            <p className="text-sm leading-relaxed">
              Inkverso es tu librería virtual: encuentra desde novelas clásicas
              hasta los lanzamientos más recientes. Lee donde quieras, cuando
              quieras.
            </p>
          </div>

          <div className="space-y-2 text-center md:text-right">
            <h3 className="font-semibold text-lg">Contacto</h3>
            <p className="text-sm">Email: soporte@inkverso.com</p>
            <p className="text-sm">Teléfono: +57 310 123 4567</p>
            <p className="mt-4 text-xs">
              © 2025 Inkverso. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
