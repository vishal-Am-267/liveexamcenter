import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { AddComponent } from './question/add/add.component';
import { EditComponent } from './question/edit/edit.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
  { path: "", redirectTo:'/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent ,  },
  { path: "question", component: QuestionComponent, canActivate:[AuthenticationGuard]},

  {
    path: 'add', // child route path
    component: AddComponent, canActivate:[AuthenticationGuard] // child route component that the router renders
  },
  {
    path: 'edit/:id',
    component: EditComponent, canActivate:[AuthenticationGuard]// another child route component that the router renders
  },

  
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
