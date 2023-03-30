import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { UserUpdateName } from '../models/userUpdateName';
import { VerifyResetToken } from '../models/verifyResetToken';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = "https://localhost:44341/api/User/"

  constructor(private httpClient: HttpClient) { }

  getUserById(userId: number): Observable<SingleResponseModel<User>> {
    let newPath = this.apiURL + "getbyid?id=" + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  updateUserName(user: UserUpdateName) {
    let newPath = this.apiURL + "updateUserName";
    return this.httpClient.post<ResponseModel>(newPath, user);
  }

  forgotPassword(email: string) {
    let newPath = this.apiURL + "forgotPassword?email=" + email;
    return this.httpClient.post(newPath, email);
  }

  verifyResetToken(verifyResetToken: VerifyResetToken): Observable<ResponseModel> {
    let newPath = this.apiURL + "verifyResetToken";
    return this.httpClient.post<ResponseModel>(newPath, verifyResetToken);
  }
  updatePassword(email: string, resetToken: string, password: string, confirmPassword: string): Observable<ResponseModel> {
    let newPath = this.apiURL + "updatePassword";
    return this.httpClient.post<ResponseModel>(newPath, { email: email, resetToken: resetToken, password: password, confirmPassword: confirmPassword })
  }

}
