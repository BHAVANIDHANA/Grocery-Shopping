const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

const recipesController=require("../controllers/recipes");

router.put('/:id', checkAuth, recipesController.updateRecipe);
router.post('', checkAuth, recipesController.addRecipe);
router.get('', recipesController.getRecipes);
router.delete('/:id', checkAuth, recipesController.deleteRecipe);

module.exports=router;