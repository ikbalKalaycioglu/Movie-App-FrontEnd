import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { WatchList } from '../models/watchList';
import { WatchListDto } from '../models/watchListDto';

@Injectable({
  providedIn: 'root'
})
export class WatchListService {

  apiURL = "https://localhost:44341/api/watchList/"
  constructor(private httpClient: HttpClient) { }

  add(watchList: WatchList): Observable<ResponseModel> {
    let newPath = this.apiURL + "add"
    return this.httpClient.post<ResponseModel>(newPath, watchList)
  }

  getByUserId(id: number): Observable<ListResponseModel<WatchListDto>> {
    let newPath = this.apiURL + "getByUserId?id=" + id
    return this.httpClient.get<ListResponseModel<WatchListDto>>(newPath)
  }

  remove(id: number): Observable<ResponseModel> {
    let newPath = this.apiURL + "delete?id=" + id
    return this.httpClient.post<ResponseModel>(newPath, id)
  }

  changeWatched(watchList: WatchList): Observable<ResponseModel>{
    let newPath = this.apiURL + "ChangeWatched"
    return this.httpClient.post<ResponseModel>(newPath, watchList);
  }
}
