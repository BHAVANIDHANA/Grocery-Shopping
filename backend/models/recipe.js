const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
    name:{type: String, required: true},
    description:{type: String, required: true},
    imagePath:{type: String, required: true},
    ingredients:[{
        id:String,
        name:String,
        imagePath:String,
        price:Number,
        quantity:Number 
    }]
});
module.exports=mongoose.model("Recipe",recipeSchema);