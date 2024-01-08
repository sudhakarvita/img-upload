const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
    fullname:{
       type:String,
       
    },
    imagePath:{
        type:[],
    
     },
   
},
{timestamps:true}
);

const Imgmodel = mongoose.model('img',imgSchema);

module.exports = Imgmodel