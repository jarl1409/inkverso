export const PublicRoutes = {
  index: "/",
  login: "/login",
  register: "/register",
  libroDetalle: (id: string = ":id") => `/libros/${id}`,
};

export const PrivateRoutes = {
  home: "/app",
  configuracion: "/app/configuracion",
  historial: "/app/historial",
  misLibros: "/app/mis-libros",
  usuarios: "/app/usuarios",
  crearLibro: "/app/mis-libros/crear",
  editarLibro: (id: string = ":id") => `/app/mis-libros/editar/${id}`,
  cart: "/app/cart",
  checkout: '/app/checkout'
};
