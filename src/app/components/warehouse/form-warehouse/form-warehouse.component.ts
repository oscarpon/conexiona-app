import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/models/account';
import { Building } from 'src/app/models/building';
import { Hospital } from 'src/app/models/hospital';
import { faEdit} from '@fortawesome/free-solid-svg-icons';
import { Warehouse } from 'src/app/models/warehouse';
import { BuildingService } from 'src/app/services/building.service';
import { TokenService } from 'src/app/services/token.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { FormBuildingComponent } from '../../building/form-building/form-building.component';
import { ListBuildingComponent } from '../../building/list-building/list-building.component';



@Component({
  selector: 'app-form-warehouse',
  templateUrl: './form-warehouse.component.html',
  styleUrls: ['./form-warehouse.component.css']
})
export class FormWarehouseComponent implements OnInit {

  public newWareHouse: Warehouse = new Warehouse();
  wareHouses: Warehouse[] = [];
  buildings: Building[] = [];
  building= '';
  errorMsj: string;
  faPlusSquare = faPlusSquare;
  myAccountId = '';
  faEdit = faEdit;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private wareHouseService: WarehouseService,
    private buildingService: BuildingService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.isAdmin();
    this.getAccount();
    this.loadBuildings();
    this.loadWareHouse();
  }

  loadBuildings(): void{
    if(this.isAdmin()){
      this.loadAllBuildings();
    }else{
      this.loadBuildingsByAccount(this.getAccount());
    }
  }

  loadAllBuildings(): void{
    this.buildingService.all().subscribe(
      data => {
        this.buildings = data;
      },
      err => {
        this.toastr.error('Error loading buildings', 'ERROR');
      }
    )
  }

  loadBuildingsByAccount(id: string){
    this.buildingService.listByAccount(id).subscribe(
      data => {
        this.buildings = data;
      },
      err => {
        this.toastr.error('Error loading buildings', 'Error');
      }
    )
  }

  public create(): void{
    if(this.isAdmin()){
      this.wareHouseService.create(this.newWareHouse, this.building).subscribe(
        data =>{
          this.router.navigate(['/warehouses'])
          this.toastr.success('Almacen creado correctamente', 'OK',{
            timeOut: 3000, positionClass: 'toast-top-center'
          });
        },
        err => {
          this.errorMsj = err.error.error as string;
          this.toastr.error(this.errorMsj, 'ERROR');
        }
      )
    }
  }

  loadWareHouse(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.wareHouseService.detail(id).subscribe((wareHouse) => this.newWareHouse = wareHouse);
      }
    })
  }

  update(): void{
    this.wareHouseService.update(this.newWareHouse).subscribe(
      wareHouse => {
        this.router.navigate(['/warehouses']);
        this.toastr.success('Almacén actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.errorMsj = err.error.error as string;
        this.toastr.error(this.errorMsj, 'ERROR');
      }
    )
  }

  getAccount(): string{
    return this.tokenService.getAccount();
  }

  isAdmin(): boolean{
    return this.tokenService.isAdmin();
  }





}
