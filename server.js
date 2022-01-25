const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD);

mongoose.connect(DB).then(()=> console.log('BD Connection Successfull!'));

const port = process.env.port||3000;

const server = app.listen(port,()=>
console.log(`App is running on ${port}`));

// console.log(process.env.TODAY_MONEY);
// process.env['TODAY_MONEY'] = '100';
