const Student = require("./../model/student");
const collection = require("./../model/collection");
const documents=require("./../model/documents");
const todayFees = require("./../model/todayFees");
const fees = require("./../model/fees");
const excel = require("exceljs");
const moment = require("moment");
const axios = require("axios");
const pgTopg = require('./../model/pgTopg');
const lkgToukg = require('./../model/lkgToukg');
const oneToFive = require('./../model/oneTofive');
const sixToeight = require('./../model/sixToeight');
const flatten = require("flat");
const AppError=require("./../public/utils/appError");

exports.overview = async (req,res)=>
{
res.status(201).render('overview');
};

exports.me = (req,res)=>
{
    res.status(201).render("me");
}

exports.studentInfo = async (req,res)=>
{

let dateNow = new Date().toLocaleString().split(",")[0];
dateNow+='Z';
let collectionData =await collection.findOne({date:dateNow});
// console.log(collectionData);
if(!collectionData)
{
    collectionData = new Object();
    collectionData.date = dateNow;
    collectionData.amount =0*1;

    await collection.create(collectionData);
    res.status(201).render('studentInfo',{
        collectionData
    });
}
else
res.status(201).render('studentInfo',{
    collectionData

});
};
exports.getAllStudent = async (req,res)=>
{
res.status(201).render('get-all');
};

exports.getAllStudentData= async(req,res)=>{

    let data =Student.find();

    if(req.params.id1!=="false")
    data = data.find({year:req.params.id1});
    if(req.params.id2!=="false")
    data = data.find({class:req.params.id2});

    data = await data;


    res.status(201).render('print-data',{
students:data
    });

    // console.log(data);
}

exports.getOneStudent = async (req,res) =>{

    res.status(201).render('get-one');

}

exports.getStudentData= async(req,res)=>{

    let data = Student.find();

    if(req.params.id1!=="false")
    data = data.find({year:req.params.id1});
    if(req.params.id2!=="false")
    data = data.find({class:req.params.id2});
    if(req.params.id3!=="false")
    data = data.find({name:{$regex:"^"+req.params.id3}});
    if(req.params.id4!=="false")
    data = data.find({father_name:req.params.id4});

    data = await data.sort({"roll_no":1});

    res.status(201).render('student-find',{
students:data
    });
}

exports.getOneStudentData= async(req,res)=>{

    const student = await Student.findOne({_id:req.params.id});
// console.log(student);
    res.status(201).render('one-student-data',{
    student
    });
}

exports.addStudentData = async(req,res)=>{

    res.status(200).render("studentAdd");

}

exports.uploader = async(req,res)=>{
    res.status(200).render("uploadFile");
}

exports.documentInfo = async(req,res)=>{
    res.status(200).render("documentInfo");
}

exports.downloader = async(req,res) =>{
    res.status(200).render("downloadFile");
}

exports.documentList = async(req,res)=>{

    let data =  documents.find();

    // console.log(req.params);

    if(req.params.id1!=="NULL")
    data = data.find({type:req.params.id1});

    if(req.params.id2!=="NULL")
    data = data.find({date:req.params.id2});

    data=await data;

    res.status(201).render("documentList",{
        documents:data
    });
}

exports.feesToday = async(req,res)=>{

    let dateNow = new Date().toLocaleString().split(",")[0];
dateNow+='Z';
    const data = await todayFees.find({date:dateNow});

    // console.log(data);

    res.status(200).render('feesToday',{
        data
    })
}

exports.login= (req,res)=>{
    res.status(201).render('login');
}

