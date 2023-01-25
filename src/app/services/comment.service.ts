import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/Comment';
import { CommentDetail } from '../models/CommentDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  ApiUrl = "https://localhost:44341/api/Comment/"

  constructor(private httpClient: HttpClient) { }

  Add(comment: Comment): Observable<ResponseModel>{
    let newPath = this.ApiUrl + "add"
    return this.httpClient.post<ResponseModel>(newPath, comment);
  }

  Delete(id: number): Observable<ResponseModel>{
    let newPath = this.ApiUrl + "delete?id=" + id
    return this.httpClient.post<ResponseModel>(newPath, id);
  }

  getByContentId(id: number): Observable<ListResponseModel<CommentDetail>>{
    let newPath = this.ApiUrl + "getByContentId?contentId=" + id
    return this.httpClient.get<ListResponseModel<CommentDetail>>(newPath);
  }
}
