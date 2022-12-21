import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Director } from '../models/director';
import { DirectorDetail } from '../models/directorDetail';
import { ListResponseModel } from '../models/listResponseModel';
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

  getDetailsById(directorId: number): Observable<SingleResponseModel<DirectorDetail>> {
    let newPath = this.apiURL + "GetDetailsById?id=" + directorId
    return this.httpClient.get<SingleResponseModel<DirectorDetail>>(newPath);
  }
}
