import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/models/account';
import { NewUser } from 'src/app/models/new-user';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public newUser: NewUser = new NewUser();
  faEdit = faEdit;
  errorMsj: string;
  accounts: Account[] = [];
  accountName = '';
  rolesList = new Set().add('gestor').add('tablet').add('reponedor');
  rol: string;
  repeatPassword = '';
  id = 2323;
  myAccountId: string;
  
  

  constructor(
    private authService: AuthService,
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private accountService: AccountService,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isAdmin();
    if(this.isAdmin()){
      this.loadAccounts();
    }
    this.getAccount();
    this.loadUser();
  }

  public create(): void{
    if(this.isAdmin()){
      if(this.newUser.password != this.repeatPassword){
        this.router.navigate(['/users/add'])
        this.toastr.error('Las contraseñas deben de ser iguales', 'Error')
      }else{
        this.newUser.roles.push(this.rol)
        this.authService.new(this.newUser, this.accountName).subscribe(
        data => {
          this.router.navigate(['/users'])
          this.toastr.success('Usuario creado', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
        },
        err => {
          this.errorMsj = err.error.error as string;
          Swal.fire('Algo ha salido mal', err.error.error, 'error');
        }
        )
      }
    }else{
      if(this.newUser.password != this.repeatPassword){
        this.router.navigate(['users/add', this.myAccountId])
        this.toastr.error('Las contraseñas deben de ser iguales', 'Error')
      }else{
        this.newUser.roles.push(this.rol)
        this.authService.new(this.newUser, this.route.snapshot.paramMap.get('id')).subscribe(
        data => {
          this.router.navigate(['users', this.myAccountId])
          this.toastr.success('Usuario creado', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
        },
        err => {
          this.errorMsj = err.error.error as string;
          Swal.fire('Algo ha salido mal', err.error.error, 'error');
        }
        )
      }
    }
    
    
  }

  loadAccounts(): void{
    this.accountService.all().subscribe(
      data => {
        this.accounts = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  loadUser(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.authService.detail(id).subscribe((user) => this.newUser = user);
      }
    })
  }

  update(): void{
    this.authService.update(this.newUser).subscribe(
      user => {
        this.router.navigate(['/users']);
        this.toastr.success('Usuario actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.errorMsj = err.error.error as string;
        Swal.fire('Ooopsss', err.error.error, 'error');
      }
    )
  }

  isAdmin(): boolean{
    return this.tokenService.isAdmin();
  }

  getAccount(): string{
    return this.myAccountId = this.tokenService.getAccount();
  }

}
