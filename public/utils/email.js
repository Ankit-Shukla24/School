const nodemailer = require("nodemailer");

const dotenv = require('dotenv');

dotenv.config({ path: "./config.env"});

let transporter = nodemailer.createTransport({
   host:process.env.EMAIL_SERVER,
   port:process.env.EMAIL_PORT,
   secure:false,
   auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
})

console.log(process.env.EMAIL_PASSWORD);

var mailOptions = {
    
    to: 'ankitshukla459@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
