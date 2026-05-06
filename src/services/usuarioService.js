/**
 * Servicio de Usuarios
 * Contiene la lógica de negocio para gestionar usuarios
 * 
 * Nota: Actualmente almacenamos en memoria con un array
 * Esta semana lo conectaremos a una base de datos real
 */

// Almacenamiento temporal en memoria (SOLO para desarrollo)
let usuarios = [];
let idContador = 1;

/**
 * Crear un nuevo usuario
 * @param {Object} datosUsuario - { nombre, apellido, email, edad }
 * @returns {Object} El usuario creado
 */
const crearUsuario = (datosUsuario) => {
  const nuevoUsuario = {
    id: idContador++,
    ...datosUsuario,
    fechaRegistro: new Date().toISOString()
  };

  usuarios.push(nuevoUsuario);
  return nuevoUsuario;
};

/**
 * Obtener todos los usuarios
 * @returns {Array} Array de todos los usuarios
 */
// TODO: Completa esta función
const obtenerTodosLosUsuarios = () => {
  // Ayudita: Solo retorna el array de usuarios
  
    //Se retorna directamente la variable 'usuarios' que contiene la lista en memoria.
   
  return usuarios;
};

/**
 * Obtener un usuario por ID
 * @param {Number} id - ID del usuario
 * @returns {Object|null} El usuario encontrado o null
 */
// TODO: Completa esta función
const obtenerUsuarioPorId = (id) => {
  // Ayudita: Usa .find() para buscar en el array
  
   //Se utiliza .find() comparando el ID transformado a entero para evitar errores de tipo.
  //Si no lo encuentra, devolverá undefined/null automáticamente.
   
  return usuarios.find(usuario => usuario.id === parseInt(id));
};

/**
 * Actualizar un usuario existente
 * @param {Number} id - ID del usuario
 * @param {Object} datosActualizados - Campos a actualizar
 * @returns {Object|null} El usuario actualizado o null si no existe
 */
// TODO: Completa esta función
const actualizarUsuario = (id, datosActualizados) => {
  // Ayudita: 
  // 1. Busca el usuario con .findIndex()
  
   //Buscamos la posición del usuario en el array.
   
  const index = usuarios.findIndex(usuario => usuario.id === parseInt(id));

  // 2. Si no existe, retorna null
  if (index === -1) return null;

  // 3. Si existe, actualiza los campos: usuarios[index] = { ...usuarios[index], ...datosActualizados }
  
    //Combinamos los datos antiguos con los nuevos usando el operador spread (...).
    //El ID y la fecha de registro original se mantienen si no vienen en datosActualizados.
   
  usuarios[index] = { ...usuarios[index], ...datosActualizados };

  // 4. Retorna el usuario actualizado
  return usuarios[index];
};

/**
 * Eliminar un usuario (Bonus - no es requerido)
 * @param {Number} id - ID del usuario
 * @returns {boolean} true si se eliminó, false si no existe
 */
const eliminarUsuario = (id) => {
  const index = usuarios.findIndex(usuario => usuario.id === parseInt(id));
  if (index === -1) return false;
  usuarios.splice(index, 1);
  return true;
};

module.exports = {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};