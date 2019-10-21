import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})
export class LoginComponent{
    constructor(private authService:AuthService){

    }

    onLogin(form:NgForm){
        if(form.invalid){
            return;
        }
        this.authService.login(form.value.email, form.value.password);
    }
}