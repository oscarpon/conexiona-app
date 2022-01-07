import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faKey } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';





@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  newPassword = '';
  repeatPassword = '';
  oldPassword = '';
  errorMsj: string;
  faEdit = faEdit;
  faKey = faKey;


  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  updatePassword(): void{
    if(this.newPassword != this.repeatPassword){
      this.router.navigate(['/updatePassword'])
      this.toastr.error('Las contraseñas deben de ser iguales', 'Error')
    }else{
      this.authService.updatePassword(this.newPassword, this.oldPassword).subscribe(
        password => {
          this.router.navigate(['/index']);
          this.toastr.success('Contraseña actualizada', 'OK', {
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

}
