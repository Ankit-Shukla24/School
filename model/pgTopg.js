
const mongoose = require("mongoose");
const obj = {
    admission:"",
    passing:""
}

const obj_img ={}

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

const pgTopgschema = new mongoose.Schema({

    sr:{
type:String,
default:'PG'
    },

    image:{
        type:img,
        default:obj_img
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
        type:String,
        default:""
    },
    dob_in_word:{
        type:String,
        trim:true,
        default:"",
        uppercase:true
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
        uppercase:true,
        default:""
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
    pg:{
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

pgTopgschema.index({sr_no:-1});

const pgTopg = mongoose.model('pgTopg',pgTopgschema);
module.exports = pgTopg;