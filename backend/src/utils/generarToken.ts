import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import { JwtPayloadCustom } from "../types";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido");
}
const JWT_SECRET = process.env.JWT_SECRET as Secret;

export const generarToken = (payload: JwtPayloadCustom): string => {
  const expiresIn = (process.env.ACCESS_TOKEN_TTL ?? "15m") as SignOptions["expiresIn"];
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verificarToken = (token: string): JwtPayloadCustom => {
  return jwt.verify(token, JWT_SECRET) as JwtPayloadCustom;
};
