import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { ManageQuestionsService } from 'src/app/manage-questions.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @ViewChild('enable', { static: true }) enable!: ElementRef

  selectedoption = true
  isSelected = true
  isOptionSelected = true
  result: any = []
  subjectArr: any = []
  topicArr: any = []
  questionArray:any =[]
  type =""
  subject!: string;

  // public addMoreOption!: FormGroup;

  editQuestion = this._fb.group({
    subject : ['', Validators.required],
    topic : ['', Validators.required],
    type:['', Validators.required],
    diffLevel:['', Validators.required],
    rightMarks:['', Validators.required],
    wrongMarks:['', Validators.required],
    questionText:['', Validators.required],
    options: this._fb.array([this.initOptionRows(), this.initOptionRows(), this.initOptionRows(), this.initOptionRows()])
  });

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

  constructor(private _questions: ManageQuestionsService, private _fb: FormBuilder, private _router : ActivatedRoute) { }

  

  

  ngOnInit(): void {
   
    this._questions.getSubjectList().subscribe((res) => {

      this.result = res
      this.subjectArr = this.result.result
      console.log(this.subjectArr)
    })

    this._questions.getCurrentData(this._router.snapshot.params.id).subscribe((result) =>{
      this.questionArray = result
      this.editQuestion = this._fb.group({
        subject : [this.questionArray.subject.name, Validators.required],
        topic : [this.questionArray.topic.name, Validators.required],
        type:[this.questionArray.type, Validators.required],
        diffLevel:[this.questionArray.diffLevel, Validators.required],
        rightMarks:[this.questionArray.rightMarks, Validators.required],
        wrongMarks:[this.questionArray.wrongMarks, Validators.required],
        questionText:[this.questionArray.questionText, Validators.required],
        
        options: this._fb.array([this.initOptionRows(), this.initOptionRows(), this.initOptionRows(), this.initOptionRows()])
      });

      
      
    })
   
  }

  

  topicList() {
    this._questions.getTopic(this.subject).subscribe((res) => {
      // console.log(res)
      this.topicArr = res

    })
  }


  changedEditor(event: EditorChangeContent | EditorChangeSelection) {

  }

  changeEditor() {
    this.isSelected = !this.isSelected
    !this.isSelected ? this.enable.nativeElement.innerText = "disabled rich editor" : this.enable.nativeElement.innerText = "enabled rich editor"

  }


  changeOptionEditor(e: any) {

    //  console.log(this.isOptionSelected)
    this.isOptionSelected = !this.isOptionSelected
    !this.isOptionSelected ? e.target.innerText = "disabled rich editor" : e.target.innerText = "enabled rich editor"
  }

  addOption() {
    this.formArr.push(this.initOptionRows());
  }

  removeOption(index : any) {
    this.formArr.removeAt(index);
  }

  
  get formArr() {
    return this.editQuestion.get('options') as FormArray;
  }
  
  initOptionRows() {
    
    return this._fb.group({
    option:[''],
    isCorrect:['false'],
    richTextEditor:['false']
    });
  }
  
  onSubmit() {
    // console.log(this.addMoreOption)
  }
}