exports.excelPrintData = async(req,res)=>{

    const header_obj ={

        year:"Session",
        leave:"Leave",
        class:"Class",
        roll_no:"Roll No.",
        name:"Name",
        father_name:"Father\'s Name",
        dob:"D.O.B",
        gender:"Gender",
        religion:"Religion",
        category:"Category",
        april:"April",
        may:"May",
        june:"June",
        july:"Juy",
        august:"August",
        september:"September",
        october:"October",
        november:"November",
        december:"December",
        january:"January",
        february:"February",
        march:"March",
    
    
    }

    const workbook = new excel.Workbook();

    const worksheet = workbook.addWorksheet('students');

    worksheet.columns=[
        {
            header:'Leave',key:'leave',width:10
        },
        {
            header:'Session',key:'year',width:10
        },
        {
            header:'Class',key:'class',width:10
        },
        {
            header:'Roll No.',key:'roll_no',width:10
        },
        {
            header:'Name',key:'name',width:10
        },
        {
            header:'Father\'s Name',key:'father_name',width:10
        },
        {
            header:'D.O.B',key:'dob',width:10
        },
        {
            header:'Gender',key:'gender',width:10
        },
        {
            header:'Religion',key:'religion',width:10
        },
        {
            header:'Category',key:'category',width:10
        },
        {
            header:'April',key:'april',width:10
        },
        {
            header:'May',key:'may',width:10
        },
        {
            header:'June',key:'june',width:10
        },
        {
            header:'July',key:'july',width:10
        },
        {
            header:'August',key:'august',width:10
        },
        {
            header:'September',key:'september',width:10
        },
        {
            header:'October',key:'october',width:10
        },
        {
            header:'November',key:'november',width:10
        },
        {
            header:'December',key:'december',width:10
        },
        {
            header:'January',key:'january',width:10
        },
        {
            header:'Febuary',key:'february',width:10
        },
        {
            header:'March',key:'march',width:10
        }
    ]

    // console.log(req.body);

    let data=Student.find().sort({year:1,class:1,leave:-1});

    if(!req.body.promote)
    {

        if(req.body.sessionfilter!=="")
    data = Student.find({session:req.body.sessionfilter});

    if(req.body.classfilter!=="")
    data = Student.find({class:req.body.classfilter});

    let k=0;

    if(!req.body.session)
    {worksheet.spliceColumns(1,1);
    k++;
    }

    if(!req.body.father)
    {worksheet.spliceColumns(6-k,1);
    k++;}

    if(!req.body.add_info)
    {worksheet.spliceColumns(7-k,4);
    k+=4;
    }

    if(!req.body.fees)
    {worksheet.spliceColumns(11-k,12);
    k++}
}
    let counter =0;
if(!req.body.add_info)
    {    data=await data;
    data.forEach((el)=>
   {
       counter++;
        worksheet.addRow(el);

        if(counter%20===0)
        {
            worksheet.addRow(header_obj).eachCell((el)=>{
                el.font={
                    bold:true
                }
                });
        }
    });}

    else
    {
        const religion = ["HINDU","MUSLIM","SIKH","CHRISTIAN"];
        const category = ["GEN","OBC","SC","ST"];
        const gender = ["MALE","FEMALE"];

        for(const religion_ of religion)
        {
            for(const category_ of category)
            {
                for(const gender_ of gender)
                {
                    counter = 0;
                    let data_ = data.clone();
                    
                    data_ =await data_.find({religion:`${religion_}`,category:`${category_}`,gender:`${gender_}`}).sort({"roll_no":1});

                    // console.log(data_.length);

                    if(data_.length*1===0*1)
                    continue ;

                    data_.forEach((el)=>
                    {
                        counter++;
                         worksheet.addRow(el);
                 
                         if(counter%20===0)
                         {
                             worksheet.addRow(header_obj).eachCell((el)=>{
                                 el.font={
                                     bold:true
                                 }
                                 });
                         }
                     })
                     worksheet.addRow();
                     worksheet.addRow();
                     worksheet.addRow(header_obj).eachCell((el)=>{
                        el.font={
                            bold:true
                        }
                        });
                }
            }
        }


    }


worksheet.getRow(1).eachCell((el)=>{
el.font={
    bold:true
}
})

await workbook.xlsx.writeFile('public/users.xlsx');

res.redirect('/users.xlsx');
}

exports.excelPrintFees = (req,res)=>{

    res.status(201).render("excelPrintFees")
}

exports.excelPrint = (req,res)=>{

    res.status(201).render("print-excel")
}

exports.signup = (req,res)=>{
    res.status(201).render("signup");
}

exports.feesRecord=(req,res)=>{
    res.status(201).render("feesRecord");
}

exports.displayFeeRecord = async(req,res)=>{

    const params = JSON.parse(req.query.data);

  
    // axios.defaults.withCredentials = true;
    // console.log(req.get('host'));
    const data1 = await axios.post(`${req.hostname}:${req.get('host')}/api/v1/studentInfo/searchFeesDate`,{params},
{
    headers: {
        'authorization': `Bearer ${req.cookies.jwt}`,
    }});

  

const render_data = data1.data.data;

// console.log(render_data);

    res.status(201).render("printFeeRecord",{
       render_data
    });

}

exports.srMain =async(req,res) =>{

res.status(201).render("sr-main");

}

