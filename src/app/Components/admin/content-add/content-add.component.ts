import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { UploadFile } from 'src/app/models/uploadedFile';
import { CategoryService } from 'src/app/services/category.service';
import { ContentService } from 'src/app/services/content.service';
import { PosterService } from 'src/app/services/poster.service';

@Component({
  selector: 'app-content-add',
  templateUrl: './content-add.component.html',
  styleUrls: ['./content-add.component.css']
})
export class ContentAddComponent implements OnInit {

  contentAddForm!: FormGroup
  category: Category[] = []
  imdbRating = new FormControl(5);
  contentImagesFiles: UploadFile[] = []
  contentImagesPaths: any[] = []


  constructor(private toastr: ToastrService, private contentService: ContentService, private categoryService: CategoryService, private formBuilder: FormBuilder, private posterService: PosterService) { }

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
    if (!this.contentAddForm.valid) {
      this.toastr.error("Formunuz hatalı", "Geçersiz form");
    } else {
      let contentModel = Object.assign({}, this.contentAddForm.value)
      this.contentService.add(contentModel).subscribe(response => {
        if (this.contentImagesFiles.length === 0) {
          this.toastr.success("Content Eklendi", "Succesful!");
          this.closeContentModel()
        }
        else {
          if (this.contentImagesFiles.length > 5) {
            this.toastr.error("En fazla 5 resim yükleyebilirsiniz", "Error ");
          } else {
            this.uploadAllImagesToServer(this.contentImagesFiles, response.data).then((unUploadFileList) => {
              let unUploadedFiles: UploadFile[] = unUploadFileList;
              if (unUploadFileList.length === 0) {
                this.toastr.success("Yeni Content ve resimleri başarıyla eklendi", "İşlem başarılı");
                this.closeContentModel();
              } else {
                let failFileNameMessage: string = ""
                unUploadedFiles.forEach(file => {
                  failFileNameMessage += file.file.name + ", "
                });
                this.toastr.warning("Yeni content başarıyla eklendi fakat bazı resimler yüklenemedi. Yüklenemeyen dosyalar: " + failFileNameMessage, "İşlem kısmen başarılı");
                this.closeContentModel();
              }
            })
          }
        }
      }, errorResponse => {
        this.toastr.error(errorResponse, "Content eklenemedi");
      })
    }
  }

  private uploadAllImagesToServer(uploadFiles: UploadFile[], contentId: number): Promise<UploadFile[]> {
    return new Promise<UploadFile[]>((methodResolve) => {
      if (uploadFiles.length > 0) {
        let unUploadedFiles: UploadFile[] = []
        const allUploads = new Promise<void>(async (resolveAllUploads) => {
          let counter: number = 0;
          for (const file of uploadFiles) {
            await this.uploadImageToServer(file, contentId).then(fileStatus => {
              if (fileStatus.uploadedStatus === false) {
                unUploadedFiles.push(fileStatus);
              }
            }).then(() => {
              counter += 1;
              if (counter === uploadFiles.length) {
                resolveAllUploads();
              }
            })
          }
        })
        allUploads.then(() => {
          methodResolve(unUploadedFiles);
        })
      } else {
        let emptyArray: UploadFile[] = [];
        methodResolve(emptyArray);
      }
    })
  }

  private uploadImageToServer(uploadFile: UploadFile, contentId: number): Promise<UploadFile> {
    return new Promise<UploadFile>((result) => {
      this.posterService.add(uploadFile.file, contentId).subscribe(() => {
        uploadFile.uploadedStatus = true;
        result(uploadFile);
      }, () => {
        uploadFile.uploadedStatus = false;
        result(uploadFile);
      })
    })
  }

  deleteImageFromContentImagesList(selectedImage: UploadFile) {
    this.contentImagesFiles.splice(this.contentImagesFiles.indexOf(selectedImage), 1);
  }

  addContentImagesToContentImagesAndPathList(imageList: any) {
    if (imageList.length !== 0) {
      if (this.contentImagesFiles.length < 5) {
        for (let i = 0; i < imageList.length; i++) {
          let uploadFile = new UploadFile();
          let image = imageList[i];
          uploadFile.file = image;
          uploadFile.uploadedStatus = true;
          let preselectedFile = this.contentImagesFiles.find(uploadFile => uploadFile.file.name === image.name);
          if (preselectedFile === undefined) {
            this.addPosterToPosterPaths(image).then((success) => {
              if (success) {
                this.contentImagesFiles.push(uploadFile);
              }
            });
          } else {
            this.toastr.warning("Bu resmi daha önce listeye eklediniz", "Zaten listede");
          }
        }
      } else {
        this.toastr.error("En fazla 5 resim ekleyebilirsiniz", "Resim eklenemiyor");
      }

    }
  }

  private addPosterToPosterPaths(image: any): Promise<boolean> {
    return new Promise<boolean>((result) => {
      this.checkFileMimeType(image).then((successStatus) => {
        if (successStatus) {
          var reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = (_event) => {
            this.contentImagesPaths.push(reader.result);
            result(true);
          }
        } else {
          this.toastr.error("Yalnızca resim dosyası yükleyebilirsiniz", "Dosya eklenmedi");
          result(false);
        }
      })
    })
  }

  private checkFileMimeType(file: any): Promise<boolean> {
    return new Promise<boolean>((methodResolve) => {
      var mimeType = file.type;
      methodResolve(mimeType.match(/image\/*/) != null);
    })
  }

  closeContentModel() {
    this.contentAddForm.reset();
  }

}
