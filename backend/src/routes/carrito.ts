import { Router } from 'express';
import Joi from 'joi';

import { authMiddleware } from '../middlewares/authMiddleware';
import { validar } from '../middlewares/validationMiddleware';

import {
  obtenerCarrito,
  agregarAlCarrito,
  actualizarItemCarrito,
  eliminarItemCarrito,
  vaciarCarrito,
} from '../controllers/carritoController';

const router = Router();

// Todas las rutas requieren autenticación de usuario (cliente o admin)
router.use(authMiddleware);

// Obtener carrito actual
router.get('/', obtenerCarrito);

// Agregar al carrito
const schemaAgregar = Joi.object({
  libroId: Joi.string()
    .length(24)
    .required()
    .messages({
      'any.required': '"libroId" es obligatorio.',
      'string.base': '"libroId" debe ser un texto válido.',
      'string.length': '"libroId" debe tener 24 caracteres (ID Mongo válido).',
    }),
  cantidad: Joi.number()
    .min(1)
    .required()
    .messages({
      'any.required': '"cantidad" es obligatoria.',
      'number.base': '"cantidad" debe ser un número.',
      'number.min': '"cantidad" debe ser al menos 1.',
    }),
});
router.post('/', validar(schemaAgregar), agregarAlCarrito);

// Actualizar cantidad de item
const schemaActualizar = Joi.object({
  libroId: Joi.string()
    .length(24)
    .required()
    .messages({
      'any.required': '"libroId" es obligatorio.',
      'string.base': '"libroId" debe ser un texto válido.',
      'string.length': '"libroId" debe tener 24 caracteres (ID Mongo válido).',
    }),
  cantidad: Joi.number()
    .min(0)
    .required()
    .messages({
      'any.required': '"cantidad" es obligatoria.',
      'number.base': '"cantidad" debe ser un número.',
      'number.min': '"cantidad" debe ser 0 o mayor.',
    }),
});
router.put('/', validar(schemaActualizar), actualizarItemCarrito);

// Eliminar un item
router.delete(
  '/:libroId',
  // Validar que el parámetro libroId esté presente y sea correcto
  validar(
    Joi.object({
      libroId: Joi.string()
        .length(24)
        .required()
        .messages({
          'any.required': '"libroId" (en la URL) es obligatorio.',
          'string.base': '"libroId" debe ser un texto válido.',
          'string.length': '"libroId" debe tener 24 caracteres (ID Mongo válido).',
        }),
    }).options({ allowUnknown: true })
  ),
  eliminarItemCarrito
);

// Vaciar carrito completo
router.delete('/', vaciarCarrito);

export default router;