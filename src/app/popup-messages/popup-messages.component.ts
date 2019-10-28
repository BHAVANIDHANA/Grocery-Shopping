import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-messages',
  templateUrl: './popup-messages.component.html',
  styleUrls: ['./popup-messages.component.css']
})
export class PopupMessagesComponent implements OnInit {
// message="An unknown error";
  constructor(@Inject(MAT_DIALOG_DATA) public data: {title:string,message:string}) { }

  ngOnInit() {
  }

}
