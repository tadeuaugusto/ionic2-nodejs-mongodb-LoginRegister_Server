var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    nome: String,
    email: String,
    senha: String,
    created_at: Date
});


UsuarioSchema.pre('save', function(next) {
    var usuario = this;
    var currentDate = new Date();
    
    // se username nao exister.. grava
    if (!usuario) {
        usuario.created_at = currentDate;
    }
    next();
});


var Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;