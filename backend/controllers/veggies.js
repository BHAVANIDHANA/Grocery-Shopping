const Vegetable = require("../models/vegitable");

exports.addVeggie=(req,res,next)=>{
    const veggie = new Vegetable({
       name:req.body.name,
       imagePath:req.body.imagePath,
       price:req.body.price
    });
   veggie.save().then(createdVeggie=>{
    //   console.log(createdVeggie);
      res.status(201).json({
       message:"veggie added successfully",
       veggieId: createdVeggie._id
    });
    }).catch(err=>{
        res.status(500).json({
            message:"Failed to add veggie!"
        });       
    }) 
};
exports.updateVeggie=(req,res,next)=>{
    const updatedVeggie=new Vegetable({
        _id:req.params.id,
        name:req.body.name,
        imagePath:req.body.imagePath,
        price:req.body.price
    });
    Vegetable.updateOne({_id: req.params.id},updatedVeggie)
    .then(result=>{
        // console.log(result.nModified);
        if(result.nModified>0){
            res.status(200).json({
                message:"updated successfully"
            });
        }else{
            res.status(401).json({
                message:"Not authorised !"
            });
        }       
    }).catch(err=>{
        res.status(500).json({
            message:"Failed to update veggie!"
        });       
    }) ; 
};

exports.getVeggies=(req,res,next)=>{
    Vegetable.find().then(documents=>{
        res.status(200).json({
            message:'veggies fetched successfully',
            veggies: documents
        });
    }).catch(err=>{
        res.status(500).json({
            message:"Failed to fetch veggies!"
        });       
    }) ;    
};

exports.deleteVeggie=(req,res,next)=>{
    Vegetable.deleteOne({_id:req.params.id})
    .then((result)=>{        
        // console.log(result);
        if(result.n>0){
            res.status(200).json({
                message:'veggie deleted successfully'
            });
        }else{
            res.status(401).json({
                message:'Not authorised !'
            })
        }       
    }).catch(err=>{
        res.status(500).json({
            message:"Failed to delete veggie!"
        });       
    })  ;
};