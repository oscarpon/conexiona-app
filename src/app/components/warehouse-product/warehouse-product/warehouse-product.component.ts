import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { WarehouseProduct } from 'src/app/models/warehouseProduct';
import { RepositionService } from 'src/app/services/reposition.service';
import { TokenService } from 'src/app/services/token.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import { ListWarehouseProductComponent } from '../list-warehouse-product/list-warehouse-product/list-warehouse-product.component';

@Component({
  selector: 'app-warehouse-product',
  templateUrl: './warehouse-product.component.html',
  styleUrls: ['./warehouse-product.component.css']
})
export class WarehouseProductComponent implements OnInit {


  wareHouseId: string;
  isAdministrator: boolean;
  myAccountId: string;
  isGestor: boolean;
  warehouseProductsList: WarehouseProduct[] = [];

  

  constructor(
    private tokenService: TokenService,
    private repositionService: RepositionService
  ) { }

  ngOnInit(){
      this.isAdmin();
      this.getAccount();
      this.isGestorFunc();
  }

  loadWareHouse(wareHouseId: string){
    this.wareHouseId = wareHouseId;
  }

  isAdmin(): boolean{
    return this.isAdministrator = this.tokenService.isAdmin();
  }

  isGestorFunc(): boolean{
    return this.isGestor = this.tokenService.isGestor();
  }

  getAccount(): string{
    return this.myAccountId = this.tokenService.getAccount();
  }

  exportData(id: string): void{
    this.repositionService.exportData(id).subscribe(
      data => {
        var newBlob = new Blob([data], {type: "application/pdf"});
        var fileUrl = URL.createObjectURL(newBlob);
        var a = document.createElement('a');
        a.href = fileUrl;
        a.target = '_blank';
        a.download = 'data.pdf';
        document.body.appendChild(a);
        a.click();      
      }
    )
  }



  

}
