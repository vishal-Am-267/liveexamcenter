import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './question/add/add.component';
import { EditComponent } from './question/edit/edit.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
  {path: "" , component: QuestionComponent,},
  {path: "question", component: QuestionComponent,
  children: [
    {
      path: 'add', // child route path
      component: AddComponent, // child route component that the router renders
    },
    {
      path: 'edit',
      component: EditComponent, // another child route component that the router renders
    },
  ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
