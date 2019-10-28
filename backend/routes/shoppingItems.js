const express = require("express");
const ShoppingItem = require("../models/shoppingItem");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get('',checkAuth, (req,res,next)=>{
  ShoppingItem.find({creator:req.userData.userId}).then(documents=>{
      res.status(200).json({
          message:"shopping list fetched successfully",
          shoppingItems: documents
      });
      //console.log(documents);
  }).catch(err=>{
    res.status(400).json({
        message:"shopping list can't be fetched!"
    })
});    
});

router.post('',checkAuth, (req,res,next)=>{
    const shoppingItem=new ShoppingItem({
        name: req.body.name,
        imagePath: req.body.imagePath,
        price: req.body.price,
        quantity: req.body.quantity,
        creator: req.userData.userId
      });
      shoppingItem.save().then(responseData=>{
          res.status(201).json({
             message:"shopping item successfully added to shopping list",
             shoppingItem: responseData
          });
      }).catch(err=>{
        res.status(400).json({
            message:"Not authorized!"
        });       
    }) 
    
});

router.delete('/:id', checkAuth, (req,res,next)=>{
    ShoppingItem.deleteOne({_id:req.params.id}).then(()=>{
        res.status(200).json({
            message:"shopping item deleted successfully"
        })
    }).catch(err=>{
        res.status(400).json({
            message:"Not authorized!"
        });       
    });  
});
module.exports = router;