import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Vegetable } from '../vegetable.model';
import { VeggiesService } from '../veggies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-veggies-list',
  templateUrl: './veggies-list.component.html',
  styleUrls: ['./veggies-list.component.css']
})
export class VeggiesListComponent implements OnInit,OnDestroy {
 
veggies:Vegetable[];
private veggiesSub: Subscription;

  constructor(private vegetableservice:VeggiesService) { }

  ngOnInit() {
   this.vegetableservice.getVeggies();
   this.veggiesSub = this.vegetableservice.getVeggiesUpdateListener().subscribe(veggiesData =>{
           this.veggies = veggiesData;
   });
    
  }

  ngOnDestroy(){
    this.veggiesSub.unsubscribe();
  }

}
