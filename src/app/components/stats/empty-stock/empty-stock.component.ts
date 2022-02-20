import { Component, OnInit } from '@angular/core';
import { wareHouseStockCero } from 'src/app/models/wareHouseStockCero';
import { TokenService } from 'src/app/services/token.service';
import { WarehouseProductService } from 'src/app/services/warehouse-product.service';

@Component({
  selector: 'app-empty-stock',
  templateUrl: './empty-stock.component.html',
  styleUrls: ['./empty-stock.component.css']
})
export class EmptyStockComponent implements OnInit {

  stockCero: wareHouseStockCero[] = [];

  constructor(
    private tokenService: TokenService,
    private warehouseproductService: WarehouseProductService
  ) { }

  ngOnInit(
  ) {
    this.findProductsStockCero(this.getAccount());
  }

  findProductsStockCero(id): void{
    this.warehouseproductService.findProductsStock0(id).subscribe(
      data => {
        this.stockCero = data;
      }
    )
  }

  public getAccount(): string{
    return this.tokenService.getAccount();
  }

}
