import { NgModule } from '@angular/core';
import{ RouterModule, Routes} from'@angular/router';
import { VeggiesComponent } from './veggies/veggies.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { VeggiesDetailsComponent } from './veggies/veggies-details/veggies-details.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { NewVeggieComponent } from './veggies/new-veggie/new-veggie.component';
import { NewRecipeComponent } from './recipes/new-recipe/new-recipe.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signUp/signUp.component';
import { AuthGuard } from './auth/auth-guard';

const appRoutes:Routes=[
{path:'',redirectTo:'/veggies',pathMatch:'full'},
{path:'veggies',component:VeggiesComponent},
{path:'veggies/:id',component:VeggiesDetailsComponent, canActivate:[AuthGuard]},
{path:'edit/:id',component:NewVeggieComponent, canActivate:[AuthGuard]},
{path:'addVeggie',component:NewVeggieComponent, canActivate:[AuthGuard]},
{path:'addRecipe',component:NewRecipeComponent, canActivate:[AuthGuard]},
{path:'recipes',component:RecipesComponent,children:[
 {path:'',component:RecipeStartComponent},
 {path:':id',component:RecipeDetailsComponent},
]},
{path:'editRecipe/:id',component:NewRecipeComponent, canActivate:[AuthGuard]},
{path:'shopping-list',component:ShoppingListComponent, canActivate:[AuthGuard]},
{path:'login',component:LoginComponent},
{path:'signUp',component:SignUpComponent},

];

@NgModule({ 
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule],
    providers:[AuthGuard]
})
export class AppRoutingModule{
 
}