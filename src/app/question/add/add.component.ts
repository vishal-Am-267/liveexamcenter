import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  @ViewChild('option', {static: true}) option! : ElementRef<HTMLInputElement>

  options = new options()
  optionArray:any = []

  changedEditor(event : EditorChangeContent | EditorChangeSelection){

  }

  selectedoption = true
  isSelected = true
  isOptionSelected = true
  result:any = []
  subjectArr:any = []
  topicArr:any =[]
  subject:any = []
  questionForm!: FormGroup ;

  

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

    this.questionForm = new FormGroup({
      'subject': new FormControl(""),
      'topic': new FormControl(""),
      'type': new FormControl(""),
      'diffLevel' :new FormControl("") ,
      'rightMarks' : new FormControl(""),
      'worngMarks' : new FormControl(""),
      'questionText' : new FormControl(""),
      // 'options' : this.optionArray
    })
  

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
  changeOptionEditor(e : any, id : any){
   
    //  console.log(this.isOptionSelected)
    this.isOptionSelected = !this.isOptionSelected 
    !this.isOptionSelected ? e.target.innerText = "disabled rich editor" : e.target.innerText = "enabled rich editor"
 }

  addOption(){
    this.options = new options()
    this.optionArray.push(this.options)
  }

  removeOption(index: any){
    this.optionArray.splice(index, 1)
  }

  change(e:any){
    console.log(e.target.id)
  }
onSubmit(data:any){
  console.log(data)
}
}
