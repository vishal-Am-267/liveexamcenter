import { Component, OnInit } from '@angular/core';
import { ManageQuestionsService } from '../manage-questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  selectedOption = true
  selectedTopic!: number
  pageNumbers!: number
  topicType: any = []
  topicArray: any = []
  questionResult: any = []
  selectedQuestionArray: any = []
  selectedOptionsArray:any = []
  optionsArray: any = []
  page: number = 1
  constructor(private _questions: ManageQuestionsService) { }

  ngOnInit(): void {
    this.pageNumbers = 5
    this._questions.getAllTopic().subscribe((result) => {
      this.topicType = result
      this.topicArray = this.topicType.result
      

    })
  }

  questionListTopicWise() {
    this.pageNumbers=5
    this.optionsArray = []
    this._questions.getQuestionTopicWise(this.selectedTopic).subscribe((result) => {
      this.questionResult = result
      this.selectedQuestionArray = this.questionResult.result
      
    
      console.log(this.selectedQuestionArray)
    })  
  }
  pagenumbers(e:any){
    
    this.pageNumbers = e.target.value
    console.log(this.pageNumbers)
  }

  CheckAllOptions() {
    if (this.selectedQuestionArray.every((_eval: any) => _eval.checked == true))
      this.selectedQuestionArray.forEach((val: { checked: boolean; }) => { val.checked = false });
    else
      this.selectedQuestionArray.forEach((val: { checked: boolean; }) => { val.checked = true });
  }
}
