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
}, {
  strict: true
})

const userModel = mongoose.model('user', UserSchema);

module.exports = userModel;