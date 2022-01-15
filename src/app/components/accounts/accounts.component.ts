import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Account } from 'src/app/models/account';
import { TokenService } from 'src/app/services/token.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account.service';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { OrderModule, OrderPipe } from 'ngx-order-pipe';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  filterAccount = '';
  accounts: Account[] = [];
  isAdministrator = false;
  myAccountId: string;
  errorMsj: string;
  faEdit = faEdit;
  faTrash = faTrash;
  faEye = faEye;

  constructor(
    private accountService: AccountService,
    private tokenService: TokenService, 
    private http: HttpClient,
    private toastr: ToastrService
  ) { }


  ngOnInit() {
    this.loadAccounts();
    this.isAdmin();
    this.getAccount();
  }

  isAdmin(): boolean{
    return this.isAdministrator = this.tokenService.isAdmin();
  }

  getAccount(): string{
    return this.myAccountId = this.tokenService.getAccount();
  }

  loadAccounts(): void{
    this.accountService.all().subscribe(
      data => {
        this.accounts = data;
      },
      err => {
        this.toastr.error(err.message, "ERROR", { timeOut: 3000});
      }
    );
  }
 
  search(text: string): Account[]{
    return this.accounts.filter(account => {
      const term = text.toLowerCase();
      return account.accountName.toLowerCase().includes(term);
      });
  }

  delete(account: Account): void{
    swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a eliminar la cuenta ' + account.accountName, 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if(result.isConfirmed){
        this.accountService.delete(account.id).subscribe(
          response => {
            this.accounts = this.accounts.filter(acc => acc !== account)
            swal.fire(
              'Eliminado',
              'La cuenta se ha eliminado',
              'success'
            )
          }
        )
      }else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swal.fire(
          'Cancelado',
          'No has completado la eliminación de la cuenta',
          'error'
        )
      }
    })
  }

}
