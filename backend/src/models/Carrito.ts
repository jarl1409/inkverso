import { Schema, model, Document, Types } from 'mongoose';

interface IItem {
  libroId: Types.ObjectId;
  cantidad: number;
  precioUnitario: number;
}

export interface ICarrito extends Document {
  usuarioId: Types.ObjectId;
  items: IItem[];
  total: number;
  fechaActualizacion: Date;
}

const ItemSchema = new Schema<IItem>(
  {
    libroId: {
      type: Schema.Types.ObjectId,
      ref: 'Libro',
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1,
    },
    precioUnitario: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const CarritoSchema = new Schema<ICarrito>({
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
    index: true,
  },
  items: {
    type: [ItemSchema],
    default: [],
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
});

export const Carrito = model<ICarrito>('Carrito', CarritoSchema);