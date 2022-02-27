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

// const workbook = new excel.Workbook();


// workbook.xlsx.readFile("./students.xlsx").then(el=>{

//     el.getWorksheet("student").eachRow({includeEmpty:true},async (row,rownum)=>{

//         const obj = new Object();

//         const vals = row.values;

//         console.log(vals);

//         obj["year"] = vals[1];
//         obj["roll_no"]=vals[2];
//         obj["name"] = vals[3]?.split("/")[0];
//  obj["father_name"]= "MR. "+vals[3]?.split("/")[1];

//     const monthName = ['april','may','june','july','august','september','october','november','december','january','february','march'];
//     const classList = ["PG",'LKG','UKG','1st','2nd','3rd','4th','5th','6th','7th','8th'];
//     let ct =4;

//     for(const months of monthName)
//     {
        
//         if(vals[ct])
//         {if(vals[ct]?.length <10 )
//        {
//     //    console.log(vals[ct]);
//         obj[months]= moment(vals[ct++].replaceAll(".","-"),"DD-MM-YY").format("L")+'Z';}
// else
// obj[months]= moment(vals[ct++],"MM-DD-YYYY").format("L")+'Z';

// console.log(obj[months]);
// }
    
//     else ct++
//        }


       
//        obj["gender"] = vals[ct++];
//        obj["religion"] = vals[ct++];
//        obj["category"] = vals[ct++];
//        obj["dob"] = moment(vals[ct++],"DD-MM-YYYY").format("L")+'Z';
//        obj["class_code"] = vals[ct++];
//     obj["class"]=classList[obj["class_code"]];
       
// const new_student = await students.create(obj);

// // console.log(new_student);

// });
// }
// );
const rep = async()=>{
const data =await students.find({});

    for(const el of data)
    {
        let name = el.father_name.replace(/\s+/g, " ");
        if(name[3]!==" ")
        name = "MR. "+name.split(".")[1];
       const temp = await students.findByIdAndUpdate(el.id,{father_name:name},{
           new:true
       });
       

       console.log(name);

    }
}

rep();

console.log("==");