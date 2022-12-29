import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Content } from 'src/app/models/content';
import { Director } from 'src/app/models/director';
import { ContentService } from 'src/app/services/content.service';
import { DirectorService } from 'src/app/services/director.service';

@Component({
  selector: 'app-director-update',
  templateUrl: './director-update.component.html',
  styleUrls: ['./director-update.component.css']
})
export class DirectorUpdateComponent implements OnInit {

  directorUpdateForm!: FormGroup;
  currentDirector: Director = {
    directorId: 0,
    bio: "",
    bornDate: new Date(),
    contentId: 0,
    firstName: "",
    lastName: ""
  }
  director: Director[] = []
  content: Content[] = []
  constructor(private directorService: DirectorService, private toastr: ToastrService, private contentService: ContentService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createDirectorUpdateForm();
    this.getContent();
    this.getDirector();
  }

  createDirectorUpdateForm() {
    this.directorUpdateForm = this.formBuilder.group({
      directorId: ["", Validators.required],
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

  getDirectorById(id: string) {
    let newId = Number(id)
    this.directorService.getDirectorById(newId).subscribe(response => {
      this.currentDirector = response.data
    })
  }

  getDirector() {
    this.directorService.getDirectors().subscribe(response => {
      this.director = response.data
    })
  }

  update() {
    if (this.directorUpdateForm.valid) {
      let directorModel = Object.assign({}, this.directorUpdateForm.value)
      this.directorService.update(directorModel).subscribe(response => {
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

  closeDirectorModel() {
    this.directorUpdateForm.reset();
  }
}
