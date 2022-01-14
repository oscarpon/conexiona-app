import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ListWarehouseProductComponent } from '../list-warehouse-product/list-warehouse-product/list-warehouse-product.component';

@Component({
  selector: 'app-warehouse-product',
  templateUrl: './warehouse-product.component.html',
  styleUrls: ['./warehouse-product.component.css']
})
export class WarehouseProductComponent implements AfterViewInit {

  @ViewChild(ListWarehouseProductComponent) listWareHouse;

  wareHouseId: string;

  

  constructor() { }

  ngAfterViewInit(): void {
      this.wareHouseId = this.listWareHouse.warehouseId;
  }

  

}
