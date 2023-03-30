import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VerifyResetToken } from 'src/app/models/verifyResetToken';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  verifyResetToken: VerifyResetToken = {
    email: "",
    resetToken: ""
  };
  state: boolean = false

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private spinner: NgxSpinnerService,private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: async params => {
        this.verifyResetToken.email = params["email"];
        this.verifyResetToken.resetToken = params["resetToken"];
        this.userService.verifyResetToken(this.verifyResetToken).subscribe(data => {
          this.state = data.success;
        });
      }
    })
  }

  updatePassword(password: string, confirmPassword: string) {
    this.spinner.show();
    if (password === confirmPassword) {
      this.activatedRoute.params.subscribe({
        next: params => {
          const email: string = params["email"];
          const resetToken: string = params["resetToken"];
          this.userService.updatePassword(email, resetToken, password, confirmPassword).subscribe(data => {
            this.spinner.hide();
            this.toastr.success("Şifre Başarıyla Eklendi", "Başarılı")
            this.router.navigate(["/login"])
          }, error => {
            this.spinner.hide();
            this.toastr.error("", "Hata");
          })
        }
      })
    } else {
      this.spinner.hide();
      this.toastr.warning("şifreler uyuşmuyor", "")
    }

  }

}
