import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = {
    email: "",
    firstName: "",
    lastName: "",
    status: true,
    id: 0,
    passwordHash: "",
    passwordSalt: ""
  }

  profileForm!: FormGroup
  passwordForm!: FormGroup
  dataLoaded = false

  constructor(private userService: UserService, private authService: AuthService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserById();
    this.createPasswordForm();
    this.createProfileForm();
  }

  createProfileForm() {
    this.profileForm = this.formBuilder.group({
      userId: [Number(this.authService.getCurrentUserId)],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
    })
  }

  createPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      userId: [Number(this.authService.getCurrentUserId)],
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      repeatNewPassword: ["", Validators.required]
    })
  }

  updateUserName() {
    if (this.profileForm.valid) {
      let userModel = Object.assign({}, this.profileForm.value)
      this.userService.updateUserName(userModel).subscribe(response => {
        this.toastr.info(response.message, "Bilgiler Güncellendi")
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }, responseError => {
        this.toastr.error(responseError.error, "Fail !")
      })
    }
    else {
      this.toastr.error("Lütfen Tüm alanları doldurunuz ! ", "Fail !")
    }
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      let passwordModel = Object.assign({}, this.passwordForm.value)
      this.authService.updatePassword(passwordModel).subscribe(response => {
        this.toastr.info(response.message, "Şifre Güncellendi");
      }, responseError => {
        this.toastr.error(responseError.error, "Hata!");
      });
    }
    else {
      this.toastr.error("Lütfen tüm alanları doldurunuz.", "Hata!");
    }
  }

  getUserById() {
    this.userService.getUserById(this.authService.getCurrentUserId).subscribe(response => {
      this.user = response.data;
      this.dataLoaded = true
    })
  }

}
