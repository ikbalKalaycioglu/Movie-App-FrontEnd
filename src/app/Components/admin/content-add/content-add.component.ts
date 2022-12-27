import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { DirectorDetail } from 'src/app/models/directorDetail';
import { StarDetail } from 'src/app/models/starDetail';
import { CategoryService } from 'src/app/services/category.service';
import { ContentService } from 'src/app/services/content.service';
import { DirectorService } from 'src/app/services/director.service';
import { StarService } from 'src/app/services/star.service';

@Component({
  selector: 'app-content-add',
  templateUrl: './content-add.component.html',
  styleUrls: ['./content-add.component.css']
})
export class ContentAddComponent implements OnInit {

  contentAddForm!: FormGroup
  category: Category[] = []
  star: StarDetail[] = []
  director: DirectorDetail[] = []
  imdbRating = new FormControl(5);


  constructor(private toastr: ToastrService, private contentService: ContentService, private categoryService: CategoryService, private formBuilder: FormBuilder, private starService: StarService, private directorService: DirectorService) { }

  ngOnInit(): void {
    this.createContentAddForm()
    this.getCategory()
  }

  createContentAddForm() {
    this.contentAddForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      imDbRating: new FormControl(null),
      writer: ["", Validators.required],
      categoryId: ["", Validators.required],
      genre: ["", Validators.required],
      playbackURL: ["", Validators.required]
    })
  }

  getCategory() {
    this.categoryService.getCategory().subscribe(response => {
      this.category = response.data;
    })
  }

  add() {
    this.contentAddForm.get('imDbRating')?.setValue(this.imdbRating.value);
    if (this.contentAddForm.valid) {
      let contentModel = Object.assign({}, this.contentAddForm.value)
      this.contentService.add(contentModel).subscribe(response => {
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
    this.contentAddForm.reset();
  }

}
