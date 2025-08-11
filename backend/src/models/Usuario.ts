import { Schema, model, Document } from "mongoose";

export interface IUsuario extends Document {
  _id: string;
  nombre: string;
  email: string;
  passwordHash: string;
  rol: "cliente" | "administrador";
  birthDate?: Date;
  fechaRegistro: Date;
  tokenVersion: number;
}

const UsuarioSchema = new Schema<IUsuario>(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    rol: {
      type: String,
      enum: ["cliente", "administrador"],
      default: "cliente",
      require: true,
    },
    birthDate: {
      type: Date,
      required: false,
    },
    fechaRegistro: {
      type: Date,
      default: Date.now,
    },
    tokenVersion: {
      type: Number,
      default: 0, // clave para invalidar refresh tokens antiguos
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, // añade createdAt / updatedAt
    versionKey: false, 
  }
);





export const Usuario = model<IUsuario>("Usuario", UsuarioSchema);
