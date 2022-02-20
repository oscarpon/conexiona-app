import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Warehouse } from 'src/app/models/warehouse';
import { WarehouseProduct } from 'src/app/models/warehouseProduct';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { WarehouseProductService } from 'src/app/services/warehouse-product.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { faDownload, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

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
  faTrash = faTrash;
  faEdit = faEdit;
  @Output() wareHouseEmitter = new EventEmitter<any>();
  @Input() isAdministrator: boolean;
  @Input() myAccountId: string;

  constructor(
    private authService: AuthService,
    private warehouseProductService: WarehouseProductService,
    private tokenService: TokenService,
    private warehouseService: WarehouseService,
    private toast: ToastrService,
    private ngbToast: NgbToastModule
  ) { }

  ngOnInit() {
    this.loadWarehouses();
  }

  loadWarehouses(): void {
    if(this.isAdministrator){
      this.warehouseService.all().subscribe(
        data => {
          this.warehouses = data;
        },
        err => {
          console.error(err);
        }
      )
    }else{
      this.warehouseService.getbyAccount(this.myAccountId).subscribe(
        data => {
          this.warehouses = data;
        },
        err => {
          console.error(err);
        }
      )
    }
    
  }

  loadWarehouseProducts(): void {
    this.wareHouseEmitter.emit(this.warehouseId);
    this.warehouseProductService.getWarehouseProductsByWarehouse(this.warehouseId).subscribe(
      data => {
        this.warehouseProducts = data;
        if(this.warehouseProducts.length == 0){
          this.toast.info("No se encuentran productos para este almacén. Debes añadirlos");
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  exportData(): void{
    this.wareHouseEmitter.emit(this.warehouseId);
    this.warehouseProductService.exportData(this.warehouseId).subscribe(
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


  delete(warehouseProduct: WarehouseProduct): void{
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a eliminar un producto del almacén' , 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if(result.isConfirmed){
        this.warehouseProductService.delete(warehouseProduct.id).subscribe(
          response => {
            this.warehouseProducts = this.warehouseProducts.filter(ware => ware !== warehouseProduct)
            Swal.fire(
              'Eliminado',
              'El producto se ha eliminado',
              'success'
            )
          }
        )
      }else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No has completado la eliminación',
          'error'
        )
      }
    })
  }


}
