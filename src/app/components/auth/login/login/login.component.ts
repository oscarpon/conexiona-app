import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import swal from 'sweetalert2';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLogginFail = false;
  loginUser: LoginUser;
  userName: string;
  password: string;
  errorMsj: string;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  fieldTextType: boolean;
  isAdministrator = false;
  myAccountId: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private cookieSrvc: CookieService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLogginFail = false;
    }
    this.getAccount();
  }

  onLogin(): void{
    this.spinner.show();
    this.loginUser = new LoginUser(this.userName, this.password);
    this.authService.login(this.loginUser).subscribe(
      data => {
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.spinner.hide();
        this.router.navigate(['/index']);
      },
      err => {
        this.spinner.hide();
        this.isLogged = false;
        this.isLogginFail = true;
        this.errorMsj = err.error.message;
        console.log(err.error.message);
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.errorMsj,
        })
      }
    )
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  isAdmin(): boolean{
    return this.isAdministrator = this.tokenService.isAdmin();
  }

  getAccount(): string{
    return this.myAccountId = this.tokenService.getAccount();
  }

}
