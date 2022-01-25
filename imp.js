const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const mongoose = require('mongoose');
const Student = require('./model/student');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const DB = process.env.DATABASE;
  
  mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful!'));

const studentData = JSON.parse(fs.readFileSync('dataStudent.json','utf-8'));

const importData= async()=>{
    try{
        await Student.create(studentData);
    }
    catch(err)
    {
// console.log(err);
    }
    process.exit();
}

const deleteData= async()=>{
    try{
        await Student.deleteMany();
        }
    catch(err)
    {
// console.log(err);
    }
    process.exit();
}

if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }