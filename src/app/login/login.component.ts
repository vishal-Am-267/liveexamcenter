import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';
import { ManageQuestionsService } from '../manage-questions.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('password', { static: true }) password?: ElementRef

  public loginForm!: FormGroup
  generatedToken: any
  passwordTypeText = false
  submitted = false
  user!: SocialUser;
  loggedIn!: boolean;
  idTokenVar!: any
  payload: any = {}

  googleLoginOptions = {
    scope: 'profile email'
  };

  constructor(private authService: SocialAuthService, private _route: Router, private _login: ManageQuestionsService, private _toatr: ToastrService, private _fb: FormBuilder, private recaptchaV3Service: ReCaptchaV3Service) { }

  ngOnInit(): void {

    this.signOut()

    if (localStorage.getItem('currentUser') || localStorage.getItem('googleToken')) {
      this._route.navigate(['/question'])
    }
    else {
      this._route.navigate(['/login'])
    }
    this.createLoginForm()
    this.recaptchaV3Service.execute('login')
      .subscribe((token) => {
        this.generatedToken = token
      });

  }

  createLoginForm() {

    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      reCaptchaToken: []
    })
  }

  onSubmit() {
    this.submitted = true
    if (this.loginForm.invalid) {
      return
    }

    this.loginForm.value.reCaptchaToken = this.generatedToken
    this._login.login(this.loginForm.value).subscribe(
      data => {
        console.log('success', data)
        localStorage.setItem('currentUser', JSON.stringify(data.user))
        this._toatr.success("Welcome Back !", data.user.firstName)
        this._route.navigate(['/question'])
      },
      error => {
        console.error('error', error)

        this._toatr.error(error.statusText, error.status)
        this.loginForm.reset()
        // this._route.navigate(['/login'])
      }

    )


  }
  changeType(e: any) {
   
    if (this.password?.nativeElement.type === 'password') {
      this.passwordTypeText = true
      this.password.nativeElement.type = 'text'
    }
    else {
      this.passwordTypeText = false
      this.password!.nativeElement.type = 'password'
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, this.googleLoginOptions ).then((data) => {
      console.log(data);
      this.idTokenVar = data.idToken
      this.payload.idToken = this.idTokenVar
      this.payload.reCaptchaToken = this.generatedToken
      console.log(this.payload)
      this._login.loginWithGoogle(this.payload).subscribe(
              data => { 
              
              console.log('success', data) 
              localStorage.setItem('googleToken', JSON.stringify(data.googlePayload.idToken))
              this._toatr.success("Welcome Back !", data.googlePayload.name)
              
              this._route.navigate(['/question'])
            
            }
          )
      
    }).catch(data => {
      // this.authService.signOut();
      // localStorage.clear();
      // this._toatr.warning("error")
      // this._route.navigate(['/login']);
      console.log(data)
    });

  // signInWithGoogle(): void {

  //   this.authService.authState.subscribe((user) => {

  //     this.idTokenVar = user.idToken
  //     this.payload.idToken = this.idTokenVar
  //     this.payload.reCaptchaToken = this.generatedToken
  //     console.log(this.payload)
  //     this._login.loginWithGoogle(this.payload).subscribe(
  //       data => { 
        
  //       console.log('success', data) 
  //       localStorage.setItem('googleToken', JSON.stringify(data.googlePayload.idToken))
  //       this._toatr.success("Welcome Back !", data.googlePayload.name)
        
  //       this._route.navigate(['/question'])
      
  //     },
  //       error => { console.error(error) 
  //         localStorage.clear()
  //         this._route.navigate(['/login'])
  //         this._toatr.error(error.error.message, error.status)
  //         // this.signOut()
  //         // this.refreshToken()
  //       }

  //     )

  //     this.loggedIn = (user != null);
  //   });
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, this.googleLoginOptions);




  }
  signOut(): void {
    this.authService.signOut();
  }
 

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

}
