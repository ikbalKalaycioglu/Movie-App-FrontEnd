import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentDetail } from 'src/app/models/contentDetail';
import { ContentService } from 'src/app/services/content.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PosterService } from 'src/app/services/poster.service';
import { Poster } from 'src/app/models/poster';
import { DirectorService } from 'src/app/services/director.service';

import { DirectorDetail } from 'src/app/models/directorDetail';
import { StarService } from 'src/app/services/star.service';
import { StarDetail } from 'src/app/models/starDetail';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {

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

  poster: Poster[] = [];
  directorDetail: DirectorDetail[] = [];
  starDetail: StarDetail[] = [];

  posterURL = "https://localhost:44341/images/"
  directorImageURL = "https://localhost:44341/images/directors/"
  starImageURL = "https://localhost:44341/images/stars/"



  constructor(private contentService:ContentService,private directorService:DirectorService,private starService:StarService ,private posterService:PosterService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["contentId"]) {
        this.getContentDetailById(params["contentId"])
        this.getPosterByContentId(params["contentId"])
        this.getDirectorDetailsByContentId(params["contentId"])
        this.getStarDetailByContentId(params["contentId"])
      }
    })
  }

  getContentDetailById(contentId: number) {
    this.contentService.getContentDetailById(contentId).subscribe(response => {
      this.contentDetail = response.data;
    })
  }

  getPosterByContentId(contentId: number) {
    this.posterService.getByContentId(contentId).subscribe(response => {
      this.poster = response.data;
    })
  }

  getDirectorDetailsByContentId(contentId: number) {
    this.directorService.getDetailsByContentId(contentId).subscribe(response => {
      this.directorDetail = response.data;
    })
  }

  getStarDetailByContentId(contentId: number) {
    this.starService.getDetailsByContentId(contentId).subscribe(response => {
      this.starDetail = response.data;
    })
  }
  

  getActiveString(poster:Poster){
    if(poster===this.poster[0]){
      return "active"
    }else{
      return ""
    }
  }
}
