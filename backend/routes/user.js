const express =require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/signUp',userController.createUser);
router.post("/login",userController.userLogin);
router.post('/logout',userController.userLogout);

module.exports=router;