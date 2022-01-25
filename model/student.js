const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

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
});

studentSchema.index({class:-1,year:-1});

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;