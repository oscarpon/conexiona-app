import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ListWarehouseProductComponent } from '../list-warehouse-product/list-warehouse-product/list-warehouse-product.component';

@Component({
  selector: 'app-warehouse-product',
  templateUrl: './warehouse-product.component.html',
  styleUrls: ['./warehouse-product.component.css']
})
export class WarehouseProductComponent implements OnInit {


  wareHouseId: string;

  

  constructor() { }

  ngOnInit(): void {
      
  }

  loadWareHouse(wareHouseId: string){
    this.wareHouseId = wareHouseId;
  }

  

}
