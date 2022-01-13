import { Component, OnInit } from '@angular/core';
import { FormWarehouseComponent } from '../../warehouse/form-warehouse/form-warehouse.component';

@Component({
  selector: 'app-warehouse-product',
  templateUrl: './warehouse-product.component.html',
  styleUrls: ['./warehouse-product.component.css']
})
export class WarehouseProductComponent implements OnInit {

  isDisabled = true;

  constructor() { }

  ngOnInit(): void {
  }

  permitEdit(): void{
    this.isDisabled = !this.isDisabled;
  }

}
