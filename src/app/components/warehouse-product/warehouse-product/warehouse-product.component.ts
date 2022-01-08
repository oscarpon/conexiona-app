import { Component, OnInit } from '@angular/core';
import { FormWarehouseComponent } from '../../warehouse/form-warehouse/form-warehouse.component';

@Component({
  selector: 'app-warehouse-product',
  templateUrl: './warehouse-product.component.html',
  styleUrls: ['./warehouse-product.component.css']
})
export class WarehouseProductComponent implements OnInit {

  showFormVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  showForm(){
    return !this.showFormVisible;
  }

}
