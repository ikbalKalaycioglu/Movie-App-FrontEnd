import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  /**
   *
   */
  constructor(private userService: UserService, private toastr: ToastrService, private spinner: NgxSpinnerService) {

  }

  forgotPassword(email: string) {
    this.spinner.show();
    this.userService.forgotPassword(email).subscribe(data => {
      this.spinner.hide()
      this.toastr.success("Mail Başarılı bir şekilde Gönderildi", "Başarılı");
    }, error => {
      this.spinner.hide()
      this.toastr.error("Mail Gönderilemedi", "Hata");
    });
  }
}
