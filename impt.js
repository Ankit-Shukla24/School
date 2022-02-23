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
       { 
        if(moment(vals[4].split(" ")[0],"DD-MM-YYYY").format("L")!='Invalid date')
           obj["dob"] = moment(vals[4].split(" ")[0],"DD-MM-YYYY").format("L")+'Z';
       if(vals[4].split("(")[1])
        obj["dob_in_word"] = vals[4].split("(")[1].replace(")","");}
        if(vals[5])
        {obj["caste"] = vals[5].split(" ")[0];
        obj["religion"] = vals[5].split(" ")[1];}

        if(!obj["religion"])
        {
            obj["religion"]= vals[5].split(" ")[0];
            obj["caste"]="";
        }

        console.log(obj);
        const father = new Object();

        father.name = vals[6];

        const mother = new Object();

        mother.name = vals[7];

        const address= new Object();

        address.permanent = vals[8];

        obj["father"]= father;
        obj["mother"] = mother;
        obj["address"] = address;
        obj["occupation"] = vals[9];
        
        let passobj = new Object();

        if(vals[10])
        {
            if(moment(vals[10].split(" ")[0],"DD-MM-YYYY").format("L")!='Invalid date')
            passobj["admission"] = moment(vals[10].split(" ")[0],"DD-MM-YYYY").format("L")+'Z';
            if(moment(vals[10].split(" ")[1],"DD-MM-YYYY").format("L")!='Invalid date')
            passobj["passing"] =  moment(vals[10].split(" ")[1],"DD-MM-YYYY").format("L")+'Z';
        
        // console.log((vals[10].split(" ")[1]));


        obj["lkg"] = lodash.cloneDeep(passobj);
    }

    passobj = new Object();

        if(vals[11])
        {
            
            if(moment(vals[11].split(" ")[0],"DD-MM-YYYY").format("L")!='Invalid date')
            passobj["admission"] = moment(vals[11].split(" ")[0],"DD-MM-YYYY").format("L")+'Z';
            if(moment(vals[11].split(" ")[1],"DD-MM-YYYY").format("L")!='Invalid date')
            passobj["passing"] =  moment(vals[11].split(" ")[1],"DD-MM-YYYY").format("L")+'Z';
        

        obj["ukg"] = lodash.cloneDeep(passobj);
        }

        if(moment(vals[12],"DD-MM-YYYY").format("L")!='Invalid date')
        obj["last_class"] = moment(vals[12],"DD-MM-YYYY").format("L")+'Z';
        
        if(vals[13])
        {
            if(vals[13].split(" ")[0])
            obj["leave_date"] =  moment(vals[13].split(" ")[0],"DD-MM-YYYY").format("L")+'Z';

        obj["leave_reason"]  = vals[13].slice(9); 
    
        if(moment(vals[13].split(" ")[0],"DD-MM-YYYY").format("L")+'Z'=='Invalid dateZ')
            {
              delete obj.leave_date;
                obj["leave_reason"]  = vals[13];
            }
    }
        obj["remark"]= vals[14];
        obj["brother_sister"] = vals[15];

        // console.log(obj);

        const data =await lkgToukg.create(obj);

    // // console.log(data);

    });

     el.getWorksheet("Sheet2").eachRow({includeEmpty:true},async(row,rownum)=>{

        const obj = new Object();

        const vals = row.values;

        // console.log(vals);

        obj["prev_sr_no"] = vals[1];
        obj["sr_no"]=vals[2];
        obj["name"]=vals[3];
        
        if(vals[4])
       { 
        if(moment(vals[4].split(" ")[0],"DD-MM-YYYY").format("L")!='Invalid date')
           obj["dob"] = moment(vals[4].split(" ")[0],"DD-MM-YYYY").format("L")+'Z'
       if(vals[4].split("(")[1])
        obj["dob_in_word"] = vals[4].split("(")[1].replace(")","");}
        
        if(vals[5])
 {       obj["caste"] = vals[5].split(" ")[0];
        obj["religion"] = vals[5].split(" ")[1];}
        const father = new Object();

        father.name = vals[6];

        const mother = new Object();

        mother.name = vals[7];

        const address= new Object();

        address.permanent = vals[8];

        obj["father"]= father;
        obj["mother"] = mother;
        obj["address"] = address;
        obj["occupation"] = vals[9];
        
        if(!obj["religion"])
        {
            obj["religion"]= vals[5].split(" ")[0];
            obj["caste"]="";
        }

        let passobj = new Object();

        if(vals[10])
       { 
           // console.log(typeof(vals[10]));
           if(moment(vals[10].split(" ")[0],"DD-MM-YYYY").format("L")!='Invalid date')
           passobj["admission"] = moment(vals[10].split(" ")[0],"DD-MM-YYYY").format("L")+'Z';
           if(moment(vals[10].split(" ")[1],"DD-MM-YYYY").format("L")!='Invalid date')
        passobj["passing"] =moment(vals[10].split(" ")[1],"DD-MM-YYYY").format("L")+'Z';
    
        
        obj["one"] = lodash.cloneDeep(passobj);
    }

    passobj = new Object();
        if(vals[11])


       {
        if(moment(vals[11].split(" ")[0],"DD-MM-YYYY").format("L")!='Invalid date')
        passobj["admission"] = moment(vals[11].split(" ")[0],"DD-MM-YYYY").format("L")+'Z';
        if(moment(vals[11].split(" ")[1],"DD-MM-YYYY").format("L")!='Invalid date')
     passobj["passing"] =moment(vals[11].split(" ")[1],"DD-MM-YYYY").format("L")+'Z';
        
// console.log(passobj);
        obj["two"] = lodash.cloneDeep(passobj);}

        passobj = new Object();

        if(vals[12])
   {       if(moment(vals[12].split(" ")[0],"DD-MM-YYYY").format("L")!='Invalid date')
   passobj["admission"] = moment(vals[12].split(" ")[0],"DD-MM-YYYY").format("L")+'Z';
   if(moment(vals[12].split(" ")[1],"DD-MM-YYYY").format("L")!='Invalid date')
passobj["passing"] =moment(vals[12].split(" ")[1],"DD-MM-YYYY").format("L")+'Z';
        

        obj["three"] = lodash.cloneDeep(passobj);}

        passobj = new Object();

        if(vals[13])
   {       if(moment(vals[13].split(" ")[0],"DD-MM-YYYY").format("L")!='Invalid date')
   passobj["admission"] = moment(vals[13].split(" ")[0],"DD-MM-YYYY").format("L")+'Z';
   if(moment(vals[13].split(" ")[1],"DD-MM-YYYY").format("L")!='Invalid date')
passobj["passing"] =moment(vals[13].split(" ")[1],"DD-MM-YYYY").format("L")+'Z';


        obj["four"] = lodash.cloneDeep(passobj);}
        
        passobj = new Object();

        if(vals[14])

  {  
    if(moment(vals[14].split(" ")[0],"DD-MM-YYYY").format("L")!='Invalid date')
    passobj["admission"] = moment(vals[14].split(" ")[0],"DD-MM-YYYY").format("L")+'Z';
    if(moment(vals[14].split(" ")[1],"DD-MM-YYYY").format("L")!='Invalid date')
 passobj["passing"] =moment(vals[14].split(" ")[1],"DD-MM-YYYY").format("L")+'Z';
        

        obj["five"] = lodash.cloneDeep(passobj);}
        if(moment(vals[15],"DD-MM-YYYY").format("L")!='Invalid date')
        obj["last_class"] = moment(vals[15],"DD-MM-YYYY").format("L")+'Z';
        if(vals[16])
       { 
           obj["leave_date"] =  moment(vals[16].split(" ")[0],"DD-MM-YYYY").format("L")+'Z';
        obj["leave_reason"]  = vals[16].slice(10); 
     
        if(moment(vals[16].split(" ")[0],"DD-MM-YYYY").format("L")+'Z'=='Invalid dateZ')
        {
          delete obj.leave_date;
            
          obj["leave_reason"]  = vals[16]; 
    }

     obj["leave_reason"]  = vals[16];
      }

        obj["remark"]= vals[17];
        obj["brother_sister"] = vals[18];

        const data =await oneToFive.create(obj);

        // console.log(ct);

    // console.log(data);

    });

    el.getWorksheet("Sheet3").eachRow({includeEmpty:true},async(row,rownum)=>{

        const obj = new Object();

        const vals = row.values;

        // console.log(vals);

        obj["prev_sr_no"] = vals[1];
        obj["sr_no"]=vals[2];
        obj["name"]=vals[3];
        
        if(vals[4])
       { 
        if(moment(vals[4].split(" ")[0],"DD-MM-YYYY").format("L")!='Invalid date')
           obj["dob"] = moment(vals[4].split(" ")[0],"DD-MM-YYYY").format("L")+'Z';
       if(vals[4].split("(")[1])
        obj["dob_in_word"] = vals[4].split("(")[1].replace(")","");
    }
        
        if(vals[5])
 {       obj["caste"] = vals[5].split(" ")[0];
        obj["religion"] = vals[5].split(" ")[1];}

        if(!obj["religion"])
        {
            obj["religion"]= vals[5].split(" ")[0];
            obj["caste"]="";
        }

        console.log(obj);
        const father = new Object();

        father.name = vals[6];

        const mother = new Object();

        mother.name = vals[7];

        const address= new Object();

        address.permanent = vals[8];

        obj["father"]= father;
        obj["mother"] = mother;
        obj["address"] = address;
        obj["occupation"] = vals[9];
        
        let passobj = new Object();

        if(vals[10])

       {
        if(moment(vals[10].split(" ")[0],"DD-MM-YYYY").format("L")!='Invalid date')
           passobj["admission"] = moment(vals[10].split(" ")[0],"DD-MM-YYYY").format("L")+'Z';
           if(moment(vals[10].split(" ")[1],"DD-MM-YYYY").format("L")!='Invalid date')
        passobj["passing"] =moment(vals[10].split(" ")[1],"DD-MM-YYYY").format("L")+'Z';
        

        obj["six"] = lodash.cloneDeep(passobj);}

        passobj = new Object();

        if(vals[11])
       {   if(moment(vals[11].split(" ")[0],"DD-MM-YYYY").format("L")!='Invalid date')
       passobj["admission"] = moment(vals[11].split(" ")[0],"DD-MM-YYYY").format("L")+'Z';
       if(moment(vals[11].split(" ")[1],"DD-MM-YYYY").format("L")!='Invalid date')
    passobj["passing"] =moment(vals[11].split(" ")[1],"DD-MM-YYYY").format("L")+'Z';
        obj["seven"] = lodash.cloneDeep(passobj);}
        
        passobj = new Object();

        if(vals[12])
   {       if(moment(vals[12].split(" ")[0],"DD-MM-YYYY").format("L")!='Invalid date')
   passobj["admission"] = moment(vals[12].split(" ")[0],"DD-MM-YYYY").format("L")+'Z';
   if(moment(vals[12].split(" ")[1],"DD-MM-YYYY").format("L")!='Invalid date')
passobj["passing"] =moment(vals[12].split(" ")[1],"DD-MM-YYYY").format("L")+'Z';
        

        obj["eight"] = lodash.cloneDeep(passobj);
    }
     
    if(moment(vals[13],"DD-MM-YYYY").format("L")!='Invalid date')
    obj["last_class"] = moment(vals[13],"DD-MM-YYYY").format("L")+'Z';
    if(vals[14])
   { 
       obj["leave_date"] =  moment(vals[14].split(" ")[0],"DD-MM-YYYY").format("L")+'Z';
    obj["leave_reason"]  = vals[14].slice(10); 
 
    if(moment(vals[14].split(" ")[0],"DD-MM-YYYY").format("L")+'Z'=='Invalid dateZ')
    {
      delete obj.leave_date;
        
      obj["leave_reason"]  = vals[14]; 
}
   }
        obj["remark"]= vals[15];
        obj["brother_sister"] = vals[16];

        const data =await sixToeight.create(obj);

    // console.log(data);

    });

    
//     el.getWorksheet("Sheet4").eachRow({includeEmpty:true},async(row,rownum)=>{

//         const obj = new Object();

//         const vals = row.values;

//         // console.log(vals);

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
        
//         let passobj = new Object();

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

//     // console.log(data);

//     });


})
