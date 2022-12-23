import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response => {
        this.toastr.info(response.message,"Login Successful !")
        window.location.href = "/"
        localStorage.setItem("token",response.data.token)
      }, responseError => {
        this.toastr.error(responseError.error, "Error !")
      })
    } else {
      this.toastr.error("Please Fill in All Fields", "Error !")
    }
  }
}