exports.srFind= async(req,res,next)=>{

    if(req.params.id3==="null")
    {return next(new AppError("Invalid Sr No."))
   
}
    let data;
    if(req.params.id1==="pg")
    if(req.params.id3!=="NULL")
data =  pgTopg.find({sr_no:req.params.id3});
    else if(req.params.id2!=="NULL")
    data = pgTopg.find({name:{$regex:"^"+req.params.id2}});
    else
    data =  pgTopg.find({});
    if(req.params.id1==="lkgtoukg")
    if(req.params.id3!=="NULL")
data =  lkgToukg.find({sr_no:req.params.id3});
    else if(req.params.id2!=="NULL")
    data = lkgToukg.find({name:{$regex:"^"+req.params.id2}});
    else
    data =  lkgToukg.find({});

    if(req.params.id1==="1to5")
    if(req.params.id3!=="NULL")
data =  oneToFive.find({sr_no:req.params.id3});
    else if(req.params.id2!=="NULL")
    data = oneToFive.find({name:{$regex:"^"+req.params.id2}});
    else
    data =  oneToFive.find({});

    if(req.params.id1==="6to8")
    if(req.params.id3!=="NULL")
data =  sixToeight.find({sr_no:req.params.id3});
    else if(req.params.id2!=="NULL")
    data = sixToeight.find({name:{$regex:"^"+req.params.id2}});
    else
    data =  sixToeight.find({});

    data= await data.sort({sr_no:-1});

res.status(201).render("sr-find",{
    data
})

}

exports.srFindFees= async(req,res,next)=>{

    req.params.id3 = moment(req.params.id3,"YYYY-MM-DD").format("L")+'Z';

    console.log(req.params);

let data1 = await pgTopg.find({name:req.params.id1,"father.name":req.params.id2,dob:req.params.id3});

let data2=await lkgToukg.find({name:req.params.id1,"father.name":req.params.id2,dob:req.params.id3});

let data3=await oneToFive.find({name:req.params.id1,"father.name":req.params.id2,dob:req.params.id3});

let data4=await sixToeight.find({name:req.params.id1,"father.name":req.params.id2,dob:req.params.id3});

let data =[];

for(let el of data1)
data.push(el);

for(let el of data2)
data.push(el);

for(let el of data3)
data.push(el);

for(let el of data4)
data.push(el);

res.status(201).render("sr-find",{
    data
})

}

exports.srGet = async(req,res)=>{

    let student=null;
if(req.params)
{    if(req.params.id1==="lkgtoukg")
student = await lkgToukg.findById(req.params.id2);

    if(req.params.id1==="1to5")
student = await oneToFive.findById(req.params.id2);

    if(req.params.id1==="6to8")
student = await sixToeight.findById(req.params.id2);

if(req.params.id1==="pg")
student = await pgTopg.findById(req.params.id2);

}

// console.log(student);
 res.status(201).render("get-one-sr",{
student
    })

}


