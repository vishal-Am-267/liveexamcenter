import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { ManageQuestionsService } from 'src/app/manage-questions.service';
import { options } from 'src/app/options';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @ViewChild('enable', {static: true}) enable! : ElementRef

  options = new options()
  optionArray:any = []

  changedEditor(event : EditorChangeContent | EditorChangeSelection){

  }

  isSelected = true
  result:any = []
  subjectArr:any = []
  topicArr:any =[]
  subject:any = []

  selectedSubject!: number;

    questionType = [
        { id: 1, name: 'MULTIPLE CHOICE' },
        { id: 2, name: 'MULTIPLE RESPONSE' },
        { id: 3, name: 'FILL IN THE BLANKS' },
     
    ];

    difficultyLevel = [
      { id: 1, name: 'Easy' },
      { id: 2, name: 'Medium' },
      { id: 3, name: 'Hard' },
   
  ];

    
  constructor(private _questions: ManageQuestionsService) { }

  ngOnInit(): void {

    this.optionArray.push(this.options)
    this.optionArray.push(this.options)
    this.optionArray.push(this.options)
    this.optionArray.push(this.options)
    
    this._questions.getSubjectList().subscribe((res) =>{
      
      this.result = res
      this.subjectArr = this.result.result
      console.log(this.subjectArr)
    })
  }

  topicList(){
    this._questions.getTopic(this.selectedSubject).subscribe((res) =>{
      // console.log(res)
      this.topicArr = res
      
    })
  
  }

  changeEditor(){
     this.isSelected = !this.isSelected 
     !this.isSelected ? this.enable.nativeElement.innerText = "disabled rich editor" : this.enable.nativeElement.innerText = "enabled rich editor"
     
  }

  addOption(){
    this.options = new options()
    this.optionArray.push(this.options)
  }

  removeOption(index: any){
    this.optionArray.splice(index)
  }

}
