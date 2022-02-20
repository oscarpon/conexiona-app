import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { WarehouseProductService } from 'src/app/services/warehouse-product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isAdministrator = false;
  isGestorVar = false;
  isTablet = false;
  productsStockCero = 0;

  constructor(
    private tokenService: TokenService,
    private warehouseproductService: WarehouseProductService
  ) { }

  ngOnInit()  {
    this.isAdmin();
    this.isGestor();
    this.isTabletFunc();
    if(this.isGestor){
      this.findProductsStockCero(this.getAccount());
    }
  }

  isAdmin(): boolean{
    return this.isAdministrator = this.tokenService.isAdmin();
  }

  isGestor(): boolean{
    return this.isGestorVar = this.tokenService.isGestor();
  }

  isTabletFunc(): boolean{
    return this.isTablet = this.tokenService.isTablet();
  }

  public getAccount(): string{
    return this.tokenService.getAccount();
  }

  findProductsStockCero(id): void{
    this.warehouseproductService.findProductsStock0(id).subscribe(
      data => {
        this.productsStockCero = data.length;
      }
    )
  }



}
