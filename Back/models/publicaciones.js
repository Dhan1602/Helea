const mongoose = require("mongoose");
const Schema = mongoose.Schema;

<<<<<<< HEAD
let publicaciones = new Schema({
=======
const publicaciones = new Schema({
>>>>>>> main
    titulo: String,
    descripcion: String,
    calificacion: String,
    background: String,
    categoria: String,
    fecha: String,
    autorID: String
});

module.exports = mongoose.model( "Publicaciones" , publicaciones);