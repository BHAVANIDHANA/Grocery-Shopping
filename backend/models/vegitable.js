const mongoose = require("mongoose");

const vegitableSchema = mongoose.Schema({
    name: {type: String, required: true},
    imagePath: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports=mongoose.model("Vegitable",vegitableSchema);