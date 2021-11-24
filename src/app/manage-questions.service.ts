import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ManageQuestionsService {

  subject_url = 'http://admin.liveexamcenter.in/api/subjects?term='
  topic_url = 'https://admin.liveexamcenter.in/api/topics/subject'

  constructor(private _http: HttpClient) { }

  getSubjectList() {
    //GET : fetching all the detail from API
    const headers = { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTljZTRhOGU1ODY4NTE0NjEwYzhkYTUiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjM3NzI4Nzc5LCJleHAiOjE2Mzc3NzE5Nzl9.zpoFC5x95LY8BGz3KIyEnbajef_8p85CqyG1FvtnKb8' }
    return this._http.get(this.subject_url, {headers})

  }
  
  getTopic(id : any){
    const headers = { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTljZTRhOGU1ODY4NTE0NjEwYzhkYTUiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjM3NzI4Nzc5LCJleHAiOjE2Mzc3NzE5Nzl9.zpoFC5x95LY8BGz3KIyEnbajef_8p85CqyG1FvtnKb8' }
    return this._http.get(`${this.topic_url}/${id}`, {headers})
  }

}
