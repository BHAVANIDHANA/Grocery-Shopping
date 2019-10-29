import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupMessagesComponent } from '../popup-messages/popup-messages.component';

@Injectable()
export class RecipeService{
    private recipes:Recipe[]= [];
    ingredients:Ingredient[]=[];
    _ingredientsArray:FormArray;
            
    private recipesUpdated = new Subject<Recipe[]>();
    constructor(private route:Router,
                private activatedRoute:ActivatedRoute,
                private shoppingservice:ShoppingService, 
                private http:HttpClient, 
                private authService:AuthService,
                private dialog:MatDialog){}
    
    getRecipes(){
        this.http.get<{message:string,recipes:any}>("http://localhost:3000/api/recipes")
         .pipe(map(recipesData=>{
             return recipesData.recipes.map(recipe=>{
                 return {
                     id:recipe._id,
                     name:recipe.name,
                     description:recipe.description,
                     imagePath:recipe.imagePath,
                     ingredients:recipe.ingredients.map(ingredient=>{
                         return {
                             id:ingredient._id,
                             name:ingredient.name,
                             imagePath:ingredient.imagePath,
                             price:ingredient.price,
                             quantity:ingredient.quantity
                         }
                     })
                 };
             });
         })).subscribe(transformedRecipes=>{
             this.recipes=transformedRecipes;
             this.recipesUpdated.next(this.recipes.slice());       
         })
        
    }
    updateRecipe(recipeId:string, name:String,description:String,imagePath:String, ingredientsArray:FormArray, existingIngredients:Ingredient[], length:number){
        // console.log(length);
        const recipeData :Recipe={
            id :recipeId,
            description:description,
            imagePath:imagePath,
            name:name,            
            ingredients: this.getConcatedIngredientControl(length,ingredientsArray,existingIngredients)            
        }
        // console.log(recipeData);
        this.http.put<{message:string}>("http://localhost:3000/api/recipes/"+recipeId,recipeData)
        .subscribe(responseData=>{
            this.dialog.open(PopupMessagesComponent,{height:'200px', 
                                                     width:'460px',
                                                     data:{ title:"Update Recipe!",
                                                            message:responseData.message
                                                          }
                                                    });             
        });
       
    }
    getConcatedIngredientControl(length:number, ingredientArray:FormArray, existingIngredients:Ingredient[]){
        for(let i=0;i<length;i++){
             existingIngredients.push(
            {
                id:null,
                name:ingredientArray.value[i].ingredientName,
                imagePath:ingredientArray.value[i].ingredientImage,
                price:ingredientArray.value[i].price,
                quantity:ingredientArray.value[i].quantity 
            });
            
        }
        return existingIngredients;
    }

    addNewRecipe(name:String,description:String,imagePath:String, ingredientsArray:FormArray, length:number){
      // this._ingredientsArray=ingredientsArray;
    //    console.log(length);
        const recipeData :Recipe={
            id :null,
            description:description,
            imagePath:imagePath,
            name:name,            
            ingredients: this.getIngredientControl(length,ingredientsArray)            
        }
        // console.log(recipeData);
       
        this.http.post<{message:string, recipeId:string}>("http://localhost:3000/api/recipes",recipeData)
        .subscribe(responseData=>{
            recipeData.id = responseData.recipeId;
            this.recipes.push(recipeData);
            this.recipesUpdated.next(this.recipes.slice());
            this.dialog.open(PopupMessagesComponent,{height:'200px', 
                                                     width:'460px',
                                                     data:{ title:"New Recipe!",
                                                            message:responseData.message
                                                          }
                                                    });        
        });
    }
    getIngredientControl(length:number, ingredientArray:FormArray){
        for(let i=0;i<length;i++){
             this.ingredients.push(
            {
                id:null,
                name:ingredientArray.value[i].ingredientName,
                imagePath:ingredientArray.value[i].ingredientImage,
                price:ingredientArray.value[i].price,
                quantity:ingredientArray.value[i].quantity 
            });
            
        }
        return this.ingredients;
    }
    getRecipesUpdateListener(){
        return this.recipesUpdated.asObservable();
     }

    getRecipesById(id:string){
        return  {...this.recipes.find(recipe=>recipe.id===id)};
    }
    
    onAddingIngredientsToShoppingList(shoppingIngredients:Ingredient[]){
        //here ingredientData is passed into shoppinhglist as a shoppingItem
          this.shoppingservice.addIngredientsToShoppingList(shoppingIngredients);
    }

    onDeleteRecipe(id:string){
        this.http.delete<{message:string}>("http://localhost:3000/api/recipes/"+id).subscribe(responseData=>{
            this.dialog.open(PopupMessagesComponent,{height:'200px', 
                                                     width:'460px',
                                                     data:{ title:"Delete recipe!",
                                                     message:responseData.message
                                                    }
           });        
            //  let RecipeIndex= this.recipes.findIndex(recipe=>recipe.id==id);
            //  this.recipes.splice(RecipeIndex,1);
             this.recipes= this.recipes.filter(recipe=>recipe.id!==id);
             this.recipesUpdated.next(this.recipes.slice());
             this.route.navigate(['/recipes']);
        });
    }

    // getUserIsAuthenticated(){
    //    return this.authService.getIsAuthenticated();
    // }
}