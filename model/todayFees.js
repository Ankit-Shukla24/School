const mongoose = require("mongoose");

const todayFessSchema = new mongoose.Schema({

    year:{
        type:String,
        required:[true,'Please Enter the year']
        },
        class:{
            type:Number,
            required:[true,'Please Enter the class']
        },
        roll_no:{
            type:Number,
            required:[true,'Please Enter the roll_no']
        },
        name:{
            type:String,
            required:[true,'A student must have a name'],
          
            trim:true,
            maxlength:[40,'A tour name must be less than or equal to 40 letters']
        },
        father_name:{
            type:String,
            required:[true,'Please enter father\'s name'],
        trim:true,
            maxlength:[40,'A tour name must be less than or equal to 40 letters'],
        },
        date_of_birth:{
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
        }

});

const todayFees = mongoose.model("todayFees",todayFessSchema);

module.exports = todayFees;
