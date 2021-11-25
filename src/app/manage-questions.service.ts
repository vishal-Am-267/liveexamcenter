import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ManageQuestionsService {

  subject_url = 'http://admin.liveexamcenter.in/api/subjects?term='
  topic_url = 'https://admin.liveexamcenter.in/api/topics/subject'
  allTopic_url = 'http://admin.liveexamcenter.in/api/topics?page=1&limit=9007199254740991&term='
  constructor(private _http: HttpClient) { }

  getSubjectList() {
    //GET : fetching all the detail from API
    const headers = { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTljZTRhOGU1ODY4NTE0NjEwYzhkYTUiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjM3ODE1Mzc3LCJleHAiOjE2Mzc4NTg1Nzd9.KlT99CO5QtzPuyTr50BBpbnda3ET5UEFf4dJpjFCvCM' }
    return this._http.get(this.subject_url, {headers})

  }
  
  getTopic(id : any){
    const headers = { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTljZTRhOGU1ODY4NTE0NjEwYzhkYTUiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjM3ODE1Mzc3LCJleHAiOjE2Mzc4NTg1Nzd9.KlT99CO5QtzPuyTr50BBpbnda3ET5UEFf4dJpjFCvCM' }
    return this._http.get(`${this.topic_url}/${id}`, {headers})
  }


  getAllTopic(){
    const headers = { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTljZTRhOGU1ODY4NTE0NjEwYzhkYTUiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjM3ODE1Mzc3LCJleHAiOjE2Mzc4NTg1Nzd9.KlT99CO5QtzPuyTr50BBpbnda3ET5UEFf4dJpjFCvCM' }
    return this._http.get(this.allTopic_url, {headers})
  }

}
