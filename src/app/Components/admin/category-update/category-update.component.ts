import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  categoryUpdateForm!: FormGroup
  currentCategory: Category = {
    id: 0,
    name: ""
  }
  category: Category[] = []

  constructor(private toastr: ToastrService, private categoryService: CategoryService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createCategoryUpdateForm()
    this.getCategory()
  }

  createCategoryUpdateForm() {
    this.categoryUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      name: ["", Validators.required]
    })
  }

  getCategoryById(id: string) {
    let newId = Number(id);
    this.categoryService.getById(newId).subscribe(response => {
      this.currentCategory = response.data;
    })
  }

  getCategory() {
    this.categoryService.getCategory().subscribe(response => {
      this.category = response.data;
    })
  }


  update() {
    if (this.categoryUpdateForm.valid) {
      let categoryModel = Object.assign({}, this.categoryUpdateForm.value)
      this.categoryService.update(categoryModel).subscribe(response => {
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

  closeCategoryModel() {
    this.categoryUpdateForm.reset();
  }
}
