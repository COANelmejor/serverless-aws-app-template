const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uT = require('../lib/userTools');

const UserSchema = new Schema({  
  username: {
    type: String,
    required: true,
    unique: true
  },
  salt: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
    default: 'Anónimo'
  },
  /**
   * Estado de validación del correo electrónico.
   */
  validado: {
    type: Boolean,
    required: true,
    default: false
  },
  /**
   * Esta es la fecha de vencimiento del servicios
   * Si han pasado más de 10 días calendario, licenciaActiva deberia cambiarse a false.
   * Si han pasado mas de 30 días calendario, el usuario deberia ser eliminado.
   */
  vencimiento: {
    type: Number,
    required: true,
    default: 0
  },
  /**
   * Si está false, no deberia poder crear Facturas
   */
  licenciaActiva:{
    type: Boolean,
    required: true,
    default: false
  },
  limiteEmisionMensual: {
    type: Number,
    required: true,
    default: 0
  },
  limiteAlmacenAnual: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  strict: true
})

const userModel = mongoose.model('user', UserSchema);

module.exports = userModel;