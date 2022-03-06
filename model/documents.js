const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({

    date:{
        type:Date
    },
    description:
    {
type:String,
uppercase:true
    },
    type:{
type:String,
uppercase:true
    },
    name:{
        type:String,
        uppercase:true
    },
    doc_link:{
        type:String
    },
    doc_id:{
        type:String
    }

})

const documents = mongoose.model('documents',documentSchema);

module.exports = documents;