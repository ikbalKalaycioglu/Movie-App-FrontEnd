import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
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

  add(image: File, starId: number): Observable<ResponseModel>{
    let newPath = this.apiURL + "add"
    const sendForm = new FormData()
    sendForm.append('starId', JSON.stringify(starId))
    sendForm.append('file', image, image.name)
    return this.http.post<ResponseModel>(newPath, sendForm);
  }

  deleteImage(id: number): Observable<ResponseModel> {
    let newPath = this.apiURL + "/delete?id=" + id;
    return this.http.post<ResponseModel>(newPath, id);
  }
}
