const mongoose = require("mongoose");

const feesSchema = new mongoose.Schema({
    
    0:{
        type:Number,
        default:0
    },

    1:{
type:Number,
default:0
    },
    2:{
        type:Number,
        default:0
    },
    3:
    {
        type:Number,
        default:0
    },
4:{
    type:Number,
    default:0
},
5:{
    type:Number,
    default:0
},
6:{
    type:Number,
    default:0
},
7:{
    type:Number,
    default:0
},
8:{
    type:Number,
    default:0
},
9:{
    type:Number,
    default:0
},
10:{
    type:Number,
    default:0
}
});

const fees = mongoose.model('fees',feesSchema);

module.exports = fees;