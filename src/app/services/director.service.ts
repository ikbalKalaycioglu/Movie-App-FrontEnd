import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Director } from '../models/director';
import { DirectorDetail } from '../models/directorDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  apiURL = "https://localhost:44341/api/Director/"

  constructor(private httpClient: HttpClient) { }

  getDetailsByContentId(contentId: number): Observable<ListResponseModel<DirectorDetail>> {
    let newPath = this.apiURL + "GetDetailsByContentId?id=" + contentId
    return this.httpClient.get<ListResponseModel<DirectorDetail>>(newPath);
  }

  getAll(): Observable<ListResponseModel<DirectorDetail>> {
    let newPath = this.apiURL + "getdetails"
    return this.httpClient.get<ListResponseModel<DirectorDetail>>(newPath);
  }

  getDirectors(): Observable<ListResponseModel<Director>>{
    let newPath = this.apiURL + "getall"
    return this.httpClient.get<ListResponseModel<Director>>(newPath);
  }

  getDirectorById(id: number): Observable<SingleResponseModel<Director>>{
    let newPath = this.apiURL + "getById?id=" + id
    return this.httpClient.get<SingleResponseModel<Director>>(newPath)
  }

  getDetailsById(directorId: number): Observable<SingleResponseModel<DirectorDetail>> {
    let newPath = this.apiURL + "GetDetailsById?id=" + directorId
    return this.httpClient.get<SingleResponseModel<DirectorDetail>>(newPath);
  }

  add(director: Director): Observable<SingleResponseModel<number>> {
    let newPath = this.apiURL + "add"
    return this.httpClient.post<SingleResponseModel<number>>(newPath, director);
  }

  update(director: Director): Observable<ResponseModel>{
    let newPath = this.apiURL + "update"
    return this.httpClient.post<ResponseModel>(newPath, director);
  }

  remove(id: number): Observable<ResponseModel>{
    let newPath = this.apiURL + "delete?id=" + id
    return this.httpClient.post<ResponseModel>(newPath, id);
  }
}
