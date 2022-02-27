const excel = require("exceljs");
const Students = require('./../model/student');
const feesToday=require("./../model/todayFees");
const lodash = require("lodash");
const fees = require("./../model/fees");
const lkgToukg = require('./../model/lkgToukg');
const pgTopg = require('./../model/pgTopg');
const oneToFive = require('./../model/oneTofive');
const sixToeight = require('./../model/sixToeight');
const { find, create } = require("lodash");


exports.getAll = async (req,res,next)=>{

  try{const data =  await Students.find({}).sort("year,class,roll_no");

   res.status(200).json({
       status:"success",
       data:{
           data
       }
   })}
   catch(err){
// return next(err);
   }
}

exports.getOne = async (req,res,next)=>{
    try{
        const data =  await Students.find({_id:req.params.id});
  
     res.status(200).json({
         status:"success",
         data:{
             data
         }
     })}
     catch(err){
  // return next(err);
     }
  }

exports.updateStudent = async(req,res,next)=>{

    const UpdatedStudent = await Students.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true
    });

    // console.log(req.body);

    res.status(200).json({
        status: 'success',
        data: {
          user: UpdatedStudent
        }
      });
}

exports.addStudent = async (req,res,next) =>{

    // console.log(req.body);
try{
    const data =await Students.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
          user: data
        }
      });}
      catch(err)
      {
        return next(err);
      }
};

exports.feesStudent = async (req,res,next)=>{

    const data = await feesToday.create(req.body);

    console.log(data);

    res.status(201).json({
        data
    })
}

exports.delFeesStudent= async (req,res,next)=>{

    let dateNow = new Date().toLocaleString().split(",")[0];
        dateNow+='Z';

        const data = await feesToday.findOneAndDelete(req.body);

        // console.log(data);
        
        if(data)
        res.status(201).json({
            data
        });

        else
        res.status(404).json({
            data
        })
}

exports.searchFeesDate = async (req,res,next)=>{

    // // // console.log(req.body);

    // console.log(req.body[0],"**************");

    const options =req.body.params;

    const minm_class = options[options.length-1].minm;
    const maxm_class = options[options.length-1].maxm;

    const minm_date= options[options.length-2].start_date;
    const maxm_date= options[options.length-2].end_date;

    // console.log(minm_class,maxm_class);

    const records = [];
    
    options.pop();
    options.pop();
    
    if(options[0].class!==undefined)
    {const data = feesToday.find({class_code:{$gte:minm_class,$lte:maxm_class},date:{$gte:minm_date,$lte:maxm_date}}).sort({class_code:1,date:1});

    for(let i=minm_class;i<=maxm_class;i++)
    {
        let data1 = data.clone();
        data1 = await data1.find({class_code:i});

        
        let record = new Object;

        record = lodash.cloneDeep(options[i-minm_class]);
// console.log(record.data);
        for(const el of data1)
        {
            record.total = record.total*1+el.fees*1;
            {
                record.data.push(el);
            }
        }
        records.push(record);
    }
// // console.log(records);
}

else{

   const {minm,maxm,session} = {...options.pop()};

   // console.log(minm_date,maxm_date);

   const data = feesToday.find({class_code:{$gte:minm_class,$lte:maxm_class},date:{$gte:minm_date,$lte:maxm_date}}).sort({date:1,class_code:1});

    // const month_list =[ "April", "May", "June", "July", "August", "September", "October", "November", "December","January", "February", "March" ];

    for(let i=minm;i<=maxm;i++)
    {
        let data1 = data.clone();
        
        let curr = i;

        let end_session = session;

        
        if(i>=10)
        { end_session=end_session*1+1;
            curr = curr*1-12;
        }

        
        const date_start = new Date(end_session,curr*1+2,1);
        const date_end = new Date(end_session,curr*1+3,0);
        
        // console.log(date_start,date_end,session,end_session);
        data1 = await data1.find({date:{$gte:date_start,$lte:date_end}});

        let record = new Object;

        record = lodash.cloneDeep(options[i-minm]);
// console.log(record.data);
        for(const el of data1)
        {
            record.total = record.total*1+el.fees*1;

            {
                record.data.push(el);
            }
        }
        records.push(record);
    }
// console.log(records);

}

res.status(201).json({
    data:records
})
}

