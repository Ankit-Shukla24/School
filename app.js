const express = require('express');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const app = express();
var bodyParser = require('body-parser')
const studentRouter = require("./routers/studentRouter");
const userRouter = require("./routers/userRouter");
const documentRouter = require("./routers/documentRouter");
const cookieParser = require('cookie-parser');
const viewRouter = require("./routers/viewRouter");
const collectionRouter = require("./routers/collectionRouter");
const compression = require("compression");

app.use(bodyParser.urlencoded({
    extended: true
  }))
app.use(bodyParser.json())
app.set('view engine','pug');
app.set('views',path.join(__dirname,'view'));

app.use(compression());
app.use(express.json({limit:'100kb'}));
app.use(express.static(path.join(__dirname, 'public')));



//data sanatization 
app.use(mongoSanitize());
app.use(xss());

app.use(morgan('dev'));

app.use(hpp());
app.use(cookieParser());
app.use('/',viewRouter);
app.use('/api/v1/studentInfo',studentRouter);
app.use('/api/v1/userInfo',userRouter);
app.use('/api/v1/collectionInfo',collectionRouter);
app.use('/api/v1/documentInfo',documentRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
err.message= err.message;


  if(req.originalUrl.startsWith("/api"))
   { res.status(err.statusCode).json({
      err,
      message:err.message
      })}
      else{
        res.status(500).render('error',{
          err
        })
      }
  }
);


module.exports = app;