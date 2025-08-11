import { Router } from 'express';
import Joi from 'joi';

import { registro, login, refresh } from '../controllers/authController';
import { validar } from '../middlewares/validationMiddleware';

const router = Router();

// Schema de validación con Joi para registro
// Ahora incluye opcionalmente "rol"
const schemaRegistro = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  rol: Joi.string().valid('cliente', 'administrador').optional(), // Si no se envía, será 'cliente' por defecto
});

const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post('/registro', validar(schemaRegistro), registro);
router.post('/login', validar(schemaLogin), login);
router.post('/refresh', refresh)

export default router;
