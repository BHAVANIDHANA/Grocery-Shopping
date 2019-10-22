import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ShoppingService } from '../shopping-list/shopping.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authStatusSub:Subscription;
  itemsCountSub:Subscription;
  userIsAuthenticated = false;
  itemsCount;
  constructor(private authService:AuthService, private shoppingService:ShoppingService) { }

  ngOnInit() {
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authStatusSub = this.authService.getUserAuthListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;      
    });
    if(this.userIsAuthenticated){
      this.itemsCountSub= this.shoppingService.getShoppingItemsCountUpdateListener().subscribe(count=>{
          this.itemsCount=count;
      })
    }
  }
 
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

 onLogout(){
   this.authService.logout();
 }
}

