import { Document } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        rol: 'cliente' | 'administrador';
      };
    }
  }
}

export interface JwtPayloadCustom {
  id: string;
  rol: 'cliente' | 'administrador';
}