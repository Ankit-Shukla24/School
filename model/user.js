const mongoose=require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema =new mongoose.Schema({

    username:{
        type:String,
        required:[true,"Please enter a name"]
    },

    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        immutable:true
    },

    email:{
        type:String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },

        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
            select: false
          },
          passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
              // This only works on CREATE and SAVE!!!
              validator: function(el) {
                return el === this.password;
              },
              message: 'Passwords are not the same!'
            },
          },
          passwordChangedAt: Date,
          passwordResetToken: String,
          passwordResetExpires: Date,
          active: {
            type: Boolean,
            default: true,
            select: false
          }

});

userSchema.methods.correctPassword = async function(candidatePassword,userPassword)
{
  return await bcrypt.compare(candidatePassword,userPassword);
};

userSchema.pre('save',async function(next){

  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password,12);
  
  this.passwordConfirm = undefined;
  next();

});

const User = mongoose.model("User",userSchema);

module.exports=User;