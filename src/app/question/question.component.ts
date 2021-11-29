import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ManageQuestionsService } from '../manage-questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @ViewChild('multipleChoice', { static: true }) multipleChoice!: ElementRef
  @ViewChild('questionCheck', {static:true}) input! : ElementRef
 
  // questionCheck = document.getElementsByClassName('.questionCheck')

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
  constructor(private _questions: ManageQuestionsService, private rd : Renderer2, private _elementRef : ElementRef) { }

  ngOnInit(): void {
    
    this.pageNumbers = 5
    this._questions.getAllTopic().subscribe((result) => {
      this.topicType = result
      this.topicArray = this.topicType.result
      

    })
  }

  defaultButton()
  {
    console.log(this.multipleChoice.nativeElement)
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
   console.log(this.input.nativeElement.innerHtml)
  }
  onDelete(index:any){
    // this.selectedQuestionArray.splice(index,1)
    // this._questions.deleteQuestion(index).subscribe((data) =>{
    //   console.log(data)
      
    // })
    
  }
}
