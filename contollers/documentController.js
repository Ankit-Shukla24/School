const multer = require("multer");
const documents = require('./../model/documents');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const lkgToukg = require('./../model/lkgToukg');
const pgTopg = require('./../model/pgTopg');
const oneToFive = require('./../model/oneTofive');
const sixToeight = require('./../model/sixToeight');
const { google } = require('googleapis');
const { Readable } = require('stream');


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
    );
    
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    
    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client,
    });
    
    
const multerStorage = multer.memoryStorage();
    
const upload = multer({
    storage:multerStorage
})


const createFile = async (req)=>{
try{

    const ext = req.file.originalname.split(".").slice(-1)[0];
    const stream = Readable.from(req.file.buffer);
    let response 
    
    if(req.body.sr)
    response = await drive.files.create({
        requestBody: {
          name: `${req.body.student_name}-${req.body.student_id}-${req.body.desc}.${ext}`,
          
          mimeType: req.file.mimeType,
        },
        media: {
          mimeType: req.file.mimeType,
          body: stream,
        },
      });
  else
  response = await drive.files.create({
    requestBody: {
      name: `${req.body.type}-${req.body.description}-${Date.now().toString()}.${ext}`,
      
      mimeType: req.file.mimeType,
    },
    media: {
      mimeType: req.file.mimeType,
      body: stream,
    },
  });


      // console.log(response.data);
req.body.response= response.data;
      const fileId = response.data.id;
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      const result = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink',
      });

      req.body.link = result.data;

      
      // console.log(result.data);
      
      // console.log(error.message);
  }
catch(err)
{
  // console.log(err);
}

return req;

};



exports.fileUploader = upload.single('file');

exports.uploadFile = async(req,res,next) =>{

    req =await createFile(req);

    let dateNow = new Date().toLocaleString().split(",")[0];
    dateNow+='Z';

    req.body.date =dateNow;
    req.body.name = req.body.response.name;
    req.body.doc_id=req.body.response.id;
    req.body.doc_link=req.body.link.webViewLink;

    // console.log(req.body);

try{
    await documents.create(req.body);}
catch(err)
{
    return next(err)
}
    res.status(201).json({
    })
}

exports.deleteDocByParams = async (req,res,next)=>{
try
   { 
     // console.log(req.params);

    const data = await documents.findOneAndDelete({doc_id:req.params.id})

    const del = await drive.files.delete({
        fileId: req.params.id,
      });
}
catch(err)
{
    return next(err)
}
      res.status(201).json({
          data
      })

}


const uploadPic = multer({
    storage:multerStorage
})

exports.fileUploaderPic = uploadPic.single('pic');

