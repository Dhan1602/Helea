const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let perfiles = new Schema({
    userName: String,
    userDescripcion: {
        type: String,
        default: null
    },
    urlImage: {
        type: String,
        default: null
    },
    email: String,
    contrasena: String
});

module.exports = mongoose.model( "Perfiles" , perfiles);