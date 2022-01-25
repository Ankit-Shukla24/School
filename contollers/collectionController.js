const Collection = require("./../model/collection");
const Fees = require("./../model/fees");

exports.updateData = async(req,res) =>{

    // console.log(req.body);

    const pr = new Date(req.body.id1);

    // console.log(pr);

    const data =await Collection.find({date:pr});

    // console.log(data);

    if(data.length===0)
    {

        let dateNow = new Date().toLocaleString().split(",")[0];
        dateNow+='Z';
       const newData = await Collection.create({
           date:dateNow,
           amount:0
        });

        res.status(201).json({
            data:newData
        });

    }
    else
    {

        const money = data[0].amount*1+req.body.amount*1; 

        console.log(money);

        const newData = await Collection.findByIdAndUpdate(data[0]._id,{amount:money},
            {
                new:true,
            });

         res.status(201).json({
             data:newData
         });
    }
}

exports.feesUpdate=async (req,res)=>{

   await Fees.deleteMany();

   const data= await Fees.create(req.body);

    res.status(201).json({
        data
    })
}

exports.getFees = async (req,res)=>{

    
    const data = await Fees.find({});

    const fees = data[0];

    res.status(201).json({
        fees
    })

}