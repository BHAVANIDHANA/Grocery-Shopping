import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/Ingredient.model';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  form:FormGroup;
  editMode:boolean=false;
  selectedRecipeId:string;
  selectedRecipe:Recipe;
  recipeImageUrl:String="assets/images/default.jpg";
  dummyImageUrl:String="assets/images/default.jpg";
  uploadStatus:boolean[]=[false];
  ingredientImageUrl:String[]=[];
  ingredientSubscription:Subscription;
  _ingredients:Ingredient[];
  recipeFileToBeUpload: File=null;
  ingredientFileToBeUpload: File=null;
  _recipeId:string;

  constructor(private fb:FormBuilder, private recipeService:RecipeService, private activatedRoute: ActivatedRoute) { }
  
  createdIngredient():FormGroup{
    return this.fb.group({
      id:'',
      ingredientName: '',
      price:'',
      quantity:'',
      ingredientImage:'',
    })
  }
 
  ngOnInit() {   

    this.form = this.fb.group({
      name : new FormControl(null,{validators: [Validators.required]}),
      description: new FormControl(null,{validators: [Validators.required]}),
      image:new FormControl(null,{validators:[Validators.required]}),
      ingredients: this.fb.array([this.createdIngredient()])    
    });
    this.activatedRoute.params.subscribe(param=>{
      this._recipeId=param.id;
      if(param.id){
        this.editMode=true;
        this.selectedRecipeId=param.id;
        this.selectedRecipe=this.recipeService.getRecipesById(this.selectedRecipeId);
        console.log(this.selectedRecipe.ingredients.length);
        let length= this.selectedRecipe.ingredients.length;
        
        this.form.patchValue({
          name:this.selectedRecipe.name,
          description:this.selectedRecipe.description,
          //image:this.selectedRecipe.imagePath,
          // ingredients:this.selectedRecipe.ingredients
        });
       console.log(this.selectedRecipe.ingredients);
       this.recipeImageUrl=this.selectedRecipe.imagePath;
       this._ingredients= this.selectedRecipe.ingredients.map(ingredient=>{
         return {
           id:ingredient.id,
           name:ingredient.name,
           imagePath:ingredient.imagePath,
           price:ingredient.price,
           quantity:ingredient.quantity
         }
       });
      }
    });
}
  onRecipeImagePicked(event:Event){   
    this.recipeFileToBeUpload = (event.target as HTMLInputElement).files.item(0);
    let reader1 = new FileReader();
    reader1.onload = (event:any)=>{
      this.recipeImageUrl = event.target.result;
      this.form.patchValue({
        image: this.recipeImageUrl
      });
    }
    reader1.readAsDataURL(this.recipeFileToBeUpload);
  }

  onIngredientImagePicked(event:Event,index:number){ 
    this.uploadStatus[index]=true;
    this.ingredientFileToBeUpload = (event.target as HTMLInputElement).files.item(0);
    let reader2 = new FileReader();
    reader2.onload = (event:any)=>{
      this.ingredientImageUrl[index] = event.target.result;
      this.getIngredients().at(index).patchValue({
        ingredientImage: this.ingredientImageUrl[index]
      });
    }
    reader2.readAsDataURL(this.ingredientFileToBeUpload);
  }

  onAddIngredient(event:Event, index:number){
   this.getIngredients().push(this.createdIngredient());
    // console.log(this.form.get('ingredients').value);
    this.uploadStatus[index+1]=false;
  }
  onDeleteIngredient(index:number){
    this.getIngredients().removeAt(index);
    this.ingredientImageUrl[index]=this.dummyImageUrl;
  }
  onDeleteIngredientFromStoredRecipe(index:number){

  }
  getIngredients(){
    return this.form.get('ingredients') as FormArray;
  }

  onSaveRecipe(){ 
    if(this.editMode==true){
      return this.recipeService.updateRecipe(
        this._recipeId,
        this.form.value.name,
        this.form.value.description,
        this.recipeImageUrl,
        this.getIngredients(),
        this._ingredients,
        this.getIngredients().length
      );
    }   
    console.log(this.getIngredients().length);
    this.recipeService.addNewRecipe(
      this.form.value.name,
      this.form.value.description,
      this.form.value.image,
      this.getIngredients(),
      this.getIngredients().length
      );
  }
  
}
