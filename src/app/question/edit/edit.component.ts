import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  richText = false
  isSelected = true
  existingOptionArray: any = []
  isOptionSelected = true
  result: any = []
  hiddenItems:any ={}
  isTopicListCalled = false
  subjectArr: any = []
  topicArr: any = []
  questionArray: any = []
  type = ""
  
  subject!: number;
  topicValue : any
  // public editQuestion!: FormGroup;

  editQuestion = this._fb.group({
    subject: ['', Validators.required],
    topic: ['', Validators.required],
    type: ['', Validators.required],
    diffLevel: ['', Validators.required],
    rightMarks: ['', Validators.required],
    wrongMarks: ['', Validators.required],
    questionText: ['', Validators.required],
    options: this._fb.array([])
    
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

  constructor(private _questions: ManageQuestionsService, private _fb: FormBuilder,private route : Router, private _router: ActivatedRoute) { }





  ngOnInit(): void {
    
    
    this._questions.getSubjectList().subscribe((res) => {
      
      this.result = res
      this.subjectArr = this.result.result
      // console.log(this.subjectArr)
    })

    this._questions.getCurrentData(this._router.snapshot.params.id).subscribe((result) => {
      
      this.questionArray = result
     
      console.log(this.questionArray)
      this.editQuestion.patchValue({
        subject: this.questionArray.subject._id,
        
        topic: this.questionArray.topic.name,
        type: this.questionArray.type,
        diffLevel: this.questionArray.diffLevel,
        rightMarks: this.questionArray.rightMarks,
        wrongMarks: this.questionArray.wrongMarks,
        questionText: this.questionArray.questionText
      })
     
    //  console.log(this.topicName)
      for (let i = 0; i < this.questionArray.options.length; i++) {
        // console.log(this.questionArray.options[i])
        this.currentQuestion(this.questionArray.options[i])
      }

    })

  }

  setExistingOptions(optionSet: any) {

  }

  topicList() {
    
    this._questions.getTopic(this.subject).subscribe((res) => {
      // console.log(this.topic)
      this.topicArr = res
      console.log(this.topicArr)
      this.isTopicListCalled = true
    })
  }


  changedEditor(event: EditorChangeContent | EditorChangeSelection) {

  }

  changeEditor() {
    this.richText = true
    this.isSelected = !this.isSelected
    !this.isSelected ? this.enable.nativeElement.innerText = "disabled rich editor" : this.enable.nativeElement.innerText = "enabled rich editor"

  }


  changeOptionEditor(e: any) {

    //  console.log(this.isOptionSelected)
    this.isOptionSelected = !this.isOptionSelected
    !this.isOptionSelected ? e.target.innerText = "disabled rich editor" : e.target.innerText = "enabled rich editor"
  }

  addOption() {
    this.formArr.push(this.initOptionRows(
    ));
  }

  removeOption(index: any) {
    this.formArr.removeAt(index);
  }


  get formArr() {
    return this.editQuestion.get('options') as FormArray;
  }

  currentQuestion(currentQuestion: any) {

    this.formArr.push(this._fb.group({
      option: [currentQuestion.option],
      isCorrect: [currentQuestion.isCorrect],
      richTextEditor: ['false']
    })) 
  }

  initOptionRows() {

    return this._fb.group({
      option: [''],
      isCorrect: ['false'],
      richTextEditor: ['false']
    });
  }

  onSubmit() {
    if(this.isTopicListCalled === false){
      this.editQuestion.value.topic = this.questionArray.topic._id
    }
    this._questions.updateQuestion(this._router.snapshot.params.id, this.editQuestion.value).subscribe(
      data => console.log('success', data),
      error => console.error('error',error)
    )
    console.log(this.editQuestion.value)
    this.route.navigate(['/question'])
  }
}




