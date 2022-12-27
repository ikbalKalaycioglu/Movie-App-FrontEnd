import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Content } from 'src/app/models/content';
import { ContentService } from 'src/app/services/content.service';
import { StarService } from 'src/app/services/star.service';

@Component({
  selector: 'app-star-add',
  templateUrl: './star-add.component.html',
  styleUrls: ['./star-add.component.css']
})
export class StarAddComponent implements OnInit {

  starAddForm!: FormGroup
  content:Content[] = []

  constructor(private starService: StarService, private contentService: ContentService, private toastr: ToastrService,private formBuilder :FormBuilder) { }

  ngOnInit(): void {
    this.createStarAddForm();
    this.getContent();
  }

  createStarAddForm() {
    this.starAddForm = this.formBuilder.group({
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
    if (this.starAddForm.valid) {
      let starModel = Object.assign({}, this.starAddForm.value)
      this.starService.add(starModel).subscribe(response => {
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
    this.starAddForm.reset();
  }

}
