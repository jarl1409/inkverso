import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_URI = process.env.DB_URI || "";

export const conectarDB = async (): Promise<void> => {
  try {
    await mongoose.connect(DB_URI, {} as mongoose.ConnectOptions);
    console.log("MongoDB conectado");
  } catch (err) {
    console.error("Error al conectar con MongoDB:", err);
    process.exit(1);
  }
};
