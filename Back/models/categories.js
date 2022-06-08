const mongoose = require("mongoose");
const Schema = mongoose.Schema

<<<<<<< HEAD
let collection = new Schema({
=======
const collection = new Schema({
>>>>>>> main
    name: "String",
    background: "String",
    basicName: "String"
})

module.exports = mongoose.model( "Categorias" , collection);