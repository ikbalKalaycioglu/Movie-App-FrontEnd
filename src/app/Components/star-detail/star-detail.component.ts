import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentDetail } from 'src/app/models/contentDetail';
import { StarDetail } from 'src/app/models/starDetail';
import { StarImage } from 'src/app/models/starImage';
import { ContentService } from 'src/app/services/content.service';
import { StarImageService } from 'src/app/services/star-image.service';
import { StarService } from 'src/app/services/star.service';

@Component({
  selector: 'app-star-detail',
  templateUrl: './star-detail.component.html',
  styleUrls: ['./star-detail.component.css']
})
export class StarDetailComponent implements OnInit {

  star: StarDetail = {
    id: 0,
    firstName: "string",
    lastName: "string",
    bio: "string",
    bornDate: new Date(),
    imagePath : "string",
    contentId : 0
  };
  starImage: StarImage[] = []
  ImageUrl: string = "";
  starImageURL = "https://localhost:44341/images/stars/"


  constructor(private starService: StarService,private contentService: ContentService,private starImageService:StarImageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["starId"]) {
        this.getDetailsByStarId(params["starId"]);
        this.getStarImageByStarId(params["starId"]);
      }
    })
  }

  getDetailsByStarId(starId: number) {
    this.starService.getDetailsById(starId).subscribe(response => {
      this.star = response.data;
    })
  }

  getStarImageByStarId(starId: number) {
    this.starImageService.getStarImageByStarId(starId).subscribe(response => {
      this.starImage = response.data;
      console.log(this.starImage)
    })
  }

  getImage(Image: StarImage) {
    this.ImageUrl = Image.imagePath;
  }

  putImage() {
    return this.starImageURL + this.ImageUrl
  }

}


