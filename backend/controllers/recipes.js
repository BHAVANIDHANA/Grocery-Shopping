const Recipe = require("../models/recipe");

exports.updateRecipe = (req,res,next)=>{    
    const updatedRecipe = new Recipe({
       _id:req.params.id,
       name: req.body.name,
       description: req.body.description,
       imagePath: req.body.imagePath,
       ingredients:req.body.ingredients
   }); 
    Recipe.updateOne({_id:req.params.id},updatedRecipe)
    .then(result=>{
        // console.log(result)
        if(result.n>0){
            res.status(200).json({
                message:"recipe updated"
            });
        }else{
            res.status(401).json({
                message:"Not authorised !"
            });
        }        
    })
    .catch(err=>{
        res.status(500).json({
            message:"couldn't update recipe!"
        });       
    })
};

exports.addRecipe= (req,res,next)=>{    
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
       res.status(500).json({
           message:"couldn't add recipe!"
       });       
   })   
};

exports.getRecipes=(req,res,next)=>{ 
    Recipe.find().then(documents=>{
         res.status(200).json({
             message:'Recipes fetched succesfully ',
             recipes: documents
         });
    }).catch(err=>{
     res.status(500).json({
         message:"Failed to fetch recipes !"
     })
 });    
 };

 exports.deleteRecipe =(req,res,next)=>{
    Recipe.deleteOne({_id:req.params.id}).then((result)=>{
     //    console.log(result);
        if(result.n>0){
         res.status(200).json({
             message:"Recipe deleted successfully"
         });
        }else{
            res.status(401).json({
                message:"Not Authorised !"
            })
        }       
    }).catch(err=>{
        res.status(500).json({
            message:"Failed to delete recipe!"
        })
    })
 };