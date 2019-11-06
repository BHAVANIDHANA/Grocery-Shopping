import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingItem } from '../shared/shopping-item.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
 
shoppedList:ShoppingItem[];
shoppingSub:Subscription;
total=0;
displayTotal;
  constructor(private shoppingService:ShoppingService, private route:Router) { }

  ngOnInit() {
    //DEFAULT SHOPPINGLIST ITEMS
    // this.shoppedList=this.shoppingService.getItems();
    this.shoppingService.getItems();
    //WHEN VEGGIES/Ingredients ARE ADDED TO THE SHOPPING LIST
    this.shoppingSub=this.shoppingService.getShoppingListUpdateListener().subscribe(
     (fullShoppingData:ShoppingItem[])=>{
       this.shoppedList=fullShoppingData;
       if(this.shoppedList.length>0){
          for(let i=0;i<this.shoppedList.length;i++){
            this.total=this.total+(this.shoppedList[i].price*this.shoppedList[i].quantity);
          }  
          this.displayTotal=this.total.toFixed(2);     
        } 
      }
    );   
  }
  onDeleteItem(itemId:string){    
     this.shoppingService.onDeletingItem(itemId);
     this.shoppingSub=this.shoppingService.shoppingListUpdated.subscribe((shoppingData:ShoppingItem[])=>{
         this.shoppedList=shoppingData;
     });
     this.total=0;
  }
  

  ngOnDestroy(): void {
    this.shoppingSub.unsubscribe();
  }   

}
