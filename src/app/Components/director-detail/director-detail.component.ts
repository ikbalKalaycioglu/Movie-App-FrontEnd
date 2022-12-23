import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentDetail } from 'src/app/models/contentDetail';
import { DirectorDetail } from 'src/app/models/directorDetail';
import { DirectorImage } from 'src/app/models/directorImage';
import { ContentService } from 'src/app/services/content.service';
import { DirectorImageService } from 'src/app/services/director-image.service';
import { DirectorService } from 'src/app/services/director.service';

@Component({
  selector: 'app-director-detail',
  templateUrl: './director-detail.component.html',
  styleUrls: ['./director-detail.component.css']
})
export class DirectorDetailComponent implements OnInit {

  director: DirectorDetail = {
    id: 0,
    bio: "",
    bornDate: new Date(),
    contentId: 0,
    firstName: "",
    lastName: "",
    imagePath: ""
  };
  contentDetail: ContentDetail = {
    id: 0,
    title: "string",
    description: "string",
    directorName: "string",
    imDbRating: 0,
    writer: "string",
    starName: "string",
    categoryName: "string",
    categoryId: 0,
    genre: "string",
    posterPath: "string",
    playbackURL: "string"
  };
  ImageUrl: string = ""
  directorImageURL = "https://localhost:44341/images/directors/"
  directorImage: DirectorImage[] = []
  constructor(private directorService: DirectorService, private directorImageService :DirectorImageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["directorId"]) {
        this.getDetailsById(params["directorId"]);
        this.getDirectorImageById(params["directorId"]);
      }
    })
  }

  getDetailsById(directorId: number) {
    this.directorService.getDetailsById(directorId).subscribe(response => {
      this.director = response.data;
    })
  }

  getDirectorImageById(directorId: number) {
    this.directorImageService.getByDirectorId(directorId).subscribe(response => {
      this.directorImage = response.data
    })
  }

  getImage(Image: DirectorImage) {
    this.ImageUrl = Image.imagePath;
  }

  putImage() {
    return this.directorImageURL + this.ImageUrl
  }
}
