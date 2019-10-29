import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VeggiesComponent } from './veggies/veggies.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AppRoutingModule } from './app-routing.module';
import { CarouselComponent } from './carousel/carousel.component';
import { VeggiesListComponent } from './veggies/veggies-list/veggies-list.component';
import { VeggiesDetailsComponent } from './veggies/veggies-details/veggies-details.component';
import { VeggiesItemComponent } from './veggies/veggies-list/veggies-item/veggies-item.component';
import { VeggiesService } from './veggies/veggies.service';
import { ShoppingService } from './shopping-list/shopping.service';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeService } from './recipes/recipe.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { NewVeggieComponent } from './veggies/new-veggie/new-veggie.component';
import { NewRecipeComponent } from './recipes/new-recipe/new-recipe.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signUp/signUp.component';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { CheckoutComponent } from './checkout/checkout.component';
import { ErrorInterceptor } from './error-interceptor';
import { PopupMessagesComponent } from './popup-messages/popup-messages.component'
import { AngularMaterialModule } from './angular-material.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VeggiesComponent,
    RecipesComponent,
    ShoppingListComponent,
    CarouselComponent,
    VeggiesListComponent,
    VeggiesDetailsComponent,
    VeggiesItemComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailsComponent,
    DropdownDirective,
    RecipeStartComponent,
    NewVeggieComponent,
    NewRecipeComponent,
    LoginComponent,
    SignUpComponent,
    CheckoutComponent,
    PopupMessagesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [ {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
               {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true},
               VeggiesService,
               ShoppingService,
               RecipeService,
               AuthService
             ],
  bootstrap: [AppComponent],
  entryComponents:[PopupMessagesComponent]
})
export class AppModule { }
