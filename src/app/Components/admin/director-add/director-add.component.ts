import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Content } from 'src/app/models/content';
import { UploadFile } from 'src/app/models/uploadedFile';
import { ContentService } from 'src/app/services/content.service';
import { DirectorImageService } from 'src/app/services/director-image.service';
import { DirectorService } from 'src/app/services/director.service';

@Component({
  selector: 'app-director-add',
  templateUrl: './director-add.component.html',
  styleUrls: ['./director-add.component.css']
})
export class DirectorAddComponent implements OnInit {

  directorAddForm!: FormGroup
  content: Content[] = []
  contentImagesFiles: UploadFile[] = []
  contentImagesPaths: any[] = []

  constructor(private directorService: DirectorService, private contentService: ContentService, private toastr: ToastrService,private formBuilder :FormBuilder,private directorImageService:DirectorImageService) { }

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
    if (!this.directorAddForm.valid) {
      this.toastr.error("Formunuz hatalı", "Geçersiz form");
    } else {
      let contentModel = Object.assign({}, this.directorAddForm.value)
      this.directorService.add(contentModel).subscribe(response => {
        if (this.contentImagesFiles.length === 0) {
          this.toastr.success("Director Eklendi", "Succesful!");
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
        else {
          if (this.contentImagesFiles.length > 5) {
            this.toastr.error("En fazla 5 resim yükleyebilirsiniz", "Error ");
          } else {
            this.uploadAllImagesToServer(this.contentImagesFiles, response.data).then((unUploadFileList) => {
              let unUploadedFiles: UploadFile[] = unUploadFileList;
              if (unUploadFileList.length === 0) {
                this.toastr.success("Yeni Director ve resimleri başarıyla eklendi", "İşlem başarılı");
                setTimeout(() => {
                  window.location.reload()
                }, 1000);
              } else {
                let failFileNameMessage: string = ""
                unUploadedFiles.forEach(file => {
                  failFileNameMessage += file.file.name + ", "
                });
                this.toastr.warning("Yeni Director başarıyla eklendi fakat bazı resimler yüklenemedi. Yüklenemeyen dosyalar: " + failFileNameMessage, "İşlem kısmen başarılı");
                setTimeout(() => {
                  window.location.reload()
                }, 1000);
              }
            })
          }
        }
      }, errorResponse => {
        this.toastr.error(errorResponse, "Director eklenemedi");
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
      this.directorImageService.add(uploadFile.file, contentId).subscribe(() => {
        uploadFile.uploadedStatus = true;
        result(uploadFile);
      }, (hata) => {
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
    this.contentImagesFiles = [];
    this.contentImagesPaths = [];
    this.directorAddForm.reset();
  }
}
