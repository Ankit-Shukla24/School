
const mongoose = require("mongoose");

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
        type:Date
    },
    passing:{
        type:Date
    }
})

const lkgToukgschema = new mongoose.Schema({

    sr:{
type:String,
default:'LKG TO UKG'
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
        type:Date
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
    lkg:{
        type:passdatesschema
    },
    ukg:{
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

lkgToukgschema.index({sr_no:-1});

const lkgToukg = mongoose.model('lkgToukg',lkgToukgschema);
module.exports = lkgToukg;