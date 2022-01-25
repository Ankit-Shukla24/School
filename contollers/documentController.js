const multer = require("multer");
const documents = require('./../model/documents');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const studentImageAndDoc = require("./../model/studentImageAndDoc");
const lkgToukg = require('./../model/lkgToukg');
const oneToFive = require('./../model/oneTofive');
const sixToeight = require('./../model/sixToeight');

const multerStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
cb(null,'public/data');
    },
    filename:(req,file,cb)=>{
        console.log(file);
        const ext = file.mimetype.split('/')[1];
        cb(null,`${req.body.type}-${req.body.description}-${new Date().toString().split(' ').join('-').split(':')[0]}.${file.originalname.split(".").slice(-1)}`);
    }
});

const upload = multer({
    storage:multerStorage
})

exports.fileUploader = upload.single('file');

exports.uploadFile = async(req,res) =>{

    req.body.date = Date.now();
    req.body.name = req.file.filename;
try{
    await documents.create(req.body);}
catch(err)
{
    console.log(err);
}
    res.status(201).json({
    })
}


const multerStoragePic = multer.memoryStorage();

const uploadPic = multer({
    storage:multerStoragePic
})

exports.fileUploaderPic = uploadPic.single('pic');

exports.resizeUserPhoto = async (req, res,next) => {
    try{
    let data = await studentImageAndDoc.find();
    let pic = 0;
    if(data.length===0)
    {
      data= await studentImageAndDoc.create({
           "image":"1",
           "document":"0"
       });
pic=1;
req.body.id = data.id;
    }
    else
 {   pic= data[0].image*1+1;
    req.body.id = data[0];
}

if(req.body.image_no)
{
    pic= req.body.image_no*1;
}

    req.body.picnum = pic;

    req.file.filename = `student-pic-${pic}.jpg`;
    
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/${req.file.filename}`);
}
catch(err)
{
    console.log(err);
}
    next();
    };

    exports.updatePicNumAndStudent = async(req,res)=>{

        const data1 =await studentImageAndDoc.findByIdAndUpdate(req.body.id,{image:req.body.picnum},{
            new:true
        });

        let data2=0;
        
        if(req.body.sr==="LKG TO UKG")
        data2 = await lkgToukg.findByIdAndUpdate(req.body.student_id,{"image":req.body.picnum},{
            new:true
        })
        if(req.body.sr==="1 TO 5")
        data2 = await oneToFive.findByIdAndUpdate(req.body.student_id,{"image":req.body.picnum},{
            new:true
        })
        if(req.body.sr==="6 TO 8")
        data2 = await sixToeight.findByIdAndUpdate(req.body.student_id,{"image":req.body.picnum},{
            new:true
        })
        res.status(201).json({
            data:data2
        });
    }

    const multerStorageDoc = multer.diskStorage({
        destination:(req,file,cb)=>{
    cb(null,'public/data');
        },
        filename:async (req,file,cb)=>{
            try{
                let data = await studentImageAndDoc.find();
                let doc = 0;
                if(data.length===0)
                {
                  data= await studentImageAndDoc.create({
                       "image":"0",
                       "document":"1"
                   });
            doc=1;
            req.body.id = data.id;
                }
                else
             {   doc= data[0].document*1+1;
                req.body.id = data[0];
            }
        
                req.body.docnum = doc;
                cb(null,`${req.body.desc}-${doc}.${file.originalname.split(".").slice(-1)}`);
            }
            catch(err)
{
    console.log(err);
}
        }
    });
    
    const uploadDoc = multer({
        storage:multerStorageDoc
    })
    
    exports.fileUploaderDoc = uploadDoc.single('doc');

    exports.updateDocNumAndStudent = async(req,res)=>{

        const data1 =await studentImageAndDoc.findByIdAndUpdate(req.body.id,{document:req.body.docnum},{
            new:true
        });

        console.log(data1);

        let data2=0;
        
        if(req.body.sr==="LKG TO UKG")
        data2 = await lkgToukg.findByIdAndUpdate(req.body.student_id,{$push:{"documents":{description:req.body.desc,name:req.file.filename}}},{
            new:true,
            upsert: true
        })
        if(req.body.sr==="1 TO 5")
        data2 = await oneToFive.findByIdAndUpdate(req.body.student_id,{$push:{"documents":{description:req.body.desc,name:req.file.filename}}},{
            new:true
        })
        if(req.body.sr==="6 TO 8")
        data2 = await sixToeight.findByIdAndUpdate(req.body.student_id,{$push:{"documents":{description:req.body.desc,name:req.file.filename}}},{
            new:true
        })

        console.log(data2);

        res.status(201).json({
            data:data2
        });
    }

exports.deleteDoc=async (req,res)=>{

    let data2=0;
    
    console.log(req.body)

    fs.unlink(path.join(__dirname,`../public/data/${req.body.doc_name}`),(err)=>{
        console.log(err);
    });

    if(req.body.student_sr==="LKG TO UKG")
    data2 = await lkgToukg.findByIdAndUpdate(req.body.student_id,{$pull:{"documents":{_id:req.body.doc_id}}},{
        new:true,
    })
    if(req.body.student_sr==="1 TO 5")
    data2 = await oneToFive.findByIdAndUpdate(req.body.student_id,{$pull:{"documents":{_id:req.body.doc_id}}},{
        new:true
    })
    if(req.body.student_sr==="6 TO 8")
    data2 = await sixToeight.findByIdAndUpdate(req.body.student_id,{$pull:{"documents":{_id:req.body.doc_id}}},{
        new:true
    })

    console.log(data2);

    res.status(201).json({
        data:data2
    });    

}