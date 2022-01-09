import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/models/warehouse';
import { WarehouseProduct } from 'src/app/models/warehouseProduct';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { WarehouseProductService } from 'src/app/services/warehouse-product.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-warehouse-product',
  templateUrl: './list-warehouse-product.component.html',
  styleUrls: ['./list-warehouse-product.component.css']
})
export class ListWarehouseProductComponent implements OnInit {

  warehouseProducts: WarehouseProduct[] = [];
  warehouses: Warehouse[] = [];
  warehouseId = '';
  faDownload = faDownload;


  constructor(
    private authService: AuthService,
    private warehouseProductService: WarehouseProductService,
    private tokenService: TokenService,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit() {
    this.loadWarehouses();
  }

  loadWarehouses(): void {
    this.warehouseService.all().subscribe(
      data => {
        this.warehouses = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  loadWarehouseProducts(): void {
    this.warehouseProductService.getWarehouseProductsByWarehouse(this.warehouseId).subscribe(
      data => {
        this.warehouseProducts = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  openPDF(): void {
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 50, position, fileWidth, fileHeight)
      PDF.save('stockWareHouse.pdf');
    })
  }



}
