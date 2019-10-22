import { Vegetable } from './vegetable.model';
import { Output, EventEmitter, Injectable } from '@angular/core';
import { ShoppingItem } from '../shared/shopping-item.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators/';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class VeggiesService{
    
      private veggies:Vegetable[];
      private popUpMessage:string;
      private veggiesUpdated = new Subject<Vegetable[]>();

    constructor(private shoppingservice:ShoppingService, private http : HttpClient, private authService:AuthService){
    }

    getVeggies(){
        //   return  this.veggies.slice();
       this.http.get<{message:string,veggies:any}>("http://localhost:3000/api/veggies")
       .pipe(map(veggiesData=>{
           return veggiesData.veggies.map(veggie=>{
               return {
                        id : veggie._id,
                        name : veggie.name,
                        imagePath : veggie.imagePath,
                        price : veggie.price
                      };
           });
       }))
       .subscribe(
           transformedVeggies => {
                this.veggies = transformedVeggies;
                this.veggiesUpdated.next(this.veggies.slice());
           });
    }

    addNewVeggie(name:string,imagePath:string,price:number){
        const veggieData :Vegetable={id:null,name:name,imagePath:imagePath,price:price};
        
        this.http.post<{message:string,veggieId:string}>("http://localhost:3000/api/veggies",veggieData)
        .subscribe(responseData=>{
             console.log(responseData.message);
            veggieData.id=responseData.veggieId;//not required but to be safe
            this.veggies.push(veggieData);//locally adding new data to veggies
            // and before adding the new veggie on 
            //on UI id shud be changed from null to _id that is set on the backend 
            this.veggiesUpdated.next(this.veggies.slice());
        });      

    }

    updateVeggie(id:string, name:string, imagePath:string, price:number){
        const veggieData:Vegetable = {id:id, name:name, imagePath:imagePath, price:price};
        console.log(veggieData)
        this.http.put<{message:string}>("http://localhost:3000/api/veggies/"+id,veggieData)
        .subscribe(responseData=>{
            console.log(responseData.message);   
        });
    }
    
    getVeggiesUpdateListener(){
       return this.veggiesUpdated.asObservable();
    }
    deleteVeggie(veggieId:string){
        this.http.delete("http://localhost:3000/api/veggies/"+veggieId)
        .subscribe(()=>{
            this.veggies = this.veggies.filter(veggie=>veggie.id!==veggieId);
            this.veggiesUpdated.next(this.veggies.slice());
            });
    }
    getVeggiesByIndex(indexNum:number){
        return this.veggies[indexNum];
    }

    getVeggiesById(veggieId:string){
        return {...this.veggies.find(veggie=>veggie.id===veggieId)};
    }
    onAddingVeggiesToShoppingList(shoppingData:ShoppingItem){
          this.shoppingservice.addItemsToShoppingList(shoppingData);
    }

    getUserIsAuthenticated(){
        return this.authService.getIsAuthenticated();
    }
}