import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/models/warehouse';
import { WarehouseProduct } from 'src/app/models/warehouseProduct';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { WarehouseProductService } from 'src/app/services/warehouse-product.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-list-warehouse-product',
  templateUrl: './list-warehouse-product.component.html',
  styleUrls: ['./list-warehouse-product.component.css']
})
export class ListWarehouseProductComponent implements OnInit {

  warehouseProducts: WarehouseProduct[] = [];
  warehouses: Warehouse[] = [];
  warehouseId = '';


  constructor(
    private authService: AuthService,
    private warehouseProductService: WarehouseProductService,
    private tokenService: TokenService,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit() {
    this.loadWarehouses();
  }

  loadWarehouses(): void{
    this.warehouseService.all().subscribe(
      data => {
        this.warehouses = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  loadWarehouseProducts(): void{
    this.warehouseProductService.getWarehouseProductsByWarehouse(this.warehouseId).subscribe(
      data => {
        this.warehouseProducts = data;
      }, 
      err => {
        console.log(err);
      }
    )
  }



}
