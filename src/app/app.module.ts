import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { AddComponent } from './question/add/add.component';
import { EditComponent } from './question/edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageQuestionsService } from './manage-questions.service';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PipesModule } from './pipes/pipes.module';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { ErrorComponent } from './error/error.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    AddComponent,
    EditComponent,
    LoginComponent,
    HeaderComponent,
    ErrorComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
    PipesModule,
    SocialLoginModule
  ],
  providers: [ManageQuestionsService,
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: "6Ld3COIZAAAAAC3A_RbO1waRz6QhrhdObYOk7b_5" },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '971623344603-0qquan9pcdb9iu7oq9genvpnel77i7oa.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
