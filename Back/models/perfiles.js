const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const perfiles = new Schema({
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
    likes: Array,
    contrasena: String
});

module.exports = mongoose.model( "Perfiles" , perfiles);