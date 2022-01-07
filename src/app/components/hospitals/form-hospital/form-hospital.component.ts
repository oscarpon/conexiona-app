import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/account';
import { Hospital } from 'src/app/models/hospital';
import { AccountService } from 'src/app/services/account.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-form-hospital',
  templateUrl: './form-hospital.component.html',
  styleUrls: ['./form-hospital.component.css']
})
export class FormHospitalComponent implements OnInit {

  public newHospital: Hospital = new Hospital();
  accounts: Account[] = []
  accountName = '';
  errorMsj: string;
  provinces: string[] = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Ourense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
  faEdit = faEdit;
  faPlusSquare = faPlusSquare;
  myAccountId = '';


  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private hospitalService: HospitalService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.isAdmin();
    if(this.isAdmin()){
      this.loadAccounts();
    }
    this.loadHospital();
  }

  loadAccounts(): void{
    this.accountService.all().subscribe(
      data => {
        this.accounts = data;
      },
      err => {
        this.toastr.error('Error loading accounts', 'ERROR');
      }
    )
  }

  loadHospital(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.hospitalService.detail(id).subscribe((hospital) => this.newHospital = hospital);
      }
    })
  }

  public create(): void{
    if(this.isAdmin()){
      this.hospitalService.new(this.newHospital, this.accountName).subscribe(
      data => {
        this.router.navigate(['/hospitals'])
        this.toastr.success('Hospital creado correctamente', 'OK',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.errorMsj = err.error.error as string;
        this.toastr.error(this.errorMsj, 'ERROR');
      });
    }else{
      this.myAccountId = this.tokenService.getAccount();
      this.hospitalService.new(this.newHospital, this.myAccountId).subscribe(
        data => {
          this.router.navigate(['/hospitals'])
          this.toastr.success('Hospital creado correctamente', 'OK',{
            timeOut: 3000, positionClass: 'toast-top-center'
          });
        },
        err => {
          this.errorMsj = err.error.error as string;
          this.toastr.error(this.errorMsj, 'ERROR');
        });
    }
    
  }

  update(): void{
    this.hospitalService.update(this.newHospital).subscribe(
      hospital => {
        this.router.navigate(['/hospitals']);
        this.toastr.success('Hospital actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.errorMsj = err.error.error as string;
        this.toastr.error(this.errorMsj, 'ERROR');
      }
    )
  }

  isAdmin(): boolean{
    return this.tokenService.isAdmin();
  }


}
