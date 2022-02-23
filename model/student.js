const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    year:{
    type:Number,
    required:[true,'Please Enter the year']
    },
    sr_no:{
        type:Number,
    },
    class:{
        type:String,
        required:[true,'Please Enter the class'],
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
    },
    father_name:{
        type:String,
        required:[true,'Please enter father\'s name'],
        uppercase:true,
    trim:true,
      
    },
    january:
    {
        type:Date
    },
february:
{
    type:Date
},
march:{
    type:Date
},
april:{
    type:Date
},
may:{
    type:Date
},
june:{
    type:Date
},
july:{
    type:Date
},
august:{
    type:Date
},
september:{
    type:Date
},
october:{
    type:Date
},
november:{
    type:Date
},
december:{
    type:Date
},
class_code:{
    type:Number
},
leave:{
    type:Boolean,
    default:false,

}
});

studentSchema.index({class:-1,year:-1});

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;