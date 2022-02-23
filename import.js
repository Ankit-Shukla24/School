const excel = require("exceljs");
const mongoose = require('mongoose');
const moment = require("moment");
const dotenv = require('dotenv');
const students = require("./model/student");
dotenv.config({ path: 'config.env' });

const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD);
  mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful!'));

const workbook = new excel.Workbook();


workbook.xlsx.readFile("./students.xlsx").then(el=>{

    el.getWorksheet("student").eachRow({includeEmpty:true},async (row,rownum)=>{

        const obj = new Object();

        const vals = row.values;

        console.log(vals);

        obj["sr_no"] = vals[2];
        obj["roll_no"]=vals[3];
        obj["name"] = vals[4]?.split("/")[0];
 obj["father_name"]= vals[4]?.split("/")[1];
    obj["year"] = vals[1];

    const monthName = ['april','may','june','july','august','september','october','november','december','january','february','march'];

    let ct =5;

    for(const months of monthName)
    {
        
        if(vals[ct])
        {if(vals[ct]?.length <10 )
       {
    //    console.log(vals[ct]);
        obj[months]= moment(vals[ct++],"MM-DD-YY").format("L")+'Z';}
else
obj[months]= moment(vals[ct++],"YYYY-MM-DD").format("L")+'Z';

console.log(obj[months]);}
    
    else ct++
       }


    obj["class"]=vals[ct++];
       obj["class_code"] = vals[ct]
const new_student = await students.create(obj);

// console.log(new_student);

});
}
);