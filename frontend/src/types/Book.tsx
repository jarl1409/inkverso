export interface Book {
  _id: string;
  titulo: string;
  autor: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenURL: string;
  categoria: string;
}

export type LibroPayload = Omit<Book, "_id">;
