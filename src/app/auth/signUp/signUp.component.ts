import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
    templateUrl:'./signUp.component.html',
    styleUrls:['./signUp.component.css']
})
export class SignUpComponent{

    constructor(private authService:AuthService){}

    onSignUp(form:NgForm){
        if(form.invalid){
            return;
        }
        this.authService.createUser(form.value.email,form.value.password,form.value.address);
    }
}