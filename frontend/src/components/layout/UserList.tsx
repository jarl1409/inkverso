import { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

import api from "../../utils/api";

interface Usuario {
  _id: string;
  nombre: string;
  email: string;
  rol: "cliente" | "administrador";
  fechaRegistro: string;
  imageUrl?: string;
  href?: string;
}

export default function UsersList() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get<Usuario[]>("/usuario")
      .then(({ data }) => {
        setUsuarios(data);
      })
      .catch((err) =>
        setError(
          err.response?.data?.message ??
            err.message ??
            "Error al cargar usuarios"
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const cambiarRol = async (
    id: string,
    rolActual: "cliente" | "administrador"
  ) => {
    const nuevoRol = rolActual === "cliente" ? "administrador" : "cliente";
    try {
      const { data: actualizado } = await api.put<Usuario>(
        `/usuario/${id}/rol`,
        { rol: nuevoRol }
      );
      setUsuarios((u) =>
        u.map((user) =>
          user._id === id ? { ...user, rol: actualizado.rol } : user
        )
      );
    } catch (err) {
      console.error(err);
      alert("No se pudo cambiar el rol.");
    }
  };

  const eliminarUsuario = async (id: string) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
      await api.delete(`/usuario/${id}`);
      setUsuarios((u) => u.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el usuario.");
    }
  };

  if (loading) return <p className="p-4 text-center">Cargando usuarios…</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {usuarios.map((user) => {
        const fecha = new Date(user.fechaRegistro).toLocaleDateString();

        // Fallbacks por si aún no hay imagen o ruta de perfil:
        const avatar = user.imageUrl ?? "/images/avatar-default.png";
        const perfilLink = user.href ?? "#";

        return (
          <li key={user._id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                alt={`Avatar de ${user.nombre}`}
                src={avatar}
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold text-gray-900">
                  <a href={perfilLink} className="hover:underline">
                    {user.nombre}
                  </a>
                </p>
                <p className="mt-1 flex text-xs text-gray-500">
                  <a
                    href={`mailto:${user.email}`}
                    className="truncate hover:underline"
                  >
                    {user.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-x-6">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm text-gray-900">{user.rol}</p>
                <p className="mt-1 text-xs text-gray-500">
                  Registrado el{" "}
                  <time dateTime={user.fechaRegistro}>{fecha}</time>
                </p>
              </div>
              <Menu as="div" className="relative flex-none">
                <MenuButton className="relative block text-gray-500 hover:text-gray-900">
                  <span className="absolute -inset-2.5" />
                  <span className="sr-only">Opciones</span>
                  <EllipsisVerticalIcon
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </MenuButton>
                <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => cambiarRol(user._id, user.rol)}
                        className={`w-full text-left px-3 py-1 text-sm text-gray-900 ${
                          active ? "bg-gray-50" : ""
                        }`}
                      >
                        Cambiar a{" "}
                        {user.rol === "cliente" ? "administrador" : "cliente"}
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => eliminarUsuario(user._id)}
                        className={`w-full text-left px-3 py-1 text-sm text-red-600 ${
                          active ? "bg-gray-50" : ""
                        }`}
                      >
                        Eliminar usuario
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href={`mailto:${user.email}`}
                        className={`block px-3 py-1 text-sm text-gray-900 ${
                          active ? "bg-gray-50" : ""
                        }`}
                      >
                        Enviar mensaje
                      </a>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
