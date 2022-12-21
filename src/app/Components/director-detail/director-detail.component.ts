import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentDetail } from 'src/app/models/contentDetail';
import { DirectorDetail } from 'src/app/models/directorDetail';
import { ContentService } from 'src/app/services/content.service';
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
    imagePath : ""
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

  constructor(private directorService: DirectorService, private contentService: ContentService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["directorId"]) {
        this.getDetailsById(params["directorId"]);
      }
    })
  }
  getContentById(contentId: number) {
    this.contentService.getContentDetailById(contentId).subscribe(response => {
      this.contentDetail = response.data;
      console.log(this.contentDetail)
    })
  }

  getDetailsById(directorId: number) {
    this.directorService.getDetailsById(directorId).subscribe(response => {
      this.director = response.data;
      console.log(this.director)

    })
  }

}
