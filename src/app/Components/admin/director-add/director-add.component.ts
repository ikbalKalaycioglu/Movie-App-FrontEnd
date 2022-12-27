import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Content } from 'src/app/models/content';
import { ContentService } from 'src/app/services/content.service';
import { DirectorService } from 'src/app/services/director.service';

@Component({
  selector: 'app-director-add',
  templateUrl: './director-add.component.html',
  styleUrls: ['./director-add.component.css']
})
export class DirectorAddComponent implements OnInit {

  directorAddForm!: FormGroup
  content:Content[] = []

  constructor(private directorService: DirectorService, private contentService: ContentService, private toastr: ToastrService,private formBuilder :FormBuilder) { }

  ngOnInit(): void {
    this.createStarAddForm();
    this.getContent();
  }

  createStarAddForm() {
    this.directorAddForm = this.formBuilder.group({
      firstName : ["",Validators.required],
      lastName : ["",Validators.required],
      bio: ["", Validators.required],
      bornDate: ["", Validators.required],
      contentId: ["",Validators.required]
    })
  }

  getContent() {
    this.contentService.getContents().subscribe(response => {
      this.content = response.data;
    })
  }

  add() {
    if (this.directorAddForm.valid) {
      let directorModel = Object.assign({}, this.directorAddForm.value)
      this.directorService.add(directorModel).subscribe(response => {
        this.toastr.success(response.message, "Successful !")
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastr.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası")
          }
        }
      })
    } else {
      this.toastr.error("Please Fill in All Fields", "Error !")
    }
  }

  closeContentModel() {
    this.directorAddForm.reset();
  }
}
