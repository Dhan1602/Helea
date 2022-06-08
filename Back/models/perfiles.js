const mongoose = require("mongoose");
const Schema = mongoose.Schema;

<<<<<<< HEAD
let perfiles = new Schema({
=======
const perfiles = new Schema({
>>>>>>> main
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