exports.updateSr= async (req,res,next)=>{

    let data;
    let sr;
//     console.log(req.body);

// console.log(sr);
// console.log(req.body);

    if(req.body.sr==="pg")
    data = await pgTopg.findByIdAndUpdate(req.params.id2,req.body,{
       new:true
   });

    else if(req.body.sr==="LKG TO UKG")
     data = await lkgToukg.findByIdAndUpdate(req.params.id2,req.body,{
        new:true
    });

    else if(req.body.sr==="1 TO 5")
     data = await oneToFive.findByIdAndUpdate(req.params.id2,req.body,{
        new:true
    });

    else if(req.body.sr==="6 TO 8")
     data = await sixToeight.findByIdAndUpdate(req.params.id2,req.body,{
        new:true
    });
  

    console.log(data);

    res.status(201).json({
        data
    })
}

exports.setFees = async (req,res,next)=>{

    const data = await fees.create(req.body);

    res.status(201).json({
        data
    });
}

exports.addSr = async(req,res,next)=>{

    let data;

    if(req.body.sr==="PG")
    {
        const count =await pgTopg.count();

        req.body.sr_no=count*1+1;

       data = await pgTopg.create(req.body);
    }
    else if(req.body.sr==="LKG TO UKG")
    {
        const count = await lkgToukg.count();

        req.body.sr_no=count*1+1;

       data = await lkgToukg.create(req.body);
    }
    else if(req.body.sr==="1 TO 5")
    {
        const count = await oneToFive.count();

        req.body.sr_no=count*1+1;

       data = await oneToFive.create(req.body);
    }
    else  if(req.body.sr==="6 TO 8")
    {
        const count =await sixToeight.count();

        req.body.sr_no=count*1+1;

       data = await sixToeight.create(req.body);
    }

    res.status(201).json({
        data
    })
}

exports.srDelete=async(req,res,next)=>{


    if(req.params.id1==="PG")
    await pgTopg.findByIdAndDelete(req.params.id2);

    if(req.params.id1==="LKG TO UKG")
    await lkgToukg.findByIdAndDelete(req.params.id2);

    if(req.params.id1==="1 TO 5")
    await oneToFive.findByIdAndDelete(req.params.id2);

    if(req.params.id1==="6 TO 8")
    await sixToeight.findByIdAndDelete(req.params.id2);

    res.status(201).json({
        status:"success"
    });

}

