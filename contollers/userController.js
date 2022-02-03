const User = require('./../model/user');
const jwt = require('jsonwebtoken');
const {promisify}=require('util');
const crypto = require('crypto');
const AppError = require('./../public/utils/appError');

exports.signup = async (req,res,next)=>
{
    try{
        // console.log(req.body);
const newUser =await User.create({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password,
    passwordConfirm:req.body.passwordConfirm});

const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
})

const cookieOption = {
    expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
httpOnly:true,

};

cookieOption.secure=false;

res.cookie('jwt',token,cookieOption);
// console.log(req.body);
res.status(201).json({
status:"success",
token
});
res.locals.user = newUser;
    }
catch(err)
{
return next(err);
}
};

exports.login = async (req,res,next) =>{

    // console.log(req.body);

    try{

        const {email,password} = req.body;
        if(!email||!password)
{
    return next(new AppError('Not entered password or email',401));
}
 //we selected false for password so that it does not show on the output
const user = await User.findOne({email:email}).select("+password");


if(!user||!(await user.correctPassword(password,user.password)))
{
    return next(new AppError('No user was found',401));
}


const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
});

// console.log(token);

// cookieOption is a object
const cookieOption = {
    expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
httpOnly:true};

cookieOption.secure = false;

res.cookie('jwt',token,cookieOption);
// console.log(req.body);
res.status(201).json({
status:"success",
token
});
res.locals.user = user;
    }
catch(err)
{
    next(err);
}

};

exports.protect = async(req,res,next)=>{

    let token;
try
{    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer'))
    {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }

    // console.log(token);

    if(!token)
    {
        return next(new AppError("Not logged in",500));
    }
// promisify in is used to change function to a async function
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

    // console.log(decoded);

    const newUser = await User.findById(decoded.id);

    req.user = newUser;
    res.locals.user = newUser;
    next();}
    catch(err)
    {
        return next(new AppError("Not logged in",500));
    }
}



exports.isLoggedIn= async (req,res,next) =>{

    // console.log(req.cookies);

    if(req.cookies.jwt)
   try {
       const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
       const currUser = await User.findById(decoded.id);
       
       if(!currUser)
       {
           // console.log("***********");
           return next();}
       res.locals.user = currUser;
       // console.log("-------------");
       // console.log(res.locals.user);
       return next();
     } catch (err) {
       return next();
     }
next();
}

exports.logout = async(req,res,next)=>{

    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
      });
      res.status(200).json({ status: 'success' });

}

exports.restrictTo = (user)=> (req,res,next)=>{

if(!(user===res.locals.user.role))
return next(new AppError("Not allowed to view this route",500));

next();
}
