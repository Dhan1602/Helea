const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publicaciones = new Schema({
    titulo: String,
    descripcion: String,
    calificacion: String,
    background: String,
    categoria: String,
    fecha: String,
    autorID: String
});

module.exports = mongoose.model( "Publicaciones" , publicaciones);