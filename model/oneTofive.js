
const mongoose = require("mongoose");

const docs= new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    description:{
        type:String,
        default:""
    },
    doc_link:{
        type:String,
        default:""
    },
    doc_id:{
        type:String,
        default:""
    }
});

const obj_img={};

const img= new mongoose.Schema({
    img_link:{
        type:String,
        default:""
    },
    img_id:{
        type:String,
        default:""
    },
    name:{
        type:String,
        default:""
    }
});

const passdatesschema = new mongoose.Schema({

    admission:{
        type:Date
    },
    passing:{
        type:Date
    }
})

const oneTofiveschema = new mongoose.Schema({

    sr:{
        type:String,
        default:'1 TO 5',
        immutable:true
    },
    image:{
        type:img,
        default:obj_img
    },
    prev_sr_no:{
        type:Number,
        default:""
    },
    sr_no:{
        type:Number,
        default:""
    },
    name:
    {
        type:String,
        trim:true,
        default:"",
        uppercase:true,
    },
    dob:{
        type:Date
    },
    dob_in_word:{
        type:String,
        trim:true,
        default:"",
        uppercase:true,
    },
    caste:{
type:String,
trim:true,
default:"",
uppercase:true,
    },
    religion:{
        type:String,
        trim:true,
        default:"",
        uppercase:true,
    },
    father_name:{
        type:String,
        trim:true,
        default:"",
        uppercase:true,
    },
    mother_name:{
        type:String,
        trim:true,
        default:"",
        uppercase:true,
    },
    address:{
        type:String,
        trim:true,
        default:"",
        uppercase:true,
    },
    occupation:{
        type:String,
        trim:true,
        default:"",
        uppercase:true,
    },
   one:
   {
       type:passdatesschema
   },
   two:
   {
    type:passdatesschema
   },
   three:
   {
    type:passdatesschema
   },
   four:
   {
    type:passdatesschema
   },
   five:
   {
    type:passdatesschema
   },
    last_class:{
        type:Date
    },
    leave_date:{
        type:Date
    },
    leave_reason:{
        type:String,
        trim:true,
        default:"",
        uppercase:true,
    },
    remark:{
        type:String,
        trim:true,
        default:"",
        uppercase:true,
    },
    brother_sister:{
        type:String,
        trim:true,
        default:"",
        uppercase:true,
    },
    documents:[docs]

})

oneTofiveschema.index({sr_no:-1});

const oneTofive = mongoose.model('oneTofive',oneTofiveschema);
module.exports = oneTofive;