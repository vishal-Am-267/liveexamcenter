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
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    QuillModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [ManageQuestionsService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
