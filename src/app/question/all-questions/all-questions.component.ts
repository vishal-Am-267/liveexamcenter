import { Component, OnInit } from '@angular/core';
import { ManageQuestionsService } from 'src/app/manage-questions.service';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css']
})
export class AllQuestionsComponent implements OnInit {

  
  searchText = '';
  pageNumbers : any
  checkAll = false;
  page: number = 1
  constructor(private _questions : ManageQuestionsService) { }

  ngOnInit(): void {

    this.pageNumbers = 5
    
  }


  onDelete(index:any){
    if(confirm("Are you sure you want to delete?")){
     this._questions.deleteQuestion(index).subscribe((data) =>{
       console.log(data)
       this.ngOnInit()
     })
    }
}
}