import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../models/imdbContent';
import { ImdbContent } from '../models/imdbContentModel';

@Injectable({
  providedIn: 'root'
})
export class RapidApiService {

  constructor(private http:HttpClient) { }
  
  url = 'https://api.themoviedb.org/3/movie/';

  options = {
    method: 'GET',
    params: {
      'api_key': '43b989eab28dc9eec088dab7759c6a57',
    }
  };
  
  imdbTopMovies(): Observable<ImdbContent<Result>> {
    let newPath = this.url + "top_rated?api_key=43b989eab28dc9eec088dab7759c6a57"
    return this.http.get<ImdbContent<Result>>(newPath);
  }
  
}
