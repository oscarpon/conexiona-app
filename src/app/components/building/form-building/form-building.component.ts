import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Building } from 'src/app/models/building';
import { Hospital } from 'src/app/models/hospital';
import { BuildingService } from 'src/app/services/building.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { TokenService } from 'src/app/services/token.service';



@Component({
  selector: 'app-form-building',
  templateUrl: './form-building.component.html',
  styleUrls: ['./form-building.component.css']
})
export class FormBuildingComponent implements OnInit {

  public newBuilding: Building = new Building();
  hospitals: Hospital[] = [];
  errorMsj: string;
  faEdit = faEdit;
  faPlusSquare = faPlusSquare;
  hospitalName = '';
  myAccountId = '';


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private buildingService: BuildingService,
    private hospitalService: HospitalService,
    private tokenService: TokenService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.isAdmin();
    this.getAccount();
    this.loadHospitals();
    this.loadBuilding();
  }

  loadHospitals(): void{
    if(this.isAdmin()){
      this.loadAllHospitals();
    }else{
      this.loadHospitalsByAccount(this.getAccount());
    }
  }

  loadAllHospitals(): void{
    this.hospitalService.all().subscribe(
      data => {
        this.hospitals = data;
      },
      err => {
        this.toast.error('Error loading hospitals', 'ERROR');
      }
    )
  }

  loadHospitalsByAccount(id: string): void{
    this.hospitalService.getbyAccount(id).subscribe(
      data => {
        this.hospitals = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  loadBuilding(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.buildingService.detail(id).subscribe((building) => this.newBuilding = building);
      }
    })
  }

  public create(): void{
    this.buildingService.new(this.newBuilding, this.hospitalName).subscribe(
      data => {
        this.router.navigate(['/buildings']);
        this.toastr.success('Edificio creado correctamente', 'OK',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.errorMsj = err.error.error as string;
        this.toastr.error(this.errorMsj, 'ERROR');
      }
    )
  }

  public update(): void{
    this.buildingService.update(this.newBuilding).subscribe(
      building => {
        this.router.navigate(['/buildings']);
        this.toastr.success('Edificio actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.errorMsj = err.error.error as string;
        this.toastr.error(this.errorMsj, 'ERROR');
      }
    )
  }

  public isAdmin(): boolean{
    return this.tokenService.isAdmin();
  }

  public getAccount(): string{
    return this.tokenService.getAccount();
  }

}
