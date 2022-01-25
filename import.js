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
  
const res = excelToJson({
    sourceFile:'Book1.xlsx',
    header:{
        rows:1
    },
    columnToKey:{
        "A":"year",
        "B":"class",
        "C":"roll_no",
        "D":"name",
        "E":"father_name",
        "F":"date_of_birth","G":"january","H":"february","I":"march","J":"april","K":"may","L":"june","M":"july","N":"august","O":"september","P":"october","Q":"november",
        "R":"december"

    },
    name:''
});

try{fs.writeFileSync('dataStudent.json',JSON.stringify(res));
}
catch(err)
{
    // console.log(err);
}
process.exit();