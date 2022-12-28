import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Content } from 'src/app/models/content';
import { DirectorDetail } from 'src/app/models/directorDetail';
import { StarDetail } from 'src/app/models/starDetail';
import { CategoryService } from 'src/app/services/category.service';
import { ContentService } from 'src/app/services/content.service';
import { DirectorService } from 'src/app/services/director.service';
import { StarService } from 'src/app/services/star.service';

@Component({
  selector: 'app-content-update',
  templateUrl: './content-update.component.html',
  styleUrls: ['./content-update.component.css']
})
export class ContentUpdateComponent implements OnInit {

  contentUpdateForm!: FormGroup
  category: Category[] = []
  content: Content[] = []
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
  imdbRating = new FormControl(5);


  constructor(private toastr: ToastrService, private contentService: ContentService, private categoryService: CategoryService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createContentUpdateForm()
    this.getCategory()
    this.getContent()
  }

  createContentUpdateForm() {
    this.contentUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
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

  getContent() {
    this.contentService.getContents().subscribe(response => {
      this.content = response.data
    })
  }

  getContentById(id: string) {
    let newId = Number(id);
    this.contentService.getContentById(newId).subscribe(response => {
      this.currentContent = response.data
    })
  }

  update() {
    this.contentUpdateForm.get('imDbRating')?.setValue(this.imdbRating.value);
    if (this.contentUpdateForm.valid) {
      let contentModel = Object.assign({}, this.contentUpdateForm.value)
      this.contentService.update(contentModel).subscribe(response => {
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
    this.contentUpdateForm.reset();
  }



}
