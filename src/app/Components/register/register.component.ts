import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.createRegisterForm()

  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).subscribe(response => {
        this.toastr.info(response.message, "Register Completed");
        localStorage.setItem("token", response.data.token)
      }, responseError => {
        this.toastr.error(responseError.error, "Fail !");
      })
    }
    else {
      this.toastr.error("Please Fill in All Fields","Error !")
    }
  }
}
