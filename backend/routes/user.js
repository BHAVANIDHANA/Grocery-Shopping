const express =require('express');
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post('/signUp',(req,res,next)=>{
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
               error:err
           });
       });       
    });
});

router.post("/login", (req, res,next)=>{
    let fetchedUser;
    User.findOne({email:req.body.email})
    .then(user=>{
        fetchedUser = user;        
        if(!user){
            return res.status(400).json({
                message:'Auth failed'
            });
        }
        // console.log(user);
        return bcrypt.compare(req.body.password,user.password);
    }).then(result=>{
            if(!result){
                return res.status(400).json({
                message:'Auth failed'
                });
            }
            const token =jwt.sign(
                                   {email: fetchedUser.email, userId: fetchedUser._id},
                                   'dhana&raghav_satya&venky_bhargavi&raj_deepti&tiana',
                                   { expiresIn:'1h'}
                                 );
            //console.log(token);
            res.status(200).json({
            token: token,
            expiresIn:3600,
            email:fetchedUser.email,
            address:fetchedUser.address
            });
    }).catch(err=>{
        return res.status(400).json({
        message:'Auth failed'
        });
    })
});

router.post('/logout',(req,res,next)=>{
    
})

module.exports=router;