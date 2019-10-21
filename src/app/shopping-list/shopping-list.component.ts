import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingItem } from '../shared/shopping-item.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
 
shoppedList:ShoppingItem[];
shoppingSub:Subscription;
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit() {
    //DEFAULT SHOPPINGLIST ITEMS
    // this.shoppedList=this.shoppingService.getItems();
    this.shoppingService.getItems();
    //WHEN VEGGIES/Ingredients ARE ADDED TO THE SHOPPING LIST
    this.shoppingSub=this.shoppingService.getShoppingListUpdateListener().subscribe(
     (fullShoppingData:ShoppingItem[])=>{
       this.shoppedList=fullShoppingData;
     }
   );
  
   
  }
  onDeleteItem(itemId:string){
     this.shoppingService.onDeletingItem(itemId);
     this.shoppingSub=this.shoppingService.shoppingListUpdated.subscribe((shoppingData:ShoppingItem[])=>{
         this.shoppedList=shoppingData;
     });
  }

  ngOnDestroy(): void {
    this.shoppingSub.unsubscribe();
  }
  

}