exports.excelPrintSr = async(req,res)=>{

    const workbook = new excel.Workbook();

    const obj_header =
    {
        sr_no:"Sr No.",
        name:"Name",
        prev_sr_no:"Prev Sr. No.",
        dob:"DOB",
        dob_in_word:"DOB in words",
        caste:"Caste",
        religion:"Religion",
        "address.permanent":"Address",
        occupation:"Occupation",
        "father.name":"Father\'s Name",
        "mother.name":"Mother\'s Name",
        "pg.admission":"PG-A",
        "pg.passing":"PG-P",
        "lkg.admission":"LKG-A",
        "lkg.passing":"LKG-P",
        "ukg.admission":"UKG-A",
        "ukg.passing":"UKG-P",
        "one.admission":"1-A",
        "one.passing":"1-P",
        "two.admission":"2-A",
        "two.passing":"2-P",
        "three.admission":"3-A",
        "three.passing":"3-P",
        "four.admission":"4-A",
        "four.passing":"4-P",
        "five.admission":"5-A",
        "five.passing":"5-P",
        "six.admission":"6-A",
        "six.passing":"6-P",
        "seven.admission":"7-A",
        "seven.passing":"7-P",
        "eight.admission":"8-A",
        "eight.passing":"8-P",
        last_class:"Last Class",
        leave_date:"Leave Date",
        remark:"Remark",
        leave_reason:"Leave Reason",
        brother_sister:"Brother/Sister"
    } 

    const worksheet0 = workbook.addWorksheet('PG');
    const worksheet1 = workbook.addWorksheet('LKG TO UKG');
    const worksheet2 = workbook.addWorksheet('1 TO 5');
    const worksheet3 = workbook.addWorksheet("6 TO 8");

    worksheet0.columns=[
        {
            header:'Sr No.',key:'sr_no',width:10
        },
        {
            header:'Name',key:'name',width:10
        },
        {
            header:'DOB',key:'dob',width:10
        },
        {
            header:'DOB in words',key:'dob_in_word',width:10
        },
        {
            header:'Caste',key:'caste',width:10
        },
        {
            header:'Religion',key:'religion',width:10
        },
        {
            header:'Address',key:'address.permanent',width:10
        },
        {
            header:'Occupation',key:'occupation',width:10
        },
        {
            header:'Father\'s Name',key:'father.name',width:10
        },
        {
            header:'Mother\'s Name',key:'mother.name',width:10
        },
        {
            header:'PG-A',key:`pg.admission`,width:10
        },
        {
            header:'PG-P',key:`pg.passing`,width:10
        },
        {
            header:'Last Class',key:'last_class',width:10
        },
        {
            header:'Leave Date',key:'leave_date',width:10
        },
        {
            header:'Leave Reason',key:'leave_reason',width:10
        },
        {
            header:'Remark',key:'remark',width:10
        },
        {
            header:'Brother/Sister',key:'brother_sister',width:10
        },
    ]

    const data0 = await pgTopg.find({}).sort({sr_no:1});

    let counter =0;

    for(el of data0)
   {
       counter++;
       el = el.toObject();
       el = flatten(el);
        worksheet0.addRow(el);
   if(counter%6==0)
   {
    worksheet0.addRow(obj_header).eachCell((el)=>{
        el.font={
            bold:true
        }
        });
   }
};

worksheet0.getRow(1).eachCell((el)=>{
el.font={
    bold:true
}
})

    worksheet1.columns=[
        {
            header:'Prev Sr No.',key:'prev_sr_no',width:5 
        },
        {
            header:'Sr No.',key:'sr_no',width:5
        },
        {
            header:'Name',key:'name',width:10
        },
        {
            header:'DOB',key:'dob',width:10
        },
        {
            header:'DOB in words',key:'dob_in_word',width:10
        },
        {
            header:'Caste',key:'caste',width:10
        },
        {
            header:'Religion',key:'religion',width:10
        },
        {
            header:'Address',key:'address.permanent',width:10
        },
        {
            header:'Occupation',key:'occupation',width:10
        },
        {
            header:'Father\'s Name',key:'father.name',width:10
        },
        {
            header:'Mother\'s Name',key:'mother.name',width:10
        },
        {
            header:'LKG-A',key:`lkg.admission`,width:10
        },
        {
            header:'LKG-P',key:`lkg.passing`,width:10
        },
        {
            header:'UKG-A',key:'ukg.admission',width:10
        },
        {
            header:'UKG-P',key:'ukg.passing',width:10
        },
        {
            header:'Last Class',key:'last_class',width:10
        },
        {
            header:'Leave Date',key:'leave_date',width:10
        },
        {
            header:'Leave Reason',key:'leave_reason',width:10
        },
        {
            header:'Remark',key:'remark',width:10
        },
        {
            header:'Brother/Sister',key:'brother_sister',width:10
        },
    ]

    const data = await lkgToukg.find({}).sort({sr_no:1});

    counter=0;

    for(el of data)
   {
       counter++

    el = el.toObject();
     el = flatten(el);
    // console.log(el);
     // console.log(el);
        worksheet1.addRow(el);
        if(counter%6==0)
        {
         worksheet1.addRow(obj_header).eachCell((el)=>{
             el.font={
                 bold:true
             }
             });
        }
};

worksheet1.getRow(1).eachCell((el)=>{
el.font={
    bold:true
}
})

worksheet2.columns=[
    {
        header:'Prev Sr No.',key:'prev_sr_no',width:5 
    },
    {
        header:'Sr No.',key:'sr_no',width:5
    },
    {
        header:'Name',key:'name',width:10
    },
    {
        header:'DOB',key:'dob',width:10
    },
    {
        header:'DOB in words',key:'dob_in_word',width:10
    },
    {
        header:'Caste',key:'caste',width:10
    },
    {
        header:'Religion',key:'religion',width:10
    },
    {
        header:'Occupation',key:'occupation',width:10
    },
    {
        header:'Address',key:'address.permanent',width:10
    },
    {
        header:'Father\'s Name',key:'father.name',width:10
    },
    {
        header:'Mother\'s Name',key:'mother.name',width:10
    },
    {
        header:'1-A',key:`one.admission`,width:10
    },
    {
        header:'1-P',key:`one.passing`,width:10
    },
    {
        header:'2-A',key:'two.admission',width:10
    },
    {
        header:'2-P',key:'two.passing',width:10
    },
    {
        header:'3-A',key:`three.admission`,width:10
    },
    {
        header:'3-P',key:`three.passing`,width:10
    },
    {
        header:'4-A',key:'four.admission',width:10
    },
    {
        header:'4-P',key:'four.passing',width:10
    },
    {
        header:'5-A',key:`five.admission`,width:10
    },
    {
        header:'5-P',key:`five.passing`,width:10
    },
    {
        header:'Last Class',key:'last_class',width:10
    },
    {
        header:'Leave Date',key:'leave_date',width:10
    },
    {
        header:'Leave Reason',key:'leave_reason',width:10
    },
    {
        header:'Remark',key:'remark',width:10
    },
    {
        header:'Brother/Sister',key:'brother_sister',width:10
    },
]

const data2 = await oneToFive.find({}).sort({sr_no:1});

counter=0;

for(el of data2)
{
// await flatten(el);
counter++;
el = el.toObject();
     el = flatten(el);
    worksheet2.addRow(el);
    if(counter%6==0)
    {
     worksheet2.addRow(obj_header).eachCell((el)=>{
         el.font={
             bold:true
         }
         });
    }
};

worksheet2.getRow(1).eachCell((el)=>{
el.font={
bold:true
}
})

worksheet3.columns=[
    {
        header:'Prev Sr No.',key:'prev_sr_no',width:5 
    },
    {
        header:'Sr No.',key:'sr_no',width:5
    },
    {
        header:'Name',key:'name',width:10
    },
    {
        header:'DOB',key:'dob',width:10
    },
    {
        header:'DOB in words',key:'dob_in_word',width:10
    },
    {
        header:'Caste',key:'caste',width:10
    },
    {
        header:'Religion',key:'religion',width:10
    },
    {
        header:'Address',key:'address.permanent',width:10
    },
    {
        header:'Occupation',key:'occupation',width:10
    },
    {
        header:'Father\'s Name',key:'father.name',width:10
    },
    {
        header:'Mother\'s Name',key:'mother.name',width:10
    },
    {
        header:'6-A',key:`six.admission`,width:10
    },
    {
        header:'6-P',key:`six.passing`,width:10
    },
    {
        header:'7-A',key:'seven.admission',width:10
    },
    {
        header:'7-P',key:'seven.passing',width:10
    },
    {
        header:'8-A',key:'eight.admission',width:10
    },
    {
        header:'8-P',key:'eight.passing',width:10
    },
    {
        header:'Last Class',key:'last_class',width:10
    },
    {
        header:'Leave Date',key:'leave_date',width:10
    },
    {
        header:'Leave Reason',key:'leave_reason',width:10
    },
    {
        header:'Remark',key:'remark',width:10
    },
    {
        header:'Brother/Sister',key:'brother_sister',width:10
    },
]

const data3 = await sixToeight.find({}).sort({sr_no:1});
counter=0;
for(el of data3)
{
    counter++;
    el = el.toObject();
    el = flatten(el);
    worksheet3.addRow(el);
    if(counter%6==0)
    {
     worksheet3.addRow(obj_header).eachCell((el)=>{
         el.font={
             bold:true
         }
         });
    }
};

worksheet3.getRow(1).eachCell((el)=>{
el.font={
bold:true
}
})

await workbook.xlsx.writeFile('public/sr-full.xlsx');

res.redirect('/sr-full.xlsx');
}

exports.feesUpdate=async(req,res)=>{

    const data =await fees.find({});
    let feeDetail=0;
    if(data.length===0)
    {
        let feeDetail = await fees.create();
    }
    else
    feeDetail = data[0];

    // console.log(data);

    

    res.status(201).render('fees',{
        feeDetail
    })
}

exports.promoteForm = (req,res)=>{

    res.status(201).render("promote-form");

}

exports.srPrint = async (req,res)=>{

    let data =0;

    if(req.params.id1==="PG")
    data = await pgTopg.findById(req.params.id2);

    if(req.params.id1==="LKG TO UKG")
    data = await lkgToukg.findById(req.params.id2);

    if(req.params.id1==="1 TO 5")
    data = await oneToFive.findById(req.params.id2);

    if(req.params.id1==="6 TO 8")
    data = await sixToeight.findById(req.params.id2);

    // console.log(data);

    res.status(201).render("print-one-sr",{
        data
    })

}