import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectorImage } from '../models/directorImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class DirectorImageService {

  apiURL = "https://localhost:44341/api/DirectorImage/"

  constructor(private httpClient: HttpClient) { }
  
  getByDirectorId(directorId: number):Observable<ListResponseModel<DirectorImage>> {
    let newPath = this.apiURL + "getByDirectorId?id=" + directorId
    return this.httpClient.get<ListResponseModel<DirectorImage>>(newPath);
  }

  add(image: File, directorId: number): Observable<ResponseModel>{
    let newPath = this.apiURL + "add"
    const sendForm = new FormData()
    sendForm.append('directorId', JSON.stringify(directorId))
    sendForm.append('file', image, image.name)
    return this.httpClient.post<ResponseModel>(newPath, sendForm);
  }

  deleteImage(id: number): Observable<ResponseModel> {
    let newPath = this.apiURL + "/delete?id=" + id;
    return this.httpClient.post<ResponseModel>(newPath, id);
  }
}
