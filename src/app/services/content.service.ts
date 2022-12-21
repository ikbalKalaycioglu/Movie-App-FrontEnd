import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Content } from '../models/content';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ContentDetail } from '../models/contentDetail';
import { SingleResponseModel } from '../models/singleResponseModel';



@Injectable({
  providedIn: 'root'
})
export class ContentService {

  apiURL = "https://localhost:44341/api/Content"

  constructor(private httpClient : HttpClient) { }

  getContents(): Observable<ListResponseModel<Content>>{
    let newPath = this.apiURL + "/getall";
    return this.httpClient.get<ListResponseModel<Content>>(newPath);
  }

  getContentsDetail(): Observable<ListResponseModel<ContentDetail>>{
    let newPath = this.apiURL + "/getcontentdetails";
    return this.httpClient.get<ListResponseModel<ContentDetail>>(newPath);
  }

  getContentDetailById(contentId:number):Observable<SingleResponseModel<ContentDetail>> {
    let newPath = this.apiURL + "/getbyid?id=" + contentId
    return this.httpClient.get<SingleResponseModel<ContentDetail>>(newPath)
  }

  getContentByCategoryId(categoryId: number): Observable<ListResponseModel<ContentDetail>>{
    let newPath = this.apiURL + "/getcontentbycategoryId?categoryId=" + categoryId;
    return this.httpClient.get<ListResponseModel<ContentDetail>>(newPath);
  }
}
