const express = require('express');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const app = express();
const studentRouter = require("./routers/studentRouter");
const userRouter = require("./routers/userRouter");
const documentRouter = require("./routers/documentRouter");
const cookieParser = require('cookie-parser');
const viewRouter = require("./routers/viewRouter");
const collectionRouter = require("./routers/collectionRouter");
const compression = require("compression");

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
module.exports = app;