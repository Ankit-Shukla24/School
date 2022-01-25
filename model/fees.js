const mongoose = require("mongoose");

const feesSchema = new mongoose.Schema({
    
    pg:{
        type:Number,
        default:0
    },

    lkg:{
type:Number,
default:0
    },
    ukg:{
        type:Number,
        default:0
    },
    one:
    {
        type:Number,
        default:0
    },
two:{
    type:Number,
    default:0
},
three:{
    type:Number,
    default:0
},
four:{
    type:Number,
    default:0
},
five:{
    type:Number,
    default:0
},
six:{
    type:Number,
    default:0
},
seven:{
    type:Number,
    default:0
},
eight:{
    type:Number,
    default:0
}
});

const fees = mongoose.model('fees',feesSchema);

module.exports = fees;