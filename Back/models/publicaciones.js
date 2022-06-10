const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publicaciones = new Schema({
    titulo: String,
    descripcion: String,
    calificacion: {
      cantidad:Number,
      total:Number,
      promedio:Number
    },
    background: String,
    categoria: String,
    fecha: String,
    autor: String,
    autorId: String
});

module.exports = mongoose.model( "Publicaciones" , publicaciones);