import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit,OnDestroy {
    authStatusSub:Subscription;
    userIsAuthenticated=false;
    adminSub:Subscription;
    isAdmin=false;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated=this.authService.getIsAuthenticated();
    this.authStatusSub=this.authService.getUserAuthListener().subscribe(isAuthenticated=>{
    this.userIsAuthenticated=isAuthenticated;
    });
    this.isAdmin=this.authService.getIsAdmin();
    // console.log(this.isAdmin);
    this.adminSub = this.authService.getAdminListener().subscribe(isAnAdmin=>{
    this.isAdmin=isAnAdmin;
    });
  }
  ngOnDestroy(): void {
   this.authStatusSub.unsubscribe();
   this.adminSub.unsubscribe();
  }

}
