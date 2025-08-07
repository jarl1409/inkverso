import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import FormLibro from "../../components/libros/FormLibro";
import type { Book } from "../../types/Book";
import api from "../../utils/api";

type LibroByIdResponse = Book | { libro: Book };

export default function EditarLibro() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Estado del libro a editar
  const [book, setBook] = useState<Book>({
    _id: "",
    titulo: "",
    autor: "",
    precio: 0,
    imagenURL: "",
    stock: 0,
    descripcion: "",
    categoria: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // Al montar, traemos el libro por id
  useEffect(() => {
    if (!id) return;
    let cancel = false;

    (async () => {
      try {
        // si tu backend responde { libro: Book }
        const { data } = await api.get<LibroByIdResponse>(`/libros/${id}`);
        const libro = "libro" in data ? data.libro : data;
        if (!cancel) setBook(libro);
      } catch (err) {
        console.error("No se pudo cargar el libro:", err);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, [id]);

  // Callback para actualizar cada campo
  const handleChange = (field: keyof Book, value: string | number) => {
    setBook((prev) => ({ ...prev, [field]: value }));
  };

  // Actualizar la portada (subida de archivo)
  const handleFile = (f: File) => {
    setFile(f);
  };

  // Al enviar el formulario
  const handleSubmit = async () => {
    if (!id) return;
    setSubmitting(true);

    try {
      // Construye FormData igual que en CrearLibro
      const formData = new FormData();
      formData.append("titulo", book.titulo);
      formData.append("autor", book.autor);
      formData.append("descripcion", book.descripcion);
      formData.append("precio", book.precio.toString());
      formData.append("stock", book.stock.toString());
      formData.append("categoria", book.categoria);

      if (file) {
        formData.append("imagenURL", file);
      }

      // Llama al endpoint PUT con Api
      await api.put(`/admin/libros/${id}`, formData);
      navigate(-1);
    } catch (err) {
      console.error("Error al actualizar libro:", err);
      alert("No se pudo actualizar el libro");
    } finally {
      setSubmitting(false);
    }
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
        onCancel={() => navigate(-1)}
        disabled={submitting}
      />
    </div>
  );
}
