// src/components/layout/Navbar.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export interface NavPage {
  name: string;
  href: string;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

interface NavbarProps {
  pages: NavPage[];
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ pages }: NavbarProps) {
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const visiblePages = pages.filter((p) => p.href !== pathname);

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
            </nav>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Barra principal */}
      <div className="bg-white backdrop-blur-md cont">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* 1. Toggle móvil */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-yellow-800"
            >
              <Bars3Icon className="h-6 w-6" aria-hidden />
            </button>

            <div className="flex justify-center lg:justify-start items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/images/logoInkversoSinDecoracion.png"
                  alt="Inkverso"
                  className="h-15 w-auto"
                />
                <span className="hidden sm:block text-yellow-800 font-bold">
                  Inkverso
                </span>
              </Link>
            </div>
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

            <Link to="/carrito" className="text-yellow-800">
              <ShoppingBagIcon className="h-6 w-6" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
