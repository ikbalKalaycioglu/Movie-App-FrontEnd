import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { StarImage } from '../models/starImage';

@Injectable({
  providedIn: 'root'
})
export class StarImageService {

  apiURL = "https://localhost:44341/api/starImage/"


  constructor(private http: HttpClient) { }
  
  getStarImageByStarId(starId: number):Observable<ListResponseModel<StarImage>> {
    let newPath = this.apiURL + "GetByStarId?starId=" + starId
    return this.http.get<ListResponseModel<StarImage>>(newPath);
  }
}
