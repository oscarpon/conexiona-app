import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { Account } from 'src/app/models/account';
import { NewUser } from 'src/app/models/new-user';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  filterUser = '';
  filterAccount = '';
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;
  users: NewUser[] = [];
  accounts: Account[] = [];
  isAdministrator = false;
  isManagerVar = false;
  myAccountId: string;
  errorMsj: string;


  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
    private authService: AuthService,
    private accountService: AccountService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(){
    this.spinner.show();
    this.isAdmin();
    if(this.isAdmin()){
      this.loadAccounts();
    }
    this.isManager();
    this.getAccount();
    this.loadUsers();
  }

  getAccount(): string{
    return this.myAccountId = this.tokenService.getAccount();
  }

  isManager(): boolean{
    return this.isManagerVar = this.tokenService.isGestor();
  }

  isAdmin(): boolean{
    return this.isAdministrator = this.tokenService.isAdmin();
  }

  loadUsers(): void{
    if(this.isAdmin()){
      this.authService.all().subscribe(
        data => {
          this.users = data;
          this.spinner.hide();
        },
        err => {
          console.log(err);
        }
      )
    }else{
      this.authService.listByAccount(this.myAccountId).subscribe(
        data => {
          this.users = data;
          this.spinner.hide();
        },
        err => {
          console.log(err);
        }
      )
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

  search(text: string): NewUser[]{
    return this.users.filter(user => {
      const term = text.toLowerCase();
      return user.name.toLowerCase().includes(term);
      });
  }

  delete(user: NewUser): void{
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a eliminar a ' + user.userName, 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if(result.isConfirmed){
        this.authService.delete(user.id).subscribe(
          response => {
            this.users = this.users.filter(usr => usr !== user)
            Swal.fire(
              'Eliminado',
              'El usuario se ha eliminado',
              'success'
            )
          }
        )
      }else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No has completado la eliminación del usuario',
          'error'
        )
      }
    })
  }

}
