
// import { ShoppingItem } from '../shared/shopping-item.model';
import { Ingredient } from '../shared/Ingredient.model';

export class Recipe{
    public id:String;
    public name:String;
    public description:String;
    public imagePath:String;
    public ingredients:Ingredient[];

     constructor(id:String, name:String,desc:String,imagePath:String, ingredients:Ingredient[]){
         this.id = id;
         this.description=desc;
         this.imagePath=imagePath;
         this.name=name;
         this.ingredients=ingredients;
     }
}