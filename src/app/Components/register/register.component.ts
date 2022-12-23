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

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ["",Validators.required],
      lastName:["",Validators.required],
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value)
    }
  }
}
