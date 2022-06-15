const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publicaciones = new Schema({
    titulo: String,
    tituloC: String,
    descripcion: String,
    calificacion: {
      cantidad:Number,
      total:Number,
      promedio:Number,
      personCalifi: []
    },
    background: String,
    categoria: String,
    fecha: String,
    autor: String,
    autorId: String
});

module.exports = mongoose.model( "Publicaciones" , publicaciones);