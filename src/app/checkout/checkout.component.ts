import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PopupMessagesComponent } from '../popup-messages/popup-messages.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  
address:string;
addressSub:Subscription;
  constructor(private authService:AuthService,private dialog:MatDialog) { }

  ngOnInit() {
    this.address=this.authService.getUserAddress();
    this.addressSub=this.authService.getUserAddressListener().subscribe(userAddress=>{
      this.address=userAddress;
    })
  }
onOrder(){
  //alert("Order confirmed!");
  this.dialog.open(PopupMessagesComponent, {width:"450px",height:"180px",data:{ title:"Order status",message:"Order Confirmed !"}});
}
ngOnDestroy(): void {
  this.addressSub.unsubscribe();
}
}
