const excel = require("exceljs");
const {promisify}=require('util');
const lkgToukg = require('./model/lkgToukg');
const oneToFive = require('./model/oneTofive');
const sixToeight = require('./model/sixToeight');
const moment = require("moment");
const mongoose = require('mongoose');
const lodash = require("lodash");
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD);
  mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful!'));

const workbook = new excel.Workbook();


workbook.xlsx.readFile("./s.xlsx").then(el=>{

    el.getWorksheet("Sheet1").eachRow({includeEmpty:true},async(row,rownum)=>{

        const obj = new Object();

        const vals = row.values;

        console.log(vals);

        obj["prev_sr_no"] = vals[1];
        obj["sr_no"]=vals[2];
        obj["name"]=vals[3];

        if(vals[4])
       { obj["dob"] = (vals[4].split(" ")[0]);
       if(vals[4].split("(")[1])
        obj["dob_in_word"] = vals[4].split("(")[1].replace(")","");}
        if(vals[5])
        {obj["caste"] = vals[5].split(" ")[0];
        obj["religion"] = vals[5].split(" ")[1];}
        obj["father_name"]= vals[6];
        obj["mother_name"] = vals[7];
        obj["address"] = vals[8];
        obj["occupation"] = vals[9];
        
        const passobj = new Object();

        if(vals[10])
        {passobj["admission"] = (vals[10].split(" ")[0]);
        passobj["passing"] = (vals[10].split(" ")[1]);
        
        console.log((vals[10].split(" ")[1]));


        obj["lkg"] = lodash.cloneDeep(passobj);
    }

        if(vals[11])
        {passobj["admission"] =  vals[11].split(" ")[0];
        passobj["passing"] = vals[11].split(" ")[1];
        

        obj["ukg"] = lodash.cloneDeep(passobj);
        }
        obj["last_class"] = vals[12];
        
        if(vals[13])
        {obj["leave_date"] =  (vals[13].split(" ")[0]);
        obj["leave_reason"]  = vals[13].slice(9); }
        obj["remark"]= vals[14];
        obj["brother_sister"] = vals[15];

        console.log(obj);

        const data =await lkgToukg.create(obj);

    console.log(data);

    });

     el.getWorksheet("Sheet2").eachRow({includeEmpty:true},async(row,rownum)=>{

        const obj = new Object();

        const vals = row.values;

        console.log(vals);

        obj["prev_sr_no"] = vals[1];
        obj["sr_no"]=vals[2];
        obj["name"]=vals[3];
        
        if(vals[4])
       { obj["dob"] = (vals[4].split(" ")[0]);
       if(vals[4].split("(")[1])
        obj["dob_in_word"] = vals[4].split("(")[1].replace(")","");}
        
        if(vals[5])
 {       obj["caste"] = vals[5].split(" ")[0];
        obj["religion"] = vals[5].split(" ")[1];}
        obj["father_name"]= vals[6];
        obj["mother_name"] = vals[7];
        obj["address"] = vals[8];
        obj["occupation"] = vals[9];
        
        const passobj = new Object();

        if(vals[10])
       { 
           console.log(typeof(vals[10]));
           passobj["admission"] = (vals[10].split(" ")[0]);
        passobj["passing"] = (vals[10].split(" ")[1]);
    
        
        obj["one"] = lodash.cloneDeep(passobj);}
        if(vals[11])
       { passobj["admission"] =  vals[11].split(" ")[0];
        passobj["passing"] = vals[11].split(" ")[1];
        
console.log(passobj);
        obj["two"] = lodash.cloneDeep(passobj);}
        if(vals[12])
   {     passobj["admission"] = (vals[12].split(" ")[0]);
        passobj["passing"] = (vals[12].split(" ")[1]);
        

        obj["three"] = lodash.cloneDeep(passobj);}
        if(vals[13])
   {     passobj["admission"] =  (vals[13].split(" ")[0]);
        passobj["passing"] = (vals[13].split(" ")[1]);


        obj["four"] = lodash.cloneDeep(passobj);}
        
        if(vals[14])

  {  
          passobj["admission"] = (vals[14].split(" ")[0]);
        passobj["passing"] = (vals[14].split(" ")[1]);
        

        obj["five"] = lodash.cloneDeep(passobj);}

        obj["last_class"] = (vals[15]);
        if(vals[16])
       { obj["leave_date"] =  (vals[16].split(" ")[0]);
        obj["leave_reason"]  = vals[16].slice(10); 
      }
        obj["remark"]= vals[17];
        obj["brother_sister"] = vals[18];

        const data =await oneToFive.create(obj);

        const ct = await oneToFive.count();

        console.log(ct);

    console.log(data);

    });

    el.getWorksheet("Sheet3").eachRow({includeEmpty:true},async(row,rownum)=>{

        const obj = new Object();

        const vals = row.values;

        console.log(vals);

        obj["prev_sr_no"] = vals[1];
        obj["sr_no"]=vals[2];
        obj["name"]=vals[3];
        
        if(vals[4])
       { obj["dob"] = (vals[4].split(" ")[0]);
       if(vals[4].split("(")[1])
        obj["dob_in_word"] = vals[4].split("(")[1].replace(")","");
    }
        
        if(vals[5])
 {       obj["caste"] = vals[5].split(" ")[0];
        obj["religion"] = vals[5].split(" ")[1];}
        obj["father_name"]= vals[6];
        obj["mother_name"] = vals[7];
        obj["address"] = vals[8];
        obj["occupation"] = vals[9];
        
        const passobj = new Object();

        if(vals[10])
       { passobj["admission"] = (vals[10].split(" ")[0]);
        passobj["passing"] = (vals[10].split(" ")[1]);
        

        obj["six"] = lodash.cloneDeep(passobj);}
        if(vals[11])
       { passobj["admission"] =  vals[11].split(" ")[0];
        passobj["passing"] = vals[11].split(" ")[1];
        obj["seven"] = lodash.cloneDeep(passobj);}
        if(vals[12])
   {     passobj["admission"] = (vals[12].split(" ")[0]);
        passobj["passing"] = (vals[12].split(" ")[1]);
        

        obj["eight"] = lodash.cloneDeep(passobj);}
     
        obj["last_class"] = (vals[13]);
        if(vals[14])
       { obj["leave_date"] =  (vals[14].split(" ")[0]);
        obj["leave_reason"]  = vals[14].slice(10); }
        obj["remark"]= vals[15];
        obj["brother_sister"] = vals[16];

        const data =await sixToeight.create(obj);

    console.log(data);

    });

    
//     el.getWorksheet("Sheet4").eachRow({includeEmpty:true},async(row,rownum)=>{

//         const obj = new Object();

//         const vals = row.values;

//         console.log(vals);

//         obj["prev_sr_no"] = vals[1];
//         obj["sr_no"]=vals[2];
//         obj["name"]=vals[3];
        
//         if(vals[4])
//        { obj["dob"] = (vals[4].split(" ")[0]);
//         obj["dob_in_word"] = vals[4].split("(")[1].replace(")","");
//     }
        
//         if(vals[5])
//  {       obj["caste"] = vals[5].split(" ")[0];
//         obj["religion"] = vals[5].split(" ")[1];}
//         obj["father_name"]= vals[6];
//         obj["mother_name"] = vals[7];
//         obj["address"] = vals[8];
//         obj["occupation"] = vals[9];
        
//         const passobj = new Object();

//         if(vals[10])
//        { passobj["admission"] = (vals[10].split(" ")[0]);
//         passobj["passing"] = (vals[10].split(" ")[1]);
        

//         obj["pg"] = lodash.cloneDeep(passobj);}
    
     
//         obj["last_class"] = (vals[11]);
//         if(vals[12])
//        { obj["leave_date"] =  (vals[12].split(" ")[0]);
//         obj["leave_reason"]  = vals[12].slice(10); }
//         obj["remark"]= vals[13];
//         obj["brother_sister"] = vals[13];

//         const data =await pg.create(obj);

//     console.log(data);

//     });

})
