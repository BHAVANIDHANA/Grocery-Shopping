const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ShoppingItem = require("../models/shoppingItem");

exports.createUser=(req,res,next)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const user = new User({
            email: req.body.email,
            password: hash,
            address: req.body.address       
       });
       user.save()
       .then(registeredDocs=>{
        res.status(201).json({
            message: " signed up successfully",
            //sresult: registeredDocs
        });
       }).catch(err=>{
           res.status(500).json({
              message:"In-valid Authentication credentials!"
           });
       });       
    });
};

exports.userLogin =(req, res,next)=>{
    let fetchedUser;
    User.findOne({email:req.body.email})
    .then(user=>{
        fetchedUser = user;        
        if(!user){
            return res.status(400).json({
                message:'In-valid email !'
            });
        }
        // console.log(user);
        return bcrypt.compare(req.body.password,user.password);
    }).then(result=>{
            if(!result){
                return res.status(400).json({
                message:'In-valid password !'
                });
            }
            const token =jwt.sign(
                                   {email: fetchedUser.email, userId: fetchedUser._id},
                                   'dhana_raghav',
                                   { expiresIn:'1h'}
                                 );
             //console.log(token);
            
            ShoppingItem.find({creator:fetchedUser._id})
            .then(items=>{
                // console.log(items.length);
                res.status(200).json({
                    token: token,
                    expiresIn:3600,
                    email:fetchedUser.email,
                    address:fetchedUser.address,
                    itemsCount:items.length
            });
           
            });
    }).catch(err=>{
        return res.status(400).json({
        message:'In-valid authentication credentials !'
        });
    })
};

exports.userLogout=(req,res,next)=>{
    
};