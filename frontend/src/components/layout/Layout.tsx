import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Cog6ToothIcon,
  BookOpenIcon,
  ArchiveBoxIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import Navbar, { type NavPage } from "./Navbar";
import Footer from "./Footer";
import { PrivateRoutes } from "../../routes";

const pages: NavPage[] = [
  {
    name: "Configuración",
    href: PrivateRoutes.configuracion,
    Icon: Cog6ToothIcon,
  },
  { name: "Usuarios", href: PrivateRoutes.usuarios, Icon: UsersIcon },
  // { name: "Historial de Compras", href: "{PrivateRoutes.historial}, Icon: ClockIcon },
  { name: "Mis libros", href: PrivateRoutes.misLibros, Icon: BookOpenIcon },
  { name: "Libros", href: PrivateRoutes.home, Icon: ArchiveBoxIcon },
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Navbar
        pages={pages}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      {/* Aquí va el contenido de cada ruta */}
      <main className="min-h-[calc(100vh-6rem)] bg-gray-100">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
