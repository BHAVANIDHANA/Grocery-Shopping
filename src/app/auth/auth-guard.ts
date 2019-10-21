import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    isAuth=false;
    constructor(private authService:AuthService, private router:Router){}

    canActivate(route: import("@angular/router").ActivatedRouteSnapshot, 
                state: import("@angular/router").RouterStateSnapshot): boolean 
                | import("@angular/router").UrlTree | import("rxjs").Observable<boolean 
                | import("@angular/router").UrlTree> | Promise<boolean 
                | import("@angular/router").UrlTree> 
                {
                    this.isAuth=this.authService.getIsAuthenticated();
                    if(!this.isAuth){
                       this.router.navigate(['/login']);
                    }
                    return this.isAuth;
                }

}