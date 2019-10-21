const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const veggiesRoutes = require("./routes/veggies");
const recipesRoutes = require("./routes/recipes");
const usersRoutes = require("./routes/user");
const shoppingItemsRoutes = require("./routes/shoppingItems");

const app=express();

//YOFp0inA2iwH7hQL
mongoose.connect("mongodb+srv://dhana:YOFp0inA2iwH7hQL@cluster0-qlypk.mongodb.net/grocery-mean?retryWrites=true&w=majority")
.then(()=>{
   console.log("connected to database");
}).catch(()=>{
   console.log(" database connection failed");
});

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

app.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin","*");
   res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
   next();
})

app.use("/api/veggies",veggiesRoutes);
app.use("/api/recipes",recipesRoutes);
app.use("/api/users",usersRoutes);
app.use("/api/shoppingItems",shoppingItemsRoutes);

module.exports=app;

   