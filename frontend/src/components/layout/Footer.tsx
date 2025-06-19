export default function Footer() {
  return (
    <div>
      <footer className="bg-yellow-800 text-white">
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
