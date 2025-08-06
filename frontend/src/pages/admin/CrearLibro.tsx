import { useState } from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import FormLibro from "../../components/libros/FormLibro";
import api from "../../utils/api";

interface LibroPayload {
  titulo: string;
  descripcion: string;
  categoria: string;
  imagenURL: string;
  precio: number;
  stock: number;
  autor: string;
}

export default function CrearLibro() {
  const navigate = useNavigate();

  // Estado inicial con las propiedades que pide el backend
  const [book, setBook] = useState<LibroPayload>({
    titulo: "",
    descripcion: "",
    categoria: "",
    imagenURL: "",
    precio: 0,
    stock: 0,
    autor: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Actualiza cualquier campo del formulario
  const handleChange = (field: keyof LibroPayload, value: string | number) => {
    setBook((prev) => ({ ...prev, [field]: value }));
  };

  // Cuando subes un archivo, conviértelo a URL temporal
  const handleFile = (f: File) => {
    setFile(f);
  };

  // Envía el POST al backend usando axios
  const handleSubmit = async () => {
    if (!file) {
      alert("Selecciona primero una imagen del libro.");
      return;
    }
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("titulo", book.titulo);
      formData.append("autor", book.autor);
      formData.append("descripcion", book.descripcion);
      formData.append("precio", book.precio.toString());
      formData.append("stock", book.stock.toString());
      formData.append("categoria", book.categoria);
      formData.append("imagenURL", file);

      const res = await api.post("/admin/libros", formData);
      console.log("Libro creado:", res.data);
      navigate(-1);
    } catch (err) {
      console.error("Error al guardar libro:", err);
      alert("No se pudo crear el libro");
    } finally {
      setSubmitting(false);
    }
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
        onCancel={() => navigate(-1)}
      />
    </div>
  );
}
