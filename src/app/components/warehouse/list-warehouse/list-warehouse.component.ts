import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/models/account';
import { Building } from 'src/app/models/building';
import { Hospital } from 'src/app/models/hospital';
import { Warehouse } from 'src/app/models/warehouse';
import { AccountService } from 'src/app/services/account.service';
import { BuildingService } from 'src/app/services/building.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { TokenService } from 'src/app/services/token.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import Swal from 'sweetalert2';
import { ListHospitalsComponent } from '../../hospitals/list-hospitals/list-hospitals.component';



@Component({
  selector: 'app-list-warehouse',
  templateUrl: './list-warehouse.component.html',
  styleUrls: ['./list-warehouse.component.css']
})
export class ListWarehouseComponent implements OnInit {

  buildings: Building[] = [];
  warehouses: Warehouse[] = [];
  hospitals: Hospital[] = [];
  accounts: Account[] = [];
  filterFloor = '';
  faEdit = faEdit;
  filterBuildingName = '';
  filterHospital = '';
  filterAccount = '';
  myAccountId = '';
  faTrash = faTrash;
  

  constructor(
    private wareHouseService: WarehouseService,
    private buildingService: BuildingService,
    private toastr: ToastrService,
    private accountService: AccountService,
    private hospitalService: HospitalService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.isAdmin();
    this.getAccount();
    if(this.isAdmin()){
      this.loadBuildings();
      this.loadAccounts();
    }
    this.loadWareHouse(this.myAccountId);
    this.loadHospitals();
  }

  loadBuildings(): void{
    this.buildingService.all().subscribe(
      data => {
        this.buildings = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  loadAllWareHouse(): void{
    this.wareHouseService.all().subscribe(
      data => {
        this.warehouses = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  loadWareHouseAccount(accountId: string): void{
    this.wareHouseService.getbyAccount(accountId).subscribe(
      data => {
        this.warehouses = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  loadWareHouse(id: string): void{
    if(this.isAdmin()){
      this.loadAllWareHouse();
    }else{
      this.loadWareHouseAccount(id);
    }
  }

  loadAccounts(): void{
    this.accountService.all().subscribe(
      data => {
        this.accounts = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  loadHospitals(): void{
    if(this.isAdmin()){
      this.hospitalService.all().subscribe(
        data => {
          this.hospitals = data;
        },
        err => {
          console.log(err);
        }
  
      )
    }else{
      this.hospitalService.getbyAccount(this.myAccountId).subscribe(
        data => {
          this.hospitals = data;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  isAdmin(): boolean{
    return this.tokenService.isAdmin();
  }

  getAccount(): string{
    return this.myAccountId = this.tokenService.getAccount();
  }

  delete(warehouse: Warehouse): void{
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a eliminar a ' + warehouse.wareHouseName, 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if(result.isConfirmed){
        this.wareHouseService.delete(warehouse.id).subscribe(
          response => {
            this.warehouses = this.warehouses.filter(ware => ware !== warehouse)
            Swal.fire(
              'Eliminado',
              'El almacén se ha eliminado',
              'success'
            )
          }
        )
      }else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No has completado la eliminación del almacén',
          'error'
        )
      }
    })
  }

}
