import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplacementItems } from 'src/app/models/replacementItems';
import { WarehouseProduct } from 'src/app/models/warehouseProduct';
import { TokenService } from 'src/app/services/token.service';
import { WarehouseProductService } from 'src/app/services/warehouse-product.service';
import { formatDate } from '@angular/common';
import { Products } from 'src/app/models/products';
import { RepositionService } from 'src/app/services/reposition.service';
import { Replacement } from 'src/app/models/replacement';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reposition-warehouse',
  templateUrl: './reposition-warehouse.component.html',
  styleUrls: ['./reposition-warehouse.component.css']
})
export class RepositionWarehouseComponent implements OnInit {

  warehouse = '';
  errorMsj = '';
  successMsj = '';
  user = '';
  product = '';
  quantity: number;
  replacementItems: Array<ReplacementItems> = [];
  warehouseProducts: WarehouseProduct[] = [];
  localDate = formatDate(new Date(), 'dd/MM/yyyy hh:mm', 'en');
  newReplacement: Replacement = new Replacement;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private warehouseProductService: WarehouseProductService,
    private repositionService: RepositionService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.loadWarehouse();
    this.getUserName();
  }

  loadWarehouse(): void {
    this.activatedRoute.params.subscribe(params => {
      this.warehouse = params['id'];
      if(this.warehouse){
        this.warehouseProductService.getWarehouseProductsByWarehouse(this.warehouse).subscribe(
          data => {
            this.warehouseProducts = data;
          }
        )
      }
    })
  }

  getUserName(): void{
    this.user = this.tokenService.getUserName();
  }

  addReplacementItem(quantity, product): void{
    const item = new ReplacementItems();
    console.log(product);
    item.product = product;
    item.quantity = quantity;
    this.replacementItems.push(item);
  }

  public create(): void{
    this.newReplacement.user = this.user;
    this.newReplacement.warehouse = this.warehouse;
    this.newReplacement.replacementItems = this.replacementItems;
    this.repositionService.new(this.newReplacement).subscribe(
      data => {
        this.replacementItems = [];
        this.successMsj = data.message;
        this.toastr.success(this.successMsj, 'OK',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.errorMsj = err.error.error as string;
        this.toastr.error(this.errorMsj, 'ERROR');
      });
  }

}
