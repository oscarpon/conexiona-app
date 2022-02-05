import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  userEmail = '';
  faKey = faKey;
  errorMsj = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  restorePassword(): void{
    this.authService.forgotPassword(this.userEmail).subscribe(
      success => {
        this.router.navigate(['']);
        this.toastr.success('Hemos enviado un email con tu nueva contraseña', 'OK',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.errorMsj = err.error.error as string;
        this.toastr.error(this.errorMsj, 'ERROR');
      }
    )
  }

}
