
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
    },
    
});

const obj_date ={};

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
        type:Date,
        default:""
    },
    passing:{
        type:Date,
        default:""
    }
})

const addressSchema = new mongoose.Schema({

    permanent:{
        type:String,
        trim:true,
        default:"",
        uppercase:true,
    },
    local:{
        type:String,
        trim:true,
        default:"",
        uppercase:true,
    },
    work:{
        type:String,
        trim:true,
        default:"",
        uppercase:true,
    }

})

const parentSchema = new mongoose.Schema({

name:{
    type:String,
    trim:true,
    default:"",
    uppercase:true,
},
date_of_admission:{
    type:Date
},
age:{
    type:Number,
    default:""
},
qualification:{
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
    sex:{
        type:String,
        enum:["MALE","FEMALE",""],
        default:""
    },
    nationality:{
        type:String,
    trim:true,
    uppercase:true,
    default:""
    },
    class:{
        type:String,
    trim:true,
    uppercase:true,
    default:""
    },
    last_school:{
        type:String,
        trim:true,
        uppercase:true,
        default:""
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
    category:{
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
    father:{
     type:parentSchema
    },
    mother:{
     type:parentSchema
    },
    address:{
      type:addressSchema
    },
    occupation:{
        type:String,
        trim:true,
        default:""
    },
    six:{
        type:passdatesschema,
        default:obj_date
    },
    seven:{
        type:passdatesschema,
        default:obj_date
    },
    eight:{
        type:passdatesschema,
        default:obj_date
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
    documents:[docs],
    phone_number:[String],
    whatsapp_number:{
        type:String
    },
    new:{
        type:Boolean,
        default:false,
            }
})

sixToeightschema.index({sr_no:-1});

const sixToeight = mongoose.model('sixToeight',sixToeightschema);
module.exports = sixToeight;