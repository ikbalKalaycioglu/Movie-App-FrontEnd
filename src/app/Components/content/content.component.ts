import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Content } from 'src/app/models/content';
import { ContentDetail } from 'src/app/models/contentDetail';
import { CategoryService } from 'src/app/services/category.service';
import { ContentService } from 'src/app/services/content.service';


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

  posterURL = "https://localhost:44341/images/"

  constructor(private contentService: ContentService, private categoryService: CategoryService, private activatedRoute: ActivatedRoute) { 
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



  StarTimeOut() {
    setTimeout(() => {
      this.dataLoaded = true;
    }, 1500);

  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
