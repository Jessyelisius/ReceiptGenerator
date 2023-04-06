const mongoose = require('mongoose')

const Schema = mongoose.Schema

const comapanyDet = new Schema({
    companyID:{
        required:true,
        type:String,
        unique:true
    },
    Email:{
        required:true,
        type:String,
        unique:true
    },
    About:{
        required:true,
        type:String
    },
    phoneNo:{
        type:String
    },
    url:{
        type:String
    },
    address:{
        type:String
    },
    image:{
        type:String,
        required:true
    },
    publicId:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('companyDetails',comapanyDet)