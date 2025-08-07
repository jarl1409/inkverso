import type { ChangeEvent, FormEvent } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

import type { Book, LibroPayload } from "../../types/Book";
export interface FormLibroProps {
  book: LibroPayload;
  onChange: (field: keyof Book, value: string | number) => void;
  onFileChange: (file: File) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  disabled?: boolean;
}

const numericFields: (keyof Book)[] = ["precio", "stock"];

export default function FormLibro({
  book,
  onChange,
  onFileChange,
  onSubmit,
  onCancel,
  disabled = false,
}: FormLibroProps) {
  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = numericFields.includes(name as keyof Book)
      ? Number(value)
      : value;
    onChange(name as keyof Book, parsedValue);
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={submit} method="post" encType="multipart/form-data">
      <div className="space-y-12 sm:space-y-16">
        {/* Datos del libro */}
        <div className="mt-10 space-y-4">
          {/* Título */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 sm:border-b border-gray-900/10 pb-12">
            <label
              htmlFor="titulo"
              className="block text-sm font-medium text-gray-900 sm:pt-1.5"
            >
              Nombre Libro
            </label>
            <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:max-w-md">
              <input
                id="titulo"
                name="titulo"
                type="text"
                value={book.titulo}
                onChange={handleInput}
                className="block w-full rounded-md border-gray-300 px-3 py-1.5 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 sm:border-b border-gray-900/10 pb-12">
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-900 sm:pt-1.5"
            >
              Sinopsis
            </label>
            <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:max-w-md">
              <textarea
                id="descripcion"
                name="descripcion"
                rows={3}
                value={book.descripcion}
                onChange={handleInput}
                className="block w-full rounded-md border-gray-300 px-3 py-1.5 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 sm:border-b border-gray-900/10 pb-12">
            <label
              htmlFor="categoria"
              className="block text-sm font-medium text-gray-900 sm:pt-1.5"
            >
              Categoría
            </label>
            <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:max-w-md">
              <input
                id="categoria"
                name="categoria"
                type="text"
                value={book.categoria}
                onChange={handleInput}
                className="block w-full rounded-md border-gray-300 px-3 py-1.5 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Portada */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 sm:border-b border-gray-900/10 pb-12">
            <label
              htmlFor="imagen"
              className="block text-sm font-medium text-gray-900 sm:pt-1.5"
            >
              Portada Libro
            </label>
            <div className=" sm:col-span-2 sm:mt-0  ">
              <label
                htmlFor="imagen"
                className="
                  w-full max-w-xs
                  flex flex-col items-center
                  rounded-lg border-2 border-dashed border-gray-300
                  px-6 py-10
                  cursor-pointer
                  hover:border-indigo-500
                  focus-within:border-indigo-500
                  focus-within:ring-1 focus-within:ring-indigo-500
                  transition
                "
              >
                <PhotoIcon
                  className="h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <span className="mt-2 text-sm text-gray-600">
                  Sube la foto{" "}
                  <span className="underline">o arrastra y suelta aquí</span>
                </span>
                <input
                  id="imagen"
                  name="imagen"
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          {/* Precio */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 sm:border-b border-gray-900/10 pb-12">
            <label
              htmlFor="precio"
              className="block text-sm font-medium text-gray-900 sm:pt-1.5"
            >
              Precio
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <div className="relative max-w-xs">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">
                  $
                </span>
                <input
                  id="precio"
                  name="precio"
                  type="number"
                  value={book.precio}
                  onChange={handleInput}
                  className="
                    block
                    w-full
                    rounded-md
                    border
                    border-gray-300
                    bg-white
                    py-1.5
                    pl-8
                    pr-3
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-600
                    focus:border-indigo-600
                  "
                />
              </div>
            </div>
          </div>

          {/* Stock */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 sm:border-b border-gray-900/10 pb-12">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-900 sm:pt-1.5"
            >
              Stock
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0 flex items-center space-x-2">
              <input
                id="stock"
                name="stock"
                type="number"
                value={book.stock}
                onChange={handleInput}
                className="
                  block
                  bg-white
                  w-32
                  rounded-md
                  border
                  border-gray-300
                  px-3
                  py-1.5
                  text-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-600
                  focus:border-indigo-600
                "
              />
            </div>
          </div>
        </div>

        {/* Datos del autor */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 ">
            Información del autor
          </h2>
          <div className="mt-5 my-4">
            {/* Nombre autor */}
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="autor"
                className="block text-sm font-medium text-gray-900 sm:pt-1.5"
              >
                Autor
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="autor"
                  name="autor"
                  type="text"
                  value={book.autor}
                  onChange={handleInput}
                  className="
                    block
                    bg-white
                    w-full
                    max-w-xs
                    rounded-md
                    border
                    border-gray-300
                    px-3
                    py-1.5
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-600
                    focus:border-indigo-600
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="mt-6 flex justify-end gap-x-4">
        <button
          type="button"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
          onClick={() => {
            if (onCancel) onCancel();
          }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-indigo-600"
        >
          {disabled ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
