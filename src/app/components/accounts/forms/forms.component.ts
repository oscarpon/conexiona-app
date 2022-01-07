import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faEdit, faPlusSquare, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/models/account';
import Swal from 'sweetalert2';
import { textChangeRangeIsUnchanged } from 'typescript';
import { AccountService } from '../../../services/account.service';




@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  public account: Account = new Account();
  errorMsj: string;
  faPlusSquare = faPlusSquare;
  faEdit = faEdit;
  faArrowLeft = faArrowLeft;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadAccount();
  }

  loadAccount(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.accountService.detail(id).subscribe((account) => this.account = account);
      }
    })
  }

  public create(): void{
    this.accountService.save(this.account).subscribe(
      data => {
      
        this.router.navigate(['/accounts'])
        this.toastr.success('Cuenta creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.errorMsj = err.error.error as string;
        Swal.fire('Ooopsss', err.error.error, 'error');
      }
    )
  }

  update(): void{
    this.accountService.update(this.account).subscribe(
      account => {
        this.router.navigate(['/accounts']);
        this.toastr.success('Cuenta actualizada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.errorMsj = err.error.error as string;
        Swal.fire('Ooopsss', err.error.error, 'error');
      }
    )
  }

}
