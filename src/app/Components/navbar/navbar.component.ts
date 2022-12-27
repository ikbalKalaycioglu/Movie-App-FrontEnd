import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    id: 0,
    passwordHash: "",
    passwordSalt: ""
  }

  constructor(private categoryService: CategoryService, private toastr: ToastrService, private authService: AuthService, private userService: UserService, private router: Router) {


  }

  ngOnInit(): void {
    this.getCategory();
    this.getUserById();
    this.checkIfAdmin();
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
    this.router.navigate(["/"]);
    this.toastr.info("LogOut !")
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  checkIfAdmin() {
    if (this.authService.isAuthenticated()) {
      if (this.authService.hasRole() == "admin") {
        return true
      }
      else {
        return false
      }
    } else {
      return false
    }
  }


}
