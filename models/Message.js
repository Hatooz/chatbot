const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    nick: String,
    text: String,
    time: String
})


module.exports =  mongoose.model('Messages', messageSchema)
