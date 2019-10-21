const mongoose = require('mongoose');

const shoppingItemSchema = mongoose.Schema({
        name:{type:String, required:true},
        imagePath:{type:String, required:true},
        price:{type:Number, required:true},
        quantity:{type:Number, required:true},
        creator:{type: mongoose.Schema.Types.ObjectId, ref:"User", required:true}
});

module.exports = mongoose.model("ShoppingItem", shoppingItemSchema);