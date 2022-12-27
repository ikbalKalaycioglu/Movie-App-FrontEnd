import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiURL = "https://localhost:44341/api/Category/"

  constructor(private httpClient: HttpClient) { }

  getCategory(): Observable<ListResponseModel<Category>> {
    let newPath = this.apiURL + "getall"
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }

  getById(categoryId: number): Observable<SingleResponseModel<Category>> {
    let newPath = this.apiURL + "getbyid?id=" + categoryId
    return this.httpClient.get<SingleResponseModel<Category>>(newPath);
  }

  add(category: Category): Observable<ResponseModel> {
    let newPath = this.apiURL + "add"
    return this.httpClient.post<ResponseModel>(newPath, category);
  }
}
