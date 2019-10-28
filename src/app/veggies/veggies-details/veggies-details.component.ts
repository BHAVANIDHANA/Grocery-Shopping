import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Vegetable } from '../vegetable.model';
import { VeggiesService } from '../veggies.service';

@Component({
  selector: 'app-veggies-details',
  templateUrl: './veggies-details.component.html',
  styleUrls: ['./veggies-details.component.css']
})
export class VeggiesDetailsComponent implements OnInit {
index:number;
id:string;

veggie:Vegetable;
@ViewChild('quantity') quantityRef:ElementRef;

  constructor(private veggieservice:VeggiesService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.veggie=this.veggieservice.getVeggiesById(this.id);
    this.activatedRoute.params.subscribe(
      (params:Params)=>{
        this.id=params['id'];
        this.veggie=this.veggieservice.getVeggiesById(this.id);
      }
    )
  }

  onAddingToShoppingList(){
   this.veggieservice.onAddingVeggiesToShoppingList({
   id:null,
   name:this.veggie.name,
   imagePath:this.veggie.imagePath,
   price:this.veggie.price,
   quantity:this.quantityRef.nativeElement.value
});

  }

}
