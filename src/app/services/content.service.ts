import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Content } from '../models/content';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ContentDetail } from '../models/contentDetail';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';



@Injectable({
  providedIn: 'root'
})
export class ContentService {

  apiURL = "https://localhost:44341/api/Content"

  constructor(private httpClient: HttpClient) { }

  getContents(): Observable<ListResponseModel<Content>> {
    let newPath = this.apiURL + "/getall";
    return this.httpClient.get<ListResponseModel<Content>>(newPath);
  }

  getContentById(id: number): Observable<SingleResponseModel<Content>> {
    let newPath = this.apiURL + "/id?id=" + id
    return this.httpClient.get<SingleResponseModel<Content>>(newPath)
  }

  getContentsDetail(): Observable<ListResponseModel<ContentDetail>> {
    let newPath = this.apiURL + "/getcontentdetails";
    return this.httpClient.get<ListResponseModel<ContentDetail>>(newPath);
  }

  getContentDetailById(contentId: number): Observable<SingleResponseModel<ContentDetail>> {
    let newPath = this.apiURL + "/getbyid?id=" + contentId
    return this.httpClient.get<SingleResponseModel<ContentDetail>>(newPath)
  }

  getContentByCategoryId(categoryId: number): Observable<ListResponseModel<ContentDetail>> {
    let newPath = this.apiURL + "/getcontentbycategoryId?categoryId=" + categoryId;
    return this.httpClient.get<ListResponseModel<ContentDetail>>(newPath);
  }

  add(content: Content): Observable<ResponseModel> {
    let newPath = this.apiURL + "/add"
    return this.httpClient.post<ResponseModel>(newPath, content);
  }

  update(content: Content): Observable<ResponseModel> {
    let newPath = this.apiURL + "/update"
    return this.httpClient.post<ResponseModel>(newPath, content);
  }

  remove(id: number): Observable<ResponseModel> {
    let newPath = this.apiURL + "/delete?id=" + id
    return this.httpClient.post<ResponseModel>(newPath,id);

  }
}