exports.resizeUserPhoto = async (req, res,next) => {

   try{ 
 const resimg =   await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpg')
      .jpeg({ quality: 90 })
      
    //   console.log(data1);
        const response = await drive.files.create({
          requestBody: {
            name: `${req.body.student_name}-${req.body.student_id}.jpg`,
            mimeType: req.file.mimeType,
          },
          media: {
            mimeType: req.file.mimeType,
            body: resimg,
          },
        });
    
        // console.log(response.data);
req.body.response= response.data;
        const fileId = response.data.id;
        await drive.permissions.create({
          fileId: fileId,
          requestBody: {
            role: 'reader',
            type: 'anyone',
          },
        });

        const result = await drive.files.get({
          fileId: fileId,
          fields: 'webContentLink',
        });

        req.body.link = result.data;

        // console.log(result.data);

    }

catch(err)
{
  console.log();
    return next(err)
}
    next();
  };

    exports.updatePicStudent = async(req,res,next)=>{
        let data2;
        console.log(req.body);
try{
        if(req.body.sr==="PG")
        data2 = await pgTopg.findByIdAndUpdate(req.body.student_id,{"image.img_link":req.body.link.webContentLink,"image.name":req.body.response.name,"image.img_id":req.body.response.id})
        if(req.body.sr==="LKG TO UKG")
        data2 = await lkgToukg.findByIdAndUpdate(req.body.student_id,{"image.img_link":req.body.link.webContentLink,"image.name":req.body.response.name,"image.img_id":req.body.response.id})
        if(req.body.sr==="1 TO 5")
        data2 = await oneToFive.findByIdAndUpdate(req.body.student_id,{"image.img_link":req.body.link.webContentLink,"image.name":req.body.response.name,"image.img_id":req.body.response.id})
        if(req.body.sr==="6 TO 8")
        data2 = await sixToeight.findByIdAndUpdate(req.body.student_id,{"image.img_link":req.body.link.webContentLink,"image.name":req.body.response.name,"image.img_id":req.body.response.id})

        console.log(data2);

        if(data2.image.img_id&&data2.image.img_id!=="")
{    const del = await drive.files.delete({
      fileId: data2.image.img_id,
    });
    // console.log(del.data, del.status);}
}
        // console.log(data2);
      }

        catch(err)
        {
          // console.log(err);

          return next(err);
        }

        res.status(201).json({
          data:data2
        });

}

    
    const uploadDoc = multer({
        storage:multerStorage
    })
    
    exports.fileUploaderDoc = uploadDoc.single('doc');

    exports.updateDocStudent = async(req,res,next)=>{
      let data2=0;

      try {  req =await createFile(req);

        //  console.log(req);
        if(req.body.sr==="PG")
        data2 = await pgTopg.findByIdAndUpdate(req.body.student_id,{$push:{"documents":{"description":req.body.desc,"name":req.body.response.name,"doc_id":req.body.response.id,"doc_link":req.body.link.webViewLink}}},{
            new:true,
        })
        if(req.body.sr==="LKG TO UKG")
        data2 = await lkgToukg.findByIdAndUpdate(req.body.student_id,{$push:{"documents":{"description":req.body.desc,"name":req.body.response.name,"doc_id":req.body.response.id,"doc_link":req.body.link.webViewLink}}},{
            new:true,
        })
        if(req.body.sr==="1 TO 5")
        data2 = await oneToFive.findByIdAndUpdate(req.body.student_id,{$push:{"documents":{"description":req.body.desc,"name":req.body.response.name,"doc_id":req.body.response.id,"doc_link":req.body.link.webViewLink}}},{
            new:true
        })
        if(req.body.sr==="6 TO 8")
        data2 = await sixToeight.findByIdAndUpdate(req.body.student_id,{$push:{"documents":{"description":req.body.desc,"name":req.body.response.name,"doc_id":req.body.response.id,"doc_link":req.body.link.webViewLink}}},{
            new:true
        })
}
catch(err)
{
    return next(err)
}
        // console.log(data2);

        res.status(201).json({
            data:data2
        });
}


exports.deleteDoc=async (req,res,next)=>{
    
  let data2=0;
try{    
  console.log(req.body)

    const del = await drive.files.delete({
        fileId: req.body.doc_id,
      });
    if(req.body.student_sr==="PG")
    data2 = await pgTopg.findByIdAndUpdate(req.body.student_id,{$pull:{"documents":{doc_id:req.body.doc_id}}},{
        new:true,
    })
    if(req.body.student_sr==="LKG TO UKG")
    data2 = await lkgToukg.findByIdAndUpdate(req.body.student_id,{$pull:{"documents":{doc_id:req.body.doc_id}}},{
        new:true,
    })
    if(req.body.student_sr==="1 TO 5")
    data2 = await oneToFive.findByIdAndUpdate(req.body.student_id,{$pull:{"documents":{doc_id:req.body.doc_id}}},{
        new:true
    })
    if(req.body.student_sr==="6 TO 8")
    data2 = await sixToeight.findByIdAndUpdate(req.body.student_id,{$pull:{"documents":{doc_id:req.body.doc_id}}},{
        new:true
    })
}
catch(err)
{
    return next(err)
}
    console.log(data2);

    res.status(201).json({
        data:data2
    });  

}