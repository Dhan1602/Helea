const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatMessages = new Schema({
    idHeleo: String,
    categorysChats: [{
        category: String,
        messages: [{
            userName: String,
            message: String,
            fecha: {
                fullDate: String,
                hora: String
            }
        }]
    }]
});

module.exports = mongoose.model( "ChatMessages" , chatMessages);