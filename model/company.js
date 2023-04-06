const mongoose = require('mongoose')

const Schema = mongoose.Schema

const comapany = new Schema({
    Username:{
        required:true,
        type:String,
        unique:true
    },
    Password:{
        required:true,
        type:String
    }
})

module.exports = mongoose.model('company',comapany)