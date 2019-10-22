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
  itemsCountSub_1:Subscription;
  itemsCountSub_2:Subscription;
  userIsAuthenticated = false;
  itemsCount=0;
  entryMode=true;
  constructor(private authService:AuthService, private shoppingService:ShoppingService) { }

  ngOnInit() {
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authStatusSub = this.authService.getUserAuthListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;      
    });
    if(this.userIsAuthenticated){   
      if(this.entryMode){
        this.itemsCount=this.authService.getUserItemsCount();
        this.itemsCountSub_1= this.authService.getItemsCountListener().subscribe(count=>{
          this.itemsCount=count;
        });
      }
    }
  } 
  // onCart(){
  //   this.entryMode=false;
  //   console.log("entry mode"+this.entryMode);
  //   this.itemsCountSub_2= this.shoppingService.getShoppingItemsCountUpdateListener().subscribe(count=>{
  //     this.itemsCount=count;
      
  // });
  // }
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
    this.itemsCountSub_1.unsubscribe();
    this.itemsCountSub_2.unsubscribe();
  }

 onLogout(){
   this.authService.logout();
 }
}

