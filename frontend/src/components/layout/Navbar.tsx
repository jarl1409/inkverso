import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useAuth } from "../../context/AuthContext";
import { PublicRoutes, PrivateRoutes } from "../../routes";

export interface NavPage {
  name: string;
  href: string;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

interface NavbarProps {
  pages: NavPage[];
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navbar({
  pages,
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavbarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout, isAuthenticated, user } = useAuth();

  function handleLogout() {
    // 1) Navega primero a la home pública
    navigate(PublicRoutes.index, { replace: true });
    // 2) Borra la sesión
    logout();
  }

  const visiblePages = pages.filter((p) => {
    // No mostrar rutas /app si no está autenticado
    if (p.href.startsWith("/app") && !isAuthenticated) {
      return false;
    }
    // No mostrar "Registro" cuando ya está autenticado
    if (isAuthenticated && p.href === PublicRoutes.register) {
      return false;
    }
    // Filtrar según rol (cliente no ve Mis libros; admin no ve Historial)
    if (isAuthenticated && user?.rol === "cliente" && p.name === "Mis libros") {
      return false;
    }
    if (
      isAuthenticated &&
      user?.rol === "administrador" &&
      p.name === "Historial de Compras"
    ) {
      return false;
    }

    if (
      isAuthenticated &&
      p.name === "Usuarios" &&
      user?.rol !== "administrador"
    ) {
      return false;
    }

    // No mostrar la página actual
    if (p.href === pathname) {
      return false;
    }
    return true;
  });

  return (
    <>
      {/* Menú móvil */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative w-full max-w-xs bg-white p-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="mb-4 inline-flex items-center text-yellow-800"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden />
            </button>

            <nav className="space-y-4">
              {visiblePages.map((page) => (
                <Link
                  key={page.name}
                  to={page.href}
                  className="flex items-center space-x-2 text-yellow-800"
                >
                  <page.Icon className="h-5 w-5" aria-hidden />
                  <span>{page.name}</span>
                </Link>
              ))}

              {!isAuthenticated ? (
                <>
                  <Link
                    to={PublicRoutes.login}
                    className="block text-yellow-800 hover:text-yellow-600"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to={PublicRoutes.register}
                    className="block text-yellow-800 hover:text-yellow-600"
                  >
                    Registrarse
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="block text-yellow-800 hover:text-yellow-600"
                >
                  Cerrar sesión
                </button>
              )}
            </nav>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Barra principal */}
      <div className="bg-white backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          {/* Toggle móvil */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-yellow-800"
          >
            <Bars3Icon className="h-6 w-6" aria-hidden />
          </button>

          {/* Logo */}
          <Link
            to={isAuthenticated ? PrivateRoutes.home : PublicRoutes.index}
            className="flex items-center space-x-2"
          >
            <img
              src="/images/logoInkversoSinDecoracion.png"
              alt="Inkverso"
              className="h-10 w-auto"
            />
            <span className="hidden sm:block text-yellow-800 font-bold">
              Inkverso
            </span>
          </Link>

          {/* Links escritorio */}
          <nav className="hidden lg:flex flex-1 justify-center space-x-8">
            {visiblePages.map((page) => (
              <Link
                key={page.name}
                to={page.href}
                className="flex items-center space-x-1 text-sm font-medium text-yellow-800 hover:text-yellow-600"
              >
                <page.Icon className="h-5 w-5" aria-hidden />
                <span>{page.name}</span>
              </Link>
            ))}
          </nav>

          {/* Botones a la derecha */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to={PublicRoutes.login}
                  className="text-yellow-800 hover:text-yellow-600"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to={PublicRoutes.register}
                  className="text-yellow-800 hover:text-yellow-600"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-yellow-800 hover:text-yellow-600"
              >
                Cerrar sesión
              </button>
            )}

            {isAuthenticated && user?.rol !== "administrador" && (
              <Link to={PrivateRoutes.cart} className="text-yellow-800">
                <ShoppingBagIcon className="h-6 w-6" aria-hidden />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
