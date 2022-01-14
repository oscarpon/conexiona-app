import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Warehouse } from 'src/app/models/warehouse';
import { WarehouseProduct } from 'src/app/models/warehouseProduct';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { WarehouseProductService } from 'src/app/services/warehouse-product.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
    //Añadir para cuando el usuario no es admin
    this.warehouseService.all().subscribe(
      data => {
        this.warehouses = data;
      },
      err => {
        console.error(err);
      }
    )
  }

  loadWarehouseProducts(): void {
    this.wareHouseEmitter.emit(this.warehouseId);
    this.warehouseProductService.getWarehouseProductsByWarehouse(this.warehouseId).subscribe(
      data => {
        this.warehouseProducts = data;
        if(this.warehouseProducts.length == 0){
          this.toast.info("No se encuentran productos para este almacén");
        }
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
