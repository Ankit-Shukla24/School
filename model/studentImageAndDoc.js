const mongoose = require("mongoose");

const studentImageAndDocSchema = new mongoose.Schema({

    image:{
        type:Number,
        default:0
    },
    document:{
        type:Number,
        default:0
    }

})

const studentImageAndDoc = mongoose.model("studentImageAndDoc",studentImageAndDocSchema);

module.exports = studentImageAndDoc;