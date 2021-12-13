import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLoggedIn = false
  googleLoggedIn = false
  user:any
  token:any

  constructor(private authService: SocialAuthService,private _toastr: ToastrService, private _router : Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser')!)
    this.token = JSON.parse(localStorage.getItem('googleToken')!)
    
    if(this.user != null){
      this.userLoggedIn = true
      console.log(this.userLoggedIn)
    }
    else{
      this.userLoggedIn = false
    }

    if(this.token != null){
      this.googleLoggedIn = true
      console.log(this.googleLoggedIn)
    }
    else{
      this.googleLoggedIn = false
    }
    
  }
logout(){
  localStorage.clear()
  this._router.navigate(['/login'])
  this._toastr.warning('logout Successfully')
  // this.signOut()
}

signOut(): void {
  this.authService.signOut();
 
  localStorage.clear()
  this._router.navigate(['/login'])
  this._toastr.warning('logout Successfully')
}
}
