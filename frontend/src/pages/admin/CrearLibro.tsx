import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLibro from "../../components/libros/FormLibro";
import type { Book } from "../../types/Book";

export default function CrearLibro() {
  const navigate = useNavigate();

  // Estado inicial vacío para un libro nuevo
  const [book, setBook] = useState<Book>({
    id: 0,
    title: "",
    author: "",
    price: 0,
    coverUrl: "",
    description: "",
  });

  // Mantiene si estamos enviando la petición
  const [submitting, setSubmitting] = useState(false);

  // Actualiza cualquier campo del formulario
  const handleChange = (field: keyof Book, value: string | number) => {
    setBook(prev => ({ ...prev, [field]: value }));
  };

  // Cuando subes un archivo, lo conviertes a URL temporal
  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    handleChange("coverUrl", url);
  };

  // Al enviar, hacemos POST a la API
  const handleSubmit = () => {
    setSubmitting(true);
    fetch("/api/libros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    })
      .then(res => {
        if (!res.ok) throw new Error("Error creando libro");
        return res.json();
      })
      .then((nuevo: Book) => {
        // opcional: podría navegar a la página de detalle
        navigate("/mis-libros");
      })
      .catch(err => {
        console.error("Error al guardar libro:", err);
        alert("No se pudo crear el libro");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="p-10 space-y-6">
      <div className="flex items-center space-x-2">
        <BookOpenIcon className="w-10 h-auto text-yellow-800" />
        <h1 className="text-yellow-800 text-3xl font-bold">Crear Libro</h1>
      </div>
      <p className="text-gray-600">
        Rellena los datos y haz clic en Guardar para publicar un nuevo libro.
      </p>
      <FormLibro
        book={book}
        onChange={handleChange}
        onFileChange={handleFile}
        onSubmit={handleSubmit}
        disabled={submitting}
      />
    </div>
  );
}
