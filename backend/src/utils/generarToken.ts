import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

import { JwtPayloadCustom } from "../types";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as Secret;

export const generarToken = (payload: JwtPayloadCustom): string => {
  const expiresIn: SignOptions["expiresIn"] =
    (process.env.ACCESS_TOKEN_TTL as SignOptions["expiresIn"]) || "15m";
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verificarToken = (token: string): JwtPayloadCustom => {
  return jwt.verify(token, JWT_SECRET) as JwtPayloadCustom;
};
