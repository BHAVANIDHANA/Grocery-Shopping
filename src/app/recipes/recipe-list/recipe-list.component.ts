import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  
recipes:Recipe[];
private recipesSub: Subscription;
@Output() AlreadySelectedRecipe=new EventEmitter<Recipe>();
  constructor(private recipeservice:RecipeService) { }

  ngOnInit() {

    this.recipeservice.getRecipes();
    this.recipesSub = this.recipeservice.getRecipesUpdateListener().subscribe(recipeData =>{
          this.recipes = recipeData;
      });
  }
 
  onSelectedRecipe(selectedRecipe:Recipe){
         this.AlreadySelectedRecipe.emit(selectedRecipe);
  }
  ngOnDestroy(){
    this.recipesSub.unsubscribe();
  }
}