exports.promoteStudent = async (req,res,next)=>{

    // console.log(req.params);

    let data;
    
    if(req.params.id1==="PG")
    {

        if(req.params.id2==="pg")
        {
            data = await pgTopg.find({"pg.passing":{$eq:""},"pg.admission":{$ne:""},leave_date:{$eq:""},leave_reason:{$eq:""}});

            // console.log(data);

            for(let el of data)
            {
                el.leave_date = req.params.id4;
                el.leave_reason = req.params.id3;
                el.pg.passing = req.params.id4;
                
                if(el.last_class==="")
                el.last_class=req.params.id4;

                const up = await pgTopg.findByIdAndUpdate(el.id,el,{
                    new:true
                });

                el=el.toObject();

                const objs = new Object();

                objs["passing"] ="";
                objs["admission"] =  req.params.id5;

                el["lkg"] =objs;
                el.prev_sr_no = el.sr;
delete el._id
delete el.sr
delete el.last_class
delete el.leave_reason
delete el.leave_date;

// console.log(el);

el.sr_no = await lkgToukg.count()*1;
el.sr_no = el.sr_no*1+1;
el.new =true;
const promotion = await lkgToukg.create(el);

console.log(promotion);

            }
        }
    }
    
    
    
    if(req.params.id1==="LKG TO UKG")
    {
        if(req.params.id2==="lkg")
      {  data = await lkgToukg.find({"lkg.admission":{$ne:""},"lkg.passing":{$eq:""},leave_date:{$eq:""},leave_reason:{$eq:""}});

        for(const el of data)
        {

            if(el.new===true)
               {
el.new = false;
await lkgToukg.findByIdAndUpdate(el.id,el,{
    new:true
})
continue;
               }
            el.lkg.passing = req.params.id4;
            const obj = new Object;

            obj.admission = req.params.id5;

          el["ukg"] = obj;


            const up = await lkgToukg.findByIdAndUpdate(el.id,el,{
                new:true
            })
        }}

        if(req.params.id2==="ukg")
        {
            data = await lkgToukg.find({"ukg.passing":{$eq:""},"ukg.admission":{$ne:""},leave_date:{$eq:""},leave_reason:{$eq:""}});

            // console.log(data);

            for(let el of data)
            {
                el.leave_date = req.params.id4;
                el.leave_reason = req.params.id3;
                el.ukg.passing = req.params.id4;
                
                if(el.last_class==="")
                el.last_class=req.params.id4;

                const up = await lkgToukg.findByIdAndUpdate(el.id,el,{
                    new:true
                });

                el=el.toObject();

                const objs = new Object();

                objs["passing"] ="";
                objs["admission"] =  req.params.id5;

                el["one"] =objs;
                el.prev_sr_no = el.sr;
delete el._id
delete el.sr
delete el.last_class
delete el.leave_reason
delete el.leave_date;

// // console.log(el);

el.sr_no = await oneToFive.count()*1;
el.sr_no = el.sr_no*1+1;
el.new = true;
const promotion = await oneToFive.create(el);

// console.log(promotion);

            }
        }
    }

    if(req.params.id1==="1 TO 5")
    {
        if(req.params.id2==="one")
        {  data = await oneToFive.find({"one.admission":{$ne:""},"one.passing":{$eq:""},leave_date:{$eq:""},leave_reason:{$eq:""}});
        // console.log(data);
          for(const el of data)
          {

            if(el.new===true)
            {
el.new = false;
await oneToFive.findByIdAndUpdate(el.id,el,{
 new:true
})
continue;
            }

              el.one.passing = req.params.id4;
              
              const obj = new Object;

              obj.admission = req.params.id5;
  
            el["two"] = obj;
            el.new = true;
              const up = await oneToFive.findByIdAndUpdate(el.id,el,{
                  new:true
              })
          }}
          if(req.params.id2==="two")
          {  data = await oneToFive.find({"two.admission":{$ne:""},"two.passing":{$eq:""},leave_date:{$eq:""},leave_reason:{$eq:""}});
    
            for(const el of data)
            {

                if(el.new===true)
                {
 el.new = false;
 await oneToFive.findByIdAndUpdate(el.id,el,{
     new:true
 })
 continue;
                }
  
                el.two.passing = req.params.id4;

                const obj = new Object;

                obj.admission = req.params.id5;
    
                el["three"] = obj;
                el.new = true;
                const up = await oneToFive.findByIdAndUpdate(el.id,el,{
                    new:true
                })
            }}
            if(req.params.id2==="three")
        {  data = await oneToFive.find({"three.admission":{$ne:""},"three.passing":{$eq:""},leave_date:{$eq:""},leave_reason:{$eq:""}});
  
          for(const el of data)
          {
            if(el.new===true)
            {
el.new = false;
await oneToFive.findByIdAndUpdate(el.id,el,{
 new:true
})
continue;
            }

              el.three.passing = req.params.id4;
              const obj = new Object;

              obj.admission = req.params.id5;
  
              el["four"] = obj;
                el.new = true;
              const up = await oneToFive.findByIdAndUpdate(el.id,el,{
                  new:true
              })
          }}
          if(req.params.id2==="four")
        {  data = await oneToFive.find({"four.admission":{$ne:""},"four.passing":{$eq:""},leave_date:{$eq:""},leave_reason:{$eq:""}});
  
          for(const el of data)
          {
            if(el.new===true)
            {
el.new = false;
await oneToFive.findByIdAndUpdate(el.id,el,{
 new:true
})
continue;
            }

              el.four.passing = req.params.id4;
              const obj = new Object;

              obj.admission = req.params.id5;
  
              el["five"] = obj;
  el.new =true;
              const up = await oneToFive.findByIdAndUpdate(el.id,el,{
                  new:true
              })
          }}

          if(req.params.id2==="five")
        {  data = await oneToFive.find({"five.admission":{$ne:""},"five.passing":{$eq:""},leave_date:{$eq:""},leave_reason:{$eq:""}});
  
        for(let el of data)
        {
            if(el.new===true)
            {
el.new = false;
await oneToFive.findByIdAndUpdate(el.id,el,{
 new:true
})
continue;
            }

            el.leave_date = req.params.id4;
            el.leave_reason = req.params.id3;
            el.five.passing = req.params.id4;
            
            if(el.last_class==="")
            el.last_class=req.params.id4;

            const up = await oneToFive.findByIdAndUpdate(el.id,el,{
                new:true
            });

            el=el.toObject();

            const objs = new Object();

            objs["passing"] ="";
            objs["admission"] =  req.params.id5;

            el["six"] =objs;


el.prev_sr_no = el.sr;
 delete el._id
delete el.sr
delete el.last_class
delete el.leave_reason
delete el.leave_date;

// console.log(el);

el.sr_no = await sixToeight.count()*1;
el.sr_no = el.sr_no*1+1;
el.new = true;
const promotion = await sixToeight.create(el);

// console.log(promotion);

        }
        }
        }
    

    if(req.params.id1==="6 TO 8")
    {
        if(req.params.id2==="six")
        {  data = await sixToeight.find({"six.admission":{$ne:""},"six.passing":{$eq:""},leave_date:{$eq:""},leave_reason:{$eq:""}});
  
          for(const el of data)
          {

            if(el.new===true)
            {
el.new = false;
await sixToeight.findByIdAndUpdate(el.id,el,{
 new:true
})
continue;
            }

              el.six.passing = req.params.id4;
              const obj = new Object;

              obj.admission = req.params.id5;
  
              el["seven"] = obj;
  el.new =true;
              const up = await sixToeight.findByIdAndUpdate(el.id,el,{
                  new:true
              })
          }}
          if(req.params.id2==="seven")
          {  data = await sixToeight.find({"seven.admission":{$ne:""},"seven.passing":{$eq:""},leave_date:{$eq:""},leave_reason:{$eq:""}});
    
            for(const el of data)
            {

                if(el.new===true)
                {
 el.new = false;
 await oneToFive.findByIdAndUpdate(el.id,el,{
     new:true
 })
 continue;
                }
  
                el.seven.passing = req.params.id4;
                const obj = new Object;

                obj.admission = req.params.id5;
    
                el["eight"] = obj;
    el.new =true;
                const up = await sixToeight.findByIdAndUpdate(el.id,el,{
                    new:true
                })
            }}
            if(req.params.id2==="eight")
            {  data = await sixToeight.find({"eight.admission":{$ne:""},"eight.passing":{$eq:""},leave_date:{$eq:""},leave_reason:{$eq:""}});
      
              for(const el of data)
              {
    
                  el.eight.passing = req.params.id4;
                  el.leave_date = req.params.id4;
                  el.leave_reason = req.params.id3;
                  
                  if(el.last_class==="")
                  el.last_class=req.params.id4;
      
                  const up = await sixToeight.findByIdAndUpdate(el.id,el,{
                      new:true
                  })
              }}
    }

    res.status(201).json({
        data
    });

}

exports.promoteStudentFees = async (req,res,next)=>{

    const data = await Students.find({year:req.params.id1,class_code:{$ne:"10"}}).sort({class_code:-1});
    const classList = ["PG",'LKG','UKG','1st','2nd','3rd','4th','5th','6th','7th','8th'];
    for(const el of data)
    {
        if(el.leave===true)
        continue;
      try{  
        const temp = toObject(el);

        const student = lodash.cloneDeep(temp);

        student["year"] = student.year*1+1;
        student["class_code"] = student.class_code*1+1;
        student["class"]= classList[student.class_code];
        // console.log(student);
        const newStudent = await Students.create(student);
      }
catch(err)
{
    // console.log(err)
    return next(err);
}
    }

    res.status(201).json({
        status:"Success"
    })

}