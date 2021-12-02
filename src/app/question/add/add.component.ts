import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { ToastrService } from 'ngx-toastr';
import { ManageQuestionsService } from 'src/app/manage-questions.service';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @ViewChild('enable', { static: true }) enable!: ElementRef
  // @ViewChild('option', { static: true }) option!: ElementRef<HTMLInputElement>

  // options = new options()
  // optionArray:any = []

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {

  }
  rowClicked : any
  selectedoption = true
  submitted = false
  isSelected = true
  temp = -1
  isOptionSelected = true
  result: any = []
  subjectArr: any = []
  hiddenItems:any ={}
  topicArr: any = []
  correctOptionSelected = false
  // subject: any = []
  questionForm!: FormGroup;
  type =""
  


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


  constructor(private _questions: ManageQuestionsService, private _fb: FormBuilder, private toastr: ToastrService) { }

  public addMoreOption!: FormGroup;


  ngOnInit(): void {
    this.submitted = false
    this.correctOptionSelected = false
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
    option:['', Validators.required],
    isCorrect:[false, Validators.required],
    richTextEditor:[false, Validators.required]
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
    if(this.isSelected === false){

    }
    else{

    }
  }
  changeOptionEditor(index:any, e:any) {
    
   
    this.hiddenItems[index] = !this.hiddenItems[index]
    console.log(this.hiddenItems[index])
      this.hiddenItems[index] ? e.target.innerText = "Disabled rich editor" : e.target.innerText = "Enabled rich editor"
      if(this.hiddenItems[index]){
        console.log(this.addMoreOption.value)
        this.addMoreOption.value.options[index].richTextEditor = true
        console.log("entered  ")
      }
     
      // this.addMoreOption.value.options[index].isCorrect = false
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
    this.submitted = true
    console.log(this.addMoreOption.value)
    if(this.addMoreOption.invalid)
    {
      return
    }
    console.log(this.addMoreOption.value)
    this._questions.postQuestion(this.addMoreOption.value).subscribe(
      data => console.log('success', data),
      error => console.error('error',error)
      
    )
    this.toastr.success('Data addded Successfully!');
      this.addMoreOption.reset()
    
  }
  onSelect(e:any, index:any){
    // e.target.checked = ""
    this.correctOptionSelected = true
    console.log(e.target.checked)
    if(this.temp != -1){
      this.addMoreOption.value.options[this.temp].isCorrect = false
    }
   
      this.addMoreOption.value.options[index].isCorrect = true
      this.temp = index
   
 
  }
}
