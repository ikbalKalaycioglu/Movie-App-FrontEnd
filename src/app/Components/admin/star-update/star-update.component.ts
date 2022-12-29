import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Content } from 'src/app/models/content';
import { Star } from 'src/app/models/star';
import { ContentService } from 'src/app/services/content.service';
import { StarService } from 'src/app/services/star.service';

@Component({
  selector: 'app-star-update',
  templateUrl: './star-update.component.html',
  styleUrls: ['./star-update.component.css']
})
export class StarUpdateComponent implements OnInit {

  starUpdateForm!: FormGroup;
  currentStar: Star = {
    starId: 0,
    bio: "",
    bornDate: new Date(),
    contentId: 0,
    firstName: "",
    lastName: ""
  }
  star: Star[] = []
  content: Content[] = []
  constructor(private starService: StarService, private toastr: ToastrService, private contentService: ContentService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createStarUpdateForm();
    this.getContent();
    this.getStar();
  }

  createStarUpdateForm() {
    this.starUpdateForm = this.formBuilder.group({
      starId: ["", Validators.required],
      bio: ["", Validators.required],
      bornDate: ["", Validators.required],
      contentId: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required]
    })
  }

  getContent() {
    this.contentService.getContents().subscribe(response => {
      this.content = response.data
    })
  }

  getStarById(id: string) {
    let newId = Number(id)
    this.starService.getStarById(newId).subscribe(response => {
      this.currentStar = response.data
    })
  }

  getStar() {
    this.starService.getStar().subscribe(response => {
      this.star = response.data
    })
  }

  update() {
    if (this.starUpdateForm.valid) {
      let starModel = Object.assign({}, this.starUpdateForm.value)
      this.starService.update(starModel).subscribe(response => {
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

  closeStarModel() {
    this.starUpdateForm.reset();
  }

}
