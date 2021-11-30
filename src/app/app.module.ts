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
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    AddComponent,
    EditComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [ManageQuestionsService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
