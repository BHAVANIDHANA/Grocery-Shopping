import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingService } from '../shopping-list/shopping.service';

@Injectable()
export class AuthService implements OnDestroy{
    
    private token:string;
    tokenTimer:any;
    private authStatusUpdated = new Subject<boolean>();
    private adminUpdated = new Subject<boolean>();
    private userAddressUpdated = new Subject<string>();
    private userItemsCountUpdated = new Subject<number>();
    isAuthenticated=false;
    isAdmin=false;
    _email:string;
    _userAddress:string;
    _userItemsCount:number;
    countSub:Subscription;

    constructor(public http: HttpClient,public router:Router, private shoppingService:ShoppingService){}
    
    getToken(){
        return this.token;
    }

    getUserItemsCount(){
        return this._userItemsCount;
    }
    getItemsCountListener(){
        return this.userItemsCountUpdated.asObservable();
    }
    getIsAuthenticated(){
        return this.isAuthenticated;
    }
    getUserAuthListener(){
        return this.authStatusUpdated.asObservable();
    }
    getIsAdmin(){
        return this.isAdmin;
    }
    getAdminListener(){
        return this.adminUpdated.asObservable();
    }
    getUserAddress(){
        return this._userAddress;
    }
    getUserAddressListener(){
        return this.userAddressUpdated.asObservable();
    }

    createUser(email:string, password:string, address:string){
        const userData = {'email':email,
                          'password':password,
                          'address':address
                         };
        
        this.http.post<{message:String}>("http://localhost:3000/api/users/signUp",userData)
        .subscribe(responseData=>{
                       alert(responseData.message);
                       this.router.navigate(['/']);
                   },error=>{
                    this.authStatusUpdated.next(false);
                   }
                  );
    }

    login(email:string, password:string){
        this._email=email;
        const authData = {
            'email':email,
            'password':password
        };        
        this.http.post<{token:string, expiresIn:number, email:string, address:string, itemsCount:number}>("http://localhost:3000/api/users/login",authData)
        .subscribe(result=>{
            this.token = result.token;            
            if(this.token){     
                const expiresInDuration=result.expiresIn;           
                //settimeout takes time in millisecs
                this.setTokenTimer(expiresInDuration);
                this.isAuthenticated=true;
                this.authStatusUpdated.next(true);
                this._userAddress=result.address;
                this.userAddressUpdated.next(result.address);
                this._userItemsCount=result.itemsCount;
                this.userItemsCountUpdated.next(result.itemsCount);
                // console.log("items count"+this.getUserItemsCount());
                const now = new Date();
                const expirationDate = new Date(now.getTime()+expiresInDuration*1000);
                console.log(expirationDate);
                this.saveAuthData(this.token,expirationDate,result.email,result.address);
                console.log(this._email);
                if(this._email=="Admin@gmail.com"){
                    this.isAdmin=true;
                    this.adminUpdated.next(true);
                }
                alert("User logged-In");
                this.router.navigate(["/"]);     

            }                         
        },error=>{
            this.authStatusUpdated.next(false);
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
            this.authStatusUpdated.next(true); 
            this._userAddress=authInformation.authAddress;
            this.userAddressUpdated.next(authInformation.authAddress); 
            this.countSub = this.shoppingService.getShoppingItemsCountUpdateListener()
            .subscribe(count=>{
                // console.log("counter"+count);
                this._userItemsCount=count;
                this.userItemsCountUpdated.next(count);
            });     
            if(authInformation.authEmail=="Admin@gmail.com"){
                this.isAdmin=true;
                this.adminUpdated.next(true);
            }
        }
    }

    logout(){
        this.token=null;
        this.authStatusUpdated.next(false);
        this.isAuthenticated=false;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.isAdmin=false;
        this.adminUpdated.next(false);
        alert("User logged-Out");
        this.router.navigate(["/"]);
    }

    private saveAuthData(token:string, expiresInDuration:Date, email:string,address:string){
        localStorage.setItem('token',token);
        localStorage.setItem('expiresIn',expiresInDuration.toISOString());
        localStorage.setItem('email',email);
        localStorage.setItem('address',address);
        // localStorage.setItem('itemsCount',itemsCount.toString());
    }

    private clearAuthData(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('email');
        localStorage.removeItem('address');
        // localStorage.removeItem('itemsCount');
    }

    private getAuthData(){
        const authToken=localStorage.getItem('token');
        const authExpiresIn=localStorage.getItem('expiresIn');
        const authEmail=localStorage.getItem('email');
        const authAddress=localStorage.getItem('address');
        // const authItemsCount=localStorage.getItem('itemsCount');
        
        if(!authToken || !authExpiresIn || !authEmail ||!authAddress){
          return;
        }
        const expiresIn=new Date(authExpiresIn)
        const authData={authToken,expiresIn, authEmail, authAddress};
      //  console.log(authData);
        return authData;
    }
    ngOnDestroy(): void {
       this.countSub.unsubscribe();
    }
}