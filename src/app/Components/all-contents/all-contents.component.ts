import { Component, OnInit } from '@angular/core';
import { ContentDetail } from 'src/app/models/contentDetail';
import { ContentService } from 'src/app/services/content.service';

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
  
  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.getContent()
  }

  getContent() {
    this.contentService.getContentsDetail().subscribe(response => {
      this.contentDetail = response.data
      this.dataLoaded = true
    })
  }



}
