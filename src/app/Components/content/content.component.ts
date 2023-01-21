import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Content } from 'src/app/models/content';
import { ContentDetail } from 'src/app/models/contentDetail';
import { WatchList } from 'src/app/models/watchList';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ContentService } from 'src/app/services/content.service';
import { WatchListService } from 'src/app/services/watch-list.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  content: Content[] = [];
  contentDetail: ContentDetail[] = [];
  category: Category = {
    id: 0,
    name: "",
  }

  dataLoaded = false;
  windowScrolled = false;

  totalContent: any;
  p: number = 1;
  itemPerPage: number = 8;

  posterURL = "https://localhost:44341/images/"

  constructor(private contentService: ContentService, private categoryService: CategoryService, private activatedRoute: ActivatedRoute, private watchListService: WatchListService, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }


  ngOnInit() {
    this.getContentsDetail();

    this.activatedRoute.params.subscribe(params => {
      if (params["categoryId"]) {
        this.getContentDetailByCategoryId(params["categoryId"])
        this.getCategoryById(params["categoryId"])
      }
    })
  }

  

  getContentsDetail() {
    this.contentService.getContentsDetail().subscribe(response => {
      this.contentDetail = response.data
      this.dataLoaded = true;
    })
    this.totalContent = this.contentDetail.length;
  }


  getContentDetailByCategoryId(categoryId: number) {
    this.contentService.getContentByCategoryId(categoryId).subscribe(response => {
      this.contentDetail = response.data
      this.dataLoaded = true;
    })
  }

  getCategoryById(categoryId: number) {
    this.categoryService.getById(categoryId).subscribe(response => {
      this.category = response.data
    })
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


  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
