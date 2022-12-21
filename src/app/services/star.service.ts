import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { StarDetail } from '../models/starDetail';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  apiURL = "https://localhost:44341/api/Star/"


  constructor(private httpClient: HttpClient) { }

  getDetailsByContentId(contentId: number): Observable<ListResponseModel<StarDetail>> {
    let newPath = this.apiURL + "getDetailsByContentId?id=" + contentId;
    return this.httpClient.get<ListResponseModel<StarDetail>>(newPath);
  }

  getDetails(): Observable<ListResponseModel<StarDetail>>{
    let newPath = this.apiURL + "getDetails";
    return this.httpClient.get<ListResponseModel<StarDetail>>(newPath);
  }
}
