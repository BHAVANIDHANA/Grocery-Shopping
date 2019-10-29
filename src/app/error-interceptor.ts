import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupMessagesComponent } from './popup-messages/popup-messages.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(private dialog:MatDialog){}

    intercept(req:HttpRequest<any>, next:HttpHandler){
        return next.handle(req).pipe(
            catchError((error:HttpErrorResponse)=>{
                console.log(error);
                // console.log(error.error.message);
                this.dialog.open(PopupMessagesComponent,{height:'200px', 
                                                         width:'460px', 
                                                         data:{ title:"Error Occured !",
                                                                message:error.error.message
                                                              }
                                                        }); 
                return throwError(error);
            })
        )
    }
}