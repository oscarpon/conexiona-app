import { Component, OnInit } from '@angular/core';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/models/account';
import { Hospital } from 'src/app/models/hospital';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-list-hospitals',
  templateUrl: './list-hospitals.component.html',
  styleUrls: ['./list-hospitals.component.css']
})
export class ListHospitalsComponent implements OnInit {

  filterHospital = '';
  filterAccount = '';
  filterProvince = '';
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;
  hospitals: Hospital[] = []
  accounts: Account[] = []
  provinces: string[] = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Ourense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
  errorMsj: string;
  isAdministrator = false;
  myAccountId: string;

  constructor(
    private tokenService: TokenService,
    private accountService: AccountService,
    private hospitalService: HospitalService,
    private authService: AuthService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.isAdmin();
    this.getAccount();
    if(this.isAdmin()){
      this.loadAccounts();
    }
    this.loadHospitals();
  }

  getAccount(): string{
    return this.myAccountId = this.tokenService.getAccount();
  }

  isAdmin(): boolean{
    return this.isAdministrator = this.tokenService.isAdmin();
  }

  loadAccounts(): void{
    this.accountService.all().subscribe(
      data => {
        this.accounts = data;
      },
      err => {
        this.toast.error('Error loading accounts', 'ERROR');
      }
    )
  }

  public loadHospitals(): void{
    if(this.isAdmin()){
      this.hospitalService.all().subscribe(
        data => {
          this.hospitals = data;
        },
        err => {
          this.toast.error('Error loading users', 'ERROR');
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

  delete(hospital: Hospital): void{
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a eliminar a ' + hospital.hospitalName, 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if(result.isConfirmed){
        this.hospitalService.delete(hospital.id).subscribe(
          response => {
            this.hospitals = this.hospitals.filter(hosp => hosp !== hospital)
            Swal.fire(
              'Eliminado',
              'El hospital se ha eliminado',
              'success'
            )
          }
        )
      }else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No has completado la eliminación del hospital',
          'error'
        )
      }
    })
  }

}
