import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentDetail } from 'src/app/models/contentDetail';
import { ContentService } from 'src/app/services/content.service';
import { PosterService } from 'src/app/services/poster.service';
import { Poster } from 'src/app/models/poster';
import { DirectorService } from 'src/app/services/director.service';
import { DirectorDetail } from 'src/app/models/directorDetail';
import { StarService } from 'src/app/services/star.service';
import { StarDetail } from 'src/app/models/starDetail';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { CommentDetail } from 'src/app/models/CommentDetail';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  commentAddForm!: FormGroup;

  commentLenght: number = 1;

  poster: Poster[] = [];
  directorDetail: DirectorDetail[] = [];
  starDetail: StarDetail[] = [];
  comment: CommentDetail[] = [];

  userId: number = -1;
  userName: string = "";
  contentId: number = -1;


  posterURL = "https://localhost:44341/images/"
  directorImageURL = "https://localhost:44341/images/directors/"
  starImageURL = "https://localhost:44341/images/stars/"



  constructor(private contentService: ContentService, private directorService: DirectorService, private starService: StarService, private posterService: PosterService, private activatedRoute: ActivatedRoute, private authService: AuthService, private userService: UserService, private commentService: CommentService, private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) {
    if (this.authService.isAuthenticated()) {
      this.userId = this.authService.getCurrentUserId;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["contentId"]) {
        this.contentId = params["contentId"]
        this.getContentDetailById(params["contentId"])
        this.getPosterByContentId(params["contentId"])
        this.getDirectorDetailsByContentId(params["contentId"])
        this.getStarDetailByContentId(params["contentId"])
        this.getCommentByContentId(params["contentId"])
      }
    })
    this.getUserEmail();
    this.createCommentAddForm();
  }

  createCommentAddForm() {
    this.commentAddForm = this.formBuilder.group({
      contentId: [this.contentId, Validators.required],
      userId: [this.userId, Validators.required],
      message: ["", Validators.required],
      display: true
    })
  }

  addComment() {
    if (this.userId != -1) {
      if (this.commentAddForm.valid) {
        let commentModel = Object.assign({}, this.commentAddForm.value)
        this.commentService.Add(commentModel).subscribe(response => {
          window.location.reload();
          this.toastr.success("Comment Added", response.message);
        });
      }
    } else {
      this.router.navigate(["login"]);
      this.toastr.error("Must be login !", "Error");
    }
  }

  closeCommentModel() {
    this.commentAddForm.reset();
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


  getActiveString(poster: Poster) {
    if (poster === this.poster[0]) {
      return "active"
    } else {
      return ""
    }
  }

  getUserEmail() {
    if (this.authService.isAuthenticated()) {
      this.userService.getUserById(this.userId).subscribe(response => {
        this.userName = response.data.firstName + " " + response.data.lastName
      })
    }
  }

  getCommentByContentId(contentId: number) {
    this.commentService.getByContentId(contentId).subscribe(response => {
      this.comment = response.data
    })
    
  }



}
