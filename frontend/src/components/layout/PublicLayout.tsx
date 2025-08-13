import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar, { type NavPage } from "./Navbar";
import Footer from "./Footer";
import {
  ArchiveBoxIcon,
  BookOpenIcon,
  ClockIcon,
  Cog6ToothIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { PublicRoutes, PrivateRoutes } from "../../routes";
import { useAuth } from "../../context/AuthContext";

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Define las páginas públicas y privadas
  const publicPages: NavPage[] = [
    { name: "Libros", 
      href: PublicRoutes.index, 
      Icon: ArchiveBoxIcon 
    },
  ];

  const privatePages: NavPage[] = [
    {
      name: "Configuración",
      href: PrivateRoutes.configuracion,
      Icon: Cog6ToothIcon,
    },
    { name: "Usuarios", 
      href: PrivateRoutes.usuarios, 
      Icon: UsersIcon 
    },
    // {
    //   name: "Historial de Compras",
    //   href: PrivateRoutes.historial,
    //   Icon: ClockIcon,
    // },
    { name: "Mis libros", 
      href: PrivateRoutes.misLibros, 
      Icon: BookOpenIcon 
    },
    { name: "Libros", 
      href: PrivateRoutes.home, 
      Icon: ArchiveBoxIcon 
    },
  ];

  // Selecciona el array según el estado de autenticación
  const pages = isAuthenticated ? privatePages : publicPages;
  return (
    <>
      <Navbar
        pages={pages}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="min-h-[calc(100vh-6rem)] bg-gray-100">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
