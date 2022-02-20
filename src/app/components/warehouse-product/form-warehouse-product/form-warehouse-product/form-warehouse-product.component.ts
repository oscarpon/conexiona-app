import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/products';
import { Warehouse } from 'src/app/models/warehouse';
import { WarehouseProduct } from 'src/app/models/warehouseProduct';
import { ProductsService } from 'src/app/services/products.service';
import { TokenService } from 'src/app/services/token.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { ToastrService } from 'ngx-toastr';
import { WarehouseProductService } from 'src/app/services/warehouse-product.service';
import { Device } from 'src/app/models/device';

@Component({
  selector: 'app-form-warehouse-product',
  templateUrl: './form-warehouse-product.component.html',
  styleUrls: ['./form-warehouse-product.component.css']
})
export class FormWarehouseProductComponent implements OnInit {
  
  public newWarehouseProduct: WarehouseProduct = new WarehouseProduct();
  wareHouses: Warehouse[] = [];
  products: Products[] = [];
  errorMsj: string;
  stock: number;
  myAccountId = '';
  warehouse = '';
  product = '';
  deviceName = '';
  idBasket = '';


  constructor(
    private router: Router,
    private wareHouseService: WarehouseService,
    private productService: ProductsService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private wareHouseProductService: WarehouseProductService
  ) { }

  ngOnInit() {
    this.getAccount();
    this.loadProductsByAccount(this.getAccount());
    this.loadWareHousesByAccount(this.getAccount());
  }

  loadProductsByAccount(id: string): void{
    if(this.isAdmin()){
      this.productService.all().subscribe(
        data => {
          this.products = data;
        },
      err => {
        this.toastr.error(err.message, "ERROR");
      }
      );
    }else{
      this.productService.listByAccount(id).subscribe(
        data => {
          this.products = data;
        },
        err => {
          this.toastr.error(err.message, "ERROR");
        }
      );
    } 
  }

  loadWareHousesByAccount(id: string): void{
    if(this.isAdmin()){
      this.wareHouseService.all().subscribe(
        data => {
          this.wareHouses = data;
        },
      err => {
        this.toastr.error(err.message, "ERROR");
      }
      );
    }else{
      this.wareHouseService.getbyAccount(id).subscribe(
        data => {
          this.wareHouses = data;
        },
        err => {
          this.toastr.error(err.message, "ERROR");
        }
      );
    } 
  }

  public getAccount(): string{
    return this.tokenService.getAccount();
  }

  public isAdmin(): boolean{
    return this.tokenService.isAdmin();
  }

  public create(): void{
    console.log(this.warehouse);
    this.wareHouseProductService.new(this.newWarehouseProduct, this.newWarehouseProduct.warehouse).subscribe(
      data =>{
        this.router.navigate(['/warehouse-product'])
        this.toastr.success('Producto añadido correctamente al almacén', 'OK',{
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
