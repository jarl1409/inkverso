import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { JwtPayloadCustom } from "../types";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "";

export const generarToken = (payload: JwtPayloadCustom): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
};

export const verificarToken = (token: string): JwtPayloadCustom => {
  return jwt.verify(token, JWT_SECRET) as JwtPayloadCustom;
};
