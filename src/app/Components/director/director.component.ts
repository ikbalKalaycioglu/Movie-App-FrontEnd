import { Component, OnInit } from '@angular/core';
import { DirectorDetail } from 'src/app/models/directorDetail';
import { DirectorService } from 'src/app/services/director.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

  directors: DirectorDetail[] = [];
  ImageURL = "https://localhost:44341/images/Directors/"
  readMore = false;

  constructor(private directorService: DirectorService) { }

  ngOnInit(): void {
    this.getDirectorDetails();
  }

  getDirectorDetails() {
    this.directorService.getAll().subscribe(response => {
      this.directors = response.data;
    })
  }

  getBio(director: DirectorDetail) {
    if (director.bio.length > 250) {
      let newBio = director.bio.slice(0, 250);
      this.readMore = true
      return newBio
    }
    else {
      this.readMore = false;
      return director.bio
    }
  }
}
