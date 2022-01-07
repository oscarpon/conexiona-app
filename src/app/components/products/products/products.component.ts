import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/models/account';
import { Products } from 'src/app/models/products';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { TokenService } from 'src/app/services/token.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public newProduct: Products = new Products();
  accounts: Account[] = [];
  products: Products[] = [];
  accountName = '';
  errorMsj: string;
  faPlusSquare = faPlusSquare;
  faEdit = faEdit;
  id: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private accountService: AccountService,
    private productService: ProductsService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    if(this.tokenService.isAdmin()){
      this.loadAccounts();
    }
    this.isAdmin();
    this.loadProducts();
    this.loadProduct();
  }

  public create(): void{
    
    if(this.isAdmin()){
       this.id = this.getAccountUUID(this.accountName);
    }else{
      this.id = this.tokenService.getAccount();
    }

    this.productService.save(this.newProduct, this.id).subscribe(
      data => {
        this.router.navigate(['/products/all'])
        this.toastr.success('Producto creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.errorMsj = err.error.error as string;
        this.toastr.error(this.errorMsj, 'ERROR');
      }
      
    )
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
    this.productService.all().subscribe(
      data => {
        this.products = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getAccountUUID(accountNameIn: string): string{
    this.accountService.all().subscribe(
      data => {
        this.accounts = data;
      },
      err => {
        console.log(err);
      }
    )
    for(let i = 0; i < this.accounts.length; i++){
      if(this.accounts[i].accountName.localeCompare(accountNameIn) === 0){
        return this.accounts[i].id;
      }
    }
  }

  update(): void{
    this.productService.update(this.newProduct).subscribe(
      product => {
        this.router.navigate(['/products/all']);
        this.toastr.success('Producto actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.errorMsj = err.error.error as string;
        this.toastr.error(this.errorMsj, 'ERROR');
      }
    )
  }

  loadProduct(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.productService.detail(id).subscribe((product) => this.newProduct = product);
      }
    })
  }

  isAdmin(): boolean{
    return this.tokenService.isAdmin();
  }

}
