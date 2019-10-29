const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token,'dhana&raghav_satya&venky_bhargavi&raj_deepti&tiana');
        req.userData={email: decodedToken.email, userId: decodedToken.userId};
        next();
    }catch(error){
        res.status(400).json({
          message:"In-valid authentication credentials"
        });
    }
  
}