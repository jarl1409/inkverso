// src/components/layout/Layout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar, { type NavPage } from "./Navbar";
import Footer from "./Footer";
import {
  Cog6ToothIcon,
  ClockIcon,
  BookOpenIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";


const pages: NavPage[] = [
  { name: "Configuración", href: "/configuracion", Icon: Cog6ToothIcon },
  { name: "Historial de Compras", href: "/historial", Icon: ClockIcon },
  { name: "Mis libros", href: "/mis-libros", Icon: BookOpenIcon },
  { name: "Libros", href: "/", Icon: ArchiveBoxIcon },
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
