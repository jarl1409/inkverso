import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormLibro from "../../components/libros/FormLibro";
import type { Book } from "../../types/Book";

export default function EditarLibro() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Estado del libro a editar
  const [book, setBook] = useState<Book>({
    id: 0,
    title: "",
    author: "",
    price: 0,
    coverUrl: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  // Al montar, traemos el libro por id
  useEffect(() => {
    if (!id) return;
    fetch(`/api/libros/${id}`)
      .then((res) => res.json())
      .then((data: Book) => {
        setBook(data);
      })
      .catch((err) => {
        console.error("No se pudo cargar el libro:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Callback para actualizar cada campo
  const handleChange = (field: keyof Book, value: string | number) => {
    setBook((prev) => ({ ...prev, [field]: value }));
  };

  // Callback para actualizar la portada (subida de archivo)
  const handleFile = (file: File) => {
    // aquí podrías subir a tu CDN/servidor y recibir una URL...
    // por simplicidad simulamos:
    const fakeUrl = URL.createObjectURL(file);
    handleChange("coverUrl", fakeUrl);
  };

  // Estado de si se envia o no
  const [submitting, setSubmitting] = useState(false);

  // Al enviar el formulario, hacemos PUT a la API
  const handleSubmit = () => {
    fetch(`/api/libros/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error actualizando");
        navigate("/mis-libros");
      })
      .catch((err) => {
        console.error("Error guardando:", err);
      })
      .finally(() => setSubmitting(false));
  };

  if (loading) {
    return <div className="p-10">Cargando libro...</div>;
  }

  return (
    <div className="p-10 space-y-6">
      <div className="flex items-center space-x-2">
        <BookOpenIcon className="w-10 h-auto text-yellow-800" />
        <h1 className="text-yellow-800 text-3xl font-bold">Editar Libro</h1>
      </div>
      <p className="text-gray-600">
        Modifica los campos que necesites y haz clic en Guardar.
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
