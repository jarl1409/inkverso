// src/components/libros/FormLibro.tsx
// src/components/libros/FormLibro.tsx
import type { ChangeEvent, FormEvent } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import type { Book } from "../../types/Book";

export interface FormLibroProps {
  book: Book;
  onChange: (field: keyof Book, value: string | number) => void;
  onFileChange: (file: File) => void;
  onSubmit: () => void;
}

export default function FormLibro({
  book,
  onChange,
  onFileChange,
  onSubmit,
}: FormLibroProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // para price conviertes a número si quieres
    onChange(name as keyof Book, name === "price" ? Number(value) : value);
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
    <form onSubmit={submit}>
      <div className="space-y-12 sm:space-y-16">
        {/* Datos del libro */}
        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12">
          {/* Título */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-900 sm:pt-1.5">
              Nombre Libro
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                id="title"
                name="title"
                type="text"
                value={book.title}
                onChange={handleInput}
                className="block w-full rounded-md border-gray-300 px-3 py-1.5 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-900 sm:pt-1.5">
              Sinopsis
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <textarea
                id="description"
                name="description"
                rows={3}
                value={book.description}
                onChange={handleInput}
                className="block w-full rounded-md border-gray-300 px-3 py-1.5 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Portada */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label htmlFor="cover" className="block text-sm font-medium text-gray-900 sm:pt-1.5">
              Portada Libro
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <div className="flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10">
                <PhotoIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <div className="mt-4 text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    <span>Sube la foto</span>
                    <input
                      id="file-upload"
                      name="coverUrl"
                      type="file"
                      accept="image/*"
                      onChange={handleFile}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1 inline">o arrastra y suelta aquí</p>
                </div>
              </div>
            </div>
          </div>

          {/* Precio */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label htmlFor="price" className="block text-sm font-medium text-gray-900 sm:pt-1.5">
              Precio
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0 flex items-center">
              <span className="mr-2">$</span>
              <input
                id="price"
                name="price"
                type="number"
                value={book.price}
                onChange={handleInput}
                className="block w-32 rounded-md border-gray-300 px-3 py-1.5 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Datos del autor */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Información del autor</h2>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12">
            {/* Nombre autor */}
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="author" className="block text-sm font-medium text-gray-900 sm:pt-1.5">
                Autor
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="author"
                  name="author"
                  type="text"
                  value={book.author}
                  onChange={handleInput}
                  className="block w-full rounded-md border-gray-300 px-3 py-1.5 focus:outline-indigo-600 sm:text-sm"
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
          onClick={() => onChange("id", book.id)} // ejemplo de reset o cancel
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-indigo-600"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
