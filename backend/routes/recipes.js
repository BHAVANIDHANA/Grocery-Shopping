const express = require("express");
const Recipe = require("../models/recipe");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.put('/:id', checkAuth, (req,res,next)=>{    
    const updatedRecipe = new Recipe({
       _id:req.params.id,
       name: req.body.name,
       description: req.body.description,
       imagePath: req.body.imagePath,
       ingredients:req.body.ingredients
   }); 
    Recipe.updateOne({_id:req.params.id},updatedRecipe)
    .then(result=>{
        res.status(200).json({
            message:"recipe updated"
        });
    })
    .catch(err=>{
        res.status(400).json({
            message:"Not authorized!"
        });       
    })
})

router.post('', checkAuth, (req,res,next)=>{    
     const recipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        imagePath: req.body.imagePath,
        ingredients:req.body.ingredients
    });    
//    console.log(recipe);
    recipe.save().then(addedRecipe => {
        res.status(201).json({
            message:'recipe succesfully added',
            recipeId: addedRecipe._id
        });
    }).catch(err=>{
        res.status(400).json({
            message:"Not authorized!"
        });       
    })   
})

router.get('',(req,res,next)=>{ 
   Recipe.find().then(documents=>{
        res.status(200).json({
            message:'Recipes fetched succesfully ',
            recipes: documents
        });
   }).catch(err=>{
    res.status(400).json({
        message:"recipes annot be fetched!"
    })
});    
});


router.delete('/:id', checkAuth, (req,res,next)=>{
   Recipe.deleteOne({_id:req.params.id}).then(()=>{
       res.status(200).json({
           message:"Recipe deleted successfully"
       })
   }).catch(err=>{
       res.status(400).json({
           message:"Not authorized!"
       })
   })
});

module.exports=router;