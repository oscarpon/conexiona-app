import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/models/account';
import { Building } from 'src/app/models/building';
import { Hospital } from 'src/app/models/hospital';
import { AccountService } from 'src/app/services/account.service';
import { BuildingService } from 'src/app/services/building.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-list-building',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css']
})
export class ListBuildingComponent implements OnInit {

  hospitals: Hospital[] = [];
  buildings: Building[] = [];
  accounts: Account[] = [];
  filterHospital = '';
  filterBuilding = '';
  filterAccount = '';
  errorMsj: string;
  faEdit = faEdit;
  faTrash = faTrash;
  myAccountId = '';

  constructor(
    private hospitalService: HospitalService,
    private buildingService: BuildingService,
    private toastr: ToastrService,
    private accountService: AccountService,
    private tokenService: TokenService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.isAdmin();
    if(this.isAdmin()){
      this.loadAccounts();
    }
    this.loadHospitals();
    this.loadBuildings();
  }

  loadHospitals(): void{
    if(this.isAdmin()){
    this.hospitalService.all().subscribe(
      data => {
        this.hospitals = data;
      },
      err => {
        console.log(err);
      });
    }else{
      this.myAccountId = this.getAccount();
      this.hospitalService.getbyAccount(this.myAccountId).subscribe(
        data => {
          this.hospitals = data;
        },
        err => {
          console.log(err);
        });
    }
  }

  loadBuildings(): void{
    if(this.isAdmin()){
      this.buildingService.all().subscribe(
        data => {
          this.buildings = data;
          this.spinner.hide();
        },
        err => {
          console.log(err);
        }
      );
    }else{
      this.myAccountId = this.getAccount();
      this.buildingService.listByAccount(this.myAccountId).subscribe(
        data => {
          this.buildings = data;
          this.spinner.hide();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  loadAccounts(): void{
    this.accountService.all().subscribe(
      data => {
        this.accounts = data;
      },
      err => {
        console.log(err)
      }
    )
  }

  delete(building: Building): void{
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a eliminar ' + building.buildingName, 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if(result.isConfirmed){
        this.buildingService.delete(building.id).subscribe(
          response => {
            this.buildings = this.buildings.filter(buil => buil !== building)
            Swal.fire(
              'Eliminado',
              'El edificio se ha eliminado',
              'success'
            )
          }
        )
      }else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No has completado la eliminación del edificio',
          'error'
        )
      }
    })
  }

  isAdmin(): boolean{
    return this.tokenService.isAdmin();
  }

  getAccount(): string{
    return this.tokenService.getAccount();
  }

}
