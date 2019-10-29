import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vegetable } from '../../vegetable.model';
import { VeggiesService } from '../../veggies.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-veggies-item',
  templateUrl: './veggies-item.component.html',
  styleUrls: ['./veggies-item.component.css']
})
export class VeggiesItemComponent implements OnInit {
@Input() veggie:Vegetable;
@Input() veggieIndex:number;
userIsAuthenticated=false;
isAdmin=false;

  constructor(private veggieService:VeggiesService, private authService:AuthService) { }

  ngOnInit() {
    this.isAdmin = this.authService.getIsAdmin();
    this.userIsAuthenticated=this.veggieService.getUserIsAuthenticated();
  }

  onDeleteVeggie(){
    // console.log(this.veggie.id);
    this.veggieService.deleteVeggie(this.veggie.id);
    
  }

}
