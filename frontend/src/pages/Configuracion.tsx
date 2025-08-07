import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { UserCircleIcon, FingerPrintIcon } from "@heroicons/react/24/outline";

import api from "../utils/api";

type UsuarioProps = {
  nombre: string;
  email: string;
  birthDate?: string;
  rol: "cliente" | "administrador";
  fechaRegistro: string;
};

type FormStateProps = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  [key: string]: string;
};

type GeneralViewProps = {
  user: UsuarioProps;
  onUpdate: (nuevoPerfil: UsuarioProps) => void;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Configuracion() {
  const [perfil, setPerfil] = useState<UsuarioProps | null>(null);
  const [current, setCurrent] = useState("General");

  const sections = [
    { name: "General", icon: UserCircleIcon },
    { name: "Seguridad", icon: FingerPrintIcon },
  ];

  // 1. Fetch inicial del perfil
  useEffect(() => {
    api
      .get<UsuarioProps>("/usuario/perfil")
      .then((res) => setPerfil(res.data))
      .catch((err) => console.error("Error al cargar perfil:", err));
  }, []);

  if (!perfil) {
    return <p className="p-4 text-center text-gray-500">Cargando perfil…</p>;
  }

  return (
    <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
      {/* Sidebar */}
      <aside className="border-b border-gray-200 py-4 lg:w-64 lg:border-0 lg:py-20">
        <nav className="space-y-2 px-4">
          {sections.map((sec) => {
            const active = current === sec.name;
            return (
              <button
                key={sec.name}
                onClick={() => setCurrent(sec.name)}
                className={classNames(
                  active
                    ? "bg-gray-100 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                  "group flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-semibold"
                )}
              >
                <sec.icon
                  className={classNames(
                    active
                      ? "text-indigo-600"
                      : "text-gray-400 group-hover:text-indigo-600",
                    "h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                {sec.name}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main panel */}
      <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
        {current === "General" && (
          <GeneralView user={perfil} onUpdate={setPerfil} />
        )}
        {current === "Seguridad" && <SeguridadView />}
      </main>
    </div>
  );
}

function GeneralView({ user, onUpdate }: GeneralViewProps) {
  const campos = [
    { key: "nombre", label: "Nombre completo", editable: true, type: "text" },
    {
      key: "email",
      label: "Correo electrónico",
      editable: true,
      type: "email",
    },
    {
      key: "birthDate",
      label: "Fecha de nacimiento",
      editable: true,
      type: "date",
    },
    { key: "rol", label: "Rol de usuario", editable: false, type: "text" },
    {
      key: "fechaRegistro",
      label: "Fecha de registro",
      editable: false,
      type: "text",
    },
  ] as const;

  const [editing, setEditing] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  const startEdit = (key: string) => {
    setEditing(key);
    const raw = (user as any)[key] ?? "";
    setInputValue(
      key === "birthDate" && raw
        ? new Date(raw).toISOString().slice(0, 10)
        : String(raw)
    );
  };

  const saveField = () => {
    api
      .put<UsuarioProps>("/usuario/perfil", { [editing!]: inputValue })
      .then((res) => {
        onUpdate(res.data); // actualiza todo user con la respuesta
        setEditing(null);
      })
      .catch((err) => console.error("Error al actualizar campo:", err));
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 lg:mx-0 lg:max-w-none">
      <h2 className="text-base font-semibold text-gray-900">Perfil</h2>
      <p className="text-sm text-gray-500">
        Actualiza tu información personal.
      </p>

      <dl className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm">
        {campos.map((f) => {
          const raw = (user as any)[f.key];
          const display =
            f.type === "date" && raw
              ? new Date(raw).toLocaleDateString()
              : raw ?? "-";

          return (
            <div key={f.key} className="py-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                {f.label}
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                {/* Campo o input */}
                {f.editable && editing === f.key ? (
                  <input
                    type={f.type}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                ) : (
                  <div className="text-gray-900">{display}</div>
                )}

                {/* Botones para editar sólo si es editable */}
                {f.editable &&
                  (editing === f.key ? (
                    <div className="flex gap-x-2">
                      <button
                        onClick={saveField}
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(f.key)}
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Actualizar
                    </button>
                  ))}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

function SeguridadView() {
  const [form, setForm] = useState<FormStateProps>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState(false);

  function handleChange<K extends keyof FormStateProps>(
    field: K,
    value: FormStateProps[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const { currentPassword, newPassword, confirmPassword } = form;

    // validaciones front
    if (!currentPassword || !newPassword || !confirmPassword) {
      return setError("Todos los campos son obligatorios");
    }
    if (newPassword !== confirmPassword) {
      return setError("Las nuevas contraseñas no coinciden");
    }

    try {
      await api.put("/usuario/cambiar-contrasena", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });
      setSuccess(true);
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cambiar contraseña");
    }
  };

  return (
    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
      <h2 className="text-base font-semibold text-gray-900">Contraseña</h2>
      <p className="text-sm text-gray-500">
        Cambia tu contraseña regularmente.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-6 border-t border-gray-200 pt-6 text-sm"
      >
        {[
          { name: "currentPassword", label: "Contraseña actual" },
          { name: "newPassword", label: "Nueva contraseña" },
          { name: "confirmPassword", label: "Confirmar nueva contraseña" },
        ].map((field) => (
          <div key={field.name} className="sm:flex sm:items-center sm:gap-x-6">
            <label
              htmlFor={field.name}
              className="sm:w-64 font-medium text-gray-900"
            >
              {field.label}
            </label>
            <div className="mt-1 sm:mt-0 sm:flex-auto">
              <input
                type="password"
                id={field.name}
                name={field.name}
                value={form[field.name]}
                onChange={(e) => {
                  handleChange(field.name as keyof FormStateProps, e.target.value);
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        ))}

        {error && <p className="text-red-600">{error}</p>}
        {success && (
          <p className="text-green-600">Contraseña actualizada con éxito</p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}
