const mongoose = require("mongoose");

const todayFessSchema = new mongoose.Schema({

    year:{
        type:String,
        required:[true,'Please Enter the year']
        },
        class:{
            type:String,
            required:[true,'Please Enter the class']
        },
        roll_no:{
            type:Number,
            required:[true,'Please Enter the roll_no']
        },
        name:{
            type:String,
            required:[true,'A student must have a name'],
            uppercase:true,
            trim:true,
            maxlength:[40,'A tour name must be less than or equal to 40 letters']
        },
        father_name:{
            type:String,
            uppercase:true,
            required:[true,'Please enter father\'s name'],
        trim:true,
            maxlength:[40,'A tour name must be less than or equal to 40 letters'],
        },
        dob:{
            type:Date,
            default:"null"
        },
        month:{
            type:String
        },
        fees:{
            type:Number
        },
        date:{
            type:Date
        },
        class_code:{
            type:Number
        },
        date_of:{
            type:Date
        }

});

const todayFees = mongoose.model("todayFees",todayFessSchema);

module.exports = todayFees;
