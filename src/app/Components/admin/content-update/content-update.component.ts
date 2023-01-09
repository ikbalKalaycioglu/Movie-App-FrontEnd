import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Content } from 'src/app/models/content';
import { Poster } from 'src/app/models/poster';
import { UploadFile } from 'src/app/models/uploadedFile';
import { CategoryService } from 'src/app/services/category.service';
import { ContentService } from 'src/app/services/content.service';
import { PosterService } from 'src/app/services/poster.service';

@Component({
  selector: 'app-content-update',
  templateUrl: './content-update.component.html',
  styleUrls: ['./content-update.component.css']
})
export class ContentUpdateComponent implements OnInit {

  contentUpdateForm!: FormGroup
  category: Category[] = []
  content: Content[] = []
  poster: Poster[] = []
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


  constructor(private toastr: ToastrService, private contentService: ContentService, private categoryService: CategoryService, private formBuilder: FormBuilder, private posterService: PosterService) { }

  ngOnInit(): void {
    this.createContentUpdateForm()
    this.getCategory()
    this.getContent()
  }

  createContentUpdateForm() {
    this.contentUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
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

  getPosterByContentId(id: string) {
    let newId = Number(id);
    this.posterService.getByContentId(newId).subscribe(response => {
      this.poster = response.data;
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


  // private addPosterToPosterPaths(image: any): Promise<boolean> {
  //   return new Promise<boolean>((result) => {
  //     this.checkFileMimeType(image).then((successStatus) => {
  //       if (successStatus) {
  //         var reader = new FileReader();
  //         reader.readAsDataURL(image);
  //         reader.onload = (_event) => {
  //           this.uploadImagesPaths.push(reader.result);
  //           result(true);
  //         }
  //       } else {
  //         this.toastr.error("Yalnızca resim dosyası yükleyebilirsiniz", "Dosya eklenmedi");
  //         result(false);
  //       }
  //     })
  //   })
  // }

  // private checkFileMimeType(file: any): Promise<boolean> {
  //   return new Promise<boolean>((methodResolve) => {
  //     var mimeType = file.type;
  //     methodResolve(mimeType.match(/image\/*/) != null);
  //   })
  // }

}
