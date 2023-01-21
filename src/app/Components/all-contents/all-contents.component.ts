import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentDetail } from 'src/app/models/contentDetail';
import { WatchList } from 'src/app/models/watchList';
import { AuthService } from 'src/app/services/auth.service';
import { ContentService } from 'src/app/services/content.service';
import { WatchListService } from 'src/app/services/watch-list.service';

@Component({
  selector: 'app-all-contents',
  templateUrl: './all-contents.component.html',
  styleUrls: ['./all-contents.component.css']
})
export class AllContentsComponent implements OnInit {

  dataLoaded = false
  contentDetail: ContentDetail[] = []
  posterURL = "https://localhost:44341/images/"
  filterText = "";
  totalContent: any;
  p: number = 1;
  itemPerPage: number = 8;


  constructor(private contentService: ContentService, private authService: AuthService, private watchListService: WatchListService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getContent()
  }

  getContent() {
    this.contentService.getContentsDetail().subscribe(response => {
      this.contentDetail = response.data
      this.dataLoaded = true
    })
    this.totalContent = this.contentDetail.length;
  }

  addToWatchList(id: number) {
    if (this.authService.isAuthenticated()) {
      let watchListModel: WatchList = {
        contentId: id,
        userId: this.authService.getCurrentUserId,
        watched: false
      }
      this.watchListService.add(watchListModel).subscribe(response => {
        this.toastr.success(response.message, "Content Added to Watchlist")
      }, responseError => {
        this.toastr.error(responseError.error.message, "Error !")
      })
    }
    else {
      this.toastr.info("You must Login", "Info !")
      this.router.navigate(["/login"]);
    }
  }



}
