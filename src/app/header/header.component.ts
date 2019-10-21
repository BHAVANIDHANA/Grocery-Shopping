import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authStatusSub:Subscription;
  userIsAuthenticated = false;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authStatusSub = this.authService.getUserAuthListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
      
    })
  }
 
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

 onLogout(){
   this.authService.logout();
 }
}

