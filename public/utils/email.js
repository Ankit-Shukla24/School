const nodemailer = require("nodemailer");
const fs = require("fs");
const dotenv = require('dotenv');

dotenv.config({ path: "./config.env"});

let transporter = nodemailer.createTransport({
   host:process.env.EMAIL_SERVER,
   port:process.env.EMAIL_PORT,
   auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
})

exports.forgotEmail = (link,userMail)=>{
  
  console.log(link);

  fs.readFile("./view/forgot-password-email.html",(err,html)=>{

{
    let html_link  = html.toString();

html_link=html_link.replace("<EMAIL_LINK>",link);

var mailOptions = {
    from: 'vseckanpur@school.com',
    to: userMail,
    subject: 'Forgot Password',
    html:html_link
  };
  
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } 
  });
}});
}