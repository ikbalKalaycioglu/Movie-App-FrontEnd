import { Component, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  category: Category[] = [];
  user: User = {
    email: "",
    firstName: "",
    lastName: "",
    status: true,
    id:0
  }

  constructor(private categoryService: CategoryService, private toastr: ToastrService, private authService: AuthService, private userService: UserService) {


  }

  ngOnInit(): void {
    this.getCategory();
    this.getUserById();
  }

  getCategory() {
    this.categoryService.getCategory().subscribe(response => {
      this.category = response.data;
    })
  }

  getUserById() {
    this.userService.getUserById(this.authService.getCurrentUserId).subscribe(response => {
      this.user = response.data
    })
  }

  logOut() {
    localStorage.removeItem("token")
    window.location.reload();
    this.toastr.info("LogOut !")
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }


}
