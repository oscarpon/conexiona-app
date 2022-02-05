import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/models/account';
import { Products } from 'src/app/models/products';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';






@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  accounts: Account[] = [];
  products: Products[] = [];
  filterAccount = '';
  filterProduct = '';
  errorMsj: string;
  faEdit = faEdit;
  faTrash = faTrash;
  isAdministrator: boolean;
  myAccountId: string;

  constructor( 
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private accountService: AccountService,
    private productService: ProductsService,
    private tokenService: TokenService) {
   
   }

  ngOnInit() {
    this.isAdmin();
    this.getAccount();
    if(this.isAdmin()){
      this.loadAccounts();
    }
    this.loadProducts();
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
        console.log(err);
      }
    );
  }

  loadProducts(): void{
    if(this.isAdmin()){
      this.productService.all().subscribe(
        data => {
          this.products = data;
        },
        err => {
          console.log(err);
        }
      );
    }else{
      this.productService.listByAccount(this.myAccountId).subscribe(
        data => {
          this.products = data;
        },
        err => {
          console.log(err);
        }
      );
    }
    
  }

  delete(product: Products): void{
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a eliminar a ' + product.nameProduct, 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if(result.isConfirmed){
        this.productService.delete(product.id).subscribe(
          response => {
            this.products = this.products.filter(prod => prod !== product)
            Swal.fire(
              'Eliminado',
              'El producto se ha eliminado',
              'success'
            )
          },
          err => {
            this.toastr.error("Hay existencias de este producto en los almacenes.");
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

  isAdmin(): boolean{
    return this.isAdministrator = this.tokenService.isAdmin();
  }

}
