const express = require('express');
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

const veggiesController =require('../controllers/veggies');
 
router.post('',checkAuth,veggiesController.addVeggie); 
router.put('/:id',checkAuth,veggiesController.updateVeggie); 
router.get('',veggiesController.getVeggies); 
router.delete('/:id',checkAuth,veggiesController.deleteVeggie);

module.exports=router;