import { Component, OnInit } from '@angular/core';
import { StarDetail } from 'src/app/models/starDetail';
import { StarService } from 'src/app/services/star.service';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  stars: StarDetail[] = [];
  ImageURL = "https://localhost:44341/images/Stars/"
  readMore = false;

  constructor(private starService: StarService) { }

  ngOnInit(): void {
    this.getStars();
  }

  getStars() {
    this.starService.getDetails().subscribe(response => {
      this.stars = response.data;
    })
  }

  getBio(star: StarDetail) {
    if (star.bio.length > 250) {
      let newBio = star.bio.slice(0, 250);
      this.readMore = true
      return newBio
    }
    else {
      this.readMore = false;
    return star.bio
    }
    
  }
}
