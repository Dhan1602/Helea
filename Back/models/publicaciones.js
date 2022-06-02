const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var publicaciones = new Schema({
    titulo: String,
    calificacion: Number,
    background: String,
    categoria: String,
    fecha: String,
    autorID: String
});