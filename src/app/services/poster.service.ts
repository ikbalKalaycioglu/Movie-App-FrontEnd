import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Poster } from '../models/poster';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PosterService {

  apiURL = "https://localhost:44341/api/Poster"

  constructor(private httpClient: HttpClient) { }

  getByContentId(contentId: number): Observable<ListResponseModel<Poster>> {
    let newPath = this.apiURL + "/GetByContentId?contentId=" + contentId
    return this.httpClient.get<ListResponseModel<Poster>>(newPath);
  }

  add(image: File, contentId: number): Observable<ResponseModel> {
    let newPath = this.apiURL + "/add"
    const sendForm = new FormData()
    sendForm.append('contentId', JSON.stringify(contentId))
    sendForm.append('file', image, image.name)
    return this.httpClient.post<ResponseModel>(newPath, sendForm);
  }

  deleteImage(id: number): Observable<ResponseModel> {
    let newPath = this.apiURL + "/delete?id=" + id;
    return this.httpClient.post<ResponseModel>(newPath, id);
  }


}
