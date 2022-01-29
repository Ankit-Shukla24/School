
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

const sixToeightschema = new mongoose.Schema({

    sr:{
        type:String,
        default:'6 TO 8'
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
        uppercase:true,
        default:""
    },
    dob:{
        type:Date
    },
    dob_in_word:{
        type:String,
        trim:true,
        uppercase:true,
        default:""
    },
    caste:{
type:String,
trim:true,
uppercase:true,
default:""
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
        default:""
    },
    six:{
        type:passdatesschema
    },
    seven:{
        type:passdatesschema
    },
    eight:{
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

sixToeightschema.index({sr_no:-1});

const sixToeight = mongoose.model('sixToeight',sixToeightschema);
module.exports = sixToeight;