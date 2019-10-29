import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  id:string;
  userIsAuthenticated=false;
  isAdmin=false;
  adminSub:Subscription;
@Input() Z:Recipe;
  constructor(private recipeService:RecipeService,
              private activatedroute:ActivatedRoute,
              private authService:AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.isAdmin=this.authService.getIsAdmin();
    this.adminSub = this.authService.getAdminListener().subscribe(isInAdmin=>{
      this.isAdmin = isInAdmin;
    })
    this.id=this.activatedroute.snapshot.params['id'];
    this.Z=this.recipeService.getRecipesById(this.id);
    this.activatedroute.params.subscribe(
      (params:Params)=>{
        this.id=params['id']
        this.Z=this.recipeService.getRecipesById(this.id);
      }
    )
  }
  onSelectingIngred(){
    // console.log(this.Z.ingredients);
   this.recipeService.onAddingIngredientsToShoppingList(this.Z.ingredients);
  }
  onDeleteRecipe(){
  this.recipeService.onDeleteRecipe(this.id);
  }
  ngOnDestroy(): void {
    this.adminSub.unsubscribe();
  }
}
