/**
 * Controlador de Usuarios
 * Maneja las peticiones HTTP relacionadas con usuarios
 */

const { sendSuccess, sendError } = require('../handlers/responseHandler');
const usuarioService = require('../services/usuarioService');
const { createUsuarioSchema, updateUsuarioSchema } = require('../validations/usuarioValidation');

/**
 * POST /usuarios
 * Crea un nuevo usuario
 */
const crearUsuario = (req, res) => {
  try {
    // Validamos los datos de entrada
    const { error, value } = createUsuarioSchema.validate(req.body);

    if (error) {
      return sendError(
        res,
        'Error en validación de datos',
        400,
        error.details.map(err => err.message)
      );
    }

    // Llamamos al servicio para crear el usuario
    const usuarioCreado = usuarioService.crearUsuario(value);

    // Respondemos con éxito
    return sendSuccess(
      res,
      usuarioCreado,
      'Usuario creado exitosamente',
      201
    );
  } catch (error) {
    return sendError(res, 'Error al crear usuario', 500);
  }
};

/**
 * GET /usuarios
 * Obtiene todos los usuarios
 */
const obtenerTodosLosUsuarios = (req, res) => {
  try {
    // 1. Llama a usuarioService.obtenerTodosLosUsuarios()
    const usuarios = usuarioService.obtenerTodosLosUsuarios();

    // 2. Responde con sendSuccess(res, usuarios, 'Usuarios obtenidos')
    return sendSuccess(res, usuarios, 'Usuarios obtenidos');
  } catch (error) {
    return sendError(res, 'Error al obtener usuarios', 500);
  }
};

/**
 * GET /usuarios/:id
 * Obtiene un usuario específico por ID
 */
const obtenerUsuarioPorId = (req, res) => {
  try {
    // 1. Obtén el ID de req.params.id
    const { id } = req.params;

    // 2. Llama a usuarioService.obtenerUsuarioPorId(id)
    const usuario = usuarioService.obtenerUsuarioPorId(id);

    // 3. Si el usuario NO existe, responde con sendError
    if (!usuario) {
      return sendError(res, 'Usuario no encontrado', 404);
    }

    // 4. Si el usuario EXISTE, responde con sendSuccess
    return sendSuccess(res, usuario, 'Usuario encontrado');
  } catch (error) {
    return sendError(res, 'Error al obtener usuario', 500);
  }
};

/**
 * PATCH /usuarios/:id
 * Actualiza un usuario existente
 */
const actualizarUsuario = (req, res) => {
  try {
    // 1. Valida req.body con updateUsuarioSchema.validate()
    const { error, value } = updateUsuarioSchema.validate(req.body);

    if (error) {
      return sendError(
        res,
        'Error en validación de datos',
        400,
        error.details.map(err => err.message)
      );
    }

    // 2. Obtén el ID de req.params.id
    const { id } = req.params;

    // 3. Llama a usuarioService.actualizarUsuario(id, value)
    const usuarioActualizado = usuarioService.actualizarUsuario(id, value);

    // 4. Si el usuario NO existe, responde con sendError
    if (!usuarioActualizado) {
      return sendError(res, 'Usuario no encontrado', 404);
    }

    // 5. Si el usuario EXISTE, responde con sendSuccess
    return sendSuccess(res, usuarioActualizado, 'Usuario actualizado');
  } catch (error) {
    return sendError(res, 'Error al actualizar usuario', 500);
  }
};

module.exports = {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario
};