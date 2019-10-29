const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

const shoppingItemsController=require('../controllers/shoppingItems');

router.get('',checkAuth, shoppingItemsController.getShoppingItems);
router.post('',checkAuth, shoppingItemsController.addShoppingItems);
router.delete('/:id', checkAuth, shoppingItemsController.deleteShoppingItem);

module.exports = router;