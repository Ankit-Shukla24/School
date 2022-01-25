const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({

    date:{
        type:Date
    },
    description:
    {
type:String,
    },
    type:{
type:String,
    },
    name:{
        type:String
    }
})

const documents = mongoose.model('documents',documentSchema);

module.exports = documents;