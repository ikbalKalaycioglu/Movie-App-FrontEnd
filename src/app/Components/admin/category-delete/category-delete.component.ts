import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {

  category: Category[] = []
  currentCategory: Category = {
    id: 0,
    name: ""
  }

  constructor(private toastr: ToastrService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategory()
  }

  getCategory() {
    this.categoryService.getCategory().subscribe(response => {
      this.category = response.data;
    })
  }

  remove(id: number) {
    this.categoryService.remove(id).subscribe(response => {
      console.log(response.message);
      this.toastr.show(response.message, "Deleted !")
      setTimeout(() => {
        window.location.reload()
      }, 500);
    }, responseError => {
      this.toastr.error("Not Deleted", "Error !")
    })

  }
}
