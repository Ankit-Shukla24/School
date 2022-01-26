
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


const obj = {
    admission:"",
    passing:""
}

const passdatesschema = new mongoose.Schema({

    admission:{
        type:String,
        default:""
    },
    passing:{
        type:String,
        default:""
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
        default:""
    },
    dob:{
        type:String,
        default:""
    },
    dob_in_word:{
        type:String,
        trim:true,
        default:""
    },
    caste:{
type:String,
trim:true,
default:""
    },
    religion:{
        type:String,
        trim:true,
        default:""
    },
    father_name:{
        type:String,
        trim:true,
        default:""
    },
    mother_name:{
        type:String,
        trim:true,
        default:""
    },
    address:{
        type:String,
        trim:true,
        default:""
    },
    occupation:{
        type:String,
        trim:true,
        default:""
    },
    six:{
        type:passdatesschema,
        default:obj
    },
    seven:{
        type:passdatesschema,
        default:obj
    },
    eight:{
        type:passdatesschema,
        default:obj
    },
    last_class:{
        type:String,
        trim:true,
        default:""
    },
    leave_date:{
        type:String,
        default:""
    },
    leave_reason:{
        type:String,
        trim:true,
        default:""
    },
    remark:{
        type:String,
        trim:true,
        default:""
    },
    brother_sister:{
        type:String,
        trim:true,
        default:""
    },
    documents:[docs]
})

sixToeightschema.index({sr_no:-1});

const sixToeight = mongoose.model('sixToeight',sixToeightschema);
module.exports = sixToeight;