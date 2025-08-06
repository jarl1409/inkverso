import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validar = (schema: ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validar con abortEarly: false para capturar todos los errores
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      // Extraer todos los mensajes de error de Joi
      const mensajes = error.details.map((detalle) => detalle.message);
      return res.status(400).json({ errores: mensajes });
    }
    next();
  };
};