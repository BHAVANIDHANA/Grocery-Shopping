import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  
address:string;
addressSub:Subscription;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.address=this.authService.getUserAddress();
    this.addressSub=this.authService.getUserAddressListener().subscribe(userAddress=>{
      this.address=userAddress;
    })
  }
onOrder(){
  console.log("order confirmed!");
}
ngOnDestroy(): void {
  this.addressSub.unsubscribe();
}
}
