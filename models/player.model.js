const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    team:String,
    position:String,
    image:{
        data:Buffer,
        contentType:String
    }
})

const Player = mongoose.model('Player',playerSchema)

module.exports = Player