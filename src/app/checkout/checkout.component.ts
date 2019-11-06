import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PopupMessagesComponent } from '../popup-messages/popup-messages.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  
address:string;
addressSub:Subscription;
total:number=0;
alertMessage='';
  constructor(private authService:AuthService,private dialog:MatDialog, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.address=this.authService.getUserAddress();
    this.addressSub=this.authService.getUserAddressListener().subscribe(userAddress=>{
      this.address=userAddress;
    });
    this.activatedRoute.params.subscribe(params=>{
      this.total=params['total'];
    })
  }
onOrder(){
  //alert("Order confirmed!");
  this.alertMessage="Order Confirmed! Amount: "+this.total+"$";
  this.dialog.open(PopupMessagesComponent,
     {width:"450px",height:"180px",data:{ title:"Order status",message:this.alertMessage}});
}
ngOnDestroy(): void {
  this.addressSub.unsubscribe();
}
}
