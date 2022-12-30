import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login';
import { RegisterModel } from '../models/register';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/token';
import { UserPasswordModel } from '../models/userPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = "https://localhost:44341/api/auth/"

  constructor(private httpClient: HttpClient, private jwtHelperService: JwtHelperService, private router: Router) { }

  register(registerModel: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiURL + "register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, registerModel)
  }

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiURL + "login"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, loginModel)
  }

  isAuthenticated() {
    let token = localStorage.getItem("token");
    if (token) {
      if (this.jwtHelperService.isTokenExpired(token)) {
        this.router.navigate(["/login"])
        this.logOut();
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem("token")
  }

  updatePassword(userPasswordModel: UserPasswordModel) {
    let newPath = this.apiURL + "updatepassword";
    return this.httpClient.post<ResponseModel>(newPath, userPasswordModel);
  }

  get DecodedToken() {
    let token = localStorage.getItem("token") || '{}'
    return this.jwtHelperService.decodeToken(token)
  }

  get getCurrentUserId() {
    let decodedToken = this.DecodedToken;
    let userIdString = Object.keys(decodedToken).filter((t) =>
      t.endsWith('/nameidentifier')
    )[0];
    let userId: number = decodedToken[userIdString];
    return userId;
  }

  hasRole() {
    let decodedToken = this.DecodedToken
    let userRoleString = Object.keys(decodedToken).filter((t) =>
      t.endsWith('/role')
    )[0];
    let userRole: string = decodedToken[userRoleString];
    return userRole;
  }
}
