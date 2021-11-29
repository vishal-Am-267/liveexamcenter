import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { ManageQuestionsService } from 'src/app/manage-questions.service';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @ViewChild('enable', { static: true }) enable!: ElementRef
  @ViewChild('option', { static: true }) option!: ElementRef<HTMLInputElement>

  // options = new options()
  // optionArray:any = []

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {

  }

  selectedoption = true
  isSelected = true
  isOptionSelected = true
  result: any = []
  subjectArr: any = []
  topicArr: any = []
  // subject: any = []
  questionForm!: FormGroup;
  type =""
  temp = 0


  subject!: number;

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


  constructor(private _questions: ManageQuestionsService, private _fb: FormBuilder) { }

  public addMoreOption!: FormGroup;


  ngOnInit(): void {
    
    this.addMoreOption = this._fb.group({
  	  subject : ['', Validators.required],
  	  topic : ['', Validators.required],
  	  type:['', Validators.required],
      diffLevel:['', Validators.required],
      rightMarks:['', Validators.required],
      wrongMarks:['', Validators.required],
      questionText:['', Validators.required],
      options: this._fb.array([this.initOptionRows(), this.initOptionRows(), this.initOptionRows(), this.initOptionRows()])
    });

    this._questions.getSubjectList().subscribe((res) => {

      this.result = res
      this.subjectArr = this.result.result
      console.log(this.subjectArr)
    })
  }
  

  get formArr() {
    return this.addMoreOption.get('options') as FormArray;
  }

  initOptionRows() {
    return this._fb.group({
    option:[''],
    isCorrect:['false'],
    richTextEditor:['false']
    });
  }

  topicList() {
    this._questions.getTopic(this.subject).subscribe((res) => {
      // console.log(res)
      this.topicArr = res

    })

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

  change(e: any) {
    console.log(e.target.id)
  }
  onSubmit() {
    if(this.addMoreOption.invalid)
    {
      return
    }
    console.log(this.addMoreOption.value)
    // this._questions.postQuestion(this.addMoreOption.value).subscribe(
    //   data => console.log('success', data),
    //   error => console.error('error',error)
      
    // )
    this.addMoreOption.reset()
  }
  onSelect(e:any){
    // e.target.checked = ""
    console.log(e.target.checked)
    
    // if(this.temp != 0)
    // {
    //   e.target.value = true
    //   this.temp = 0
    // }
    // else
    // {
    //   e.target.value = false
    // }
  }
}
