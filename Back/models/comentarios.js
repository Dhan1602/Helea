const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comentarios = new Schema({
    idPublicacion: String,
    messages: {
        userName: String,
        image: String,
        message: String,
        fecha: String
    }
});

module.exports = mongoose.model( "Comentarios" , comentarios);