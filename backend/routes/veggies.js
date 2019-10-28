 const express = require('express');
const Vegetable = require("../models/vegitable");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
 
router.post('',checkAuth,(req,res,next)=>{
    const veggie = new Vegetable({
       name:req.body.name,
       imagePath:req.body.imagePath,
       price:req.body.price
    });
   veggie.save().then(createdVeggie=>{
      console.log(createdVeggie);
      res.status(201).json({
       message:"veggie added successfully",
       veggieId: createdVeggie._id
    });
    }).catch(err=>{
        res.status(400).json({
            message:"Not authorized!"
        });       
    }) 
});
 
router.put('/:id',checkAuth,(req,res,next)=>{
    const updatedVeggie=new Vegetable({
        _id:req.params.id,
        name:req.body.name,
        imagePath:req.body.imagePath,
        price:req.body.price
    });
    Vegetable.updateOne({_id: req.params.id},updatedVeggie)
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"updated successfully"
        });
    }).catch(err=>{
        res.status(400).json({
            message:"Not authorized!"
        });       
    }) ; 
});
 
router.get('',(req,res,next)=>{
    Vegetable.find().then(documents=>{
        res.status(200).json({
            message:'veggies fetched successfully',
            veggies: documents
        });
    }).catch(err=>{
        res.status(400).json({
            message:"veggies can not be fetched!"
        });       
    }) ;    
});
 
router.delete('/:id',checkAuth,(req,res,next)=>{
    Vegetable.deleteOne({_id:req.params.id})
    .then((result)=>{
        console.log(result);
        res.status(200).json({
            message:'veggie deleted successfully'
        });
    }).catch(err=>{
        res.status(400).json({
            message:"Not authorized!"
        });       
    })  ;
});

module.exports=router;