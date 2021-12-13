import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  user:any;
  token:any
  constructor(private _router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.user = JSON.parse(localStorage.getItem('currentUser')!)
      this.token = JSON.parse(localStorage.getItem('googleToken')!)
      if(this.user != null || this.token != null)
      {
        
        return true;
       
      }
      else{
        this._router.navigate(['/login'])
        return false
        
      }
      // 
      

      
  }
  
}
