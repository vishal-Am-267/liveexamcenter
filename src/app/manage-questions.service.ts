import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ManageQuestionsService {

  header = { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTljZTRhOGU1ODY4NTE0NjEwYzhkYTUiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjM4MjQ1MjkzLCJleHAiOjE2MzgyODg0OTN9.KynmrD0f_E_Ezq9UrsSnJw5coO2y0hLgYfkL0xDcpZU' }

  subject_url = 'http://admin.liveexamcenter.in/api/subjects?term='
  topic_url = 'https://admin.liveexamcenter.in/api/topics/subject'
  common_url ='http://admin.liveexamcenter.in/api/questions'
  

  allTopic_url = 'http://admin.liveexamcenter.in/api/topics?page=1&limit=9007199254740991&term='
  topicWiseQuestion_url = 'http://admin.liveexamcenter.in/api/questions?page=1&limit=20&term=&topic='
  question_url = "http://admin.liveexamcenter.in/api/questions"
  constructor(private _http: HttpClient) { }

  getSubjectList() {
    //GET : fetching all the detail from API
    const headers = this.header
    return this._http.get(this.subject_url, {headers})

  }
  
  getTopic(id : any){
    const headers = this.header
    return this._http.get(`${this.topic_url}/${id}`, {headers})
  }


  getAllTopic(){
    const headers = this.header
    return this._http.get(this.allTopic_url, {headers})
  }

  getQuestionTopicWise(id: any){
    const headers = this.header
    return this._http.get(`${this.topicWiseQuestion_url}${id}`, {headers})
  }
  getCurrentData(id:any){
    const headers = this.header
    return this._http.get(`${this.question_url}/${id}`, {headers})
  }
  postQuestion(question : any){
    const headers = this.header
    return this._http.post<any>(this.common_url, question, {headers})
  }

  deleteQuestion(id:any){
    const headers = this.header
    return this._http.delete(`${this.common_url}/${id}`,{headers})
  }

  updateQuestion(id:any,  question : any){
    const headers = this.header
    return this._http.put(`${this.common_url}/${id}`,question , {headers})
  }

  getAllQuestions(){
    const headers = this.header
    return this._http.get(this.topicWiseQuestion_url ,{headers})
  }

}
