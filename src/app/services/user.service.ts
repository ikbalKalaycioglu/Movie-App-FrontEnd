import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = "https://localhost:44341/api/user/"

  constructor(private httpClient: HttpClient) { }

  getUserById(userId: number): Observable<SingleResponseModel<User>>{
    let newPath = this.apiURL + "getbyid?id=" + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

}
