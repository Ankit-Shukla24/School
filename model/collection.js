const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({

    date:{
type:Date
    },
amount:{
    type:Number
} 
});

collectionSchema.index({date:-1});

const collectionData = mongoose.model("collectionData",collectionSchema) ;

module.exports = collectionData;