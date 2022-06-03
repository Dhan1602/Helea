const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var publicaciones = new Schema({
    titulo: String,
    descripcion: String,
    calificacion: String,
    background: String,
    categoria: String,
    fecha: String,
    autorID: String
});

module.exports = mongoose.model( "Publicaciones" , publicaciones);