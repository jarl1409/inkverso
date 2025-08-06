import api from '../utils/api';
import type { Book } from '../types/Book';

interface ApiBook {
  _id: string;
  titulo: string;
  autor: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenURL: string;
  categoria: string;
}

interface RawResponse {
  libros: ApiBook[];
  total: number;
}


interface LibrosResponse {
  libros: Book[];
  total: number;
}

/**
 * Obtiene los libros públicos (GET /api/libros).
 */
export const obtenerLibros = async (): Promise<LibrosResponse> => {
  const res = await api.get<RawResponse>("/libros");
  const libros: Book[] = res.data.libros.map((b) => ({
    _id: b._id,
    titulo: b.titulo,
    autor: b.autor,
    descripcion: b.descripcion,
    precio: b.precio,
    stock: b.stock,
    imagenURL: b.imagenURL,
    categoria: b.categoria,
  }));
  return {
    libros,
    total: res.data.total,
  };
};

/**
 * Obtiene los libros del administrador (GET /api/admin/libros).
 */
export const obtenerLibrosAdmin = async (): Promise<LibrosResponse> => {
  const res = await api.get<LibrosResponse>('/admin/libros');
  return res.data;
};