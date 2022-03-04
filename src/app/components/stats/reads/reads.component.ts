import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataFunctions } from 'src/app/functions/data-functions';
import { Read } from 'src/app/models/read';
import { Warehouse } from 'src/app/models/warehouse';
import { TokenService } from 'src/app/services/token.service';
import { WarehouseProductService } from 'src/app/services/warehouse-product.service';


@Component({
  selector: 'app-reads',
  templateUrl: './reads.component.html',
  styleUrls: ['./reads.component.css']
})
export class ReadsComponent implements OnInit {

  reads: Read[] = [];
  warehouses: Warehouse[] = [];
  myAccountId = '';
  warehouseId = '';

  constructor(
    private tokenService: TokenService,
    private wareProductService: WarehouseProductService,
    private dataFunctions: DataFunctions,
    private toastr: ToastrService
  ) { }

  ngOnInit(){
    this.getAccountId();
    this.loadWareHouses();
  }

  getAccountId(): void{
    this.myAccountId = this.tokenService.getAccount();  
  }

  loadWareHouses(): void{
    this.dataFunctions.loadWareHouses(this.myAccountId).subscribe(
      data => {
        this.warehouses = data;
      },
      err => {
        console.error(err);
      }
    )
  }

  loadReads(): void{
    this.wareProductService.findReadsByWareHouse(this.warehouseId).subscribe(
      data => {
        this.reads = data;
        if(data.length == 0){
          this.toastr.info("No existen lecturas para este almacén")
        }
      },
      err => {
        console.log(err.error);
        this.toastr.error("err", "ERROR");
      }
    )
  }

}
