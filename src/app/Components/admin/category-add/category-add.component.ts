import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  categoryAddForm!: FormGroup

  constructor(private toastr: ToastrService, private categoryService: CategoryService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createCategoryAddForm();
  }

  createCategoryAddForm() {
    this.categoryAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  add() {
    if (this.categoryAddForm.valid) {
      let categoryModel = Object.assign({}, this.categoryAddForm.value)
      this.categoryService.add(categoryModel).subscribe(response => {
        this.toastr.success(response.message, "Successful !")
        setTimeout(() => {
          window.location.reload()
        }, 1000);
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
    this.categoryAddForm.reset();
  }

}
