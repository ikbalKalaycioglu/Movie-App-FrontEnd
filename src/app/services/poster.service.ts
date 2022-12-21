import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Poster } from '../models/poster';

@Injectable({
  providedIn: 'root'
})
export class PosterService {

  apiURL = "https://localhost:44341/api/Poster"

  constructor(private httpClient: HttpClient) { }
  
  getByContentId(contentId: number):Observable<ListResponseModel<Poster>> {
    let newPath = this.apiURL + "/GetByContentId?contentId=" + contentId
    return this.httpClient.get<ListResponseModel<Poster>>(newPath);
  }
}
