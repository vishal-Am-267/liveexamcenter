import { Component, OnInit } from '@angular/core';
import { ManageQuestionsService } from '../manage-questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  selectedTopic!: number

  topicType: any = []
  topicArray: any = []
  questionResult: any = []
  selectedQuestionArray: any = []
  selectedOptionsArray:any = []
  optionsArray: any = []
  constructor(private _questions: ManageQuestionsService) { }

  ngOnInit(): void {
    this._questions.getAllTopic().subscribe((result) => {
      this.topicType = result
      this.topicArray = this.topicType.result
      

    })
  }

  questionListTopicWise() {
    this.optionsArray = []
    this._questions.getQuestionTopicWise(this.selectedTopic).subscribe((result) => {
      this.questionResult = result
      this.selectedQuestionArray = this.questionResult.result
      
    
      console.log(this.selectedQuestionArray)
    })  
  }

}
