import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectorImage } from '../models/directorImage';
import { ListResponseModel } from '../models/listResponseModel';

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
}
