import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Content } from 'src/app/models/content';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-content-delete',
  templateUrl: './content-delete.component.html',
  styleUrls: ['./content-delete.component.css']
})
export class ContentDeleteComponent implements OnInit {

  currentContent: Content = {
    id: 0,
    categoryId: 0,
    description: "",
    genre: "",
    imDbRating: 0,
    playbackURL: "",
    title: "",
    writer: "",
  }

  content: Content[] = []



  constructor(private contentService: ContentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getContents()
  }

  getContents() {
    this.contentService.getContents().subscribe(response => {
      this.content = response.data
    })
  }

  remove(id: number) {
    this.contentService.remove(id).subscribe(response => {
      console.log(response.message);
      this.toastr.show(response.message, "Deleted !")
      setTimeout(() => {
        window.location.reload()
      }, 500);
    }, responseError => {
      this.toastr.error("Not Deleted", "Error !")
    })
  }

}
