const mongoose=require("mongoose")

const urlShortenerSchema=new mongoose.Schema({
    full:{
        type: String,
        required: true
    },
    short:{
        type: String,
        required: true
    }
})

module.exports=mongoose.model('UrlSchema',urlShortenerSchema)