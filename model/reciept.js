const mongoose = require('mongoose')

const Schema = mongoose.Schema

const comapany = new Schema({
    companyId:{
        required:true,
        type:String,
    },
    date:{
        required:true,
        type:String,
    },
    customerName:{
        required:true,
        type:String,
    },
    customerPhone:{
        required:true,
        type:String,
    },
    items:{
        required:true,
        type:[],
    },
    TotalpriceText:{
        required:true,
        type:String,
    },
    Totalpricenumber:{
        required:true,
        type:Number
    }
})

module.exports = mongoose.model('reciepts',comapany)