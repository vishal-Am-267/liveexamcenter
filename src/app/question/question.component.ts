import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  checkAll = false;
  searchText = '';
  allQuestionResult:any =[];
  allQuestionArray:any =[];
  isTopicSelected = false
  selectedOption = true;
  selectedTopic!: number
  pageNumbers!: number
  topicType: any = []
  total = ""
  topicArray: any = []
  questionResult: any = []
  selectedQuestionArray: any = []
  selectedOptionsArray:any = []
  optionsArray: any = []
  page: number = 1
  constructor(private _questions: ManageQuestionsService,private toastr: ToastrService, private rd : Renderer2, private _elementRef : ElementRef) { }

  ngOnInit(): void {
   
    this.isTopicSelected = false
    this.pageNumbers = 5
    
    this._questions.getAllQuestions().subscribe((data)=>{
      this.allQuestionResult = data
      this.allQuestionArray = this.allQuestionResult.result
      console.log(this.allQuestionArray)
      this.total = this.allQuestionArray.length
      console.log(this.total)
    })

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
    this.isTopicSelected = true
    this.pageNumbers=5
    this.optionsArray = []
    this._questions.getQuestionTopicWise(this.selectedTopic).subscribe((result) => {
      this.questionResult = result
      this.selectedQuestionArray = this.questionResult.result
      this.total = this.selectedQuestionArray.length
      console.log(this.total)
    
      console.log(this.selectedQuestionArray)
    })  
  }
  pagenumbers(e:any){
    
    this.pageNumbers = e.target.value
    console.log(this.pageNumbers)
  }

  checkAllOptions(e:any) {
  //  console.log(this.input.nativeElement.innerHtml)
    // if(this.isCheckSelected === false){
      if(e.target.checked === true){
      this.checkAll = e.target.checked
      console.log(this.checkAll)
    }
    else{
      e.target.checked = false
      this.checkAll = e.target.checked
      console.log(this.checkAll)
    }
  }
  onDelete(index:any){
   if(confirm("Are you sure you want to delete?")){
    this._questions.deleteQuestion(index).subscribe((data) =>{
      console.log(data)
      if(this.isTopicSelected)
      {
        this.questionListTopicWise()
      }
      this.ngOnInit()
      this.toastr.warning('Data Deleted Successfully!');
    })
   }
    
    
  }
}
