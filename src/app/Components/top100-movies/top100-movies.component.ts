import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/imdbContent';
import { RapidApiService } from 'src/app/services/rapid-api.service';

@Component({
  selector: 'app-top100-movies',
  templateUrl: './top100-movies.component.html',
  styleUrls: ['./top100-movies.component.css']
})
export class Top100MoviesComponent implements OnInit {

  dataLoaded: boolean = false;

  topMovies: Result[] = [];
  posterUrl: string = "https://image.tmdb.org/t/p/w92/";

  
  constructor(private rapidApi: RapidApiService) { }

  ngOnInit(): void {
    this.getTopMovies();
  }

  getTopMovies() {
    this.rapidApi.imdbTopMovies().subscribe(response => {
      this.topMovies = response.results
      this.dataLoaded = true;
    })
  }

}
