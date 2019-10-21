import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService{
    private token:string;
    tokenTimer:any;
    private authStatusListener = new Subject<boolean>();
    private adminListener = new Subject<boolean>();
    isAuthenticated=false;
    isAdmin=false;
    _email:string;

    constructor(public http: HttpClient,public router:Router){}
    
    getToken(){
        return this.token;
    }

    getIsAuthenticated(){
        return this.isAuthenticated;
    }
    getUserAuthListener(){
        return this.authStatusListener.asObservable();
    }
    getIsAdmin(){
        return this.isAdmin;
    }
    getAdminListener(){
        return this.adminListener.asObservable();
    }

    createUser(email:string, password:string, address:string){
        const userData = {'email':email,
                          'password':password,
                          'address':address
                         };
        
        this.http.post<{message:String}>("http://localhost:3000/api/users/signUp",userData)
        .subscribe(responseData=>{
            console.log(responseData.message);
        });
    }

    login(email:string, password:string){
        this._email=email;
        const authData = {
            'email':email,
            'password':password
        };        
        this.http.post<{token:string, expiresIn:number, email:string}>("http://localhost:3000/api/users/login",authData)
        .subscribe(result=>{
            this.token = result.token;            
            if(this.token){     
                const expiresInDuration=result.expiresIn;           
                //settimeout takes time in millisecs
                this.setTokenTimer(expiresInDuration);
                this.isAuthenticated=true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime()+expiresInDuration*1000);
                console.log(expirationDate);
                this.saveAuthData(this.token,expirationDate,result.email);
                console.log(this._email);
                if(this._email=="Admin@gmail.com"){
                    this.isAdmin=true;
                    this.adminListener.next(true);
                }
                this.router.navigate(["/"]);       
            }                         
        });         
    }

    private setTokenTimer(duration:number){
        this.tokenTimer=setTimeout(()=>{
            this.logout();
        },duration*1000);
    }

    autoAuthUser(){
        const authInformation=this.getAuthData();
        if(!authInformation){
            return;
        }
        console.log(authInformation);
        const now = new Date();
        const leftTime = authInformation.expiresIn.getTime()-now.getTime();
        console.log(leftTime);
        if(leftTime>0){
            this.token=authInformation.authToken;
            this.setTokenTimer(leftTime/1000);
            this.isAuthenticated=true;
            this.authStatusListener.next(true);            
            if(authInformation.authEmail=="Admin@gmail.com"){
                this.isAdmin=true;
                this.adminListener.next(true);
            }
        }
    }

    logout(){
        this.token=null;
        this.authStatusListener.next(false);
        this.isAuthenticated=false;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.isAdmin=false;
        this.adminListener.next(false);
        this.router.navigate(["/"]);
    }

    private saveAuthData(token:string, expiresInDuration:Date, email:string){
        localStorage.setItem('token',token);
        localStorage.setItem('expiresIn',expiresInDuration.toISOString());
        localStorage.setItem('email',email);
    }

    private clearAuthData(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('email');
    }

    private getAuthData(){
        const authToken=localStorage.getItem('token');
        const authExpiresIn=localStorage.getItem('expiresIn');
        const authEmail=localStorage.getItem('email');
        
        if(!authToken || !authExpiresIn || !authEmail){
          return;
        }
        const expiresIn=new Date(authExpiresIn)
        const authData={authToken,expiresIn, authEmail};
      //  console.log(authData);
        return authData;
       

    }
}