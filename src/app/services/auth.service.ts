import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = "https://localhost:44341/api/auth/"
  constructor(private httpClient: HttpClient) { }
  
  register(registerModel:RegisterModel) {
    let newPath = this.apiURL + "register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel)
  }
}
