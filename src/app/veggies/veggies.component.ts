import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vegetable } from './vegetable.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-veggies',
  templateUrl: './veggies.component.html',
  styleUrls: ['./veggies.component.css']
})
export class VeggiesComponent implements OnInit, OnDestroy {
 
  authStatusSub:Subscription;
  selectedVeggies:Vegetable;
  userIsAuthenticated=false;
  isAdmin=false;
  adminSub:Subscription;

  constructor(private authService:AuthService){}

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
