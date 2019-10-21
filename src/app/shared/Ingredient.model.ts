import { ShoppingItem } from './shopping-item.model';

export class Ingredient{
    public id: string;
    public name:string;
    public imagePath:string;
    public price:number;
    public quantity:number;
 
    constructor(id:string, name:string,imagePath:string,price:number,quantity:number){
        this.id=id;
        this.name=name;
        this.imagePath=imagePath;
        this.price=price;
        this.quantity=quantity;
    }
}