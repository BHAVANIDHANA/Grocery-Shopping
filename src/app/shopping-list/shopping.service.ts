import { Output, Injectable } from '@angular/core';
import { ShoppingItem } from '../shared/shopping-item.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
// import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingService{
 @Output() shoppingListUpdated=new Subject<ShoppingItem[]>()  
 private shoppingList:ShoppingItem[]=[];

 constructor(private http:HttpClient){}
   
    getItems(){
        this.http.get<{message:string, shoppingItems:any}>
        ("http://localhost:3000/api/shoppingItems")
        .pipe(map(recipesData=>{
            return recipesData.shoppingItems.map(item=>{
                return {
                    id: item._id,
                    name: item.name,
                    imagePath: item.imagePath,
                    price: item.price,
                    quantity: item.quantity
                }
            })
        }) )
        .subscribe(transformedItems=>{
           // console.log(transformedItems);
           this.shoppingList = transformedItems;
           this.shoppingListUpdated.next(this.shoppingList.slice());
        });
    }

    getShoppingListUpdateListener(){
        return this.shoppingListUpdated.asObservable();
     }

    addShoppingItems(shoppingData:ShoppingItem){
       //all shopping items must be posted with 
      const transformedShoppingData={
           id:null,
           name:shoppingData.name,
           imagePath:shoppingData.imagePath,
           price:shoppingData.price,
           quantity:shoppingData.quantity
       };
       this.http.post<{message:string, addedItem:ShoppingItem}>("http://localhost:3000/api/shoppingItems",transformedShoppingData).subscribe(responseData=>{
           console.log(responseData.message);
         this.shoppingList.push(transformedShoppingData);
         this.shoppingListUpdated.next(this.shoppingList.slice());
       })
       
    }
    addItemsToShoppingList(shoppingData:ShoppingItem){
        console.log(shoppingData);
        this.addShoppingItems(shoppingData);
    }
    
    addIngredientsToShoppingList(ingredients:ShoppingItem[]){
        for(let i=0;i<ingredients.length;i++){
            this.addShoppingItems(ingredients[i]);
        }
    }
   
    onDeletingItem(toBeDeletedItemId:string){        
        // console.log(toBeDeletedItemId);        
        this.http.delete<{message:string}>("http://localhost:3000/api/shoppingItems/"+toBeDeletedItemId)
        .subscribe(
            responseData=>{
                console.log(responseData.message);
                
                this.shoppingList=this.shoppingList.filter(item=>item.id!==toBeDeletedItemId);
                this.shoppingListUpdated.next(this.shoppingList.slice());
            }
        )
        
        
    }
   
}